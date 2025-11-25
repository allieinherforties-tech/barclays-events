// app/barclays-center-parking/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barclays Center Parking Guide | Where to Park in Brooklyn Tonight',
  description:
    'Driving to Barclays Center? Learn where to park near the arena, how early to arrive, and whether you should skip the car and take the train instead.',
};

export default function BarclaysParkingPage() {
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
        Where to Park for Barclays Center Events in Brooklyn
      </h1>

      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: '#4a4a4a',
          marginBottom: '24px',
        }}
      >
        Most people figure out Barclays Center parking by doing laps around Atlantic Avenue
        and then paying too much for the first garage they see. If you&apos;re driving to a
        game or concert, here&apos;s how to avoid the worst of the chaos and actually enjoy
        your night.
      </p>

      {/* Section 1 – Should you drive at all? */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Should You Drive to Barclays Center?
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Before you lock in a parking plan, it&apos;s worth asking if you need to drive at
          all.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Barclays Center sits on top of a huge transit hub:
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
            <strong>Subway:</strong> 2, 3, 4, 5, B, D, N, Q and R trains all stop at{' '}
            <strong>Atlantic Ave–Barclays Center</strong>.
          </li>
          <li>
            <strong>LIRR:</strong> The Long Island Rail Road stops at{' '}
            <strong>Atlantic Terminal</strong>, directly across from the arena.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          If you&apos;re already in NYC or on Long Island, the subway or LIRR is usually
          faster, cheaper, and less stressful than driving. If you&apos;re coming from New
          Jersey, upstate, or somewhere car‑dependent, driving can still make sense—you
          just want a plan before you hit downtown Brooklyn.
        </p>
      </section>

      {/* Section 2 – Parking options */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Types of Parking Near Barclays Center
        </h2>

        {/* Option 1 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '8px',
          }}
        >
          Option 1 – Event or Official Parking
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          For some major games and concerts, the venue or ticketing partners may surface
          official or recommended lots.
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
            <strong>Pros:</strong> Clear directions and close to the arena.
          </li>
          <li>
            <strong>Cons:</strong> Often the most expensive choice and can sell out early.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '20px',
          }}
        >
          If your ticket confirmation or event page links to &quot;official parking,&quot;
          treat it as the simplest—but not the cheapest—option.
        </p>

        {/* Option 2 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '8px',
          }}
        >
          Option 2 – Nearby Garages and Lots (5–10 Minute Walk)
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Within a few blocks of <strong>620 Atlantic Ave, Brooklyn, NY 11217</strong>,
          there are multiple paid garages and surface lots.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          What to expect:
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
            <strong>Event pricing:</strong> Flat &quot;event parking&quot; rates on game
            and concert nights.
          </li>
          <li>
            <strong>Tight exits:</strong> Post‑event, every car leaves at once—build in
            time to get out.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          What to check before you park:
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>Posted event rate vs hourly rate</li>
          <li>Lot closing time (so you&apos;re not sprinting back after the encore)</li>
          <li>Clearance height if you&apos;re driving an SUV, van, or rooftop cargo box</li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '20px',
          }}
        >
          A short 5–10 minute walk can often save money versus the closest garage directly
          next to the arena.
        </p>

        {/* Option 3 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '8px',
          }}
        >
          Option 3 – Street Parking in Nearby Neighborhoods
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          You can sometimes find street parking in <strong>Park Slope</strong>,{' '}
          <strong>Fort Greene</strong>, or <strong>Prospect Heights</strong> if
          you&apos;re willing to walk 10–20 minutes.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          Things to keep in mind:
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
            <strong>Alternate side parking:</strong> Carefully read the street signs—don&apos;t
            assume evening events are exempt.
          </li>
          <li>
            <strong>Meters:</strong> Some meters run late; make sure your paid time
            covers the full event.
          </li>
          <li>
            <strong>Residential blocks:</strong> This is a dense neighborhood. Don&apos;t
            block driveways, hydrants, or clearly marked no‑parking zones.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Street parking can save money, but rarely saves time.
        </p>
      </section>

      {/* Section 3 – Parking apps */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Booking a Spot Before You Arrive
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Parking apps can help you skip the &quot;circle and pray&quot; phase.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          How to use them for Barclays Center:
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
            <strong>Search for:</strong> &quot;Barclays Center parking&quot; or{' '}
            <code>620 Atlantic Ave, Brooklyn, NY 11217</code>.
          </li>
          <li>
            <strong>Filter by:</strong> arrival time (give yourself 60–90 minutes before
            the event), end time (include the full event plus time to exit the lot), and
            walking distance (5–10 minutes is usually a sweet spot).
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '8px',
          }}
        >
          Before you tap &quot;book&quot;:
        </p>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
          }}
        >
          <li>Confirm the lot hours—some close shortly after events.</li>
          <li>
            Check whether your reservation explicitly covers &quot;event parking&quot;
            nights.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          After you&apos;ve done this once or twice, you&apos;ll find a couple of lots
          that feel like &quot;yours&quot; and can re‑book them for future events.
        </p>
      </section>

      {/* Section 4 – How early to arrive */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          How Early to Arrive If You&apos;re Driving
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          On paper, you might think you can roll up 30 minutes before game time. In real
          life, downtown Brooklyn traffic disagrees.
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
            <strong>Weeknight events:</strong> Aim to arrive 60–90 minutes before the
            listed start time.
          </li>
          <li>
            <strong>Weekend or major events:</strong> Add extra buffer—people tend to come
            earlier, and traffic builds up faster.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          That window gives you time to get through last‑minute traffic near the arena,
          find and park in your chosen lot, walk over to Barclays Center, and clear
          security without missing the first play or the opening song. If the weather is
          bad or it&apos;s a huge show, add even more margin.
        </p>
      </section>

      {/* Section 5 – Gotchas */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Common Barclays Center Parking Gotchas
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          A few things that catch drivers off guard:
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
            <strong>Alternate Side Rules Still Apply:</strong> Street sweeping regulations
            don&apos;t disappear on event nights. If a sign says &quot;No parking&quot;
            during a specific window, believe it.
          </li>
          <li>
            <strong>Meter Cutoff Times:</strong> Some meters run into the evening. If your
            event ends after your meter time, that&apos;s a ticket risk.
          </li>
          <li>
            <strong>Driveways, Hydrants, Corners:</strong> In crowded neighborhoods, it&apos;s
            tempting to squeeze in &quot;just this once.&quot; NYPD and tow trucks are
            not sentimental about game night.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          When in doubt, pay for a legit spot at a garage and treat it as part of the
          ticket price.
        </p>
      </section>

      {/* Section 6 – Match to tonight's event */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Parking Feels Different for Different Crowds
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Parking near Barclays Center is not the same for a regular season weeknight Nets
          game, a sold‑out Saturday night concert, or a Sunday afternoon family show.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Before you commit to driving all the way in, check <strong>Barclays Tonight</strong>{' '}
          to see what&apos;s happening at Barclays Center tonight, how big the crowd is
          likely to be, and whether it&apos;s a &quot;show up early and reserve a
          spot&quot; night—or a &quot;skip the car and take the train&quot; kind of
          night. Use that to decide whether to book parking in advance, hunt for a garage
          on arrival, or ditch the car and join everyone on the subway.
        </p>
      </section>
    </main>
  );
}
