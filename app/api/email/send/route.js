import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  try {
    const { to, templateId, dynamicTemplateData } = await request.json();

    if (!to || !templateId) {
      return NextResponse.json(
        { error: 'Missing required fields: to, templateId' },
        { status: 400 }
      );
    }

    const msg = {
      to,
      from: {
        email: 'noreply@smartstake.com',
        name: 'SmartStake'
      },
      templateId,
      dynamicTemplateData
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Simple email sending without templates
export async function PUT(request) {
  try {
    const { to, subject, html, text } = await request.json();

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const msg = {
      to,
      from: {
        email: 'noreply@smartstake.com',
        name: 'SmartStake'
      },
      subject,
      html,
      text
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
