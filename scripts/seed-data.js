const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const portfolioItems = [
  {
    title: "Golden Hour Muse",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=1000",
    description: "Capturing the fleeting warmth of the sun as it dips below the horizon, illuminating the subject in a divine amber glow.",
    year: "2024",
    client: "Editorial"
  },
  {
    title: "Digital Renaissance",
    category: "Digital Art",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    description: "An abstract exploration of classical motifs reimagined through modern digital brushwork and golden textures.",
    year: "2023",
    client: "Personal Project"
  },
  {
    title: "The Sculpted Silhouette",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000",
    description: "Studying the interplay of deep shadows and sharp highlights on the human form in a high-fashion editorial style.",
    year: "2024",
    client: "Vogue Mockup"
  },
  {
    title: "Amber Echoes",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1500462859194-8111aa3ec7a0?auto=format&fit=crop&q=80&w=1000",
    description: "A conceptual photographic series focusing on the distortion of light through vintage glass and warm filters.",
    year: "2023",
    client: "Gallery Selection"
  },
  {
    title: "Neon Dreams",
    category: "Digital Art",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1000",
    description: "Merging vaporwave aesthetics with high-luxury gold accents to create a dreamlike digital landscape.",
    year: "2024",
    client: "Crypto Art Collective"
  }
];

const shopItems = [
  {
    title: "Luminous Canvas Print",
    category: "Prints",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000",
    description: "Limited edition Giclée print on archival canvas, featuring the iconic 'Luminous' series with gold leaf finishing.",
    external_link: "https://saatchiart.com"
  },
  {
    title: "Midnight Sketchbook",
    category: "Merchandise",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000",
    description: "A premium leather-bound sketchbook with 200gsm toned paper, perfect for mixed media and charcoal sketches.",
    external_link: "https://saatchiart.com"
  },
  {
    title: "Digital Brush Pack",
    category: "Digital Art",
    price: "$25.00",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000",
    description: "My custom Procreate brush set used for all editorial digital paintings, including the signature gold texture brushes.",
    external_link: "https://saatchiart.com"
  },
  {
    title: "Photography Masterclass",
    category: "Education",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=1000",
    description: "A 4-hour deep dive into lighting, composition, and high-end editorial color grading for portrait photographers.",
    external_link: "https://saatchiart.com"
  }
];

async function seed() {
  console.log("Seeding portfolio items...");
  const { error: portfolioError } = await supabase.from('portfolio_items').insert(portfolioItems);
  if (portfolioError) console.error("Error seeding portfolio:", portfolioError);
  else console.log("Portfolio seeded successfully!");

  console.log("Seeding shop items...");
  const { error: shopError } = await supabase.from('shop_items').insert(shopItems);
  if (shopError) console.error("Error seeding shop:", shopError);
  else console.log("Shop seeded successfully!");
}

seed();
