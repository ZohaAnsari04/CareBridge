import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactName, contactPhone, patientName, urgency, hospitalName, location } = body;

    const dispatchId = 'DISPATCH-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Simulated SMS payload
    const simulatedMessage = `[CAREBRIDGE EMERGENCY ALERT] ${patientName || 'Alex Reynolds'} has initiated an emergency response. Status: ${urgency || 'HIGH'}. Targeted facility: ${hospitalName || 'CareBridge Metro General Hospital'}. Coordination token: ${dispatchId}.`;

    return NextResponse.json({
      success: true,
      dispatchId,
      timestamp,
      recipient: {
        name: contactName || 'Sarah Reynolds',
        phone: contactPhone || '+1 (555) 234-8891'
      },
      simulatedMessage,
      carrierStatus: 'DELIVERED_SIMULATED',
      isPrototype: true
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process notification' }, { status: 500 });
  }
}
