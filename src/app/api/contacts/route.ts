import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_PROFILE } from '@/lib/data/store';
import { EmergencyContact } from '@/lib/ai/types';

let currentContacts: EmergencyContact[] = [...DEFAULT_PROFILE.contacts];

export async function GET() {
  return NextResponse.json({
    contacts: currentContacts
  });
}

export async function POST(req: NextRequest) {
  try {
    const newContact: Omit<EmergencyContact, 'id'> = await req.json();
    const contact: EmergencyContact = {
      ...newContact,
      id: 'c-' + Date.now()
    };
    currentContacts.push(contact);

    return NextResponse.json({
      success: true,
      contact
    });
  } catch {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
