import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Generate a verification token
    // 2. Store it in the database with expiration
    // 3. Send an email with the verification link
    // 4. Handle the verification when user clicks the link

    // For demo purposes, we'll simulate email sending
    console.log(`Verification email sent to: ${email}`);
    
    // Simulate email service (SendGrid, etc.)
    const emailSent = await simulateEmailSending(email);
    
    if (emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Verification email sent successfully',
        email: email
      });
    } else {
      return NextResponse.json({ 
        error: 'Failed to send verification email' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// Simulate email sending service
async function simulateEmailSending(email) {
  // In a real application, this would integrate with SendGrid, Mailchimp, etc.
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📧 Email sent to ${email} with verification link`);
      resolve(true);
    }, 1000);
  });
}
