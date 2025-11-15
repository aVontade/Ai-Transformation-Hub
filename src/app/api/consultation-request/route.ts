import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      company,
      industry,
      phone,
      jobTitle,
      consultationType,
      preferredDate,
      preferredTime,
      timezone,
      message,
      assessmentScore,
      reportGenerated,
      companyUrl
    } = await request.json();

    // Create consultation request
    const consultationRequest = await db.consultationRequest.create({
      data: {
        name,
        email,
        company,
        industry,
        phone,
        jobTitle,
        consultationType,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        preferredTime,
        timezone,
        message,
        assessmentScore,
        reportGenerated,
        companyUrl
      },
    });

    // Update industry analytics
    if (industry && assessmentScore) {
      await updateIndustryAnalytics(industry, assessmentScore);
    }

    // Archive report data if available
    if (reportGenerated && companyUrl) {
      // This would be populated with actual report data from the client
      // For now, we'll store basic info
      await db.reportArchive.create({
        data: {
          companyName: company,
          industry,
          companyUrl,
          assessmentScore,
          categoryScores: {}, // Add empty categoryScores to satisfy schema
          reportData: {
            generatedAt: new Date().toISOString(),
            consultationBooked: true
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      consultationRequest,
      message: 'Consultation request submitted successfully'
    });

  } catch (error) {
    console.error('Error creating consultation request:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
}

async function updateIndustryAnalytics(industry: string, newScore: number) {
  try {
    // Check if industry analytics already exist
    const existingAnalytics = await db.industryAnalytics.findUnique({
      where: { industry }
    });

    if (existingAnalytics) {
      // Update existing analytics
      const currentTotal = existingAnalytics.totalAssessments;
      const currentAverage = existingAnalytics.averageScore;
      
      const newTotal = currentTotal + 1;
      const newAverage = ((currentAverage * currentTotal) + newScore) / newTotal;

      await db.industryAnalytics.update({
        where: { industry },
        data: {
          totalAssessments: newTotal,
          averageScore: newAverage,
          lastUpdated: new Date()
        }
      });
    } else {
      // Create new industry analytics
      await db.industryAnalytics.create({
        data: {
          industry,
          totalAssessments: 1,
          averageScore: newScore,
          lastUpdated: new Date()
        }
      });
    }
  } catch (error) {
    console.error('Error updating industry analytics:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const consultationRequests = await db.consultationRequest.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to recent requests
    });

    return NextResponse.json(consultationRequests);
  } catch (error) {
    console.error('Error fetching consultation requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consultation requests' },
      { status: 500 }
    );
  }
}