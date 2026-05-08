import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createAdminSession } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Wymagana nazwa użytkownika i hasło' },
        { status: 400 }
      )
    }

    if (verifyCredentials(username, password)) {
      return createAdminSession()
    } else {
      return NextResponse.json(
        { error: 'Nieprawidłowa nazwa użytkownika lub hasło' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    )
  }
}
