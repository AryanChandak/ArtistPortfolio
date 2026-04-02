# PROJECT STATE: The Visual Artist Portfolio

**Client:** Puja Dhanuka  
**Brand Name:** The Visual  
**Location:** Bangalore, India  
**Contact:** +91 8105237600 | thevisual.art1@gmail.com

---

## 1. Project Overview
A high-end, editorial-style digital portfolio and shop for a contemporary visual artist. The aesthetic is centered around **Gold & Charcoal** with massive serif typography and fluid motion.

## 2. Technical Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (for custom gold gradients/glows)
- **Animations:** Framer Motion (Scroll reveals, 3D tilts, cinematic entrances)
- **Database/Auth:** Supabase
- **Icons:** Lucide React

## 3. Core Features Implemented

### 🎨 Design & Motion
- **Cinematic Entrance:** A large blurred "The Visual" title animation that blurs out to reveal the site.
- **Editorial Layout:** Side-by-side hero splits, infinite text marquees, and staggered scroll reveals.
- **Theme:** Sophisticated **Gold/Amber** accents on **Deep Charcoal** backgrounds. Light mode is high-contrast with crisp borders.

### 🛒 Editorial Shop & Cart System
- **Shopping Cart:** Full state management via `CartProvider` and `localStorage` persistence.
- **Cart Drawer:** A slide-out side panel for managing items, quantities, and viewing subtotals.
- **WhatsApp Checkout:** The "Proceed to Checkout" button generates a detailed WhatsApp message containing the entire order (items, quantities, and total) and opens a chat with Puja (+91 8105237600).

### 🛠️ CMS & Admin Dashboard
- **Location:** `/admin`
- **Functionality:** Real-time CRUD for Portfolio items and Shop items via Supabase.
- **Actions:** Supports image uploads to Supabase Storage.

## 4. Key Components
- **Navigation:** Fixed glassmorphic bar with theme toggle and live cart badge.
- **Portfolio:** Filterable gallery with infinite scrolling carousel for the "All" view.
- **Shop Section:** Product cards with internal "Add to Cart" functionality and external detail links.
- **Journal:** Editorial blog/article section.
- **Newsletter:** Subscription section (UI ready, needs backend wiring).

## 5. Technical Configuration
- **Dev Server:** Running on `http://localhost:3001` (due to port 3000 conflicts).
- **Environment:** Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

## 6. Pending / Future Steps
- **Database Seeding:** A `scripts/seed-data.js` exists but currently fails due to **Supabase RLS (Row Level Security)**. Needs a Service Role Key or RLS policy update to allow bulk inserts.
- **Newsletter Wiring:** Subscriber emails currently don't write to a table.
- **Admin Refinement:** Add "Edit" functionality (currently supports Add/Delete).

---

**Handover Note:** The brand is **"The Visual"**, but the artist is **Puja Dhanuka**. Ensure all personal bios and metadata prioritize Puja's name while maintaining the brand's aesthetic.
