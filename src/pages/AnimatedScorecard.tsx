import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot } from "lucide-react";

const AnimatedScoreCard = ({ targetScore = 8.24 }) => {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let current = 0;
    const step = 0.4;
    const interval = setInterval(() => {
      current += step;
      if (current >= targetScore) {
        current = targetScore;
        clearInterval(interval);
        setIsLoading(false);
      }
      setScore(parseFloat(current.toFixed(2)));
      setProgress((current / 10) * 100);
    }, 50); // speed of animation (ms)
    return () => clearInterval(interval);
  }, [targetScore]);

  return (
    <Card className="border-2 border-primary/20 bg-white/70 backdrop-blur-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bot
            className={`h-4 w-4 text-primary transition-transform ${
              isLoading ? "animate-spin" : ""
            }`}
          />
          <CardTitle className="text-base font-semibold text-primary">
            Overall Score
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-primary mb-2 transition-all">
            {score.toFixed(2)}/10
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedScoreCard;
