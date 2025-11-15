import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      type,
      generatedAt,
      score,
      industry,
      companyUrl,
      downloadUrl,
      reportData
    } = await request.json();

    console.log('Saving report to database:', { title, type, score, industry });

    // Extract company name from URL or use a default
    let companyName = 'Unknown Company';
    if (companyUrl) {
      try {
        const url = new URL(companyUrl);
        companyName = url.hostname.replace('www.', '').split('.')[0];
        // Capitalize first letter
        companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
      } catch (e) {
        companyName = 'Unknown Company';
      }
    }

    // Save report to database with correct field mapping
    const savedReport = await db.reportArchive.create({
      data: {
        companyName,
        industry,
        companyUrl,
        assessmentScore: score,
        categoryScores: reportData?.categoryScores || {},
        reportData: {
          title,
          type,
          generatedAt,
          score,
          industry,
          companyUrl,
          downloadUrl,
          status: 'completed',
          ...reportData
        },
        generatedAt: generatedAt ? new Date(generatedAt) : new Date()
      },
    });

    console.log('Report saved successfully:', savedReport);

    return NextResponse.json({
      success: true,
      report: savedReport,
      message: 'Report saved to database successfully'
    });

  } catch (error) {
    console.error('Error saving report to database:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save report to database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}