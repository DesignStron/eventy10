import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.nextUrl.hostname
  const protocol = request.nextUrl.protocol

  // SEO: Redirect non-www to www and HTTP to HTTPS
  const url = request.nextUrl.clone()
  
  // Force HTTPS
  if (protocol === 'http:') {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }
  
  // Force www
  if (!hostname.startsWith('www.')) {
    url.hostname = 'www.' + hostname
    return NextResponse.redirect(url, 301)
  }

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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
