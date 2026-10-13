import { NextRequest, NextResponse } from 'next/server';
import { getMegaDriveRegistration } from '@/lib/megaJobDriveDb';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const registration = await getMegaDriveRegistration(token);

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      registration,
    });
  } catch (err: any) {
    console.error('Fetch registration error:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve registration', message: err.message },
      { status: 500 }
    );
  }
}
