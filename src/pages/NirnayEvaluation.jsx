import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";

export default function EvaluationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing NIRNAY AI...");
  const proposalId = "II-2024-001"; // This would come from route params in actual implementation

  useEffect(() => {
    // Simulate loading with changing messages
    const messages = [
      "Initializing NIRNAY AI...",
      "Analyzing proposal content...",
      "Evaluating technical feasibility...",
      "Assessing financial viability...",
      "Generating comprehensive evaluation..."
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 1000);

    // Simulate 5 second loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(messageInterval);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <GovtHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
              <div className="flex flex-col items-center space-y-6">
                {/* Animated Loader */}
                <div className="relative">
                  <div className="w-24 h-24 border-8 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-pulse" />
                  </div>
                </div>

                {/* Loading Text */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Evaluating Proposal</h2>
                  <p className="text-lg font-medium text-blue-600 animate-pulse">
                    {loadingMessage}
                  </p>
                  <p className="text-sm text-gray-500">Proposal ID: {proposalId}</p>
                </div>

                {/* Progress Indicator */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-progress"></div>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Please wait while NIRNAY AI analyzes the proposal...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Evaluation Complete!</h2>
                <p className="text-gray-600">
                  NIRNAY AI has successfully evaluated Proposal ID: {proposalId}
                </p>
                <div className="pt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">Evaluation Results</h3>
                    <p className="text-gray-700 mb-4">
                      The detailed evaluation results and recommendations will be displayed here.
                      This section will contain the AI-generated insights, scoring breakdown, and actionable recommendations.
                    </p>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium text-gray-700">Overall Score:</span>
                        <span className="text-xl font-bold text-blue-600">8.5 / 10</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium text-gray-700">Recommendation:</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Approve with Minor Revisions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <GovtFooter />

      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s ease-in-out;
        }
      `}</style>
    </div>
  );
}