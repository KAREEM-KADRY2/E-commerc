import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORIES = [
  { id: 'mens', name: "Men's Clothing", icon: 'shirt', keyword: 'mens clothing' },
  { id: 'womens', name: "Women's Clothing", icon: 'shopping-bag', keyword: 'womens clothing' },
  { id: 'shoes', name: "Shoes", icon: 'footprints', keyword: 'shoes' },
  { id: 'watches', name: "Watches", icon: 'watch', keyword: 'watch' },
  { id: 'electronics', name: "Electronics", icon: 'smartphone', keyword: 'electronics' },
  { id: 'audio', name: "Audio", icon: 'headphones', keyword: 'headphones' },
  { id: 'laptops', name: "Laptops", icon: 'laptop', keyword: 'laptop' }
];

const ITEMS_PER_CATEGORY = 10;
const OUTPUT_IMG_DIR = path.join(__dirname, '../public/assets/products');
const DATA_FILE_PATH = path.join(__dirname, '../public/api/data.json');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_IMG_DIR)) {
  fs.mkdirSync(OUTPUT_IMG_DIR, { recursive: true });
}

// Helper to download image
async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (error) {
    console.error(`Error downloading image for ${destPath}:`, error.message);
    return false;
  }
}

async function run() {
  console.log('Starting data and image generation...');
  const newProducts = [];
  let globalId = 1;

  for (const category of CATEGORIES) {
    console.log(`Processing category: ${category.name}`);
    for (let i = 1; i <= ITEMS_PER_CATEGORY; i++) {
      // Using picsum seed to guarantee unique and reliable downloads
      const imageUrl = `https://picsum.photos/seed/${category.id}-${i}/800/800`;
      
      const fileName = `${category.id}-${i}.jpg`;
      const destPath = path.join(OUTPUT_IMG_DIR, fileName);
      const localUrl = `/assets/products/${fileName}`;

      console.log(`  Downloading ${fileName}...`);
      await downloadImage(imageUrl, destPath);

      // Add small delay to not overwhelm the free API
      await new Promise(r => setTimeout(r, 300));

      // Generate random realistic pricing
      const basePrice = Math.floor(Math.random() * 5000) + 500;
      const oldPrice = Math.floor(basePrice * (1 + (Math.random() * 0.5 + 0.1)));
      const squadPrice = Math.floor(basePrice * 0.9);
      const discountPercent = Math.round(((oldPrice - basePrice) / oldPrice) * 100);

      newProducts.push({
        id: globalId,
        name: `Premium ${category.name} Item ${i}`,
        category: category.id,
        price: basePrice,
        oldPrice: oldPrice,
        squadPrice: squadPrice,
        cashback: Math.floor(basePrice * 0.1),
        discount: `-${discountPercent}%`,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 500) + 10,
        weeklySales: Math.floor(Math.random() * 100) + 5,
        shortDescription: `A high-quality item from our ${category.name} collection. Designed for excellence and comfort.`,
        image: localUrl,
        images: [localUrl], // Can duplicate for gallery or keep single
        colors: [
          { name: "Standard", hex: "#1a1a1a" },
          { name: "Alternative", hex: "#f5f5f5" }
        ],
        specifications: {
          "Material": "Premium Quality",
          "Warranty": "1 Year",
          "Brand": "Generic"
        },
        features: [
          "Durable construction",
          "Modern design",
          "Best in class"
        ]
      });

      globalId++;
    }
  }

  console.log('Finished downloading images. Updating data.json...');

  // Keep existing categories structure from original JSON, update counts
  const finalCategories = CATEGORIES.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    count: ITEMS_PER_CATEGORY.toString(),
    // Keep a placeholder for category image or just use the first product's image
    image: `/assets/products/${c.id}-1.jpg`
  }));

  // Create minimal mock data for bundles and reviews so ProductDetails page doesn't crash
  const mockBundles = {
    "1": [2, 3] // For product 1, bundle with 2 and 3
  };
  
  const mockReviews = {
    "1": {
      "averageRating": 4.8,
      "totalReviews": 128,
      "ratingBreakdown": { "5": 98, "4": 20, "3": 5, "2": 3, "1": 2 },
      "reviewsList": []
    }
  };

  const finalData = {
    categories: finalCategories,
    products: newProducts,
    bundles: mockBundles,
    reviews: mockReviews
  };

  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(finalData, null, 2));
  console.log('Success! generated 70 products and saved data.json');
}

run().catch(console.error);
