import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { emailCampaigns, emailSends, leads, userSegments } from '@/lib/schema';
import { eq, and, gte, lte } from 'drizzle-orm';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request) {
  try {
    const { campaignId, segmentName, testMode = false } = await request.json();

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }

    // Get campaign details
    const campaign = await db.select()
      .from(emailCampaigns)
      .where(eq(emailCampaigns.id, campaignId))
      .limit(1);

    if (!campaign.length) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const campaignData = campaign[0];

    // Get target leads based on segment
    let leadsQuery = db.select()
      .from(leads)
      .leftJoin(userSegments, eq(leads.id, userSegments.leadId));

    if (segmentName) {
      leadsQuery = leadsQuery.where(eq(userSegments.segmentName, segmentName));
    }

    const targetLeads = await leadsQuery;

    if (testMode) {
      // Send test email to first lead only
      const testLead = targetLeads[0];
      if (testLead) {
        await sendEmail(testLead.leads, campaignData);
        return NextResponse.json({
          success: true,
          message: 'Test email sent successfully',
          testRecipient: testLead.leads.email
        });
      }
    }

    // Send emails to all leads in segment
    const results = [];
    for (const leadData of targetLeads) {
      try {
        const lead = leadData.leads;
        
        // Check if email was already sent for this campaign
        const existingSend = await db.select()
          .from(emailSends)
          .where(and(
            eq(emailSends.leadId, lead.id),
            eq(emailSends.campaignId, campaignId)
          ))
          .limit(1);

        if (existingSend.length === 0) {
          await sendEmail(lead, campaignData);
          
          // Record email send
          await db.insert(emailSends).values({
            leadId: lead.id,
            campaignId: campaignId,
            sentAt: new Date()
          });

          results.push({ leadId: lead.id, email: lead.email, status: 'sent' });
        } else {
          results.push({ leadId: lead.id, email: lead.email, status: 'already_sent' });
        }
      } catch (error) {
        console.error(`Error sending email to ${leadData.leads.email}:`, error);
        results.push({ leadId: leadData.leads.id, email: leadData.leads.email, status: 'failed' });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email automation completed',
      results,
      totalSent: results.filter(r => r.status === 'sent').length,
      totalFailed: results.filter(r => r.status === 'failed').length
    });

  } catch (error) {
    console.error('Email automation error:', error);
    return NextResponse.json({ error: 'Failed to run email automation' }, { status: 500 });
  }
}

async function sendEmail(lead, campaign) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid not configured, skipping email send');
    return;
  }

  // Personalize email content
  const personalizedContent = campaign.content
    .replace(/{{firstName}}/g, lead.firstName || 'there')
    .replace(/{{email}}/g, lead.email)
    .replace(/{{bonusAmount}}/g, '100') // This could be dynamic based on lead data
    .replace(/{{affiliateLink}}/g, `${process.env.NEXT_PUBLIC_APP_URL}/affiliate/${lead.id}`);

  const msg = {
    to: lead.email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@smartstake.com',
    subject: campaign.subject,
    html: personalizedContent,
    trackingSettings: {
      clickTracking: { enable: true },
      openTracking: { enable: true }
    }
  };

  await sgMail.send(msg);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    let query = db.select({
      id: emailSends.id,
      sentAt: emailSends.sentAt,
      openedAt: emailSends.openedAt,
      clickedAt: emailSends.clickedAt,
      leadEmail: leads.email,
      leadFirstName: leads.firstName,
      campaignName: emailCampaigns.name,
      campaignType: emailCampaigns.type
    })
    .from(emailSends)
    .leftJoin(leads, eq(emailSends.leadId, leads.id))
    .leftJoin(emailCampaigns, eq(emailSends.campaignId, emailCampaigns.id));

    if (campaignId) {
      query = query.where(eq(emailSends.campaignId, parseInt(campaignId)));
    }

    const sends = await query;

    // Calculate metrics
    const totalSent = sends.length;
    const totalOpened = sends.filter(s => s.openedAt).length;
    const totalClicked = sends.filter(s => s.clickedAt).length;
    const openRate = totalSent > 0 ? (totalOpened / totalSent * 100).toFixed(2) : 0;
    const clickRate = totalSent > 0 ? (totalClicked / totalSent * 100).toFixed(2) : 0;

    return NextResponse.json({
      sends,
      metrics: {
        totalSent,
        totalOpened,
        totalClicked,
        openRate: parseFloat(openRate),
        clickRate: parseFloat(clickRate)
      }
    });

  } catch (error) {
    console.error('Error fetching email sends:', error);
    return NextResponse.json({ error: 'Failed to fetch email data' }, { status: 500 });
  }
}
