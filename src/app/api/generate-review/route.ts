import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { position, company, feedback, service } = await request.json();

    const prompt = `Write a genuine, personal review about PayFWDs ${service} service in UNDER 50 WORDS. You are a ${position} at ${company} sharing your experience.

Your feedback was: "${feedback}"

Guidelines:
- Must be under 50 words total
- Write naturally as if recommending to a colleague
- Mention your role and company
- Focus on your actual experience
- Keep it concise but impactful

Example tone (but use your own words):
"As a [role] at [company], PayFWDs [service] has been fantastic because [benefit]."`;

    console.log("Request Data:", { position, company, feedback, service });
    console.log("Generated Prompt:", prompt);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const generatedReview = completion.choices[0].message.content;
    console.log("AI Response:", generatedReview);

    return NextResponse.json({ review: generatedReview });
  } catch (error) {
    console.error("Error generating review:", error);
    return NextResponse.json(
      { error: "Failed to generate review" },
      { status: 500 },
    );
  }
}
