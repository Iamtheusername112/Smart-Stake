import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, gamificationActivities, analyticsEvents } from '@/lib/schema';
import { generateLeadScore } from '@/lib/utils';
import { eq, sql } from 'drizzle-orm';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      lastName,
      phone,
      age,
      country,
      preferredGames,
      luckyNumber,
      bonusAmount,
      source,
      utmSource,
      utmMedium,
      utmCampaign
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !age || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if lead already exists
    try {
      const existingLead = await db.select().from(leads).where(eq(leads.email, email)).limit(1);
      
      if (existingLead.length > 0) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
    } catch (error) {
      console.log('Duplicate check failed, continuing with insert:', error);
    }

    // Calculate lead score
    const leadScore = generateLeadScore({
      email,
      phone,
      age,
      country,
      preferredGames
    });

    // Determine risk level based on age and preferences
    let riskLevel = 'low';
    if (age >= 18 && age <= 35) {
      riskLevel = 'high';
    } else if (age >= 36 && age <= 50) {
      riskLevel = 'medium';
    }

    // Insert lead
    let newLead;
    try {
      [newLead] = await db.insert(leads).values({
        email,
        firstName,
        lastName,
        phone,
        age,
        country,
        preferredGames: preferredGames || [],
        riskLevel,
        leadScore,
        source: source || 'organic',
        utmSource,
        utmMedium,
        utmCampaign,
        isVerified: false,
        isDeposited: false,
        totalDeposits: '0'
      }).returning();
    } catch (error) {
      if (error.code === '23505') { // Duplicate key error
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }
      throw error; // Re-throw other errors
    }

    // Record gamification activity (simplified for now)
    if (luckyNumber && bonusAmount && newLead.id) {
      try {
        await db.insert(gamificationActivities).values({
          leadId: newLead.id,
          activityType: 'lucky_number',
          activityData: {
            number: luckyNumber,
            bonusAmount: bonusAmount
          },
          pointsEarned: Math.floor(bonusAmount / 10)
        });
      } catch (error) {
        console.log('Gamification activity insert failed:', error);
      }
    }

    // Record analytics event (simplified for now)
    if (newLead.id) {
      try {
        await db.insert(analyticsEvents).values({
          leadId: newLead.id,
          eventType: 'lead_captured',
          eventData: {
            source,
            utmSource,
            utmMedium,
            utmCampaign,
            bonusAmount,
            luckyNumber
          },
          userAgent: request.headers.get('user-agent'),
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
        });
      } catch (error) {
        console.log('Analytics event insert failed:', error);
      }
    }

    // TODO: Trigger email automation sequence
    // await sendWelcomeEmail(newLead.email, firstName, bonusAmount);

    return NextResponse.json({
      success: true,
      lead: {
        id: newLead.id,
        email: newLead.email,
        firstName: newLead.firstName,
        leadScore: newLead.leadScore,
        bonusAmount
      }
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    const allLeads = await db.select().from(leads).limit(limit).offset(offset);
    const totalCount = await db.select({ count: sql`count(*)` }).from(leads);

    return NextResponse.json({
      leads: allLeads,
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        totalPages: Math.ceil(totalCount[0].count / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
