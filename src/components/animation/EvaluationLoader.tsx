import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
// import { GovtHeader } from "@/components/GovtHeader";
// import { GovtFooter } from "@/components/GovtFooter";

export default function EvaluationLoader() {
  const [loadingMessage, setLoadingMessage] = useState("Initializing NIRNAY AI...");

  useEffect(() => {
    const messages = [
      "Initializing NIRNAY AI...",
      "Analyzing proposal content...",
      "Evaluating technical feasibility...",
      "Assessing financial viability...",
      "Generating comprehensive evaluation...",
    ];

    let i = 0;
    const msgInterval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingMessage(messages[i]);
    }, 600);

    return () => clearInterval(msgInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <GovtHeader /> */}

      {/* Center Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 space-y-8 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Spinner Icon */}
          <Loader2 className="w-14 h-14 text-blue-600 animate-spin" />

          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Evaluating Proposal</h2>
            <p className="text-lg text-blue-600 animate-pulse mt-1">{loadingMessage}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-lg bg-gray-200 rounded-full h-2 overflow-hidden mt-6">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-progress"></div>
        </div>
      </main>

      {/* <GovtFooter /> */}

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
