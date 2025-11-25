// app/how-to-get-to-barclays-center/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Get to Barclays Center | Subway, LIRR & Directions',
  description:
    'See how to get to Barclays Center in Brooklyn via subway, LIRR, bus, and rideshare. Simple directions and tips for arriving on time.',
};

export default function GettingToBarclaysPage() {
  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#FFF8F0',
      }}
    >
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#2d2d2d',
          marginBottom: '16px',
          letterSpacing: '-0.5px',
        }}
      >
        How to Get to Barclays Center (Subway, LIRR &amp; More)
      </h1>

      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: '#4a4a4a',
          marginBottom: '24px',
        }}
      >
        Barclays Center sits on top of one of the busiest transit hubs in New York City.
        Whether you&apos;re coming from Manhattan, Queens, Long Island, or another part of
        Brooklyn, you can almost always avoid driving and still get dropped off right next
        to the arena.
      </p>

      {/* Section 1 – Subway */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Subway Lines Serving Barclays Center
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          The main subway stop for the arena is:
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>
            <strong>Atlantic Ave–Barclays Center</strong>
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Lines that stop there:
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '16px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>2, 3, 4, 5 – Eastern Parkway / IRT lines</li>
          <li>B, D, N, Q, R – BMT lines</li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          <strong>From Manhattan:</strong>
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Take any <strong>2, 3, 4, or 5</strong> downtown to{' '}
          <strong>Atlantic Ave–Barclays Center</strong>. Or take the{' '}
          <strong>B, D, N, Q, or R</strong> into Brooklyn and get off at the same station.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          <strong>From Queens (N/Q/R):</strong>
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Take <strong>N, Q, or R</strong> into Brooklyn and stay on until{' '}
          <strong>Atlantic Ave–Barclays Center</strong>.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>From elsewhere in Brooklyn:</strong> If you can connect to one of the
          lines above, you&apos;re already most of the way there. Many neighborhoods have
          a one‑seat ride or an easy transfer into the Atlantic hub.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          You&apos;ll exit the station just a short walk from the arena&apos;s main
          plaza at <strong>620 Atlantic Ave</strong>.
        </p>
      </section>

      {/* Section 2 – LIRR */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Taking LIRR to Atlantic Terminal
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          If you&apos;re coming from Long Island, the Long Island Rail Road (LIRR) is
          often the simplest way to reach Barclays Center.
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>
            <strong>Destination:</strong> Atlantic Terminal
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Board your usual LIRR branch toward Atlantic Terminal and check the
          MTA/LIRR app for current schedules and any service changes.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginTop: '12px',
          }}
        >
          When you arrive at Atlantic Terminal, follow signs to the street level. The
          arena entrance is directly across Atlantic Avenue—no extra subway ride required.
          For many Long Island riders, this ends up being faster and less stressful than
          driving all the way into Brooklyn and searching for parking.
        </p>
      </section>

      {/* Section 3 – Walking */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Walking Directions to 620 Atlantic Ave
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Whether you arrive by subway or LIRR, you&apos;re only a few minutes&apos; walk
          from the arena once you&apos;re above ground.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          <strong>From Atlantic Ave–Barclays Center (Subway):</strong>
        </p>
        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>Follow the signs for the Barclays Center exits.</li>
          <li>You&apos;ll come out onto the main plaza at 620 Atlantic Ave.</li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          <strong>From Atlantic Terminal (LIRR):</strong>
        </p>
        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>Exit the terminal onto Atlantic Avenue.</li>
          <li>
            You&apos;ll see Barclays Center&apos;s curved facade and plaza directly across
            the street.
          </li>
          <li>Use the crosswalks to cross Atlantic Ave and walk toward the main entrance.</li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Both routes are straightforward 2–3 minute walks once you&apos;re at street
          level.
        </p>
      </section>

      {/* Section 4 – Bus / Rideshare */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Other Ways to Get to Barclays Center
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          <strong>Buses:</strong>
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Several bus routes run along Flatbush Ave, Atlantic Ave, and nearby streets. If
          you&apos;re already in Brooklyn and not near a subway line, taking a bus toward
          the Downtown Brooklyn / Atlantic Ave area can be a simple option.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          <strong>Rideshare / Taxi:</strong>
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Set your destination to <strong>&quot;Barclays Center, 620 Atlantic Ave,
          Brooklyn, NY 11217&quot;</strong>. On big event nights, expect your driver to
          drop you off a block or two away due to traffic and crowd control around the
          arena. Build in extra time—traffic can get heavy as start time approaches.
        </p>
      </section>

      {/* Section 5 – When to arrive */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          How Early Should You Get There?
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Transit is usually the fastest way to Barclays Center—until you&apos;re counting
          on it. Give yourself a buffer so small delays don&apos;t mean missing the
          opening moments.
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>
            <strong>Regular games and shows:</strong> Aim to arrive 45–60 minutes before
            the listed start time.
          </li>
          <li>
            <strong>Major concerts and playoff games:</strong> Add more time. Trains,
            platforms, and security lines will all be busier.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          That window gives you time for minor train delays, bathroom or snack stops, and
          bag checks and security screening. If you&apos;re traveling with kids or a
          larger group, consider padding your schedule even more.
        </p>
      </section>

      {/* Section 6 – Accessibility */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Accessibility at Atlantic Hub and Barclays Center
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Both the Atlantic Ave–Barclays Center station and Atlantic Terminal include
          accessible entrances and elevators, but they can be crowded on event nights.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          If you need step‑free access or use mobility aids:
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>
            Check the MTA accessibility map or app for current elevator status at{' '}
            <strong>Atlantic Ave–Barclays Center</strong> and{' '}
            <strong>Atlantic Terminal</strong>.
          </li>
          <li>Build in extra time in case you need to use a different entrance or exit.</li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Barclays Center itself has accessible seating and entrances; check your ticket
          details or the arena&apos;s accessibility page if you need specific
          accommodations.
        </p>
      </section>

      {/* Section 7 – Plan around tonight's event */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Different Events, Different Crowds
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          The &quot;right&quot; way to get to Barclays Center depends on what kind of
          crowd is heading there with you. A Tuesday night basketball game, a Saturday
          night pop concert, and a weekend family show will all feel very different on the
          train.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Before you head out, check <strong>Barclays Tonight</strong> to see what&apos;s
          happening at Barclays Center tonight, how big the crowd is likely to be, and
          whether you should expect rush‑hour commuters, families, or 15,000 fans in
          matching tour merch on your train. Use that to decide when to leave, which route
          to take, and how much buffer time to build in so you arrive on time and (mostly)
          unbothered.
        </p>
      </section>
    </main>
  );
}
