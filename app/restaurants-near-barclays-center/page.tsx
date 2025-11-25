// app/restaurants-near-barclays-center/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where to Eat Near Barclays Center | Restaurants & Bars in Brooklyn',
  description:
    'Heading to Barclays Center? Discover restaurants and bars near the arena for quick bites, sit-down dinners, and drinks before or after your event.',
};

export default function RestaurantsNearBarclaysPage() {
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
        Where to Eat and Drink Near Barclays Center (Tonight)
      </h1>

      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.6,
          color: '#4a4a4a',
          marginBottom: '24px',
        }}
      >
        Heading to a game or concert at Barclays Center and trying to figure out where to
        eat that isn&apos;t just the first place you see across Atlantic Avenue? This
        guide covers quick bites, sit‑down dinners, and drinks within walking distance, so
        you can actually enjoy your night instead of settling for whatever&apos;s open.
      </p>

      {/* Section 1 – Quick bites */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Quick Bites Near Barclays Center
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '16px',
          }}
        >
          If you&apos;re cutting it close on time or rolling in straight from work, these
          options get you fed fast without a long sit‑down meal.
        </p>

        {/* Spot 1 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          Shake Shack – Fast, Familiar, Crowd‑Pleaser
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Location:</strong> 620 Atlantic Ave (Barclays Center plaza)
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Vibe:</strong> Reliable burgers, fries, and shakes right outside the
          arena.
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Why go:</strong> Easy option for families and anyone who wants something
          familiar before tip‑off. Expect lines before big events, but service moves
          quickly.
        </p>

        {/* Spot 2 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          Local Slice Shop – Classic Brooklyn Pizza
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Location:</strong> A few minutes&apos; walk along Flatbush or 5th Avenue
          (pick your favorite nearby spot).
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Vibe:</strong> Classic New York slices, garlic knots, and big pies to
          share.
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Why go:</strong> Cheap, fast, and very Brooklyn. Perfect if
          you&apos;re rolling in with friends and want to eat on the way.
        </p>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#7a7a7a',
          }}
        >
          You can swap in the specific pizzeria you love here once you&apos;ve picked a
          go‑to spot.
        </p>
      </section>

      {/* Section 2 – Sit-down dinner */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Sit‑Down Restaurants Near Barclays Center
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '16px',
          }}
        >
          If you&apos;re making Barclays Center the centerpiece of a night out, these
          spots are better for a real meal than just grabbing something at the arena.
        </p>

        {/* Spot 3 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          Junior&apos;s Restaurant &amp; Bakery – Classic Brooklyn Comfort Food
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Location:</strong> 386 Flatbush Ave Ext (≈10–12 minute walk)
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Vibe:</strong> Old‑school diner energy, huge menus, and famous
          cheesecake.
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Why go:</strong> Great for out‑of‑towners and families. Come early if
          you want time for dessert before the game.
        </p>

        {/* Spot 4 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          Atlantic Terminal – Fast Options Under One Roof
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Location:</strong> Atlantic Terminal, 625 Atlantic Ave
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Vibe:</strong> Mix of quick‑service spots inside the mall.
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Why go:</strong> If you&apos;re hopping off the train at Atlantic
          Terminal and want to grab something simple before walking across the street,
          this is the path of least resistance.
        </p>

        {/* Spot 5 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          5th Avenue &amp; Vanderbilt Ave – Neighborhood Restaurants
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Location:</strong> Park Slope / Prospect Heights (≈10–15 minute walk)
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '4px',
          }}
        >
          <strong>Vibe:</strong> Ramen, tacos, wine bars, small plates, and more.
        </p>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Why go:</strong> Walk a bit farther from the arena and it starts feeling
          like a Brooklyn night out rather than a mall food court.
        </p>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#7a7a7a',
          }}
        >
          Swap in specific restaurants you trust on 5th Ave or Vanderbilt once you&apos;ve
          tested them and know they&apos;re worth sending people to.
        </p>
      </section>

      {/* Section 3 – Drinks */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Bars and Drinks Near Barclays Center
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '16px',
          }}
        >
          Whether you want a pre‑game beer or a post‑show debrief, you&apos;ve got
          options within a short walk.
        </p>

        {/* Cluster 1 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          Sports Bars Near the Arena
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Area:</strong> Along Flatbush Ave and 5th Ave within 5–10 minutes of
          Barclays. Expect TVs, beer, wings, and loud fans—ideal for meeting friends
          before tip‑off or recapping the setlist after the show.
        </p>

        {/* Cluster 2 */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '4px',
          }}
        >
          Quieter Spots a Few Blocks Away
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          <strong>Area:</strong> Deeper into Park Slope, Fort Greene, and Prospect Heights
          you&apos;ll find wine bars, cocktail spots, and calmer neighborhood joints. If
          you&apos;d rather not shout over the pre‑game crowd, walk a few extra blocks and
          let everyone else crowd around the arena.
        </p>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#7a7a7a',
          }}
        >
          As you discover specific bars you love, you can turn this section into named
          recommendations—or even a future &quot;Featured Partner&quot; placement.
        </p>
      </section>

      {/* Section 4 – Tips */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Tips for Eating Around Barclays Center
        </h2>

        <ul
          style={{
            paddingLeft: '20px',
            marginBottom: '12px',
            color: '#4a4a4a',
            fontSize: '15px',
            lineHeight: 1.6,
          }}
        >
          <li>
            <strong>Plan for crowds on big nights.</strong> Major concerts and playoff
            games will pack every restaurant within a block or two of the arena 60–90
            minutes before start time.
          </li>
          <li>
            <strong>Make reservations when you can.</strong> For popular sit‑down spots, a
            Resy/OpenTable booking can be the difference between a quick meal and missing
            the opener.
          </li>
          <li>
            <strong>Leave time for security.</strong> Build in 15–20 minutes to get back
            to Barclays Center and through bag check, especially if you&apos;re bringing
            kids or bags.
          </li>
        </ul>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          You don&apos;t need a complicated plan—just a sense of timing and how far
          you&apos;re willing to walk.
        </p>
      </section>

      {/* Section 5 – Match to tonight's event */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#2d2d2d',
            marginBottom: '12px',
          }}
        >
          Pick a Spot Based on Tonight&apos;s Crowd
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            marginBottom: '12px',
          }}
        >
          Bars and restaurants feel very different depending on whether 15,000 people are
          in jerseys, matching tour merch, or bringing kids to a family show.
        </p>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          Before you pick a spot, check <strong>Barclays Tonight</strong> to see what&apos;s
          on at the arena tonight. Big Friday concert? Expect packed bars right around the
          arena. Weeknight basketball game? More jerseys and sports bars. Family matinee?
          Earlier dinners and more kids in the mix. Use that to decide whether you want to
          lean into the crowd or walk a few blocks away for a calmer meal.
        </p>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#7a7a7a',
            marginTop: '12px',
          }}
        >
          Later, this page is also where you can highlight &quot;Featured Partner&quot;
          restaurants when you start signing sponsorship deals.
        </p>
      </section>
    </main>
  );
}
