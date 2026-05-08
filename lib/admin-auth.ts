import { NextRequest, NextResponse } from 'next/server'

// Store authorized IPs in memory (in production, use Redis or database)
const authorizedIPs = new Set<string>()

export function isAdminAuthenticated(request: NextRequest): boolean {
  const clientIP = getClientIP(request)
  
  // Check if IP is already authorized
  if (authorizedIPs.has(clientIP)) {
    return true
  }
  
  // Check session cookie
  const sessionCookie = request.cookies.get('admin-session')
  if (sessionCookie?.value === 'authorized') {
    // Authorize this IP for future requests
    authorizedIPs.add(clientIP)
    return true
  }
  
  return false
}

export function getClientIP(request: NextRequest): string {
  // Try various headers for the real IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP.trim()
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }
  
  // Fallback - can't get IP directly from NextRequest
  return 'unknown'
}

export function createAdminSession() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin-session', 'authorized', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return response
}

export function clearAdminSession() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin-session')
  return response
}

export function verifyCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD
  
  return username === adminUsername && password === adminPassword
}
