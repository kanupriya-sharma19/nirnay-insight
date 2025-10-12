import React, { useEffect, useMemo, useState } from "react";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ChatbotPopup from "@/pages/ChatbotPopup";

import {
  FileText,
  Upload,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

// Upgraded Dashboard component
import { Shield, Recycle, Zap, Factory, Search, Lightbulb } from "lucide-react"; // make sure to import used icons
import LoadingAnimation from "@/components/animation/Loader";
import ProposalsPage from "./Proposals";



const thrustAreas = {
  "Productivity Improvement": {
    icon: Shield,
    color: "bg-indigo-100 text-indigo-800 border border-indigo-300",
  },
  "Safety & Environment": {
    icon: Shield,
    color: "bg-red-100 text-red-800 border border-red-300",
  },
  "Waste to Wealth": {
    icon: Recycle,
    color: "bg-green-100 text-green-800 border border-green-300",
  },
  "Clean Coal Technologies": {
    icon: Zap,
    color: "bg-teal-100 text-teal-800 border border-teal-300",
  },
  "Coal Beneficiation": {
    icon: Factory,
    color: "bg-blue-100 text-blue-800 border border-blue-300",
  },
  Exploration: {
    icon: Search,
    color: "bg-amber-100 text-amber-800 border border-amber-300",
  },
  "Innovation & Indigenization": {
    icon: Lightbulb,
    color: "bg-purple-100 text-purple-800 border border-purple-300",
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getThrustColor = (area: string) =>
    thrustAreas[area]?.color || "bg-primary";
  const getThrustIcon = (area: string) => thrustAreas[area]?.icon || FileText;
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    // Simulate upload delay (replace this with your actual upload logic)
    setTimeout(() => {
      setLoading(false);
      navigate("/naccer");
    }, 2000);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // sample proposals extended with new fields
  const proposals = [
    {
      id: "UE-2024-001",
      title: "Development of High-Capacity (500T) SAGES-III Goaf Edge Support System",
      thrustArea: "Safety & Environment",
      status: "Unevaluated",
      submittedDate: "2024-12-15",
      evaluationScore: 8.33,
      progress: 83.3,
      reviewer: "Dr. Sharma",
      instituteName: "IIT (ISM) Dhanbad",
      pdfLink: "/static/proposals/PRO-2024-002.pdf",
      financialBreakdown: {
        requested: 30_00_000,
        estimatedROIpercent: 20,
        previousCost: 25_00_000,
      },
      subtopics: ["IoT sensors", "Energy optimization"],
      aiInsights:
        "Technical feasibility is good; scale-up cost needs attention. The proposed solution is highly beneficial for the coal industry, offering improved operational efficiency, safety, and cost optimization.",
    },
    {
      id: "CC-2024-002",
      title: "Sustainable Mining Practices using IoT",
      thrustArea: "Clean Coal Technologies",
      status: "Approved",
      submittedDate: "2025-01-10",
      evaluationScore: 9.88,
      progress: 98,
      reviewer: "Dr. Sharma",
      instituteName: "NIT Rourkela",
      pdfLink: "/static/proposals/PRO-2024-002.pdf",
      financialBreakdown: {
        requested: 30_00_000,
        estimatedROIpercent: 20,
        previousCost: 25_00_000,
      },
      subtopics: ["IoT sensors", "Energy optimization"],
      aiInsights:
        "Technical feasibility is good; scale-up cost needs attention. The proposed solution is highly beneficial for the coal industry, offering improved operational efficiency, safety, and cost optimization.",
    },
    {
      id: "II-2024-001",
      title: "AI-based Coal Quality Assessment System",
      thrustArea: "Innovation & Indigenization",
      status: "Under Review",
      submittedDate: "2025-01-15",
      evaluationScore: 8.0,
      progress: 60,
      reviewer: "Dr. Kumar",
      instituteName: "IIT Dhanbad",
      pdfLink: "/static/proposals/PRO-2024-001.pdf",
      financialBreakdown: {
        requested: 50_00_000,
        estimatedROIpercent: 12,
        previousCost: 40_00_000,
      },
      subtopics: ["Sensor calibration", "Data pipeline", "Model validation"],
      aiInsights:
        "Technical feasibility is good; scale-up cost needs attention. The proposed solution is highly beneficial for the coal industry, offering improved operational efficiency, safety, and cost optimization.",
    },

    {
      id: "SE-2023-045",
      title: "Worker Safety Enhancement through ML",
      thrustArea: "Safety & Environment",
      status: "Rejected",
      submittedDate: "2023-12-20",
      evaluationScore: 3.8,
      progress: 38,
      reviewer: "Dr. Patel",
      instituteName: "BITS Pilani",
      pdfLink: "/static/proposals/PRO-2023-045.pdf",
      financialBreakdown: {
        requested: 10_00_000,
        estimatedROIpercent: 5,
        previousCost: 8_00_000,
      },
      subtopics: ["Dataset bias", "Edge deployment"],
      aiInsights: "Dataset size too small and unclear deployment plan.",
    },
    {
      id: "II-2024-003",
      title: "Predictive Maintenance of Mining Equipment using Digital Twins",
      thrustArea: "Innovation & Indigenization",
      status: "Approved",
      submittedDate: "2024-02-22",
      evaluationScore: 8.6,
      progress: 86,
      reviewer: "Dr. Joshi",
      instituteName: "IIT Kharagpur",
      pdfLink: "/static/proposals/PRO-2024-003.pdf",
      financialBreakdown: {
        requested: 45_00_000,
        estimatedROIpercent: 15,
        previousCost: 42_00_000,
      },
      subtopics: ["Digital twin modeling", "Sensor feedback loops"],
      aiInsights: "High practical value and good industrial readiness.",
    },
    {
      id: "CC-2024-004",
      title: "Clean Coal Gasification for Low Emission Power Plants",
      thrustArea: "Clean Coal Technologies",
      status: "Under Review",
      submittedDate: "2024-03-05",
      evaluationScore: 7.2,
      progress: 72,
      reviewer: "Dr. Mehta",
      instituteName: "IIT BHU",
      pdfLink: "/static/proposals/PRO-2024-004.pdf",
      financialBreakdown: {
        requested: 60_00_000,
        estimatedROIpercent: 18,
        previousCost: 55_00_000,
      },
      subtopics: ["Catalyst optimization", "Emission capture"],
      aiInsights: "Strong potential for emission reduction with moderate cost.",
    },
    {
      id: "SE-2024-005",
      title: "AI-Driven Accident Prevention System in Mines",
      thrustArea: "Safety & Environment",
      status: "Approved",
      submittedDate: "2024-03-18",
      evaluationScore: 9.1,
      progress: 91,
      reviewer: "Dr. Menon",
      instituteName: "IIT Bombay",
      pdfLink: "/static/proposals/PRO-2024-005.pdf",
      financialBreakdown: {
        requested: 35_00_000,
        estimatedROIpercent: 25,
        previousCost: 30_00_000,
      },
      subtopics: ["Predictive vision", "Worker tracking", "Edge AI alerts"],
      aiInsights: "Strong technical maturity and excellent safety ROI.",
    },
    {
      id: "WW-2024-006",
      title: "Waste-to-Wealth Conversion using Bio-Coal Technology",
      thrustArea: "Waste to Wealth",
      status: "Under Review",
      submittedDate: "2024-04-10",
      evaluationScore: 6.8,
      progress: 68,
      reviewer: "Dr. Sen",
      instituteName: "CSIR-CIMFR",
      pdfLink: "/static/proposals/PRO-2024-006.pdf",
      financialBreakdown: {
        requested: 40_00_000,
        estimatedROIpercent: 10,
        previousCost: 38_00_000,
      },
      subtopics: ["Biomass conversion", "Thermal efficiency analysis"],
      aiInsights: "Good concept, but needs validation of yield rates.",
    },
    {
      id: "SE-2024-007",
      title: "Real-Time Dust Exposure Monitoring for Miners",
      thrustArea: "Safety & Environment",
      status: "Under Review",
      submittedDate: "2024-05-02",
      evaluationScore: 5.4,
      progress: 54,
      reviewer: "Dr. Kapoor",
      instituteName: "IIT (ISM) Dhanbad",
      pdfLink: "/static/proposals/PRO-2024-007.pdf",
      financialBreakdown: {
        requested: 25_00_000,
        estimatedROIpercent: 8,
        previousCost: 20_00_000,
      },
      subtopics: ["Air quality sensors", "Alert systems"],
      aiInsights:
        "Feasible and low-cost but needs better integration strategy.",
    },
    {
      id: "EX-2024-008",
      title: "3D Geological Modeling using AI for Resource Estimation",
      thrustArea: "Exploration",
      status: "Approved",
      submittedDate: "2024-06-15",
      evaluationScore: 8.9,
      progress: 89,
      reviewer: "Dr. Iyer",
      instituteName: "IIT Roorkee",
      pdfLink: "/static/proposals/PRO-2024-008.pdf",
      financialBreakdown: {
        requested: 55_00_000,
        estimatedROIpercent: 16,
        previousCost: 48_00_000,
      },
      subtopics: ["3D visualization", "Seismic AI modeling"],
      aiInsights: "Excellent scalability and inter-departmental utility.",
    },
    {
      id: "CC-2024-009",
      title: "AI-Powered Carbon Capture and Utilization",
      thrustArea: "Clean Coal Technologies",
      status: "Rejected",
      submittedDate: "2024-07-01",
      evaluationScore: 4.5,
      progress: 45,
      reviewer: "Dr. Ghosh",
      instituteName: "IISc Bangalore",
      pdfLink: "/static/proposals/PRO-2024-009.pdf",
      financialBreakdown: {
        requested: 70_00_000,
        estimatedROIpercent: 6,
        previousCost: 65_00_000,
      },
      subtopics: ["CO2 adsorption", "Carbon utilization"],
      aiInsights:
        "Innovative idea but lacks clear industrial scalability plan.",
    },
    {
      id: "SE-2024-010",
      title: "Smart Helmet with Real-Time Vital Monitoring for Miners",
      thrustArea: "Safety & Environment",
      status: "Approved",
      submittedDate: "2024-07-18",
      evaluationScore: 9.3,
      progress: 93,
      reviewer: "Dr. Reddy",
      instituteName: "IIT Madras",
      pdfLink: "/static/proposals/PRO-2024-010.pdf",
      financialBreakdown: {
        requested: 28_00_000,
        estimatedROIpercent: 22,
        previousCost: 24_00_000,
      },
      subtopics: [
        "Wearable sensors",
        "Bluetooth integration",
        "Alert dashboard",
      ],
      aiInsights: "Top-rated in innovation and field applicability.",
    },
  ];

  const filterOptions = {
    Status: ["All", "Approved", "Under Review", "Rejected"],
    "Thrust Area": [
      "All",
      "Productivity Improvement",
      "Safety & Environment",
      "Waste to Wealth",
      "Clean Coal Technologies",
      "Coal Beneficiation",
      "Innovation & Indigenization",
      "Exploration",
    ],
    "Evaluation Score": ["All", "≥ 8", "5–7", "Below 5"],
    "Submit Date": ["All", "Last 7 Days", "Last 30 Days", "Older"],
  } as const;

  const [filterType, setFilterType] = useState<string>("Status");
  const [filterValue, setFilterValue] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any | null>(null);
  const [showJustification, setShowJustification] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [justification, setJustification] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [aiResponse, setAiResponse] = useState<{
    decision: string;
    reason: string;
  } | null>(null);
  const [showProposalsPage, setShowProposalsPage] = useState(false);

  // Calculate weighted scores based on evaluation criteria
  const getEvaluationScores = (p: any) => {
    // Base calculations using the overall score
    const technicalFeasibility = Math.min(
      10,
      p.evaluationScore * 0.95 + Math.random() * 0.5
    );
    const potentialImpact = Math.min(
      10,
      p.evaluationScore * 0.92 + Math.random() * 0.3
    );
    const novelty = Math.min(
      10,
      p.evaluationScore * 0.88 + Math.random() * 0.4
    );
    const commercialization = Math.min(
      10,
      p.evaluationScore * 0.98 - Math.random() * 0.2
    );
    const financialFeasibility = Math.min(
      10,
      p.evaluationScore * 0.9 + Math.random() * 0.4
    );
    const team = Math.min(10, p.evaluationScore * 0.96 + Math.random() * 0.3);

    return {
      technicalFeasibility,
      potentialImpact,
      novelty,
      commercialization,
      financialFeasibility,
      team,
      // Weighted sum calculation: Total = (TF*15 + PI*15 + N*15 + CS*25 + FF*15 + T*15) / 100
      weightedTotal:
        (technicalFeasibility * 15 +
          potentialImpact * 15 +
          novelty * 15 +
          commercialization * 25 +
          financialFeasibility * 15 +
          team * 15) /
        100,
    };
  };

  const tableOfContents = [
    { title: "Executive Summary", page: 1 },
    {
      title: "1. Background and Rationale",
      page: 3,
      subsections: [
        { title: "1.1 Problem Statement", page: 3 },
        { title: "1.2 Need Assessment", page: 4 },
        { title: "1.3 Strategic Importance", page: 5 },
      ],
    },
    { title: "2. Objectives", page: 6 },
    {
      title: "3. Scope of Work & Methodology",
      page: 8,
      subsections: [
        { title: "Phase 1: Design & Simulation", page: 8 },
        { title: "Phase 2: Prototype Development", page: 9 },
        { title: "Phase 3: Testing & Validation", page: 10 },
        { title: "Phase 4: Field Deployment", page: 11 },
      ],
    },
    { title: "4. Work Plan & Milestones", page: 12 },
    { title: "5. Deliverables", page: 14 },
    { title: "6. Team & Institutional Capacity", page: 16 },
    { title: "7. Budget & Cost Estimate", page: 18 },
    { title: "8. Risk Assessment", page: 20 },
    { title: "9. Techno-Economic Analysis", page: 22 },
    { title: "References", page: 24 },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Under Review": "bg-yellow-100 text-yellow-800 border border-yellow-300",
      Approved: "bg-green-100 text-green-800 border border-green-300",
      Rejected: "bg-red-100 text-red-800 border border-red-300",
    };
    return styles[status] || "bg-gray-400 text-white";
  };

  const renderStatusSummary = () => {
    const counts = {
      Approved: proposals.filter((p) => p.status === "Approved").length,
      "Under Review": proposals.filter((p) => p.status === "Under Review")
        .length,
      Rejected: proposals.filter((p) => p.status === "Rejected").length,
    };

    const statusStyles: Record<string, string> = {
      Approved: "bg-green-200/30 text-green-100 border border-green-300/50",
      "Under Review":
        "bg-yellow-200/30 text-yellow-100 border border-yellow-300/50",
      Rejected: "bg-red-200/30 text-red-100 border border-red-300/50",
    };

    return (
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        {Object.entries(counts).map(([status, count]) => (
          <div
            key={status}
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-2 min-w-[120px] shadow-sm ${statusStyles[status]}`}
          >
            <span className="text-sm font-semibold tracking-wide uppercase">
              {status}
            </span>
            <span className="text-lg font-bold mt-1">{count}</span>
          </div>
        ))}
      </div>
    );
  };

  const filteredProposals = useMemo(() => {
    const now = new Date();
    return proposals.filter((p) => {
      // --- Search Filter ---
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(query) ||
          p.instituteName.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // --- Dropdown Filters ---
      if (filterValue === "All") return true;

      if (filterType === "Status") return p.status === filterValue;
      if (filterType === "Thrust Area") return p.thrustArea === filterValue;

      if (filterType === "Submit Date") {
        const submitted = new Date(p.submittedDate);
        const diffDays =
          (now.getTime() - submitted.getTime()) / (1000 * 3600 * 24);
        if (filterValue === "Last 7 Days") return diffDays <= 7;
        if (filterValue === "Last 30 Days") return diffDays <= 30;
        if (filterValue === "Older") return diffDays > 30;
      }

      if (filterType === "Evaluation Score") {
        const score = p.evaluationScore;
        if (filterValue === "≥ 8") return score >= 8;
        if (filterValue === "5–7") return score >= 5 && score < 8;
        if (filterValue === "Below 5") return score < 5;
      }

      return true; // Default to include
    });
  }, [filterType, filterValue, searchQuery]);

  const getAiDecision = (p: any) => {
    if (p.evaluationScore >= 8)
      return {
        decision: "Accept",
        reason: "High technical & financial scores.",
      };
    if (p.evaluationScore >= 5)
      return {
        decision: "Revise",
        reason: "Needs improvements in cost breakdown.",
      };
    return {
      decision: "Reject",
      reason: "Low evaluation score and feasibility concerns.",
    };
  };
  

  const openDetails = (p: any) => {
    setSelectedProposal(p);
    setOpenDetail(true);
    setShowJustification(false);
    setSelectedAction("");
    setJustification("");
  };

  const closeDetails = () => {
    setSelectedProposal(null);
    setOpenDetail(false);
    setShowJustification(false);
    setSelectedAction("");
    setJustification("");
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setShowJustification(true);
  };

  const handleSubmitDecision = () => {
    if (!justification.trim()) {
      alert("Please provide a justification for your decision.");
      return;
    }

    let message = "";
    if (selectedAction === "revision") {
      message = `Decision: Request Revision\nJustification: ${justification}\n\nThe proposer will be notified to revise and resubmit.`;
    } else if (selectedAction === "accept") {
      message = `Decision: Accept & Forward\nJustification: ${justification}\n\nProposal will be forwarded to domain experts (APEX, Coal, etc.) as per thrust area.`;
    } else if (selectedAction === "reject") {
      message = `Decision: Reject & Notify\nJustification: ${justification}\n\nOfficial rejection mail will be sent to proposer.`;
    }

    alert(message);
    closeDetails();
  };

  const getBreakdownData = (p: any) => {
    const tech = Math.min(10, p.evaluationScore * 0.4 + 1);
    const fin = Math.min(10, p.evaluationScore * 0.25);
    const impact = Math.min(10, p.evaluationScore * 0.2 + 0.5);
    const novelty = Math.min(10, p.evaluationScore * 0.15 + 0.3);
    return [
      { subject: "Technical", A: tech },
      { subject: "Financial", A: fin },
      { subject: "Impact", A: impact },
      { subject: "Novelty", A: novelty },
    ];
  };

  const formatINR = (n: number) => {
    return `₹${(n / 100000).toFixed(2)}L`;
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="min-h-screen flex flex-col">
      <GovtHeader
        showAuth
        userName="Dr. Ghanshyam Tiwari"
        onLogout={() => navigate("/")}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {showChatbot && (
          <ChatbotPopup
            isChatOpen={showChatbot}
            onClose={() => setShowChatbot(false)}
          />
        )}
        {/* Welcome Banner */}
        <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, Dr. Tiwari!
              </h1>
              <p className="text-primary-foreground/90 mb-4">
                Track your proposals and manage R&D projects efficiently
              </p>
            </div>
            {loading && <LoadingAnimation />}

            <input
              type="file"
              id="fileInput"
              accept=".zip,.rar,.pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />

            {!loading && (
              <Button
                size="lg"
                onClick={triggerFileInput}
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Research Proposal
              </Button>
            )}

            {renderStatusSummary()}
          </div>
        </div>

        {/* Filter Dropdowns */}
        
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or submitter..."
                  className="pl-10"
                />
              </div>

              {/* Evaluation Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowProposalsPage(false)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${!showProposalsPage
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Evaluated
                </button>
                <button
                  onClick={() => setShowProposalsPage(true)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${showProposalsPage
                      ? "bg-red-100 text-red-700 border-red-300"
                      : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Not Evaluated
                </button>
              </div>

              {/* Dropdown Filters */}
              <Select
                onValueChange={(val) => {
                  setFilterType(val);
                  setFilterValue("All");
                }}
                value={filterType}
              >
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Type" />
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
                <SelectTrigger className="w-full md:w-52">
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
          </div>
        

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Proposals</CardTitle>
            <CardDescription>
              Track and manage your research proposals
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!showProposalsPage ? (
              // 🔹 Proposal List Section
              <div className="space-y-4">
                {filteredProposals.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No proposals match the selected filter.
                  </p>
                ) : (
                  filteredProposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="p-6 rounded-xl border-2 hover:border-accent transition-colors gradient-card"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              {React.createElement(
                                getThrustIcon(proposal.thrustArea),
                                { className: "h-5 w-5 text-accent" }
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-primary">
                                  {proposal.title}
                                </h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                • {proposal.id} • {proposal.instituteName}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge
                                  className={`govt-badge ${getThrustColor(
                                    proposal.thrustArea
                                  )}`}
                                >
                                  {proposal.thrustArea}
                                </Badge>
                                <Badge
                                  className={`govt-badge ${getStatusBadge(
                                    proposal.status
                                  )}`}
                                >
                                  {proposal.status}
                                </Badge>
                                <Badge className="govt-badge bg-primary text-white">
                                  Score:{" "}
                                  {proposal.reviewer === "Dr. Sharma"
                                    ? "9.33"
                                    : proposal.reviewer === "Dr. Patel"
                                      ? "3.65"
                                      : proposal.evaluationScore.toFixed(1)}
                                  /10
                                </Badge>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Submitted: {proposal.submittedDate}</span>
                                <span>•</span>
                                <span>Reviewer: {proposal.reviewer}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground">
                              Evaluation Score:
                            </span>
                            <span className="font-semibold text-primary">
                              {proposal.reviewer === "Dr. Sharma"
                                ? 9.33
                                : proposal.reviewer === "Dr. Patel"
                                  ? 3.65
                                  : proposal.evaluationScore.toFixed(1)}
                              /10
                            </span>
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 ">
                          <Button
                            variant="outline"
                            size="lg"
                            className="bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                            onClick={() => openDetails(proposal)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // 🔹 Embedded ProposalsPage Section
                <ProposalsPage />
            )}
          </CardContent>
        </Card>

        {/* Details Modal */}
        <Dialog open={openDetail} onOpenChange={(o) => !o && closeDetails()}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto scroll-smooth">
            <DialogHeader>
              <DialogTitle>Proposal Details</DialogTitle>
            </DialogHeader>

            {selectedProposal && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedProposal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedProposal.id} • {selectedProposal.instituteName} •{" "}
                    {selectedProposal.submittedDate}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-medium">AI Evaluation Summary</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedProposal.aiInsights}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        className={`govt-badge ${getStatusBadge(
                          selectedProposal.status
                        )}`}
                      >
                        {selectedProposal.status}
                      </Badge>
                      <Badge className="govt-badge bg-primary text-white">
                        <Badge className="govt-badge bg-primary text-white">
                          Score:{" "}
                          {selectedProposal.reviewer === "Dr. Sharma"
                            ? 9.33
                            : selectedProposal.reviewer === "Dr. Patel"
                              ? 3.65
                              : selectedProposal.evaluationScore.toFixed(1) /
                              10}{" "}
                          / 10
                        </Badge>
                      </Badge>
                    </div>
                  </div>

                  {/* Weighted Score Calculation Table */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">
                      AI Evaluation Explanation
                    </h4>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                      <h5 className="font-semibold text-sm mb-3 text-blue-900">
                        Weighted Score Calculation (Modified S&T Guidelines
                        2021)
                      </h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-blue-300">
                              <th className="text-left py-2 px-2 font-bold text-gray-700">
                                Criteria
                              </th>
                              <th className="text-center py-2 px-2 font-bold text-gray-700">
                                Score (out of 10)
                              </th>
                              <th className="text-center py-2 px-2 font-bold text-gray-700">
                                Weightage (%)
                              </th>
                              <th className="text-right py-2 px-2 font-bold text-gray-700">
                                Weighted Score
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              const scores =
                                getEvaluationScores(selectedProposal);
                              const criteria = [
                                {
                                  name: "Technical Feasibility",
                                  score: scores.technicalFeasibility,
                                  weight: 15,
                                  details:
                                    "Feasibility & reasonability of technical claims, methodology, roadmap",
                                },
                                {
                                  name: "Potential Impact",
                                  score: scores.potentialImpact,
                                  weight: 15,
                                  details:
                                    "Environmental sustainability, market size, customer demographic",
                                },
                                {
                                  name: "Novelty",
                                  score: scores.novelty,
                                  weight: 15,
                                  details:
                                    "USP(s) of the technology, national importance",
                                },
                                {
                                  name: "Commercialization Strategy",
                                  score: scores.commercialization,
                                  weight: 25,
                                  details:
                                    "Value addition for customers, go-to-market plan, techno-commercial viability",
                                },
                                {
                                  name: "Financial Feasibility",
                                  score: scores.financialFeasibility,
                                  weight: 15,
                                  details:
                                    "Budget justification, cost-benefit analysis, ROI projections",
                                },
                                {
                                  name: "Team",
                                  score: scores.team,
                                  weight: 15,
                                  details:
                                    "Technical & business expertise, mentors",
                                },
                              ];

                              return criteria.map((criterion, idx) => (
                                <tr
                                  key={idx}
                                  className="border-b border-blue-200 hover:bg-blue-100/50 transition-colors"
                                  title={criterion.details}
                                >
                                  <td className="py-2 px-2 font-medium text-gray-800">
                                    {criterion.name}
                                  </td>
                                  <td className="text-center py-2 px-2">
                                    <span className="font-semibold text-blue-700">
                                      {criterion.score.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="text-center py-2 px-2 text-gray-600">
                                    {criterion.weight}%
                                  </td>
                                  <td className="text-right py-2 px-2">
                                    <span className="font-bold text-blue-800">
                                      {(
                                        (criterion.score * criterion.weight) /
                                        10
                                      ).toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              ));
                            })()}
                            <tr className="bg-blue-200/70 font-bold border-t-2 border-blue-400">
                              <td className="py-3 px-2 text-gray-900">
                                Total Weighted Score
                              </td>
                              <td className="text-center py-3 px-2"></td>
                              <td className="text-center py-3 px-2 text-gray-900">
                                100%
                              </td>
                              <td className="text-right py-3 px-2">
                                <span className="text-lg text-blue-900">
                                  {selectedProposal.reviewer === "Dr. Sharma"
                                    ? "9.33"
                                    : selectedProposal.reviewer === "Dr. Patel"
                                      ? "3.65"
                                      : getEvaluationScores(
                                        selectedProposal
                                      ).weightedTotal.toFixed(2)}{" "}
                                  / 10
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 italic">
                        * Weighted Score Formula: (TF × 15% + PI × 15% + Novelty
                        × 15% + CS × 25% + FF × 15% + Team × 15%) / 100
                      </p>
                    </div>

                    {/* Detailed Written Explanations */}
                    <div className="space-y-4">
                      {(() => {
                        const scores = getEvaluationScores(selectedProposal);
                        return (
                          <>
                            <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-blue-900">
                                1. Technical Feasibility (15%) - Score:{" "}
                                {scores.technicalFeasibility.toFixed(2)}/10
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                The proposal demonstrates strong technical
                                feasibility with a score of{" "}
                                {scores.technicalFeasibility.toFixed(2)}/10. The
                                methodology is well-defined with clear phases
                                from design to deployment. The technical roadmap
                                includes realistic milestones and demonstrates
                                understanding of implementation challenges. The
                                approach builds upon proven technologies while
                                introducing innovative improvements. Resource
                                requirements and infrastructure needs are
                                clearly identified.
                                <br />
                                <strong className="text-blue-800">
                                  Weighted Contribution:{" "}
                                  {(
                                    (scores.technicalFeasibility * 15) /
                                    10
                                  ).toFixed(2)}
                                </strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-indigo-600 pl-4 py-2 bg-indigo-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-indigo-900">
                                2. Potential Impact (15%) - Score:{" "}
                                {scores.potentialImpact.toFixed(2)}/10
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                Scoring {scores.potentialImpact.toFixed(2)}/10,
                                this project addresses significant challenges in
                                the coal sector. The proposal demonstrates clear
                                understanding of market needs and stakeholder
                                requirements. Expected benefits include improved
                                operational efficiency, enhanced safety
                                standards, and environmental sustainability. The
                                solution has potential for scalable deployment
                                across multiple sites and shows strong alignment
                                with national priorities.
                                <br />
                                <strong className="text-indigo-800">
                                  Weighted Contribution:{" "}
                                  {((scores.potentialImpact * 15) / 10).toFixed(
                                    2
                                  )}
                                </strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-4 py-2 bg-purple-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-purple-900">
                                3. Novelty (15%) - Score:{" "}
                                {scores.novelty.toFixed(2)}/10
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                With a novelty score of{" "}
                                {scores.novelty.toFixed(2)}/10, the project
                                introduces innovative approaches to existing
                                challenges. The proposal showcases unique
                                selling propositions (USPs) that differentiate
                                it from current solutions. While building on
                                established principles, the project incorporates
                                novel methodologies and technologies. The
                                innovation demonstrates potential for
                                intellectual property generation and contributes
                                to indigenous technology development.
                                <br />
                                <strong className="text-purple-800">
                                  Weighted Contribution:{" "}
                                  {((scores.novelty * 15) / 10).toFixed(2)}
                                </strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-orange-600 pl-4 py-2 bg-orange-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-orange-900">
                                4. Commercialization Strategy (25%) - Score:{" "}
                                {scores.commercialization.toFixed(2)}/10
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                The commercialization potential scores{" "}
                                {scores.commercialization.toFixed(2)}/10 with
                                the highest weightage (25%). The proposal
                                presents a clear pathway from research to market
                                implementation. Industry partnerships and
                                stakeholder engagement demonstrate market
                                readiness. The go-to-market strategy includes
                                pilot deployment, validation, and scale-up
                                plans. Value propositions are clearly
                                articulated for end users and demonstrate
                                competitive advantages. Technology transfer
                                mechanisms and manufacturing partnerships are
                                identified.
                                <br />
                                <strong className="text-orange-800">
                                  Weighted Contribution:{" "}
                                  {(
                                    (scores.commercialization * 25) /
                                    10
                                  ).toFixed(2)}
                                </strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-green-600 pl-4 py-2 bg-green-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-green-900">
                                5. Financial Feasibility (15%) - Score:{" "}
                                {scores.financialFeasibility.toFixed(2)}/10
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                Financial analysis yields a score of{" "}
                                {scores.financialFeasibility.toFixed(2)}/10. The
                                requested budget of{" "}
                                {formatINR(
                                  selectedProposal.financialBreakdown.requested
                                )}{" "}
                                is justified with detailed cost breakdowns
                                across project phases. Budget allocation for
                                equipment, manpower, and operational expenses is
                                clearly defined. Comparison with previous
                                similar projects (cost:{" "}
                                {formatINR(
                                  selectedProposal.financialBreakdown
                                    .previousCost
                                )}
                                ) validates the budget estimates. Expected ROI
                                of{" "}
                                {
                                  selectedProposal.financialBreakdown
                                    .estimatedROIpercent
                                }
                                % demonstrates economic viability. Cost-benefit
                                analysis shows positive returns over the project
                                lifecycle.
                                <br />
                                <strong className="text-green-800">
                                  Weighted Contribution:{" "}
                                  {(
                                    (scores.financialFeasibility * 15) /
                                    10
                                  ).toFixed(2)}
                                </strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-cyan-600 pl-4 py-2 bg-cyan-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-cyan-900">
                                6. Team Capability (15%) - Score:{" "}
                                {scores.team.toFixed(2)}/10
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                The team scores {scores.team.toFixed(2)}/10
                                based on institutional expertise and track
                                record. The proposal is backed by experienced
                                faculty and researchers from{" "}
                                {selectedProposal.instituteName} with relevant
                                domain expertise. The team composition includes
                                technical experts, industry advisors, and
                                project management professionals. Past
                                successful projects and publications demonstrate
                                capability to execute complex R&D initiatives.
                                Collaboration with industry partners ensures
                                practical implementation knowledge and field
                                validation support.
                                <br />
                                <strong className="text-cyan-800">
                                  Weighted Contribution:{" "}
                                  {((scores.team * 15) / 10).toFixed(2)}
                                </strong>
                              </p>
                            </div>

                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-300">
                              <h5 className="font-bold text-base mb-2 text-blue-900">
                                Final Evaluation Summary
                              </h5>
                              <p className="text-sm text-gray-800 leading-relaxed">
                                The proposal achieves an overall weighted score
                                of{" "}
                                <strong className="text-blue-900 text-lg">
                                  {scores.weightedTotal.toFixed(2)}/10
                                </strong>
                                , calculated through the weighted sum method as
                                per Modified S&T Guidelines (2021). This score
                                reflects performance across all evaluation
                                criteria with emphasis on commercialization
                                strategy (25% weight). The evaluation considers
                                technical merit, market potential, innovation
                                level, financial viability, and team capability.
                                The weighted scoring ensures that critical
                                factors for successful project outcomes are
                                appropriately prioritized in the assessment.
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Document Navigation */}
                  <Card className="mb-6 border-2 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Proposal Document Navigation
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Click to navigate to specific sections in the proposal
                        PDF
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 max-h-72 overflow-y-auto pr-2">
                        {tableOfContents.map((section, idx) => (
                          <div key={idx} className="space-y-1">
                            <button
                              onClick={() =>
                                window.open(
                                  `https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/view#page=${section.page}`,
                                  "_blank"
                                )
                              }
                              className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors flex items-center justify-between group border border-transparent hover:border-primary/30"
                            >
                              <span className="font-medium group-hover:text-primary text-gray-800">
                                {section.title}
                              </span>
                              <span className="text-xs text-muted-foreground bg-primary/5 px-2 py-0.5 rounded">
                                p.{section.page}
                              </span>
                            </button>
                            {section.subsections && (
                              <div className="ml-4 space-y-1 border-l-2 border-primary/20 pl-2">
                                {section.subsections.map((sub, subIdx) => (
                                  <button
                                    key={subIdx}
                                    onClick={() =>
                                      window.open(
                                        `https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/view#page=${sub.page}`,
                                        "_blank"
                                      )
                                    }
                                    className="w-full text-left px-2 py-1.5 text-xs hover:bg-primary/5 rounded-md transition-colors flex items-center justify-between group"
                                  >
                                    <span className="group-hover:text-primary text-gray-700">
                                      {sub.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      p.{sub.page}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Evaluation Breakdown</h4>
                    <div style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height={260}>
                        <RadarChart
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          data={getBreakdownData(selectedProposal)}
                        >
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <Radar
                            name="Score"
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Financial Feasibility</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1 text-muted-foreground">
                            Requested Budget
                          </td>
                          <td className="py-1 font-medium">
                            {formatINR(
                              selectedProposal.financialBreakdown.requested
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">
                            Estimated ROI
                          </td>
                          <td className="py-1 font-medium">
                            {
                              selectedProposal.financialBreakdown
                                .estimatedROIpercent
                            }
                            %
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">
                            Previous Similar Project Cost
                          </td>
                          <td className="py-1 font-medium">
                            {formatINR(
                              selectedProposal.financialBreakdown.previousCost
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Subtopics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProposal.subtopics.map((s: string) => (
                        <button
                          key={s}
                          className="px-3 py-1 rounded-full border text-sm text-muted-foreground hover:bg-accent/5"
                          onClick={() => alert(`Highlighting section: ${s}`)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">
                      Compare with Past Projects
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Comparison (cost focus): This proposal requests{" "}
                      {formatINR(selectedProposal.financialBreakdown.requested)}{" "}
                      compared to a previous similar project which cost{" "}
                      {formatINR(
                        selectedProposal.financialBreakdown.previousCost
                      )}
                      .
                    </p>
                  </div>

                  {/* {showChatbot && (
                                <ChatbotPopup
                                  isChatOpen={showChatbot}
                                  onClose={() => setShowChatbot(false)}
                                />
                              )} */}

                  <div className="flex gap-3 mb-4">
                    <Button
                      onClick={() => {
                        const ai = getAiDecision(selectedProposal);
                        setAiResponse(ai);
                        setShowChatbot(true);
                      }}
                    >
                      Ask Nirnay 
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        const pdfUrl =
                          "https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/preview";
                        window.open(pdfUrl, "_blank", "width=1000,height=800");
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Proposal PDF
                    </Button>
                  </div>

                  {/* Justification Section */}
                  {showJustification && (
                    <div className="mt-6 p-4 border-2 border-accent rounded-lg bg-accent/5">
                      <h4 className="font-medium mb-2">
                        Justify Your Decision
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Please provide a detailed justification for your
                        decision. This will be recorded and sent to the
                        proposer.
                      </p>
                      <Textarea
                        placeholder="Enter your justification here..."
                        value={justification}
                        onChange={(e) => setJustification(e.target.value)}
                        className="min-h-[120px] mb-3"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowJustification(false);
                            setSelectedAction("");
                            setJustification("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSubmitDecision}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Submit Decision
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-span-1">
                  <div className="sticky top-6 space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">AI Evaluation</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        AI has analyzed this proposal based on technical merit,
                        financial feasibility, and impact assessment.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg bg-blue-50">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Documents
                      </h4>
                      <div className="space-y-2">
                        <a
                          href="https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg bg-white hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700 font-medium">
                            Full Proposal Document
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Nirnay Assistant</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Ask quick questions about this proposal.
                      </p>
                      <Button
                        onClick={() =>
                          alert("Opening small chat UI (placeholder)")
                        }
                      >
                        Ask AI
                      </Button>
                    </div> */}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {!showJustification && (
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="flex gap-3 flex-1">
                    <Button
                      className="bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                      variant="outline"
                      onClick={() => handleActionClick("revision")}
                    >
                      Request Revision
                    </Button>
                    <Button
                      className="bg-slate-800 text-white hover:bg-slate-700 shadow-lg transition"
                      onClick={() => handleActionClick("accept")}
                    >
                      Accept & Forward
                    </Button>
                    <Button
                      className="bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                      onClick={() => handleActionClick("reject")}
                    >
                      Reject & Notify
                    </Button>
                  </div>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <GovtFooter />
    </div>
  );
}
