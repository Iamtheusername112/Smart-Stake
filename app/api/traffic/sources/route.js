import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trafficSources, analyticsEvents } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { name, type, platform, costPerClick, costPerConversion } = await request.json();

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    // Create traffic source
    const source = await db.insert(trafficSources).values({
      name,
      type,
      platform: platform || null,
      costPerClick: costPerClick ? costPerClick.toString() : null,
      costPerConversion: costPerConversion ? costPerConversion.toString() : null,
      totalSpent: '0',
      totalClicks: 0,
      totalConversions: 0,
      isActive: true
    }).returning();

    return NextResponse.json({
      success: true,
      source: source[0],
      message: 'Traffic source created successfully'
    });

  } catch (error) {
    console.error('Error creating traffic source:', error);
    return NextResponse.json({ error: 'Failed to create traffic source' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const platform = searchParams.get('platform');

    let query = db.select().from(trafficSources);

    if (type) {
      query = query.where(eq(trafficSources.type, type));
    }

    if (platform) {
      query = query.where(eq(trafficSources.platform, platform));
    }

    const sources = await query.orderBy(desc(trafficSources.createdAt));

    // Calculate total metrics
    const totalSpent = sources.reduce((sum, source) => sum + parseFloat(source.totalSpent), 0);
    const totalClicks = sources.reduce((sum, source) => sum + source.totalClicks, 0);
    const totalConversions = sources.reduce((sum, source) => sum + source.totalConversions, 0);
    const overallROI = totalSpent > 0 ? ((totalConversions * 50 - totalSpent) / totalSpent * 100).toFixed(2) : 0;

    return NextResponse.json({
      sources,
      metrics: {
        totalSources: sources.length,
        totalSpent,
        totalClicks,
        totalConversions,
        overallROI: parseFloat(overallROI),
        avgCostPerClick: totalClicks > 0 ? (totalSpent / totalClicks).toFixed(4) : 0,
        avgCostPerConversion: totalConversions > 0 ? (totalSpent / totalConversions).toFixed(2) : 0
      }
    });

  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json({ error: 'Failed to fetch traffic sources' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Source ID required' }, { status: 400 });
    }

    // Update traffic source
    const updatedSource = await db.update(trafficSources)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(trafficSources.id, id))
      .returning();

    if (!updatedSource.length) {
      return NextResponse.json({ error: 'Source not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      source: updatedSource[0],
      message: 'Traffic source updated successfully'
    });

  } catch (error) {
    console.error('Error updating traffic source:', error);
    return NextResponse.json({ error: 'Failed to update traffic source' }, { status: 500 });
  }
}
