// components/RelatedGuides.tsx
import Link from 'next/link';

interface Guide {
  title: string;
  href: string;
  description: string;
}

interface RelatedGuidesProps {
  currentPage: 'parking' | 'restaurants' | 'transit';
}

export default function RelatedGuides({ currentPage }: RelatedGuidesProps) {
  const allGuides: Record<string, Guide> = {
    parking: {
      title: 'Parking Guide',
      href: '/barclays-center-parking',
      description: 'Where to park near Barclays Center'
    },
    restaurants: {
      title: 'Where to Eat',
      href: '/restaurants-near-barclays-center',
      description: 'Restaurants and bars near the arena'
    },
    transit: {
      title: 'Getting There',
      href: '/how-to-get-to-barclays-center',
      description: 'Subway, LIRR, and directions'
    }
  };

  // Filter out current page
  const relatedGuides = Object.entries(allGuides)
    .filter(([key]) => key !== currentPage)
    .map(([_, guide]) => guide);

  return (
    <div className="related-guides">
      <h2>More Helpful Guides</h2>
      <div className="guides-grid">
        {relatedGuides.map((guide) => (
          <Link 
            key={guide.href} 
            href={guide.href}
            className="guide-card"
          >
            <h3>{guide.title}</h3>
            <p>{guide.description}</p>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .related-guides {
          margin: 3rem 0;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .related-guides h2 {
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          color: #1a1a1a;
        }
        
        .guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .guide-card {
          padding: 1.5rem;
          background: white;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid #e1e4e8;
          transition: all 0.2s;
        }
        
        .guide-card:hover {
          border-color: #0066cc;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .guide-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.125rem;
          color: #0066cc;
        }
        
        .guide-card p {
          margin: 0;
          font-size: 0.875rem;
          color: #586069;
        }
      `}</style>
    </div>
  );
}
