'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, isThisWeek, isThisMonth, startOfDay } from 'date-fns';

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
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        const relevantEvents = (data.events || []).filter((e: Event) => {
          const eventDate = startOfDay(parseISO(e.dates.start.localDate));
          const today = startOfDay(new Date());
          return eventDate >= today;
        });
        
        const uniqueEvents = relevantEvents.reduce((acc: Event[], event: Event) => {
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setEmailSubmitted(true);
        setEmail('');
        setTimeout(() => setEmailSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const todayDateString = format(new Date(), 'yyyy-MM-dd');
  const todayEvents = events.filter(e => e.dates.start.localDate === todayDateString);
  
  const allWeekEventIds = new Set(
    events
      .filter(e => isThisWeek(parseISO(e.dates.start.localDate)))
      .map(e => e.id)
  );
  
  const weekEvents = events.filter(e => 
    isThisWeek(parseISO(e.dates.start.localDate)) && 
    e.dates.start.localDate !== todayDateString
  );
  
  const monthEvents = events.filter(e => {
    const eventDate = parseISO(e.dates.start.localDate);
    return isThisMonth(eventDate) && 
           !allWeekEventIds.has(e.id) && 
           e.dates.start.localDate !== todayDateString;
  });
  
  const futureEvents = events.filter(e => !isThisMonth(parseISO(e.dates.start.localDate)));

  const nextEvent = events[0];
  const heroEvents = todayEvents.length > 0 ? todayEvents : (nextEvent ? [nextEvent] : []);
  
  // Updated: Show "Why you can't find parking on [Date]" all on one line
  const todayFormatted = format(new Date(), 'EEEE, MMMM d');
  const heroTitle = todayEvents.length > 0 
    ? `Why you can't find parking on ${todayFormatted}` 
    : 'Next at Barclays';
  const heroSubtitle = todayEvents.length > 0 
    ? '' 
    : (nextEvent 
        ? `${format(parseISO(nextEvent.dates.start.localDate), 'EEEE, MMMM d')}` 
        : "It's not a Barclays crowd making it hard to park tonight");

  const getImage = (event: Event) => event.images?.[0]?.url || 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80';

  if (loading) {
    return (
      <div style={{minHeight: '100vh', background: '#FFF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: '48px', height: '48px', border: '3px solid #E8D5E8', borderTop: '3px solid #6B2D5C', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px'}}></div>
          <p style={{color: '#5a5a5a', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif'}}>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#FFF8F0', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .event-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .event-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
      `}</style>

      <header style={{background: '#6B2D5C', borderBottom: '1px solid #6B2D5C', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '24px 20px'}}>
          <h1 style={{fontSize: '32px', fontWeight: '600', color: 'white', marginBottom: '4px', letterSpacing: '-0.5px'}}>Barclays Tonight</h1>
          <p style={{color: '#FFF8F0', fontSize: '15px', marginBottom: '12px'}}>The lowdown on what 15,000+ people are up to</p>
          
          {/* Live Event Counter */}
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px'}}>
            <div style={{width: '8px', height: '8px', background: '#B4E7CE', borderRadius: '50%', animation: 'pulse 2s infinite', boxShadow: '0 0 8px #B4E7CE'}}></div>
            <span style={{color: 'white', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>LIVE</span>
            <span style={{color: '#FFF8F0'}}>
              {events.length} events this month · {events.filter(e => isThisWeek(parseISO(e.dates.start.localDate))).length} this week
            </span>
          </div>
        </div>
      </header>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        
        {heroEvents.length > 0 && (
          <section style={{marginBottom: '64px'}}>
            {/* UPDATED: Removed pulsing dot, single line title */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(107, 45, 92, 0.85) 0%, rgba(255, 107, 157, 0.75) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px', 
              padding: '48px', 
              marginBottom: '32px', 
              boxShadow: '0 8px 24px rgba(107,45,92,0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{fontSize: '36px', fontWeight: '700', color: 'white', margin: 0, letterSpacing: '-0.5px', marginBottom: heroSubtitle ? '16px' : 0}}>
                {heroTitle}
              </h2>
              {heroSubtitle && (
                <p style={{color: 'rgba(255,255,255,0.95)', fontSize: '18px', margin: 0}}>{heroSubtitle}</p>
              )}
            </div>

            <div style={{display: 'grid', gridTemplateColumns: heroEvents.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px'}}>
              {heroEvents.map(event => (
                <div key={event.id} className="event-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #FF6B9D'}}>
                  <div style={{height: '320px', backgroundImage: `url(${getImage(event)})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
                    <div style={{position: 'absolute', top: '20px', right: '20px', background: '#FF6B9D', color: 'white', padding: '10px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'}}>
                      {todayEvents.length > 0 ? 'TONIGHT' : format(parseISO(event.dates.start.localDate), 'MMM d').toUpperCase()}
                    </div>
                  </div>
                  <div style={{padding: '32px'}}>
                    <div style={{display: 'inline-block', background: '#E8D5E8', color: '#6B2D5C', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {event.classifications?.[0]?.segment?.name || 'Event'}
                    </div>
                    <h3 style={{fontSize: '26px', fontWeight: '700', color: '#2d2d2d', marginBottom: '16px', lineHeight: '1.2'}}>{event.name}</h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', color: '#7a7a7a', fontSize: '15px'}}>
                      {event.dates.start.localTime && <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><span style={{fontSize: '18px'}}>🕐</span> <strong>{event.dates.start.localTime}</strong></div>}
                      {event.priceRanges?.[0] && <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><span style={{fontSize: '18px'}}>💵</span> ${event.priceRanges[0].min} - ${event.priceRanges[0].max}</div>}
                    </div>
                    <a href={event.url} target="_blank" rel="noopener" style={{display: 'block', background: '#FF6B9D', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: '700', fontSize: '16px', boxShadow: '0 4px 12px rgba(255,107,157,0.3)'}}>Get Tickets →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{marginBottom: '64px'}}>
          <div style={{background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', border: '2px solid #E8D5E8'}}>
            <div style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
              <h3 style={{fontSize: '24px', fontWeight: '700', color: '#2d2d2d', marginBottom: '12px'}}>Never Miss an Event</h3>
              <p style={{color: '#7a7a7a', fontSize: '16px', marginBottom: '24px'}}>Get weekly updates on upcoming shows, concerts, and games at Barclays Center</p>
              
              {!emailSubmitted ? (
                <form onSubmit={handleEmailSubmit} style={{display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap'}}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={submitting}
                    style={{flex: 1, minWidth: '250px', padding: '14px 20px', borderRadius: '10px', border: '2px solid #E8D5E8', fontSize: '15px', fontFamily: 'system-ui, -apple-system, sans-serif', outline: 'none'}}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{padding: '14px 32px', background: submitting ? '#b8b8b8' : '#6B2D5C', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif'}}
                  >
                    {submitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              ) : (
                <div style={{padding: '16px', background: '#f0f7f4', borderRadius: '10px', color: '#6B2D5C', fontWeight: '600'}}>
                  ✓ Thanks! We'll keep you updated.
                </div>
              )}
            </div>
          </div>
        </section>

        {weekEvents.filter(e => !heroEvents.some(h => h.id === e.id)).length > 0 && (
          <section style={{marginBottom: '64px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '8px', height: '8px', background: '#6B2D5C', borderRadius: '50%'}}></div>
              <h2 style={{fontSize: '24px', fontWeight: '600', color: '#2d2d2d', margin: 0}}>This Week</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px'}}>
              {weekEvents.filter(e => !heroEvents.some(h => h.id === e.id)).slice(0, 6).map(event => (
                <div key={event.id} className="event-card" style={{background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'}}>
                  <div style={{height: '180px', backgroundImage: `url(${getImage(event)})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div style={{padding: '20px'}}>
                    <div style={{fontSize: '12px', color: '#6B2D5C', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {format(parseISO(event.dates.start.localDate), 'EEE, MMM d')}
                    </div>
                    <h3 style={{fontSize: '17px', fontWeight: '600', color: '#2d2d2d', marginBottom: '12px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{event.name}</h3>
                    <a href={event.url} target="_blank" rel="noopener" style={{display: 'inline-block', color: '#FF6B9D', fontSize: '14px', fontWeight: '600', textDecoration: 'none', borderBottom: '2px solid #FF6B9D', paddingBottom: '2px'}}>View Details →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {monthEvents.length > 0 && (
          <section style={{marginBottom: '64px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'}}>
              <div style={{width: '8px', height: '8px', background: '#FF6B9D', borderRadius: '50%'}}></div>
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
                  <a href={event.url} target="_blank" rel="noopener" style={{padding: '10px 20px', background: '#E8D5E8', color: '#6B2D5C', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap'}}>Tickets</a>
                </div>
              ))}
            </div>
          </section>
        )}

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
                    <a href={event.url} target="_blank" rel="noopener" style={{fontSize: '13px', color: '#FF6B9D', fontWeight: '600', textDecoration: 'none'}}>Details →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <footer style={{background: 'white', borderTop: '1px solid #E8D5E8', marginTop: '80px', padding: '32px 20px', textAlign: 'center'}}>
        <p style={{color: '#b8b8b8', fontSize: '13px', margin: 0}}>Independent guide to Barclays Center events • Not affiliated with Barclays Center</p>
        <p style={{color: '#d4d4d4', fontSize: '12px', marginTop: '8px'}}>Event data provided by Ticketmaster</p>
      </footer>
    </div>
  );
}
