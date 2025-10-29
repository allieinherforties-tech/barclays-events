import { NextResponse } from 'next/server';

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;
const TICKETMASTER_VENUE_ID = process.env.TICKETMASTER_VENUE_ID || 'KovZ917AtP3';

export async function GET() {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?venueId=${TICKETMASTER_VENUE_ID}&apikey=${TICKETMASTER_API_KEY}&size=100&sort=date,asc`,
      { next: { revalidate: 900 } } // Cache for 15 minutes
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Ticketmaster');
    }

    const data = await response.json();
    const events = data._embedded?.events || [];

    return NextResponse.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch events',
        events: []
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
