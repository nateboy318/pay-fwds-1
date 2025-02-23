import { NextResponse } from "next/server";
import Sentiment from "sentiment";

export async function POST(request: Request) {
  try {
    const { response } = await request.json();

    if (!response || typeof response !== "string") {
      return NextResponse.json({ error: "Invalid response" }, { status: 400 });
    }

    console.log("Analyzing sentiment for response:", response);

    const sentiment = new Sentiment();
    const customWords = {
      "doesn't": -2,
      "isn't": -2,
      not: -2,
      worst: -3,
      bad: -2,
      inaccurate: -2,
      poor: -2,
      lacking: -2,
      unreliable: -2,
      disappointing: -2,
    };

    const result = sentiment.analyze(response, { extras: customWords });

    console.log("Sentiment analysis result:", result);

    // More stringent scoring - only allow strictly positive feedback
    const isPositive = result.score > 0;

    console.log("Is feedback positive?", isPositive);

    return NextResponse.json({
      isPositive,
      score: result.score,
    });
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
