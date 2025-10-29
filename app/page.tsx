'use client';
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', padding: '20px'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <header style={{textAlign: 'center', padding: '40px 0'}}>
          <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>🏟️ Barclays Tonight</h1>
          <p style={{fontSize: '1.2rem', opacity: 0.8}}>Your guide to Barclays Center events</p>
        </header>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
          {events.map((event: any) => (
            <div key={event.id} style={{background: 'rgba(255,255,255,0.1)', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)'}}>
              <div style={{height: '200px', backgroundImage: `url(${event.images?.[0]?.url})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
              <div style={{padding: '20px'}}>
                <h3 style={{fontSize: '1.3rem', marginBottom: '10px'}}>{event.name}</h3>
                <p style={{opacity: 0.8, marginBottom: '5px'}}>📅 {format(parseISO(event.dates.start.localDate), 'MMMM d, yyyy')}</p>
                {event.dates.start.localTime && <p style={{opacity: 0.8, marginBottom: '10px'}}>🕐 {event.dates.start.localTime}</p>}
                <a href={event.url} target="_blank" rel="noopener" style={{display: 'block', background: 'white', color: 'black', padding: '12px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', marginTop: '15px'}}>Get Tickets →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
