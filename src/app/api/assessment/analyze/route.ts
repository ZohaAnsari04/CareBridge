import { NextRequest, NextResponse } from 'next/server';
import { AssessmentAnswers } from '@/lib/ai/types';
import { evaluateTriage, extractSymptoms } from '@/lib/ai/triage';

export async function POST(req: NextRequest) {
  try {
    const body: AssessmentAnswers = await req.json();

    if (!body) {
      return NextResponse.json({ error: 'Assessment answers required' }, { status: 400 });
    }

    // 1. Perform symptom extraction (AI service if available, else deterministic NLP fallback)
    const extraction = await extractSymptoms(
      body.primaryDescription || '',
      body.selectedSymptoms || []
    );

    // 2. Evaluate with deterministic safety triage engine
    const triageResult = evaluateTriage(body, extraction);

    return NextResponse.json({
      success: true,
      extraction,
      triageResult
    });
  } catch (error: any) {
    console.error('Error analyzing assessment:', error);
    return NextResponse.json(
      { error: 'Internal assessment processing error', message: error?.message },
      { status: 500 }
    );
  }
}
