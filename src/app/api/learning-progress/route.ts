import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const progress = await db.learningProgress.findMany({
      where: { userId },
      include: {
        path: true,
      },
      orderBy: { lastAccessedAt: 'desc' },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching learning progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, pathId, status, completionRate, timeSpent } = await request.json();

    const progress = await db.learningProgress.upsert({
      where: {
        userId_pathId: {
          userId,
          pathId,
        },
      },
      update: {
        status,
        completionRate,
        timeSpent,
        lastAccessedAt: new Date(),
        completedAt: status === 'Completed' ? new Date() : null,
      },
      create: {
        userId,
        pathId,
        status,
        completionRate,
        timeSpent,
        completedAt: status === 'Completed' ? new Date() : null,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating learning progress:', error);
    return NextResponse.json(
      { error: 'Failed to update learning progress' },
      { status: 500 }
    );
  }
}