import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');

    const whereClause: any = {};
    if (industry) {
      whereClause.industry = industry;
    }

    const analytics = await db.industryAnalytics.findMany({
      where: whereClause,
      orderBy: { totalAssessments: 'desc' },
      take: 50
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching industry analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industry analytics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { industry, topCompetitors, commonOpportunities, commonRisks, marketTrends } = await request.json();

    const analytics = await db.industryAnalytics.upsert({
      where: { industry },
      update: {
        topCompetitors,
        commonOpportunities,
        commonRisks,
        marketTrends,
        lastUpdated: new Date()
      },
      create: {
        industry,
        topCompetitors,
        commonOpportunities,
        commonRisks,
        marketTrends,
        totalAssessments: 0,
        averageScore: 0
      }
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error updating industry analytics:', error);
    return NextResponse.json(
      { error: 'Failed to update industry analytics' },
      { status: 500 }
    );
  }
}