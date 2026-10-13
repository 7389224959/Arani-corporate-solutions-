import { NextRequest, NextResponse } from 'next/server';
import { createMegaDriveRegistration } from '@/lib/megaJobDriveDb';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      whatsappNumber,
      city,
      state,
      highestQualification,
      passoutYear,
      totalExperience,
      currentCompany,
      currentCtc,
      expectedCtc,
      targetRole,
      preferredLocation,
      resumeUrl,
      paymentUtr,
      paymentScreenshotUrl,
      utm,
    } = body;

    if (!fullName || !email || !phone || !city || !highestQualification || !targetRole) {
      return NextResponse.json(
        { error: 'Missing mandatory registration fields (Name, Email, Phone, City, Qualification, Target Role)' },
        { status: 400 }
      );
    }

    const registration = await createMegaDriveRegistration({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      whatsapp_number: (whatsappNumber || phone).trim(),
      city: city.trim(),
      state: state?.trim() || '',
      highest_qualification: highestQualification,
      passout_year: passoutYear || '',
      total_experience: totalExperience || 'Fresher',
      current_company: currentCompany || '',
      current_ctc: currentCtc || '',
      expected_ctc: expectedCtc || '',
      target_role: targetRole,
      preferred_location: preferredLocation || city,
      resume_url: resumeUrl || '',
      payment_utr: paymentUtr || null,
      payment_screenshot_url: paymentScreenshotUrl || null,
      utm_source: utm?.utm_source || 'direct',
      utm_medium: utm?.utm_medium || '',
      utm_campaign: utm?.utm_campaign || '',
      utm_content: utm?.utm_content || '',
      utm_term: utm?.utm_term || '',
      fee_amount: Number(process.env.NEXT_PUBLIC_MEGA_DRIVE_FEE) || 499,
    });

    return NextResponse.json({
      success: true,
      registrationToken: registration.registration_token,
      feeAmount: registration.fee_amount,
      upiId: process.env.NEXT_PUBLIC_MEGA_DRIVE_UPI_ID || 'aranii@icici',
      upiName: process.env.NEXT_PUBLIC_MEGA_DRIVE_UPI_NAME || 'Aranii Corporate Solutions',
      registration,
    });
  } catch (err: any) {
    console.error('Registration API Error:', err);
    return NextResponse.json(
      { error: 'Failed to process candidate registration', message: err.message },
      { status: 500 }
    );
  }
}
