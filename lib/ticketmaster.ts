import axios from 'axios';

const API_BASE = 'https://app.ticketmaster.com/discovery/v2';

export async function getBarclaysEvents() {
  try {
    const response = await axios.get(`${API_BASE}/events.json`, {
      params: {
        venueId: process.env.TICKETMASTER_VENUE_ID || 'KovZpZAJ6nlA',
        apikey: process.env.TICKETMASTER_API_KEY,
        size: 100,
        sort: 'date,asc'
      }
    });
    return response.data._embedded?.events || [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}
