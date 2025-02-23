"use client";
import Link from "next/link";

export default function Sorry() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-8 pt-20 sm:pt-12">
      <main className="max-w-2xl mx-auto text-center p-2 sm:p-0">
        <h1 className="text-3xl sm:text-4xl font-bold sm:mb-6 mb-2 text-gray-800">
          Thank you for the feedback!{" "}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Your feedback is valuable to us and will help us improve.
        </p>
        <p className="text-gray-600 mb-6">
          If you need immediate support, please reach out to our team at{" "}
          <a
            href="mailto:support@example.com"
            className="text-brand1 hover:underline"
          >
            support@example.com
          </a>
        </p>
        <Link
          href="/"
          className="inline-block bg-brand1 text-white py-3 px-6 rounded-none outline-none font-semibold hover:bg-blue-400 transition-colors text-base"
        >
          Return Home
        </Link>
      </main>
    </div>
  );
}
