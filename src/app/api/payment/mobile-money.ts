import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const mobileMoneyRedirectUrl = 'https://example-mobile-money-gateway.com';
  
  // Redirect user to mobile money service
  return NextResponse.redirect(mobileMoneyRedirectUrl);
}
