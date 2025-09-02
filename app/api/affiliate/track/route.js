import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { affiliateLinks, revenueTracking, leads } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { leadId, affiliateProgram, conversionType, amount, trackingId } = await request.json();

    // Validate required fields
    if (!leadId || !affiliateProgram || !conversionType || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate commission based on program and conversion type
    const commissionRates = {
      'bet365': { signup: 50, deposit: 100, first_bet: 25 },
      'william_hill': { signup: 40, deposit: 80, first_bet: 20 },
      'ladbrokes': { signup: 45, deposit: 90, first_bet: 22 },
      'paddy_power': { signup: 35, deposit: 70, first_bet: 18 },
      'sky_bet': { signup: 30, deposit: 60, first_bet: 15 }
    };

    const rate = commissionRates[affiliateProgram]?.[conversionType] || 25;
    const commission = (parseFloat(amount) * rate) / 100;

    // Record the conversion
    const revenueRecord = await db.insert(revenueTracking).values({
      leadId: parseInt(leadId),
      affiliateProgram,
      conversionType,
      amount: amount.toString(),
      commission: commission.toString(),
      status: 'pending',
      trackingId: trackingId || null
    }).returning();

    // Update affiliate link stats
    await db.update(affiliateLinks)
      .set({
        conversionCount: sql`conversion_count + 1`,
        commissionEarned: sql`commission_earned + ${commission.toString()}`
      })
      .where(eq(affiliateLinks.leadId, leadId));

    // Update lead status based on conversion type
    if (conversionType === 'deposit') {
      await db.update(leads)
        .set({
          isDeposited: true,
          totalDeposits: sql`total_deposits + ${amount}`,
          lastActivity: new Date()
        })
        .where(eq(leads.id, leadId));
    }

    return NextResponse.json({
      success: true,
      revenueId: revenueRecord[0].id,
      commission,
      message: 'Conversion tracked successfully'
    });

  } catch (error) {
    console.error('Affiliate tracking error:', error);
    return NextResponse.json({ error: 'Failed to track conversion' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 });
    }

    // Get all conversions for a lead
    const conversions = await db.select()
      .from(revenueTracking)
      .where(eq(revenueTracking.leadId, parseInt(leadId)));

    // Calculate total revenue
    const totalRevenue = conversions.reduce((sum, conv) => sum + parseFloat(conv.commission), 0);

    return NextResponse.json({
      conversions,
      totalRevenue,
      totalConversions: conversions.length
    });

  } catch (error) {
    console.error('Error fetching affiliate data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
