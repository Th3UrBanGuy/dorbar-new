import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('dorbar_auth')?.value;
  let isAuthenticated = false;

  // If token exists, cryptographically verify it
  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      isAuthenticated = true;
    }
  }

  // Paths that require authentication
  const protectedPaths = ['/dashboard', '/tasbih'];
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // If user is trying to access a protected route and is not authenticated/has invalid token
  if (isProtectedPath && !isAuthenticated) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    if (token) {
      // Clear the invalid token to prevent a redirect loop
      response.cookies.delete('dorbar_auth'); 
    }
    return response;
  }

  // If authenticated user tries to access /login, redirect to /dashboard
  if (request.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware globally, except to purely static and API paths
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
  ],
};
