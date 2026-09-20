import { NextRequest, NextResponse } from 'next/server';
import { EmergencySummary } from '@/lib/ai/types';

// In-memory store for demo session
let latestSummary: EmergencySummary | null = null;

export async function POST(req: NextRequest) {
  try {
    const summary: EmergencySummary = await req.json();
    latestSummary = {
      ...summary,
      id: summary.id || 'sum-' + Date.now(),
      generatedAt: summary.generatedAt || new Date().toLocaleString()
    };

    return NextResponse.json({
      success: true,
      summary: latestSummary
    });
  } catch {
    return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    summary: latestSummary
  });
}
