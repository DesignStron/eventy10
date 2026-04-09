import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GalleryImage } from '@/lib/types'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Gallery GET error:', error)
      return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
    }

    const images = data || []
    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      images
    })
  } catch (error) {
    console.error('Gallery GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📥 Gallery API POST received:', body)
    const { title, url, category } = body

    if (!title?.trim() || !url?.trim() || !category) {
      console.error('❌ Missing required fields:', { title, url, category })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newImage: Omit<GalleryImage, 'id' | 'created_at'> = {
      title: title.trim(),
      url: url.trim(),
      category
    }

    console.log('📤 Inserting into Supabase:', newImage)
    
    const { data, error } = await supabase
      .from('gallery')
      .insert(newImage)
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to add image' }, { status: 500 })
    }

    console.log('✅ Successfully inserted:', data)

    // Return updated gallery
    const { data: images, error: fetchError } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('❌ Fetch error after insert:', fetchError)
    }

    console.log('📥 Returning updated gallery:', { count: images?.length })

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      images: images || []
    })
  } catch (error) {
    console.error('❌ Gallery POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 })
    }

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Gallery DELETE error:', error)
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
    }

    // Return updated gallery
    const { data: images } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      images: images || []
    })
  } catch (error) {
    console.error('Gallery DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
