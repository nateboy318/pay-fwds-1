"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  FaFacebook,
  FaGoogle,
  FaClipboard,
  FaEdit,
  FaSave,
} from "react-icons/fa";

export default function Success() {
  const searchParams = useSearchParams();
  
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState("");

  useEffect(() => {
    const feedbackValue = searchParams.get("feedback") || "";
    const serviceValue = searchParams.get("service") || "";
    const positionValue = searchParams.get("position") || "";
    const companyValue = searchParams.get("company") || "";



    // Generate review with the actual values, not the state
    generateReview({
      feedback: feedbackValue,
      service: serviceValue,
      position: positionValue,
      company: companyValue,
    });

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0, y: 0.9 },
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 1, y: 0.9 },
    });
  }, [searchParams]);

  const generateReview = async (data: {
    feedback: string;
    service: string;
    position: string;
    company: string;
  }) => {
    try {
      const response = await fetch("/api/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setGeneratedReview(responseData.review);
    } catch (error) {
      console.error("Error generating review:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (platform: "facebook" | "google") => {
    const text = encodeURIComponent(generatedReview);

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${text}`,
        "_blank",
      );
    } else {
      navigator.clipboard
        .writeText(generatedReview)
        .then(() => {
          console.log("Review copied to clipboard");
          window.open(
            `https://www.google.com/search?q=payfwds&oq=payfwds&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMg0IARAuGK8BGMcBGIAEMgYIAhBFGEAyCggDEAAYgAQYogQyCggEEAAYgAQYogQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg1NDQxajFqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x8869992f3f6ae381:0x7195f1f2040cfac3,3,,,,`,
            "_blank",
          );
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedReview)
      .then(() => {
        console.log("Review copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedReview(generatedReview);
  };

  const handleSave = () => {
    setGeneratedReview(editedReview);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 flex items-center justify-center">
      <main className="max-w-xl w-full text-center">
        <h1 className="text-4xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Thank You for Your Feedback!
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          We have built a review for you. Just click once and review us on
          Facebook or Google in less than 30 seconds.
        </p>

        <div className="bg-gray-100 rounded-lg p-6 sm:p-8 mb-6 sm:mb-8 text-left">
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-brand1"></div>
              <span className="ml-2 sm:ml-3 text-gray-700">
                Generating your review...
              </span>
            </div>
          ) : (
            <div className="text-left">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                  We Built A Review Based On Your Feedback:
                </h2>
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="flex items-center gap-2 text-brand1 hover:text-blue-600"
                >
                  {isEditing ? <FaSave size={18} /> : <FaEdit size={18} />}
                </button>
              </div>
              {isEditing ? (
                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-base sm:text-lg text-gray-700 leading-relaxed min-h-[150px]"
                />
              ) : (
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  &quot;{generatedReview}&quot;
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleShare("facebook")}
              className="flex justify-center items-center gap-2 bg-[#1877F2] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#166FE5] transition-colors"
              disabled={isGenerating}
            >
              <FaFacebook size={20} />
              Share on Facebook
            </button>
            <button
              onClick={() => handleShare("google")}
              className="flex justify-center items-center gap-2 bg-[#DB4437] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#C53929] transition-colors"
              disabled={isGenerating}
            >
              <FaGoogle size={20} />
              Review on Google
            </button>
          </div>
          <button
            onClick={handleCopyToClipboard}
            className="flex justify-center items-center text-center sm:text-left gap-2 bg-gray-100 text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isGenerating}
          >
            <FaClipboard size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
