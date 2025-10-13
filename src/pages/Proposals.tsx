import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, FileText, Shield, Recycle, Zap, Factory, Lightbulb } from "lucide-react";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import LoadingAnimation from "@/components/animation/Loader";

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
  status: string;
  submittedDate: string;
  instituteName: string;
  principalInvestigator: string;
  requestedAmount: number;
}

export default function Proposals() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getThrustColor = (area: string) => thrustAreas[area]?.color || "bg-primary";
  const getThrustIcon = (area: string) => thrustAreas[area]?.icon || FileText;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Unevaluated proposals
  const NotEvaluatedProposals: Proposal[] = [
    {
      id: "UE-2024-001",
      title: "Development of High-Capacity (500T) SAGES-III Goaf Edge Support System",
      thrustArea: "Safety & Environment",
      status: "Not Evaluated",
      submittedDate: "2024-12-15",
      instituteName: "IIT (ISM) Dhanbad",
      principalInvestigator: "Prof. U. K. Singh",
      requestedAmount: 296_00_000
    },
    {
      id: "UE-2024-002",
      title: "AI-Based Coal Quality Prediction System",
      thrustArea: "Coal Beneficiation",
      status: "Not Evaluated",
      submittedDate: "2024-12-18",
      instituteName: "NIT Rourkela",
      principalInvestigator: "Dr. Anjali Verma",
      requestedAmount: 180_00_000
    },
    {
      id: "UE-2024-003",
      title: "Advanced Methane Detection using Quantum Sensors",
      thrustArea: "Safety & Environment",
      status: "Not Evaluated",
      submittedDate: "2024-12-20",
      instituteName: "IIT Kharagpur",
      principalInvestigator: "Dr. Suresh Patel",
      requestedAmount: 220_00_000
    },
    {
      id: "UE-2024-004",
      title: "Waste Coal to Energy Conversion Plant",
      thrustArea: "Waste to Wealth",
      status: "Not Evaluated",
      submittedDate: "2024-12-22",
      instituteName: "IIT Bombay",
      principalInvestigator: "Dr. Priya Sharma",
      requestedAmount: 350_00_000
    },
    {
      id: "UE-2024-005",
      title: "Drone-Based Mine Surveying and Mapping",
      thrustArea: "Exploration",
      status: "Not Evaluated",
      submittedDate: "2024-12-25",
      instituteName: "IIT Delhi",
      principalInvestigator: "Dr. Amit Singh",
      requestedAmount: 150_00_000
    }
  ];

  const [proposals] = useState<Proposal[]>(NotEvaluatedProposals);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("Status");
  const [filterValue, setFilterValue] = useState<string>("All");

  const filterOptions = {
    Status: ["All", "Not Evaluated"],
    "Thrust Area": [
      "All",
      "Productivity Improvement",
      "Safety & Environment",
      "Waste to Wealth",
      "Clean Coal Technologies",
      "Coal Beneficiation",
      "Innovation & Indigenization",
      "Exploration"
    ],
    "Submit Date": ["All", "Last 7 Days", "Last 30 Days", "Older"],
  } as const;

  const formatINR = (n: number) => {
    return `₹${(n / 100000).toFixed(2)}L`;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Not Evaluated": "bg-yellow-300 text-black",
      "Under Review": "bg-blue-500 text-white",
      "Approved": "bg-green-500 text-white",
    };
    return styles[status] || "bg-gray-400 text-white";
  };

  const renderStatusSummary = () => {
    const counts = {
      NotEvaluated: proposals.filter((p) => p.status === "Not Evaluated").length,
    };

    return (
      <div className="flex flex-wrap gap-3 mb-6">
        {/* {Object.entries(counts).map(([status, count]) => (
          <Badge
            key={status}
            className={`px-8 py-4 text-sm ${getStatusBadge(status)}`}
          >
            {status}: {count}
          </Badge>
        ))} */}
      </div>
    );
  };

  const filteredProposals = useMemo(() => {
    const now = new Date();
    return proposals.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.instituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.principalInvestigator.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterValue === "All") return matchesSearch;

      if (filterType === "Status") return matchesSearch && p.status === filterValue;
      if (filterType === "Thrust Area") return matchesSearch && p.thrustArea === filterValue;

      if (filterType === "Submit Date") {
        const submitted = new Date(p.submittedDate);
        const diffDays = (now.getTime() - submitted.getTime()) / (1000 * 3600 * 24);
        if (filterValue === "Last 7 Days") return matchesSearch && diffDays <= 7;
        if (filterValue === "Last 30 Days") return matchesSearch && diffDays <= 30;
        if (filterValue === "Older") return matchesSearch && diffDays > 30;
      }

      return matchesSearch;
    });
  }, [proposals, searchQuery, filterType, filterValue]);

  return isLoading ? <LoadingAnimation /> : (
    <div className="min-h-screen flex flex-col">
      {/* <GovtHeader /> */}
      
      <main className="flex-1 container mx-auto px-0 py-0">
        {/* Welcome Banner */}
        {/* <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, NACCER Evaluator! 👋</h1>
              <p className="text-primary-foreground/90">Review and evaluate pending proposals for research funding</p>
            </div>
          </div>
        </div> */}

        {/* Status Summary */}
        {renderStatusSummary()}

        {/* Filter Dropdowns */}
        {/* <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search proposals by title, institute, or PI..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Select
              onValueChange={(val: string) => {
                setFilterType(val);
                setFilterValue("All");
              }}
              value={filterType}
            >
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Filter Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(filterOptions).map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setFilterValue} value={filterValue}>
              <SelectTrigger className="w-full md:w-56">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Value" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions[filterType].map((val) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div> */}

        {/* Proposals List */}
        <Card className="border-0 my-0">
          {/* <CardHeader>
            <CardTitle className="text-2xl">Not Evaluated Proposals</CardTitle>
            <CardDescription>Click on a proposal to begin detailed evaluation</CardDescription>
          </CardHeader> */}
          <CardContent>
            <div className="space-y-4">
              {filteredProposals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No proposals match the selected filter.</p>
              ) : (
                filteredProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-6 rounded-xl border-2 hover:border-accent transition-colors gradient-card cursor-pointer"
                    onClick={() => navigate(`/evaluate/${proposal.id}`)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            {React.createElement(getThrustIcon(proposal.thrustArea), { className: "h-5 w-5 text-accent" })}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg text-primary">{proposal.title}</h3>
                            </div>

                            <p className="text-sm text-muted-foreground mb-1">• {proposal.id} • {proposal.instituteName}</p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className={`govt-badge ${getThrustColor(proposal.thrustArea)} text-white`}>{proposal.thrustArea}</Badge>
                              <Badge className={`govt-badge ${getStatusBadge(proposal.status)}`}>{proposal.status}</Badge>
                              {/* <Badge className="govt-badge bg-primary text-white">{formatINR(proposal.requestedAmount)}</Badge> */}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>PI: {proposal.principalInvestigator}</span>
                              <span>•</span>
                              <span>Submitted: {proposal.submittedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                          onClick={() => navigate(`/evaluate/${proposal.id}`)}
                        >
                          Begin Evaluation
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* <GovtFooter /> */}
    </div>
  );
}