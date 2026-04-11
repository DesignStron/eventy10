import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

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
    console.log('Music API: Starting GET request');
    console.log('Music API: Attempting to fetch from music_services table');
    
    const { data, error } = await supabase
      .from('music_services')
      .select('*')
      .order('created_at', { ascending: true })

    console.log('Music API: Supabase response:', { data, error });
    console.log('Music API: Data length:', data?.length || 0);

    if (error) {
      console.error('Music GET error:', error)
      console.error('Music GET error details:', JSON.stringify(error, null, 2));
      return NextResponse.json({ error: 'Failed to fetch music services', details: error }, { status: 500 })
    }

    // Deduplicate by key - keep the latest entry for each key
    const uniqueData = data ? data.reduce((acc: any[], item) => {
      const existingIndex = acc.findIndex(existing => existing.key === item.key);
      if (existingIndex >= 0) {
        // Keep the newer one (by created_at)
        if (new Date(item.created_at) > new Date(acc[existingIndex].created_at)) {
          acc[existingIndex] = item;
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []) : [];

    console.log('Music API: After deduplication:', uniqueData.length, 'unique services');

    const services: MusicService[] = uniqueData.map(item => ({
      key: item.key,
      categoryLabel: item.category_label || item.title,
      title: item.title,
      description: item.description,
      features: item.features || [],
      image: item.image || ''
    }))

    console.log('Music API: Processed services:', services.length);
    console.log('Music API: Services:', services.map(s => ({ key: s.key, title: s.title })));

    // Revalidate cache for public pages
    revalidatePath('/oprawa-muzyczna');
    revalidatePath('/admin/oprawa-muzyczna');
    
    const response = {
      updatedAt: new Date().toISOString(),
      services
    };
    
    console.log('Music API: Returning response:', response);
    return NextResponse.json(response)
  } catch (error) {
    console.error('Music GET catch error:', error)
    console.error('Music GET catch error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: MusicData = await request.json()
    const { services } = body

    if (!services || !Array.isArray(services)) {
      return NextResponse.json({ error: 'Invalid services data' }, { status: 400 })
    }

    // Revalidate cache before updating
    revalidatePath('/oprawa-muzyczna')
    revalidatePath('/admin/oprawa-muzyczna')

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
