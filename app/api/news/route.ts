import { NextResponse } from "next/server";
export async function GET() {
  try {
    throw new Error("Simulated internal server error!");
    // Dummy news data
    const dummyNews = [
      {
        id: "1",
        title: "Breaking News: AI Advances Rapidly",
        content:
          "Researchers have announced a significant breakthrough in artificial intelligence, leading to more human-like interactions and problem-solving capabilities.",
        author: "AI Insights Team",
        publishedAt: "2025-07-08T10:00:00Z",
        imageUrl: "https://placehold.co/600x400/FF5733/FFFFFF?text=AI+News",
      },
      {
        id: "2",
        title: "Global Economy Shows Resilience Amidst Challenges",
        content:
          "Despite ongoing global challenges, recent reports indicate a surprising resilience in key economic sectors, with growth projections revised upwards.",
        author: "Economic Watch",
        publishedAt: "2025-07-07T14:30:00Z",
        imageUrl:
          "https://placehold.co/600x400/33FF57/000000?text=Economy+News",
      },
      {
        id: "3",
        title: "New Space Mission Discovers Exoplanet",
        content:
          "A groundbreaking new space mission has successfully identified a potentially habitable exoplanet, sparking excitement among the scientific community.",
        author: "Cosmic Discoveries",
        publishedAt: "2025-07-06T08:15:00Z",
        imageUrl: "https://placehold.co/600x400/3366FF/FFFFFF?text=Space+News",
      },
      {
        id: "4",
        title: "Innovations in Renewable Energy Technologies",
        content:
          "The latest advancements in solar and wind power are paving the way for a more sustainable future, with efficiency rates reaching new highs.",
        author: "Green Tech Daily",
        publishedAt: "2025-07-05T11:00:00Z",
        imageUrl: "https://placehold.co/600x400/FFFF33/000000?text=Energy+News",
      },
      {
        id: "5",
        title: "Health Breakthrough: New Treatment for Rare Disease Approved",
        content:
          "After years of research, a novel treatment for a rare genetic disease has received regulatory approval, offering hope to thousands of patients worldwide.",
        author: "Medical Innovations",
        publishedAt: "2025-07-04T09:45:00Z",
        imageUrl: "https://placehold.co/600x400/8A2BE2/FFFFFF?text=Health+News",
      },
    ];

    // Simulate a successful response
    return NextResponse.json(dummyNews, { status: 200 });
  } catch (error) {
    // Basic error handling for the dummy data generation itself (unlikely to hit)
    return NextResponse.json(
      {
        message: "Errror Simulated.",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
