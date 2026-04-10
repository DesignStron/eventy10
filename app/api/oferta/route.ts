import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { OfferData, OfferSection } from '@/lib/types'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('offer')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Offer GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch offer' }, { status: 500 })
    }

    const sections: OfferSection[] = (data || []).map(item => ({
      key: item.key,
      keyLabel: item.key_label || item.title,
      title: item.title,
      description: item.description,
      price: item.price,
      bullets: item.bullets || [],
      images: item.images || []
    }))

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      sections
    })
  } catch (error) {
    console.error('Offer GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: OfferData = await request.json()
    const { sections } = body

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json({ error: 'Invalid sections data' }, { status: 400 })
    }

    // Clear existing data
    const { error: deleteError } = await supabase
      .from('offer')
      .delete()
      .neq('id', 0) // Delete all records

    if (deleteError) {
      console.error('Offer DELETE error:', deleteError)
      return NextResponse.json({ error: 'Failed to clear offer data' }, { status: 500 })
    }

    // Insert new data
    const offerData = sections.map(section => ({
      key: section.key,
      key_label: section.keyLabel,
      title: section.title,
      description: section.description,
      price: section.price,
      bullets: section.bullets,
      images: section.images || []
    }))

    const { error: insertError } = await supabase
      .from('offer')
      .insert(offerData)

    if (insertError) {
      console.error('Offer INSERT error:', insertError)
      return NextResponse.json({ error: 'Failed to save offer data' }, { status: 500 })
    }

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      sections
    })
  } catch (error) {
    console.error('Offer PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
