import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

const TABLE = 'stars_scores';

export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ ...body, createdAt: new Date().toISOString() }])
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PATCH(req: NextRequest) {
  const { id, ...fields } = await req.json();
  const { data, error } = await supabase
    .from(TABLE)
    .update(fields)
    .eq('id', id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
} 