import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ContactData, ContactMessage } from '@/lib/types'
import { sendEmail, createContactEmailHTML } from '@/lib/email'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contact')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Contact GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: 500 })
    }

    const messages: ContactMessage[] = (data || []).map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      message: item.message,
      created_at: item.created_at
    }))

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      messages
    })
  } catch (error) {
    console.error('Contact GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

type ContactCreatePayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ContactCreatePayload

    if (!payload?.name || !payload?.email || !payload?.message) {
      return NextResponse.json(
        { error: "Uzupełnij wymagane pola: imię, email, wiadomość." },
        { status: 400 },
      );
    }

    const newMessage: Omit<ContactMessage, 'id' | 'created_at'> = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? "",
      message: payload.message
    }

    const { data, error } = await supabase
      .from('contact')
      .insert(newMessage)
      .select()
      .single()

    if (error) {
      console.error('Contact POST error:', error)
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
    }

    // Send email notification
    try {
      const gmailEmail = process.env.GMAIL_EMAIL
      const contactEmail = process.env.CONTACT_EMAIL
      if (gmailEmail && contactEmail && gmailEmail !== 'your_email@gmail.com') {
        const emailHTML = createContactEmailHTML({
          name: payload.name,
          email: payload.email,
          phone: payload.phone || '',
          message: payload.message
        })

        const emailSent = await sendEmail({
          to: contactEmail,
          subject: `📬 Nowa wiadomość z formularza - ${payload.name}`,
          html: emailHTML,
          text: `Nowa wiadomość od ${payload.name} (${payload.email}):\n\n${payload.message}`
        })

        if (emailSent) {
          console.log('Email notification sent successfully')
        } else {
          console.error('Failed to send email notification')
        }
      } else {
        console.log('Gmail email not configured, skipping email notification')
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      ok: true,
      message: data
    })
  } catch (error) {
    console.error('Contact POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
