import { NextRequest, NextResponse } from 'next/server';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const hospital = DEMO_HOSPITALS.find(h => h.id === params.id);

  if (!hospital) {
    return NextResponse.json({ error: 'Hospital not found' }, { status: 404 });
  }

  return NextResponse.json({
    hospital,
    isPrototypeDataset: true
  });
}
