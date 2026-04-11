import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Site settings GET error:', error);
      return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
    }

    // Convert to key-value object
    const settings: Record<string, string> = {};
    (data || []).forEach(item => {
      settings[item.key] = item.value;
    });

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      settings
    });
  } catch (error) {
    console.error('Site settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.key || !body.value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        key: body.key,
        value: body.value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
      .select()
      .single();

    if (error) {
      console.error('Site settings POST error:', error);
      return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      setting: data
    });
  } catch (error) {
    console.error('Site settings POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
