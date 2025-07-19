import { NextRequest, NextResponse } from 'next/server';
import { localStorage } from '@/services/localStorage';

export async function GET() {
  try {
    const data = await localStorage.getTechScores();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : 'Unknown error',
      details: 'GET /api/tech-scores failed'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await localStorage.addTechScore(body);
    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : 'Unknown error',
      details: 'POST /api/tech-scores failed'
    }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...fields } = await req.json();
    const data = await localStorage.updateTechScore(id, fields);
    if (!data) return NextResponse.json({ error: 'Score not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : 'Unknown error',
      details: 'PATCH /api/tech-scores failed'
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const success = await localStorage.deleteTechScore(id);
    if (!success) return NextResponse.json({ error: 'Score not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : 'Unknown error',
      details: 'DELETE /api/tech-scores failed'
    }, { status: 500 });
  }
} 