import { NextRequest, NextResponse } from "next/server"

/**
 * Simplified middleware - no region selection or ecommerce features
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg|.*\\.webp).*)",
  ],
}
