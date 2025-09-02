import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { affiliateLinks, leads } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { leadId, affiliateProgram, baseUrl } = await request.json();

    // Validate required fields
    if (!leadId || !affiliateProgram || !baseUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate tracking URL with lead ID and program
    const trackingParams = new URLSearchParams({
      lead_id: leadId,
      program: affiliateProgram,
      source: 'smartstake',
      timestamp: Date.now().toString()
    });

    const affiliateUrl = `${baseUrl}?${trackingParams.toString()}`;

    // Create affiliate link record
    const linkRecord = await db.insert(affiliateLinks).values({
      leadId: parseInt(leadId),
      affiliateProgram,
      affiliateUrl,
      clickCount: 0,
      conversionCount: 0,
      commissionEarned: '0'
    }).returning();

    return NextResponse.json({
      success: true,
      linkId: linkRecord[0].id,
      affiliateUrl,
      message: 'Affiliate link created successfully'
    });

  } catch (error) {
    console.error('Error creating affiliate link:', error);
    return NextResponse.json({ error: 'Failed to create affiliate link' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    let query = db.select({
      id: affiliateLinks.id,
      affiliateProgram: affiliateLinks.affiliateProgram,
      affiliateUrl: affiliateLinks.affiliateUrl,
      clickCount: affiliateLinks.clickCount,
      conversionCount: affiliateLinks.conversionCount,
      commissionEarned: affiliateLinks.commissionEarned,
      createdAt: affiliateLinks.createdAt,
      leadEmail: leads.email,
      leadFirstName: leads.firstName
    })
    .from(affiliateLinks)
    .leftJoin(leads, eq(affiliateLinks.leadId, leads.id));

    if (leadId) {
      query = query.where(eq(affiliateLinks.leadId, parseInt(leadId)));
    }

    const links = await query;

    return NextResponse.json({
      links,
      totalLinks: links.length,
      totalClicks: links.reduce((sum, link) => sum + link.clickCount, 0),
      totalConversions: links.reduce((sum, link) => sum + link.conversionCount, 0),
      totalCommission: links.reduce((sum, link) => sum + parseFloat(link.commissionEarned), 0)
    });

  } catch (error) {
    console.error('Error fetching affiliate links:', error);
    return NextResponse.json({ error: 'Failed to fetch affiliate links' }, { status: 500 });
  }
}
