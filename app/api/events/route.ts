import { NextResponse } from 'next/server';
import { getBarclaysEvents } from '@/lib/ticketmaster';

export async function GET() {
  const events = await getBarclaysEvents();
  return NextResponse.json({ success: true, events });
}

export const revalidate = 900;
