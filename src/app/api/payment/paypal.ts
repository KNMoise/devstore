import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const paypalRedirectUrl = 'https://paypal.com/checkout';
  
  // Redirect user to PayPal
  return NextResponse.redirect(paypalRedirectUrl);
}
