import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { emailCampaigns, emailSends, leads } from '@/lib/schema';
import { eq, desc, count } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { name, subject, content, type } = await request.json();

    // Validate required fields
    if (!name || !subject || !content || !type) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create email campaign
    const campaign = await db.insert(emailCampaigns).values({
      name,
      subject,
      content,
      type,
      isActive: true
    }).returning();

    return NextResponse.json({
      success: true,
      campaign: campaign[0],
      message: 'Email campaign created successfully'
    });

  } catch (error) {
    console.error('Error creating email campaign:', error);
    return NextResponse.json({ error: 'Failed to create email campaign' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const isActive = searchParams.get('isActive');

    let query = db.select().from(emailCampaigns);

    if (type) {
      query = query.where(eq(emailCampaigns.type, type));
    }

    if (isActive !== null) {
      query = query.where(eq(emailCampaigns.isActive, isActive === 'true'));
    }

    const campaigns = await query.orderBy(desc(emailCampaigns.createdAt));

    // Get campaign performance data
    const campaignsWithStats = await Promise.all(
      campaigns.map(async (campaign) => {
        const [sentCount, openedCount, clickedCount] = await Promise.all([
          db.select({ count: count() }).from(emailSends).where(eq(emailSends.campaignId, campaign.id)),
          db.select({ count: count() }).from(emailSends).where(eq(emailSends.campaignId, campaign.id)).where(eq(emailSends.openedAt, null)),
          db.select({ count: count() }).from(emailSends).where(eq(emailSends.campaignId, campaign.id)).where(eq(emailSends.clickedAt, null))
        ]);

        const sent = sentCount[0]?.count || 0;
        const opened = openedCount[0]?.count || 0;
        const clicked = clickedCount[0]?.count || 0;

        return {
          ...campaign,
          stats: {
            sent,
            opened,
            clicked,
            openRate: sent > 0 ? ((opened / sent) * 100).toFixed(2) : 0,
            clickRate: sent > 0 ? ((clicked / sent) * 100).toFixed(2) : 0
          }
        };
      })
    );

    return NextResponse.json({
      campaigns: campaignsWithStats,
      totalCampaigns: campaigns.length
    });

  } catch (error) {
    console.error('Error fetching email campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch email campaigns' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }

    // Update email campaign
    const updatedCampaign = await db.update(emailCampaigns)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(emailCampaigns.id, id))
      .returning();

    if (!updatedCampaign.length) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      campaign: updatedCampaign[0],
      message: 'Email campaign updated successfully'
    });

  } catch (error) {
    console.error('Error updating email campaign:', error);
    return NextResponse.json({ error: 'Failed to update email campaign' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Campaign ID required' }, { status: 400 });
    }

    // Soft delete by setting isActive to false
    const deletedCampaign = await db.update(emailCampaigns)
      .set({ isActive: false })
      .where(eq(emailCampaigns.id, parseInt(id)))
      .returning();

    if (!deletedCampaign.length) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Email campaign deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting email campaign:', error);
    return NextResponse.json({ error: 'Failed to delete email campaign' }, { status: 500 });
  }
}
