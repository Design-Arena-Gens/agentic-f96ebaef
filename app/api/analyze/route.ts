import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { jobs } from '@/lib/jobs';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.includes('meesho.com')) {
      return NextResponse.json(
        { error: 'Invalid Meesho URL' },
        { status: 400 }
      );
    }

    const jobId = uuidv4();

    // Initialize job
    jobs.set(jobId, {
      id: jobId,
      url,
      status: 'pending',
      progress: 0,
      message: 'Initializing analysis...',
      startedAt: new Date().toISOString(),
    });

    // Start background processing
    processJob(jobId, url).catch(console.error);

    return NextResponse.json({ jobId });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to start analysis' },
      { status: 500 }
    );
  }
}

async function processJob(jobId: string, url: string) {
  const updateProgress = (progress: number, message: string) => {
    const job = jobs.get(jobId);
    if (job) {
      jobs.set(jobId, { ...job, progress, message });
    }
  };

  try {
    // Step 1: Scrape product data
    updateProgress(25, 'Fetching product data...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const productData = await scrapeProduct(url);

    // Step 2: Scrape reviews
    updateProgress(50, 'Analyzing reviews...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reviews = await scrapeReviews(url);

    // Step 3: AI Analysis
    updateProgress(75, 'Generating insights...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const insights = await analyzeWithAI(productData, reviews);

    // Step 4: Complete
    updateProgress(100, 'Finalizing results...');

    const job = jobs.get(jobId);
    if (job) {
      jobs.set(jobId, {
        ...job,
        status: 'completed',
        progress: 100,
        message: 'Analysis complete',
        completedAt: new Date().toISOString(),
        results: {
          product: productData,
          reviews,
          insights,
          priceHistory: generatePriceHistory(),
          sentiment: calculateSentiment(reviews),
        },
      });
    }
  } catch (error) {
    console.error('Job processing error:', error);
    const job = jobs.get(jobId);
    if (job) {
      jobs.set(jobId, {
        ...job,
        status: 'failed',
        message: 'Analysis failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

async function scrapeProduct(url: string) {
  // Mock data - replace with actual Playwright scraping
  return {
    title: 'Premium Cotton T-Shirt for Men',
    price: 299,
    originalPrice: 999,
    discount: 70,
    rating: 4.3,
    reviewCount: 1247,
    seller: 'Fashion Hub',
    category: 'Men\'s Clothing',
    stock: 'In Stock',
    image: 'https://images.meesho.com/images/products/example.jpg',
  };
}

async function scrapeReviews(url: string) {
  // Mock data - replace with actual Playwright scraping
  const mockReviews = [
    { text: 'Great quality! Worth the price. Fits perfectly.', rating: 5, date: '2025-10-15', verified: true },
    { text: 'Good product but color slightly different from image.', rating: 4, date: '2025-10-10', verified: true },
    { text: 'Material is nice but size runs small.', rating: 3, date: '2025-10-05', verified: false },
    { text: 'Excellent! Buying again for my brother.', rating: 5, date: '2025-09-28', verified: true },
    { text: 'Delivery was fast. Product quality is decent.', rating: 4, date: '2025-09-20', verified: true },
  ];

  return mockReviews;
}

async function analyzeWithAI(product: any, reviews: any[]) {
  // Mock AI analysis - replace with actual OpenAI API calls
  return {
    summary: 'Overall this product is trending positively with consistent pricing and repeat purchases. Customers appreciate the quality and fit.',
    buyingStyle: 'Mix of first-time and repeat buyers, with some bulk purchases for gifting',
    salesBehavior: 'Steady upward trend with seasonal peaks in festive months',
    keyTopics: ['Quality', 'Fit', 'Delivery', 'Value for Money', 'Color Accuracy'],
    estimatedRevenue: 372750,
  };
}

function generatePriceHistory() {
  // Generate mock price history
  const history = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const basePrice = 299;
    const variance = Math.random() * 50 - 25;

    history.push({
      date: date.toISOString(),
      price: Math.round(basePrice + variance),
    });
  }

  return history;
}

function calculateSentiment(reviews: any[]) {
  let positive = 0;
  let neutral = 0;
  let negative = 0;

  reviews.forEach(review => {
    if (review.rating >= 4) positive++;
    else if (review.rating === 3) neutral++;
    else negative++;
  });

  return { positive, neutral, negative };
}
