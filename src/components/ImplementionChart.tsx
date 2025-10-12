// components/ReviewImpactChart.tsx

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  CartesianGrid,
} from "recharts";

interface PerformanceData {
  date: string;
  reviewCompletionPercentage: number;
}

const NIRNAY_LAUNCH = "2025-09-23";
const TODAY_DATE = "2025-10-12";

const generateImpactData = (): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const startDate = new Date("2025-06-01");

  for (let i = 0; i < 180; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    let basePerformance: number;
    let fluctuation: number;

    if (currentDate < new Date(NIRNAY_LAUNCH)) {
      basePerformance = 70; // Manual review completion %
      fluctuation = (Math.random() - 0.5) * 5;
    } else {
      const daysSinceLaunch =
        (currentDate.getTime() - new Date(NIRNAY_LAUNCH).getTime()) /
        (1000 * 3600 * 24);
      const gradualImprovement = Math.min(daysSinceLaunch / 15, 1) * 20; // NIRNAY improves by ~20%
      basePerformance = 70 + gradualImprovement;
      fluctuation = (Math.random() - 0.5) * 3;
    }

    data.push({
      date: dateStr,
      reviewCompletionPercentage: parseFloat(
        (basePerformance + fluctuation).toFixed(1)
      ),
    });
  }
  return data;
};

const chartData = generateImpactData();

const calculateImprovement = () => {
  const beforeData = chartData.filter(
    (item) => item.date < NIRNAY_LAUNCH
  );
  const afterData = chartData.filter(
    (item) => item.date >= NIRNAY_LAUNCH && item.date <= TODAY_DATE
  );

  const avgBefore =
    beforeData.reduce((sum, item) => sum + item.reviewCompletionPercentage, 0) /
    beforeData.length;
  const avgAfter =
    afterData.reduce((sum, item) => sum + item.reviewCompletionPercentage, 0) /
    afterData.length;

  return {
    avgBefore: parseFloat(avgBefore.toFixed(1)),
    avgAfter: parseFloat(avgAfter.toFixed(1)),
    improvement: parseFloat((avgAfter - avgBefore).toFixed(1)),
  };
};

export function ReviewImpactChart() {
  const { avgBefore, avgAfter, improvement } = calculateImprovement();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <span>Research Proposal Review Performance</span>
        </CardTitle>
        <CardDescription>
          Comparison of manual vs. NIRNAY-assisted review completion rates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-12 mb-2">
          <div className="absolute left-0 top-0 w-1/2 flex justify-center">
            <span className="text-sm font-bold text-black bg-green-50 px-3 py-1 rounded-lg border border-green-200">
              Manual Review
            </span>
          </div>
          <div className="absolute right-0 top-0 w-1/2 flex justify-center">
            <span className="text-sm font-bold text-black bg-green-50 px-3 py-1 rounded-lg border border-green-200">
              System Review
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) =>
                new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
              }
              label={{
                value: "Date",
                position: "insideBottom",
                offset: -15,
                style: { fill: "#000000", fontWeight: "bold", textAnchor: "middle" },
              }}
            />
            <YAxis
              domain={[50, 100]}
              tickFormatter={(tick) => `${tick}%`}
              label={{
                value: "Review Completion (%)",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#000000", fontWeight: "bold", textAnchor: "middle" },
              }}
            />
            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-GB")
              }
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Completion"]}
            />
            <ReferenceLine
              x={NIRNAY_LAUNCH}
              stroke="#DC2626"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{ value: "NIRNAY Launch", position: "top", fill: "#DC2626", fontSize: 14, fontWeight: "bold" }}
            />
            <ReferenceLine
              x={TODAY_DATE}
              stroke="#8B5CF6"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{ value: "TODAY", position: "top", fill: "#8B5CF6", fontSize: 14, fontWeight: "bold" }}
            />
            <ReferenceArea
              x1={chartData[0].date}
              x2={new Date(new Date(NIRNAY_LAUNCH).getTime() - 24 * 3600 * 1000).toISOString().split("T")[0]}
              fill="rgba(16,185,129,0.1)"
            />
            <ReferenceArea
              x1={new Date(new Date(NIRNAY_LAUNCH).getTime() + 24 * 3600 * 1000).toISOString().split("T")[0]}
              x2={chartData[chartData.length - 1].date}
              fill="rgba(16,185,129,0.05)"
            />
            <Area
              type="monotone"
              dataKey="reviewCompletionPercentage"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorPerformance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
