import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Fetch all reports from the database
    const reports = await db.reportArchive.findMany({
      orderBy: { generatedAt: 'desc' },
      take: 50 // Limit to recent reports
    });

    console.log('Fetched reports from database:', reports.length);

    // Transform the data to match the frontend interface
    const transformedReports = reports.map(report => ({
      id: report.id,
      title: report.reportData?.title || 'AI Readiness Assessment Report',
      type: report.reportData?.type || 'assessment',
      generatedAt: report.generatedAt.toISOString(),
      score: report.assessmentScore,
      industry: report.industry,
      status: report.reportData?.status || 'completed',
      downloadUrl: `/api/download-report/${report.id}`,
      company: report.companyName, // Fixed: companyName -> company
      companyUrl: report.companyUrl,
      categoryScores: report.categoryScores,
      recommendations: report.reportData?.recommendations || []
    }));

    return NextResponse.json(transformedReports);

  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch reports',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}