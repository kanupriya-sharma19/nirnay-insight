import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Recycle, Zap, Factory, Lightbulb, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const thrustAreas = {
  "Productivity Improvement": { icon: Shield, color: "bg-indigo-500" },
  "Safety & Environment": { icon: Shield, color: "bg-red-500" },
  "Waste to Wealth": { icon: Recycle, color: "bg-green-500" },
  "Clean Coal Technologies": { icon: Zap, color: "bg-teal-500" },
  "Coal Beneficiation": { icon: Factory, color: "bg-blue-500" },
  "Exploration": { icon: Search, color: "bg-amber-500" },
  "Innovation & Indigenization": { icon: Lightbulb, color: "bg-purple-500" },
};

interface Proposal {
  id: string;
  title: string;
  thrustArea: string;
  instituteName: string;
  principalInvestigator: string;
}

const AISuggestedProposals: React.FC = () => {
  const navigate = useNavigate();

  const aiProposals: Proposal[] = [
    {
      id: "AI-2025-001",
      title: "AI-Based Predictive Maintenance for Mining Equipment",
      thrustArea: "Safety & Environment",
      instituteName: "IIT Kharagpur",
      principalInvestigator: "Dr. Neha Bansal",
    },
    {
      id: "AI-2025-002",
      title: "Intelligent Waste Segregation Using Deep Learning",
      thrustArea: "Safety & Environment",
      instituteName: "NIT Trichy",
      principalInvestigator: "Dr. Arjun Nair",
    },
    {
      id: "AI-2025-003",
      title: "Autonomous Drone Exploration for Mine Mapping",
      thrustArea: "Safety & Environment",
      instituteName: "IIT Delhi",
      principalInvestigator: "Dr. Sneha Gupta",
    },
  ];

  const getThrustIcon = (area: string) => thrustAreas[area]?.icon || FileText;
  const getThrustColor = (area: string) => thrustAreas[area]?.color || "bg-gray-500";

  return (
    <div className="container mx-auto px-2 py-8">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">AI Suggested Proposals</CardTitle>
          <CardDescription>Proposals recommended by the AI evaluation engine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-5 rounded-xl border hover:border-accent transition-colors gradient-card shadow-sm cursor-pointer"
                onClick={() => navigate(`/evaluate/${proposal.id}`)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    {React.createElement(getThrustIcon(proposal.thrustArea), { className: "h-5 w-5 text-accent" })}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary leading-tight">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{proposal.instituteName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className={`${getThrustColor(proposal.thrustArea)} text-white`}>
                    {proposal.thrustArea}
                  </Badge>
                  <Badge className="bg-gray-200 text-gray-800">PI: {proposal.principalInvestigator}</Badge>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="mt-4 w-full bg-slate-800 text-white hover:bg-slate-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/evaluate/${proposal.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISuggestedProposals;
