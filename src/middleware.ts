import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow NextAuth API routes and static assets
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'academic-planner-super-secret-production-key-2026',
  });

  const isLoginPage = pathname === '/login';

  // If user is logged in and visits login page, redirect to home dashboard
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is not logged in and tries to access any protected route, redirect to login
  if (!token && !isLoginPage) {
    const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protect all application routes except static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
