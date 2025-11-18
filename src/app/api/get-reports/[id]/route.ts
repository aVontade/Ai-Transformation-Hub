import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch the specific report from the database
    const report = await db.reportArchive.findUnique({
      where: { id }
    });

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    console.log('Fetched report:', report.id);

    // Return the full report data
    const fullReport = {
      id: report.id,
      company: report.companyName,
      industry: report.industry,
      companyUrl: report.companyUrl,
      assessmentScore: report.assessmentScore,
      categoryScores: report.categoryScores,
      reportData: report.reportData,
      generatedAt: report.generatedAt.toISOString()
    };

    return NextResponse.json(fullReport);

  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
