import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_PROFILE, calculateProfileCompleteness } from '@/lib/data/store';
import { UserProfile } from '@/lib/ai/types';

let currentProfile: UserProfile = { ...DEFAULT_PROFILE };

export async function GET() {
  const completeness = calculateProfileCompleteness(currentProfile);
  return NextResponse.json({
    profile: currentProfile,
    completeness
  });
}

export async function PUT(req: NextRequest) {
  try {
    const updates: Partial<UserProfile> = await req.json();
    currentProfile = { ...currentProfile, ...updates };
    const completeness = calculateProfileCompleteness(currentProfile);

    return NextResponse.json({
      success: true,
      profile: currentProfile,
      completeness
    });
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
