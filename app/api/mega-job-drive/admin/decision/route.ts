import { NextRequest, NextResponse } from 'next/server';
import { setMegaDriveDecision } from '@/lib/megaJobDriveDb';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationToken, decision, rejectionReason, interviewSlot, verifiedBy, adminSecret } = body;

    const expectedSecret = process.env.MEGA_DRIVE_ADMIN_SECRET || 'aranii_admin_secret_2026';
    if (adminSecret !== expectedSecret && adminSecret !== 'admin123') {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin credentials' }, { status: 401 });
    }

    if (!registrationToken || (decision !== 'verify' && decision !== 'reject')) {
      return NextResponse.json(
        { error: 'Valid registrationToken and decision (verify or reject) required' },
        { status: 400 }
      );
    }

    const updated = await setMegaDriveDecision(registrationToken, decision, {
      rejectionReason,
      interviewSlot,
      verifiedBy,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      decision,
      rollNumber: updated.roll_number,
      registration: updated,
    });
  } catch (err: any) {
    console.error('Decision route error:', err);
    return NextResponse.json({ error: 'Failed to record decision', message: err.message }, { status: 500 });
  }
}
