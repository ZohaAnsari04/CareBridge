import { NextRequest, NextResponse } from 'next/server';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const maxDistance = searchParams.get('maxDistance');

  let list = [...DEMO_HOSPITALS];

  if (type) {
    list = list.filter(h => h.type.toLowerCase().includes(type.toLowerCase()));
  }

  if (maxDistance) {
    const max = parseFloat(maxDistance);
    if (!isNaN(max)) {
      list = list.filter(h => h.distanceKm <= max);
    }
  }

  // Sort by closest distance by default
  list.sort((a, b) => a.distanceKm - b.distanceKm);

  return NextResponse.json({
    hospitals: list,
    total: list.length,
    isPrototypeDataset: true
  });
}
