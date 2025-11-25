'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, isThisMonth, isThisWeek, parseISO, startOfDay } from 'date-fns';

type EventClassification = {
  segment?: {
    name?: string;
  };
};

type EventImage = {
  url: string;
};

type PriceRange = {
  min: number;
  max: number;
};

interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  classifications?: EventClassification[];
  images?: EventImage[];
  priceRanges?: PriceRange[];
  url: string;
}

type EventsResponse = {
  events?: Event[];
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch events from API
  useEffect(() => {
    let cancelled = false;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const res = await fetch('/api/events', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Failed to load events (status ${res.status})`);
        }

        const data: EventsResponse = await res.json();
        const rawEvents = data?.events ?? [];

        const today = startOfDay(new Date());

        // Only future (or today) events
        const relevantEvents = rawEvents.filter((e) => {
          const dateStr = e?.dates?.start?.localDate;
          if (!dateStr) return false;
          const eventDate = startOfDay(parseISO(dateStr));
          return eventDate >= today;
        });

        // De‑duplicate by name + date
        const uniqueEvents = relevantEvents.reduce<Event[]>((acc, event) => {
          const key = `${event.name.toLowerCase().trim()}-${event.dates.start.localDate}`;
          const exists = acc.some(
            (existing) =>
              `${existing.name.toLowerCase().trim()}-${existing.dates.start.localDate}` === key,
          );
          if (!exists) acc.push(event);
          return acc;
        }, []);

        if (!cancelled) {
          setEvents(uniqueEvents);
        }
      } catch (err: any) {
        if (!cancelled) {
          setFetchError(err?.message || 'Failed to load events');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setEmailSubmitted(false);
    setEmailError(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || 'Subscription failed');
      }

      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    } catch (err: any) {
      setEmailError(err?.message || 'Subscription failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const todayDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const todayFormatted = useMemo(() => format(new Date(), 'EEEE, MMMM d'), []);

  // Assume events with no time are evening
  const isNighttimeEvent = (event: Event) => {
    const timeStr = event.dates.start.localTime;
    if (!timeStr) return true;
    const [hours] = timeStr.split(':').map(Number);
    return hours >= 12;
  };

  const getImageUrl = (event: Event) =>
    event.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80&auto=format';

  const eventsThisWeekIds = useMemo(
    () =>
      new Set(
        events
          .filter((e) => {
            if (!e.dates?.start?.localDate) return false;
            return isThisWeek(parseISO(e.dates.start.localDate));
          })
          .map((e) => e.id),
      ),
    [events],
  );

  const todayEvents = useMemo(
    () => events.filter((e) => e.dates.start.localDate === todayDate && isNighttimeEvent(e)),
    [events, todayDate],
  );

  const weekEvents = useMemo(
    () =>
      events.filter(
        (e) =>
          isThisWeek(parseISO(e.dates.start.localDate)) &&
          e.dates.start.localDate !== todayDate &&
          !todayEvents.some((t) => t.id === e.id),
      ),
    [events, todayDate, todayEvents],
  );

  const monthEvents = useMemo(
    () =>
      events.filter((e) => {
        const eventDate = parseISO(e.dates.start.localDate);
        return (
          isThisMonth(eventDate) &&
          !eventsThisWeekIds.has(e.id) &&
          e.dates.start.localDate !== todayDate
        );
      }),
    [events, todayDate, eventsThisWeekIds],
  );

  const futureEvents = useMemo(
    () => events.filter((e) => !isThisMonth(parseISO(e.dates.start.localDate))),
    [events],
  );

  const nextEvent = events[0];
  const heroEvents = todayEvents.length > 0 ? todayEvents : nextEvent ? [nextEvent] : [];

  const isTonight = todayEvents.length > 0;

  const heroHeading = isTonight ? 'Tonight at Barclays' : 'Next at Barclays';
  const heroTitle = isTonight
    ? `Why you can't find parking on ${todayFormatted}`
    : heroHeading;
  const heroSubtitle = isTonight
    ? ''
    : nextEvent
    ? format(parseISO(nextEvent.dates.start.localDate), 'EEEE, MMMM d')
    : "It's not a Barclays crowd making it hard to park tonight";

  const thisMonthCount = events.filter((e) =>
    isThisMonth(parseISO(e.dates.start.localDate)),
  ).length;

  const thisWeekCount = events.filter((e) =>
    isThisWeek(parseISO(e.dates.start.localDate)),
  ).length;

  const renderLoading = () => (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid #E8D5E8',
            borderTop: '3px solid #6B2D5C',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: '#5a5a5a', fontSize: '14px' }}>Loading events...</p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );

  if (loading && events.length === 0 && !fetchError) {
    return renderLoading();
  }

  const formatLocalTime = (timeStr?: string) => {
    if (!timeStr) return null;
    // Parse as time only
    try {
      const date = parseISO(`1970-01-01T${timeStr}`);
      return format(date, 'h:mm a');
    } catch {
      return timeStr;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8F0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .event-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .event-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          background: '#6B2D5C',
          borderBottom: '1px solid #6B2D5C',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px 20px',
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: 'white',
              marginBottom: '4px',
              letterSpacing: '-0.5px',
            }}
          >
            Barclays Tonight – Barclays Center Events in Brooklyn
          </h1>
          <p
            style={{
              color: '#FFF8F0',
              fontSize: '15px',
              marginBottom: '12px',
            }}
          >
            The lowdown on what 15,000+ people are up to (and why you can&apos;t find
            parking).
          </p>

          {/* Live Event Counter */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#B4E7CE',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 8px #B4E7CE',
              }}
            />
            <span
              style={{
                color: 'white',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              LIVE
            </span>
            <span style={{ color: '#FFF8F0' }}>
              {thisMonthCount} events this month · {thisWeekCount} this week
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 20px 40px',
        }}
      >
        {/* Error banner if events fail to load */}
        {fetchError && (
          <div
            style={{
              marginBottom: '24px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#FFF1F0',
              border: '1px solid #FFCCC7',
              color: '#A8071A',
              fontSize: '14px',
            }}
          >
            We&apos;re having trouble loading events right now. Please refresh in a
            moment, or check back later.
          </div>
        )}

        {/* HERO */}
        {heroEvents.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <div
              className="hero-container"
              style={{
                background:
                  'linear-gradient(135deg, rgba(107, 45, 92, 0.85) 0%, rgba(255, 107, 157, 0.75) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '20px',
                boxShadow: '0 8px 24px rgba(107,45,92,0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                Featured Event
              </p>
              <h2
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: 'white',
                  margin: 0,
                  letterSpacing: '-0.5px',
                  marginBottom: heroSubtitle ? '6px' : 0,
                }}
              >
                {heroTitle}
              </h2>
              {heroSubtitle && (
                <p
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '16px',
                    margin: 0,
                  }}
                >
                  {heroSubtitle}
                </p>
              )}
            </div>

            <div
              className="hero-grid"
              style={{
                display: 'grid',
                gridTemplateColumns:
                  heroEvents.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '24px',
              }}
            >
              {heroEvents.map((event, idx) => {
                const formattedTime = formatLocalTime(event.dates.start.localTime);
                const imageUrl = getImageUrl(event);
                const hasImage = !!event.images?.[0]?.url;

                return (
                  <article
                    key={event.id}
                    className="event-card"
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      border: '2px solid #FF6B9D',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {hasImage ? (
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '260px',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={`${event.name} at Barclays Center Brooklyn - ${format(
                            parseISO(event.dates.start.localDate),
                            'MMMM d, yyyy',
                          )}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: 'cover' }}
                          priority={idx === 0}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: '#FF6B9D',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '24px',
                            fontSize: '13px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                          }}
                        >
                          {isTonight
                            ? 'TONIGHT'
                            : format(
                                parseISO(event.dates.start.localDate),
                                'MMM d',
                              ).toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '260px',
                          background:
                            'radial-gradient(circle at 0 0, #E8D5E8, #6B2D5C)',
                        }}
                      />
                    )}
                    <div style={{ padding: '24px' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          background: '#E8D5E8',
                          color: '#6B2D5C',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          marginBottom: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {event.classifications?.[0]?.segment?.name || 'Event'}
                      </div>
                      <h3
                        style={{
                          fontSize: '22px',
                          fontWeight: 700,
                          color: '#2d2d2d',
                          marginBottom: '12px',
                          lineHeight: 1.2,
                        }}
                      >
                        {event.name}
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          marginBottom: '20px',
                          color: '#7a7a7a',
                          fontSize: '14px',
                        }}
                      >
                        {formattedTime && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <span style={{ fontSize: '18px' }}>🕐</span>
                            <strong>{formattedTime}</strong>
                          </div>
                        )}
                        {event.priceRanges?.[0] && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <span style={{ fontSize: '18px' }}>💵</span>
                            ${event.priceRanges[0].min} – ${event.priceRanges[0].max}
                          </div>
                        )}
                      </div>
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          background: '#FF6B9D',
                          color: 'white',
                          padding: '14px',
                          borderRadius: '12px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '15px',
                          boxShadow: '0 4px 12px rgba(255,107,157,0.3)',
                        }}
                      >
                        Get Tickets →
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* PLAN YOUR NIGHT / GUIDES ROW */}
        <section style={{ marginBottom: '40px' }}>
          <div
            className="plan-grid"
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px 24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              border: '2px solid #E8D5E8',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#7a7a7a',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                }}
              >
                Before you go
              </p>
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#2d2d2d',
                  marginBottom: '4px',
                }}
              >
                Plan Your Night
              </h2>
              <p
                style={{
                  fontSize: '13px',
                  color: '#7a7a7a',
                  marginBottom: '8px',
                }}
              >
                Sort out the basics: getting here, where you&apos;ll park, and what you&apos;ll
                eat before or after the show.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Link
                href="/how-to-get-to-barclays-center"
                style={{
                  fontSize: '13px',
                  color: '#FF6B9D',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  background: '#FFF0F6',
                  display: 'inline-block',
                }}
              >
                How to get to Barclays Center →
              </Link>
              <Link
                href="/barclays-center-parking"
                style={{
                  fontSize: '13px',
                  color: '#FF6B9D',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  background: '#FFF0F6',
                  display: 'inline-block',
                }}
              >
                Where to park near Barclays →
              </Link>
              <Link
                href="/restaurants-near-barclays-center"
                style={{
                  fontSize: '13px',
                  color: '#FF6B9D',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  background: '#FFF0F6',
                  display: 'inline-block',
                }}
              >
                Where to eat &amp; drink nearby →
              </Link>
            </div>
          </div>
        </section>

        {/* EMAIL SIGNUP */}
        <section style={{ marginBottom: '48px' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              border: '2px solid #E8D5E8',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  marginBottom: '8px',
                }}
              >
                Never Miss an Event
              </h2>
              <p
                style={{
                  color: '#7a7a7a',
                  fontSize: '15px',
                  marginBottom: '20px',
                }}
              >
                Get weekly updates on upcoming shows, concerts, and games at Barclays
                Center.
              </p>

              {!emailSubmitted ? (
                <form
                  onSubmit={handleEmailSubmit}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    maxWidth: '500px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={submitting}
                    style={{
                      flex: 1,
                      minWidth: '240px',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '2px solid #E8D5E8',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: '12px 24px',
                      background: submitting ? '#b8b8b8' : '#6B2D5C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {submitting ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </form>
              ) : (
                <div
                  style={{
                    padding: '12px 16px',
                    background: '#f0f7f4',
                    borderRadius: '10px',
                    color: '#6B2D5C',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  ✓ Thanks! We&apos;ll keep you updated.
                </div>
              )}

              {emailError && (
                <p
                  style={{
                    marginTop: '8px',
                    color: '#A8071A',
                    fontSize: '13px',
                  }}
                >
                  {emailError}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* THIS WEEK */}
        {weekEvents.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#6B2D5C',
                  borderRadius: '50%',
                }}
              />
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#2d2d2d',
                  margin: 0,
                }}
              >
                This Week at Barclays Center
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {weekEvents.slice(0, 6).map((event) => (
                <article
                  key={event.id}
                  className="event-card"
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                    <Image
                      src={getImageUrl(event)}
                      alt={`${event.name} at Barclays Center - ${format(
                        parseISO(event.dates.start.localDate),
                        'MMM d',
                      )}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6B2D5C',
                        fontWeight: 600,
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {format(parseISO(event.dates.start.localDate), 'EEE, MMM d')}
                    </div>
                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        marginBottom: '10px',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.name}
                    </h3>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        color: '#FF6B9D',
                        fontSize: '14px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        borderBottom: '2px solid #FF6B9D',
                        paddingBottom: '2px',
                      }}
                    >
                      View details →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* THIS MONTH */}
        {monthEvents.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#FF6B9D',
                  borderRadius: '50%',
                }}
              />
              <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#2d2d2d',
                  margin: 0,
                }}
              >
                This Month at Barclays Center
              </h2>
            </div>
            <div
              style={{
                background: 'white',
                borderRadius: '14px',
                padding: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {monthEvents.slice(0, 10).map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: '12px 8px',
                    borderBottom: '1px solid #f4f3f1',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ minWidth: '70px', textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#2d2d2d',
                        lineHeight: 1,
                      }}
                    >
                      {format(parseISO(event.dates.start.localDate), 'd')}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#7a7a7a',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        marginTop: '2px',
                      }}
                    >
                      {format(parseISO(event.dates.start.localDate), 'MMM')}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        marginBottom: '4px',
                      }}
                    >
                      {event.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#7a7a7a',
                        margin: 0,
                      }}
                    >
                      {formatLocalTime(event.dates.start.localTime) || 'See event for time'}
                    </p>
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      background: '#E8D5E8',
                      color: '#6B2D5C',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Tickets
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FUTURE EVENTS */}
        {futureEvents.length > 0 && (
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#b8b8b8',
                  borderRadius: '50%',
                }}
              />
            <h2
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#2d2d2d',
                  margin: 0,
                }}
              >
                All Upcoming Events
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {futureEvents.map((event) => (
                <article
                  key={event.id}
                  className="event-card"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                    <Image
                      src={getImageUrl(event)}
                      alt={`${event.name} tickets Barclays Center Brooklyn`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#7a7a7a',
                        fontWeight: 600,
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {format(parseISO(event.dates.start.localDate), 'MMM d, yyyy')}
                    </div>
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.name}
                    </h3>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '13px',
                        color: '#FF6B9D',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      Details →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: 'white',
          borderTop: '1px solid #E8D5E8',
          marginTop: '80px',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#2d2d2d',
              marginBottom: '12px',
            }}
          >
            Your Guide to Barclays Center Events in Brooklyn
          </h3>
          <p
            style={{
              color: '#7a7a7a',
              fontSize: '14px',
              marginBottom: '16px',
              maxWidth: '600px',
              margin: '0 auto 16px',
            }}
          >
            Find concerts, sports games, family shows, and special events at Barclays
            Center. Located in downtown Brooklyn at Atlantic Terminal, serving Park Slope,
            Fort Greene, Prospect Heights, and all of Brooklyn.
          </p>

          {/* Footer nav to guides */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}
          >
            <Link
              href="/how-to-get-to-barclays-center"
              style={{
                fontSize: '13px',
                color: '#FF6B9D',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              How to get here
            </Link>
            <span style={{ color: '#d4d4d4' }}>•</span>
            <Link
              href="/barclays-center-parking"
              style={{
                fontSize: '13px',
                color: '#FF6B9D',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Parking guide
            </Link>
            <span style={{ color: '#d4d4d4' }}>•</span>
            <Link
              href="/restaurants-near-barclays-center"
              style={{
                fontSize: '13px',
                color: '#FF6B9D',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Where to eat &amp; drink
            </Link>
          </div>

          <p
            style={{
              color: '#b8b8b8',
              fontSize: '13px',
              margin: 0,
            }}
          >
            Independent guide to Barclays Center events • Not affiliated with Barclays
            Center
          </p>
          <p
            style={{
              color: '#d4d4d4',
              fontSize: '12px',
              marginTop: '8px',
            }}
          >
            Event data provided by Ticketmaster
          </p>
        </div>
      </footer>
    </div>
  );
}
