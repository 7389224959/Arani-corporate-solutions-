import { NextRequest, NextResponse } from 'next/server';
import { updateMegaDrivePayment } from '@/lib/megaJobDriveDb';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationToken, paymentUtr, paymentScreenshotUrl } = body;

    if (!registrationToken) {
      return NextResponse.json({ error: 'registrationToken is required' }, { status: 400 });
    }

    if (!paymentUtr || paymentUtr.trim().length < 6) {
      return NextResponse.json(
        { error: 'Valid 12-digit UPI Reference / UTR Number is required for verification' },
        { status: 400 }
      );
    }

    const updated = await updateMegaDrivePayment(
      registrationToken.trim(),
      paymentUtr.trim(),
      paymentScreenshotUrl
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Registration record not found for this token' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment proof submitted successfully. Your admit card is being generated upon verification.',
      registration: updated,
    });
  } catch (err: any) {
    console.error('Payment Proof Error:', err);
    return NextResponse.json(
      { error: 'Failed to submit payment proof', message: err.message },
      { status: 500 }
    );
  }
}
