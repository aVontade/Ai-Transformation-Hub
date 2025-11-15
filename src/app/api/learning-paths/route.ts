import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const industry = searchParams.get('industry');
    const difficulty = searchParams.get('difficulty');

    const whereClause: any = {};
    if (role) whereClause.role = role;
    if (industry) whereClause.industry = industry;
    if (difficulty) whereClause.difficulty = difficulty;

    const learningPaths = await db.learningPath.findMany({
      where: whereClause,
      orderBy: { title: 'asc' },
    });

    return NextResponse.json(learningPaths);
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning paths' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, role, industry, difficulty, duration, modules, outcomes } = await request.json();

    const learningPath = await db.learningPath.create({
      data: {
        title,
        description,
        role,
        industry,
        difficulty,
        duration,
        modules,
        outcomes,
      },
    });

    return NextResponse.json(learningPath);
  } catch (error) {
    console.error('Error creating learning path:', error);
    return NextResponse.json(
      { error: 'Failed to create learning path' },
      { status: 500 }
    );
  }
}