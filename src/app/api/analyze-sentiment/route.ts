import { NextResponse } from 'next/server';
import Sentiment from 'sentiment';

interface SentimentRequest {
  response: string;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: SentimentRequest = await request.json();

    // Validate required field
    if (!body?.response || typeof body.response !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request - response must be a string' },
        { status: 400 }
      );
    }

    // Sanitize input
    const cleanResponse = body.response
      .trim()
      .replace(/<[^>]*>?/gm, '') // Remove HTML tags
      .substring(0, 1000); // Limit input length

    // Validate content length
    if (cleanResponse.length < 3) {
      return NextResponse.json(
        { error: 'Response must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Analyze sentiment
    const sentiment = new Sentiment();
    const result = sentiment.analyze(cleanResponse);

    // Return boolean based on sentiment score
    return NextResponse.json(result.score > 0);

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}