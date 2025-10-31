'use client';
import { useState, useEffect } from 'react';
import { format, parseISO, isToday, isThisWeek, isThisMonth, isFuture, startOfDay } from 'date-fns';

interface Event {
  id: string;
  name: string;
  dates: { start: { localDate: string; localTime?: string; }; };
  classifications?: Array<{ segment: { name: string }; }>;
  images: Array<{ url: string }>;
  priceRanges?: Array<{ min: number; max: number; }>;
  url: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        const futureEvents = (data.events || []).filter((e: Event) => 
          isFuture(startOfDay(parseISO(e.dates.start.localDate)))
        );
        
        const uniqueEvents = futureEvents.reduce((acc: Event[], event: Event) => {
          const key = `${event.name.toLowerCase().trim()}-${event.dates.start.localDate}`;
          const exists = acc.some(e => 
            `${e.name.toLowerCase().trim()}-${e.dates.start.localDate}` === key
          );
          if (!exists) {
            acc.push(event);
          }
          return acc;
        }, []);
        
        setEvents(uniqueEvents);
        setLoading(false);
      });
  }, []);

  const todayEvents = events.filter(e => isToday(parseISO(e.dates.start.localDate)));
  const weekEvents = events.filter(e => isThisWeek(parseISO(e.dates.start.localDate)) && !isToday(parseISO(e.dates.start.localDate)));
  // Fixed: Only show month events that are NOT in this week at all
  const monthEvents = events.filter(e => 
    isThisMonth(parseISO(e.dates.start.localDate)) && 
    !isThisWeek(parseISO(e.dates.start.localDate)) &&
    !isToday(parseISO(e.dates.start.localDate))
  );
  const futureEvents = events.filter(e => !isThisMonth(parseISO(e.dates.start.localDate)));

  const getImage = (event: Event) => event.images?.[0]?.url || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80';

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#faf9f7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: '48px', height: '48px', border: '3px solid #e8e6e1', borderTop: '3px solid #7a9b8e', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px'}}></div>
          <p style={{color: '#5a5a7a', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif'}}>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#faf9f7', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .event-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .event-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
      `}</style>

      {/* Header */}
      <header style={{background: 'white', borderBottom: '1px solid #e8e6e1', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '24px 20px'}}>
          <h1 style={{fontSize: '32px', fontWeight: '600', color: '#2d2d2d', marginBottom: '4px', letterSpacing: '-0.5px'}}>Barclays Tonight</h1>
          <p style={{color: '#7a7a7a', fontSize: '15px'}}>Brooklyn's premier events destination</p>
        </div>
      </header>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        
        {/* TONIGHT HERO - Full Width */}
        {todayEvents.length > 0 && (
          <section style={{marginBottom: '64px'}}>
            <div style={{background: 'linear-gradient(135deg, #c87d5c 0%, #d4a574 100%)', borderRadius: '20px', padding: '48px', marginBottom: '32px', boxShadow: '0 8px 24px rgba(200,125,92,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                <div style={{width: '12px', height: '12px', background: 'white', borderRadius: '50%', animation: 'pulse 2s infinite'}}></div>
                <h2 style={{fontSize: '36px', fontWeight: '700', color: 'white', margin: 0, letterSpacing: '-0.5px'}}>Tonight at Barclays</h2>
              </div>
              <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '18px', margin: 0}}>Happening right now in Brooklyn</p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: todayEvents.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px'}}>
              {todayEvents.map(event => (
                <div key={event.id} className="event-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #c87d5c'}}>
                  <div style={{height: '320px', backgroundImage: `url(${getImage(event)})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
                    <div style={{position: 'absolute', top: '20px', right: '20px', background: '#c87d5c', color: 'white', padding: '10px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'}}>TONIGHT</div>
                  </div>
                  <div style={{padding: '32px'}}>
                    <div style={{display: 'inline-block', background: '#fef3ef', color: '#c87d5c', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {event.classifications?.[0]?.segment?.name || 'Event'}
                    </div>
                    <h3 style={{fontSize: '26px', fontWeight: '700', color: '#2d2d2d', marginBottom: '16px', lineHeight: '1.2'}}>{event.name}</h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', color: '#7a7a7a', fontSize: '15px'}}>
                      {event.dates.start.localTime && <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><span style={{fontSize: '18px'}}>🕐</span> <strong>{event.dates.start.localTime}</strong></div>}
                      {event.priceRanges?.[0] && <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><span style={{fontSize: '18px'}}>💵</span> ${event.priceRanges[0].min} - ${event.priceRanges[0].max}</div>}
                    </div>
                    <a href={event.url} target="_blank" rel="noopener" style={{display: 'block', background: '#c87d5c', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: '700', fontSize: '16px', boxShadow: '0 4px 12px rgba(200,125,92,0.3)'}}>Get Tickets →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* THIS WEEK */}
        {weekEvents.length > 0 && (
          <section style={{marginBottom: '64px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '8px', height: '8px', background: '#7a9b8e', borderRadius: '50%'}}></div>
              <h2 style={{fontSize: '24px', fontWeight: '600', color: '#2d2d2d', margin: 0}}>This Week</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}}>
              {weekEvents.slice(0, 6).map(event => (
                <div key={event.id} className="event-card" style={{background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
                  <div style={{height: '180px', backgroundImage: `url(${getImage(event)})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div style={{padding: '20px'}}>
                    <div style={{fontSize: '12px', color: '#7a9b8e', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {format(parseISO(event.dates.start.localDate), 'EEE, MMM d')}
                    </div>
                    <h3 style={{fontSize: '17px', fontWeight: '600', color: '#2d2d2d', marginBottom: '12px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{event.name}</h3>
                    <a href={event.url} target="_blank" rel="noopener" style={{display: 'inline-block', color: '#7a9b8e', fontSize: '14px', fontWeight: '600', textDecoration: 'none', borderBottom: '2px solid #7a9b8e', paddingBottom: '2px'}}>View Details →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* THIS MONTH */}
        {monthEvents.length > 0 && (
          <section style={{marginBottom: '64px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '8px', height: '8px', background: '#d4a574', borderRadius: '50%'}}></div>
              <h2 style={{fontSize: '24px', fontWeight: '600', color: '#2d2d2d', margin: 0}}>This Month</h2>
            </div>
            <div style={{background: 'white', borderRadius: '14px', padding: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
              {monthEvents.slice(0, 10).map(event => (
                <div key={event.id} style={{padding: '16px', borderBottom: '1px solid #f4f3f1', display: 'flex', gap: '16px', alignItems: 'center'}}>
                  <div style={{minWidth: '80px', textAlign: 'center'}}>
                    <div style={{fontSize: '28px', fontWeight: '700', color: '#2d2d2d', lineHeight: '1'}}>{format(parseISO(event.dates.start.localDate), 'd')}</div>
                    <div style={{fontSize: '12px', color: '#7a7a7a', fontWeight: '600', textTransform: 'uppercase', marginTop: '4px'}}>{format(parseISO(event.dates.start.localDate), 'MMM')}</div>
                  </div>
                  <div style={{flex: 1}}>
                    <h4 style={{fontSize: '16px', fontWeight: '600', color: '#2d2d2d', marginBottom: '4px'}}>{event.name}</h4>
                    <p style={{fontSize: '13px', color: '#7a7a7a', margin: 0}}>{event.dates.start.localTime || 'See event for time'}</p>
                  </div>
                  <a href={event.url} target="_blank" rel="noopener" style={{padding: '10px 20px', background: '#f4f3f1', color: '#2d2d2d', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap'}}>Tickets</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ALL UPCOMING */}
        {futureEvents.length > 0 && (
          <section>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '8px', height: '8px', background: '#b8b8b8', borderRadius: '50%'}}></div>
              <h2 style={{fontSize: '24px', fontWeight: '600', color: '#2d2d2d', margin: 0}}>All Upcoming Events</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px'}}>
              {futureEvents.map(event => (
                <div key={event.id} className="event-card" style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.05)'}}>
                  <div style={{height: '140px', backgroundImage: `url(${getImage(event)})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div style={{padding: '16px'}}>
                    <div style={{fontSize: '11px', color: '#7a7a7a', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {format(parseISO(event.dates.start.localDate), 'MMM d, yyyy')}
                    </div>
                    <h4 style={{fontSize: '15px', fontWeight: '600', color: '#2d2d2d', marginBottom: '10px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{event.name}</h4>
                    <a href={event.url} target="_blank" rel="noopener" style={{fontSize: '13px', color: '#7a9b8e', fontWeight: '600', textDecoration: 'none'}}>Details →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer style={{background: 'white', borderTop: '1px solid #e8e6e1', marginTop: '80px', padding: '32px 20px', textAlign: 'center'}}>
        <p style={{color: '#b8b8b8', fontSize: '13px', margin: 0}}>Independent guide to Barclays Center events • Not affiliated with Barclays Center</p>
        <p style={{color: '#d4d4d4', fontSize: '12px', marginTop: '8px'}}>Event data provided by Ticketmaster</p>
      </footer>
    </div>
  );
}
