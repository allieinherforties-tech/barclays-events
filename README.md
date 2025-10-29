# Barclays Tonight - Park Slope Redesign

Beautiful, sophisticated event discovery for Brooklyn.

## ✨ Features

- **Tonight** spotlight section for today's events
- **This Week** preview with beautiful cards
- **This Month** compact list view
- **All Upcoming** filterable grid
- Default placeholder images for events without photos
- Automatic filtering of past events
- Park Slope-inspired aesthetic (warm neutrals, sage green, terracotta)

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/barclays-park-slope-redesign)

## 📋 Setup Instructions

### 1. Get Your Ticketmaster API Key

1. Go to https://developer.ticketmaster.com/
2. Sign up for a free account
3. Create a new app
4. Copy your API Key (Consumer Key)

### 2. Deploy to Vercel

**Option A: One-Click Deploy**
1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Add environment variables:
   - `TICKETMASTER_API_KEY` = your API key
   - `TICKETMASTER_VENUE_ID` = KovZ917AtP3
4. Click Deploy

**Option B: Manual Deploy**
1. Fork/clone this repository
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory
4. Add environment variables in Vercel dashboard

### 3. Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your API key to .env.local
TICKETMASTER_API_KEY=your_key_here
TICKETMASTER_VENUE_ID=KovZ917AtP3

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Design Features

- **Color Palette:**
  - Background: Warm cream (#faf9f7)
  - Primary: Sage green (#7a9b8e)
  - Accent: Terracotta (#c87d5c)
  - Gold: #d4a574
  
- **Typography:** System fonts for fast loading
- **Layout:** Responsive grid with hover effects
- **Sections:** Tonight → This Week → This Month → All Upcoming

## 🔧 Configuration

### Environment Variables

- `TICKETMASTER_API_KEY` - Your Ticketmaster API key (required)
- `TICKETMASTER_VENUE_ID` - Barclays Center venue ID (default: KovZ917AtP3)

### Customization

Edit `app/page.tsx` to customize:
- Colors and styling
- Section layouts
- Number of events shown per section
- Filter categories

## 📱 Features

- ✅ Mobile responsive
- ✅ Fast loading with Next.js
- ✅ Automatic event updates every 15 minutes
- ✅ Direct ticket purchase links
- ✅ Beautiful hover effects
- ✅ Placeholder images for events without photos
- ✅ Filters past events automatically

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Inline CSS (no dependencies)
- **API:** Ticketmaster Discovery API
- **Hosting:** Vercel (recommended)

## 📝 License

MIT

## 🙏 Acknowledgments

- Event data powered by Ticketmaster
- Placeholder images from Unsplash
- Independent guide - not affiliated with Barclays Center
