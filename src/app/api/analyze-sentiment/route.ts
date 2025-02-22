// analyze-sentiment/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface SentimentRequest {
  name: string;
  email: string;
  response: string;
  rating: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: SentimentRequest = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.response || body.rating === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate rating
    if (typeof body.rating !== 'number' || body.rating < 0 || body.rating > 10) {
      return NextResponse.json(
        { error: 'Invalid rating. Must be a number between 0-10' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Calculate sentiment (threshold at 6)
    const isPositive = body.rating >= 6;

    // Return only the boolean value
    return NextResponse.json(isPositive);

  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }
}