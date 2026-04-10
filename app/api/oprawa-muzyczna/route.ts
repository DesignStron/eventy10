import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type MusicService = {
  key: string;
  categoryLabel: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

type MusicData = {
  updatedAt: string;
  services: MusicService[];
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('music_services')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Music GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch music services' }, { status: 500 })
    }

    const services: MusicService[] = (data || []).map(item => ({
      key: item.key,
      categoryLabel: item.category_label || item.title,
      title: item.title,
      description: item.description,
      features: item.features || [],
      image: item.image || ''
    }))

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      services
    })
  } catch (error) {
    console.error('Music GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: MusicData = await request.json()
    const { services } = body

    if (!services || !Array.isArray(services)) {
      return NextResponse.json({ error: 'Invalid services data' }, { status: 400 })
    }

    // Clear existing data
    const { error: deleteError } = await supabase
      .from('music_services')
      .delete()
      .neq('key', 'impossible-key-that-does-not-exist')

    if (deleteError) {
      console.error('Music DELETE error:', deleteError)
      return NextResponse.json({ error: 'Failed to clear music data' }, { status: 500 })
    }

    // Insert new data
    const musicData = services.map(service => ({
      key: service.key,
      category_label: service.categoryLabel,
      title: service.title,
      description: service.description,
      features: service.features,
      image: service.image || ''
    }))

    const { error: insertError } = await supabase
      .from('music_services')
      .insert(musicData)

    if (insertError) {
      console.error('Music INSERT error:', insertError)
      return NextResponse.json({ error: 'Failed to save music data' }, { status: 500 })
    }

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      services
    })
  } catch (error) {
    console.error('Music PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
