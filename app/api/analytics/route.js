import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, analyticsEvents } from '@/lib/schema';
import { sql, desc, count } from 'drizzle-orm';

export async function GET(request) {
  try {
    // Simplified analytics for now - just get basic data
    const allLeads = await db.select().from(leads);
    
    const totalLeads = allLeads.length;
    const totalDeposits = allLeads.reduce((sum, lead) => sum + parseFloat(lead.totalDeposits || 0), 0);
    const depositedLeads = allLeads.filter(lead => lead.isDeposited).length;
    const conversionRate = totalLeads > 0 ? ((depositedLeads / totalLeads) * 100).toFixed(1) : 0;
    const averageLeadScore = totalLeads > 0 ? Math.round(allLeads.reduce((sum, lead) => sum + (lead.leadScore || 0), 0) / totalLeads) : 0;

    // Simple source and country mapping
    const sourceMap = {};
    const countryMap = {};
    
    allLeads.forEach(lead => {
      sourceMap[lead.source] = (sourceMap[lead.source] || 0) + 1;
      countryMap[lead.country] = (countryMap[lead.country] || 0) + 1;
    });

    // Get recent leads (last 10)
    const recentLeads = allLeads
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    return NextResponse.json({
      totalLeads,
      totalDeposits,
      conversionRate: parseFloat(conversionRate),
      averageLeadScore,
      leadsBySource: sourceMap,
      leadsByCountry: countryMap,
      recentLeads
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
