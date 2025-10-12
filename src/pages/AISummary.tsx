import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AISummary = () => {
  const fullText =
    "High innovation and strong cost-benefit. The proposal demonstrates exceptional technical merit and clear implementation roadmap. Recommend for approval with fast-track consideration due to strategic importance in mining safety and indigenous technology development.";

  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 10); // typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-6 border-2 border-primary/20 bg-white/70 backdrop-blur-md shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center gap-2">
        <Bot
          className={`h-4 w-4 text-primary ${
            isStreaming ? "animate-spin-slow" : ""
          }`}
        />
        <CardTitle className="text-base font-semibold text-primary">
          AI Evaluation Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {displayedText}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-primary/50 ml-1 animate-pulse rounded-sm" />
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default AISummary;
