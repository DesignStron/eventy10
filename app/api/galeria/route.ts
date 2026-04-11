import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { GalleryData, GalleryImage } from "@/lib/types";

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

    const images: GalleryImage[] = (data || []).map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      category: item.category,
      created_at: item.created_at
    }))

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      images
    })
  } catch (error) {
    console.error('Gallery GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Omit<GalleryImage, "id" | "createdAt">;

    // Pobierz wszystkie kategorie z oferty
    const { data: ofertaData } = await supabase
      .from('offer')
      .select('key')
      .order('created_at', { ascending: true });
    
    const offerCategories = ofertaData?.map(item => item.key) || [];
    
    // Dozwolone kategorie (oferta + "inne")
    const allowedCategories = [...offerCategories, 'inne'];
    
    // Fallback do "inne" jesli kategoria nie jest dozwolona
    const validCategory = allowedCategories.includes(payload.category) 
      ? payload.category 
      : 'inne';

    const { data, error } = await supabase
      .from('gallery')
      .insert({
        title: payload.title,
        url: payload.url,
        category: validCategory
      })
      .select()
      .single()

    if (error) {
      console.error('Gallery POST error:', error)
      return NextResponse.json({ error: 'Failed to add image' }, { status: 500 })
    }

    const newImage: GalleryImage = {
      id: data.id,
      title: data.title,
      url: data.url,
      category: data.category,
      created_at: data.created_at
    }

    // Return updated gallery data
    const { data: allData } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    const images: GalleryImage[] = (allData || []).map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      category: item.category,
      created_at: item.created_at
    }))

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      images
    })
  } catch (error) {
    console.error('Gallery POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Brak parametru id" }, { status: 400 });
    }

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Gallery DELETE error:', error)
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
    }

    // Return updated gallery data
    const { data: allData } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    const images: GalleryImage[] = (allData || []).map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      category: item.category,
      created_at: item.created_at
    }))

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      images
    })
  } catch (error) {
    console.error('Gallery DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
