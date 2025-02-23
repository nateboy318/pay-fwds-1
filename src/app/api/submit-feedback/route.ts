import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Construct the absolute URL for the sentiment analysis API
    const url = new URL("/api/analyze-sentiment", request.url);

    // Analyze sentiment
    const sentimentResponse = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ response: formData.feedback }),
    });

    const sentimentData = await sentimentResponse.json();
    const sentimentScore = sentimentData.score;

    // Save feedback to the database with sentiment score
    const feedback = await prisma.feedback.create({
      data: {
        name: formData.firstName,
        email: formData.email,
        response: formData.feedback,
        service: formData.service,
        company: formData.company,
        position: formData.position,
        sentiment_score: sentimentScore,
      },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 },
    );
  }
}
