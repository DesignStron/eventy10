import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check authentication
    if (!isAdminAuthenticated(request)) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
