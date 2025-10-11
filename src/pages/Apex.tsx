import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Video,
  Bell,
  TrendingUp,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";
import ProposalCard from "@/components/ProposalCard";
import ProposalModal from "@/components/ProposalModal";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, Recycle, Zap, Factory, Lightbulb } from "lucide-react"; // make sure to import used icons
import LoadingAnimation from "@/components/animation/Loader";
import ChatbotPopup from "./ChatbotPopup";


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
  evaluationScore: number;
  progress: number;
  reviewer: string;
  instituteName: string;
  pdfLink: string;
  financialBreakdown: { requested: number; estimatedROIpercent: number; previousCost: number };
  subtopics: string[];
  aiInsights: string;
  naccerSelectionReason: string;
}

export default function ApexPage() {
  const navigate = useNavigate();
  const getThrustColor = (area: string) => thrustAreas[area]?.color || "bg-primary";
  const getThrustIcon = (area: string) => thrustAreas[area]?.icon || FileText;
  const [showChatbot, setShowChatbot] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ decision: string; reason: string } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
  )

  // Only approved proposals with evaluation scores above 6
  const initialProposals: Proposal[] = [
    {
      id: "CC-2024-002",
      title: "Sustainable Mining Practices using IoT",
      thrustArea: "Clean Coal Technologies",
      status: "Approved",
      submittedDate: "2025-01-10",
      evaluationScore: 9.8,
      progress: 98,
      reviewer: "Dr. Sharma",
      instituteName: "NIT Rourkela",
      pdfLink: "/static/proposals/PRO-2024-002.pdf",
      financialBreakdown: { requested: 30_00_000, estimatedROIpercent: 20, previousCost: 25_00_000 },
      subtopics: ["IoT sensors", "Energy optimization"],
      aiInsights: "High innovation and strong cost-benefit. Recommend fast-track.",
      naccerSelectionReason: "Selected by NACCER due to exceptional technical merit (9.8/10 score) and strong potential for immediate industry implementation. The proposal demonstrates clear cost-benefit analysis with 20% ROI and addresses critical environmental sustainability goals in mining operations. The IoT-based approach aligns with national digitization initiatives and shows scalable deployment potential across multiple mining sites.",
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
      financialBreakdown: { requested: 45_00_000, estimatedROIpercent: 15, previousCost: 42_00_000 },
      subtopics: ["Digital twin modeling", "Sensor feedback loops"],
      aiInsights: "High practical value and good industrial readiness.",
      naccerSelectionReason: "Approved by NACCER for its innovative use of digital twin technology in mining equipment maintenance. The proposal scored 8.6/10 with strong technical feasibility and clear implementation roadmap. IIT Kharagpur's proven track record in industrial automation and the 15% projected ROI make this a strategic investment for modernizing India's mining infrastructure and reducing equipment downtime.",
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
      financialBreakdown: { requested: 35_00_000, estimatedROIpercent: 25, previousCost: 30_00_000 },
      subtopics: ["Predictive vision", "Worker tracking", "Edge AI alerts"],
      aiInsights: "Strong technical maturity and excellent safety ROI.",
      naccerSelectionReason: "NACCER selected this proposal (9.1/10 score) for its direct impact on miner safety and alignment with national safety standards. The AI-driven accident prevention system addresses critical safety challenges in Indian mines. IIT Bombay's expertise in AI/ML and the exceptional 25% ROI projection, combined with potential to save lives, made this a priority selection for immediate funding and implementation.",
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
      financialBreakdown: { requested: 55_00_000, estimatedROIpercent: 16, previousCost: 48_00_000 },
      subtopics: ["3D visualization", "Seismic AI modeling"],
      aiInsights: "Excellent scalability and inter-departmental utility.",
      naccerSelectionReason: "Selected by NACCER (8.9/10 score) for its strategic importance in geological exploration and resource estimation. The 3D AI modeling approach represents cutting-edge technology that can revolutionize mineral exploration in India. IIT Roorkee's geological expertise and the proposal's potential for cross-departmental utility (mining, petroleum, groundwater) justify the ₹55L investment with strong 16% ROI projections.",
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
      financialBreakdown: { requested: 28_00_000, estimatedROIpercent: 22, previousCost: 24_00_000 },
      subtopics: ["Wearable sensors", "Bluetooth integration", "Alert dashboard"],
      aiInsights: "Top-rated in innovation and field applicability.",
      naccerSelectionReason: "NACCER's top-rated selection (9.3/10 score) due to its immediate practical application and worker safety benefits. The smart helmet technology addresses real-time health monitoring needs in hazardous mining environments. IIT Madras's proven IoT expertise, combined with the proposal's cost-effectiveness (₹28L budget) and exceptional 22% ROI, make this an ideal pilot project for nationwide deployment in mining operations."
    },
  ];

  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("Status");
  const [filterValue, setFilterValue] = useState<string>("All");
  const [openDetail, setOpenDetail] = useState(false);
  const [showJustification, setShowJustification] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [justification, setJustification] = useState("");

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
      "Exploration"
    ],
    "Evaluation Score": ["All", "≥ 8", "5–7", "Below 5"],
    "Submit Date": ["All", "Last 7 Days", "Last 30 Days", "Older"],
  } as const;


  const renderStatusSummary = () => {
    const counts = {
      Approved: proposals.filter((p) => p.status === "Approved").length,
      "Under Review": proposals.filter((p) => p.status === "Under Review").length,
      Rejected: proposals.filter((p) => p.status === "Rejected").length,
    };

    return (
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(counts).map(([status, count]) => (
          <Badge
            key={status}
            className={`px-8 py-4 text-sm ${getStatusBadge(status)}`}
          >
            {status}: {count}
          </Badge>
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Under Review": "bg-yellow-300 text-black",
      Approved: "bg-green-500 text-white",
      Rejected: "bg-red-500 text-white",
    };
    return styles[status] || "bg-gray-400 text-white";
  };

  const formatINR = (n: number) => {
    return `₹${(n / 100000).toFixed(2)}L`;
  };


  // Load data from localStorage on component mount
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProposals = localStorage.getItem("apexProposals");
    if (savedProposals) {
      const parsedProposals = JSON.parse(savedProposals);
      setProposals(parsedProposals);
    }
  }, []);
  // Filter proposals using Dashboard-style filters
  const filteredProposals = useMemo(() => {
    const now = new Date();
    return proposals.filter((p) => {
      if (filterValue === "All") return true;

      if (filterType === "Status") return p.status === filterValue;
      if (filterType === "Thrust Area") return p.thrustArea === filterValue;

      if (filterType === "Submit Date") {
        const submitted = new Date(p.submittedDate);
        const diffDays = (now.getTime() - submitted.getTime()) / (1000 * 3600 * 24);
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

      return true;
    });
  }, [filterType, filterValue]);

  const openDetails = (p: Proposal) => {
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
      message = `Decision: Accept & Forward\nJustification: ${justification}\n\nProposal will be forwarded to implementation phase.`;
    } else if (selectedAction === "reject") {
      message = `Decision: Reject & Notify\nJustification: ${justification}\n\nOfficial rejection mail will be sent to proposer.`;
    }

    alert(message);
    closeDetails();
  };

  // Calculate weighted scores based on evaluation criteria
  const getEvaluationScores = (p: Proposal) => {
    // Base calculations using the overall score
    const technicalFeasibility = Math.min(10, (p.evaluationScore * 0.95) + Math.random() * 0.5);
    const potentialImpact = Math.min(10, (p.evaluationScore * 0.92) + Math.random() * 0.3);
    const novelty = Math.min(10, (p.evaluationScore * 0.88) + Math.random() * 0.4);
    const commercialization = Math.min(10, (p.evaluationScore * 0.98) - Math.random() * 0.2);
    const financialFeasibility = Math.min(10, (p.evaluationScore * 0.90) + Math.random() * 0.4);
    const team = Math.min(10, (p.evaluationScore * 0.96) + Math.random() * 0.3);

    return {
      technicalFeasibility,
      potentialImpact,
      novelty,
      commercialization,
      financialFeasibility,
      team,
      // Weighted sum calculation: Total = (TF*15 + PI*15 + N*15 + CS*25 + FF*15 + T*15) / 100
      weightedTotal: (
        (technicalFeasibility * 15) +
        (potentialImpact * 15) +
        (novelty * 15) +
        (commercialization * 25) +
        (financialFeasibility * 15) +
        (team * 15)
      ) / 100
    };
  };

  const tableOfContents = [
    { title: "Executive Summary", page: 1 },
    {
      title: "1. Background and Rationale", page: 3, subsections: [
        { title: "1.1 Goaf Edge Support & SAGES Technology", page: 3 },
        { title: "1.2 Need for Higher Capacity (500 T)", page: 4 },
        { title: "1.3 Integration with Continuous Miners", page: 5 },
        { title: "1.4 Problem Statement / Gaps", page: 6 },
        { title: "1.5 Strategic Importance", page: 7 },
      ]
    },
    { title: "2. Objectives", page: 8 },
    {
      title: "3. Scope of Work & Methodology", page: 10, subsections: [
        { title: "Phase 1: Design & Simulation", page: 10 },
        { title: "Phase 2: Prototype Manufacturing", page: 11 },
        { title: "Phase 3: Pre-field Testing & Calibration", page: 12 },
        { title: "Phase 4: Field Deployment & Trials", page: 13 },
        { title: "Phase 5: Evaluation & Reporting", page: 14 },
      ]
    },
    { title: "4. Work Plan & Milestones", page: 15 },
    { title: "5. Deliverables / Outputs", page: 18 },
    { title: "6. Team, Roles & Institutional Capacity", page: 20 },
    { title: "7. Budget & Cost Estimate", page: 22 },
    { title: "8. Monitoring & Evaluation", page: 24 },
    { title: "9. Risk Assessment & Mitigation", page: 26 },
    { title: "10. Techno-Economic Analysis Framework", page: 28 },
    { title: "11. Regulatory, Safety & Environmental Compliance", page: 30 },
    { title: "12. Conclusion", page: 32 },
    { title: "References", page: 33 },
    {
      title: "Appendices", page: 34, subsections: [
        { title: "A: CVs of Key Personnel", page: 34 },
        { title: "B: Letters of Collaboration", page: 40 },
        { title: "C: Safety / Regulatory Guidelines", page: 42 },
        { title: "D: Technical Standards & Material Specifications", page: 45 },
      ]
    },
  ];

  const getBreakdownData = (p: Proposal) => {
    const scores = getEvaluationScores(p);
    return [
      { subject: "Technical Feasibility", A: scores.technicalFeasibility, fullMark: 10 },
      { subject: "Potential Impact", A: scores.potentialImpact, fullMark: 10 },
      { subject: "Novelty", A: scores.novelty, fullMark: 10 },
      { subject: "Commercialization", A: scores.commercialization, fullMark: 10 },
      { subject: "Financial Feasibility", A: scores.financialFeasibility, fullMark: 10 },
      { subject: "Team", A: scores.team, fullMark: 10 },
    ];
  };

  const getAiDecision = (p: Proposal) => {
    if (p.evaluationScore >= 8) return { decision: "Accept", reason: "High technical & financial scores." };
    if (p.evaluationScore >= 5) return { decision: "Revise", reason: "Needs improvements in cost breakdown." };
    return { decision: "Reject", reason: "Low evaluation score and feasibility concerns." };
  };


  return (isLoading ? <LoadingAnimation /> : (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Priya Sharma" onLogout={() => navigate("/")} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {showChatbot && (
        <ChatbotPopup
          isChatOpen={showChatbot}
          onClose={() => setShowChatbot(false)}
        />
      )}
        {/* Welcome Banner */}
        <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. Priya Sharma! 👋</h1>
              <p className="text-primary-foreground/90">Apex Committee Member - Review and manage high-scoring proposals</p>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        {renderStatusSummary()}

        {/* Filter Dropdowns */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search proposals by title or submitter..."
                  className="pl-10"
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
        </div>
        {/* Proposals List */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Proposal</CardTitle>
            <CardDescription>Review and make final decisions on approved proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProposals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No proposals match the selected filter.</p>
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
                              <Badge className="govt-badge bg-primary text-white">Score: {proposal.evaluationScore.toFixed(1)}/10</Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Submitted: {proposal.submittedDate}</span>
                              <span>•</span>
                              <span>Reviewer: {proposal.reviewer}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-muted-foreground">Evaluation Score:</span>
                          <span className="font-semibold text-primary">{proposal.evaluationScore.toFixed(1)} / 10</span>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                        <Button variant="outline" size="lg" className="bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition" onClick={() => openDetails(proposal)}>
                          Review Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        {/* Details Modal */}
        <Dialog open={openDetail} onOpenChange={(o) => !o && closeDetails()}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto scroll-smooth">
            <DialogHeader>
              <DialogTitle>Proposal Details - Apex Committee Review</DialogTitle>
            </DialogHeader>

            {selectedProposal && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-2">{selectedProposal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedProposal.id} • {selectedProposal.instituteName} • {selectedProposal.submittedDate}</p>

                  <div className="mb-4">
                    <h4 className="font-medium">NACCER Selection Rationale</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{selectedProposal.naccerSelectionReason}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className={`govt-badge ${getStatusBadge(selectedProposal.status)}`}>{selectedProposal.status}</Badge>
                      <Badge className="govt-badge bg-primary text-white">Score: {selectedProposal.evaluationScore.toFixed(1)}/10</Badge>
                      <Badge className="govt-badge bg-green-600 text-white">NACCER Approved</Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium">AI Evaluation Summary</h4>
                    <p className="text-sm text-muted-foreground mt-1">{selectedProposal.aiInsights}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">AI Evaluation Explanation</h4>

                    {/* Weighted Score Table */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                      <h5 className="font-semibold text-sm mb-3 text-blue-900">Weighted Score Calculation (Modified S&T Guidelines 2021)</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-blue-300">
                              <th className="text-left py-2 px-2 font-bold text-gray-700">Criteria</th>
                              <th className="text-center py-2 px-2 font-bold text-gray-700">Score (out of 10)</th>
                              <th className="text-center py-2 px-2 font-bold text-gray-700">Weightage (%)</th>
                              <th className="text-right py-2 px-2 font-bold text-gray-700">Weighted Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              const scores = getEvaluationScores(selectedProposal);
                              const criteria = [
                                { name: "Technical Feasibility", score: scores.technicalFeasibility, weight: 15, details: "Feasibility & reasonability of technical claims, methodology, roadmap" },
                                { name: "Potential Impact", score: scores.potentialImpact, weight: 15, details: "Environmental sustainability, market size, customer demographic" },
                                { name: "Novelty", score: scores.novelty, weight: 15, details: "USP(s) of the technology, national importance" },
                                { name: "Commercialization Strategy", score: scores.commercialization, weight: 25, details: "Value addition for customers, go-to-market plan, techno-commercial viability" },
                                { name: "Financial Feasibility", score: scores.financialFeasibility, weight: 15, details: "Budget justification, cost-benefit analysis, ROI projections" },
                                { name: "Team", score: scores.team, weight: 15, details: "Technical & business expertise, mentors" }
                              ];

                              return criteria.map((criterion, idx) => (
                                <tr key={idx} className="border-b border-blue-200 hover:bg-blue-100/50 transition-colors" title={criterion.details}>
                                  <td className="py-2 px-2 font-medium text-gray-800">{criterion.name}</td>
                                  <td className="text-center py-2 px-2">
                                    <span className="font-semibold text-blue-700">{criterion.score.toFixed(2)}</span>
                                  </td>
                                  <td className="text-center py-2 px-2 text-gray-600">{criterion.weight}%</td>
                                  <td className="text-right py-2 px-2">
                                    <span className="font-bold text-blue-800">
                                      {((criterion.score * criterion.weight) / 10).toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              ));
                            })()}
                            <tr className="bg-blue-200/70 font-bold border-t-2 border-blue-400">
                              <td className="py-3 px-2 text-gray-900">Total Weighted Score</td>
                              <td className="text-center py-3 px-2"></td>
                              <td className="text-center py-3 px-2 text-gray-900">100%</td>
                              <td className="text-right py-3 px-2">
                                <span className="text-lg text-blue-900">
                                  {getEvaluationScores(selectedProposal).weightedTotal.toFixed(2)} / 10
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 italic">
                        * Weighted Score Formula: (TF × 15% + PI × 15% + Novelty × 15% + CS × 25% + FF × 15% + Team × 15%) / 100
                      </p>
                    </div>

                    {/* Detailed Written Explanations */}
                    <div className="space-y-4">
                      {(() => {
                        const scores = getEvaluationScores(selectedProposal);
                        return (
                          <>
                            <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-blue-900">1. Technical Feasibility (15%) - Score: {scores.technicalFeasibility.toFixed(2)}/10</h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                The proposed SAGES-III system demonstrates strong technical feasibility with a score of {scores.technicalFeasibility.toFixed(2)}/10.
                                The design builds upon proven SAGES-II technology, with incremental improvements to achieve 500T capacity.
                                The collaboration between IIT (ISM), SECL, APHMEL, and JBEPL ensures access to necessary facilities and expertise.
                                The methodology is well-defined with clear phases from design to field deployment. The technical roadmap is realistic with appropriate milestones.
                                <br /><strong className="text-blue-800">Weighted Contribution: {((scores.technicalFeasibility * 15) / 10).toFixed(2)}</strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-indigo-600 pl-4 py-2 bg-indigo-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-indigo-900">2. Potential Impact (15%) - Score: {scores.potentialImpact.toFixed(2)}/10</h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                Scoring {scores.potentialImpact.toFixed(2)}/10, this project addresses critical safety needs in underground coal mining.
                                The enhanced load capacity enables safer operations in high-stress zones and supports increased mechanization.
                                Expected benefits include reduced roof fall incidents, improved worker safety, and enhanced productivity in depillaring operations.
                                The environmental sustainability aspect is strong with focus on safer extraction methods and reduced accidents.
                                <br /><strong className="text-indigo-800">Weighted Contribution: {((scores.potentialImpact * 15) / 10).toFixed(2)}</strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-4 py-2 bg-purple-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-purple-900">3. Novelty (15%) - Score: {scores.novelty.toFixed(2)}/10</h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                With a novelty score of {scores.novelty.toFixed(2)}/10, the project introduces indigenous development of high-capacity goaf edge support systems.
                                While building on existing SAGES technology, the 500T capacity represents a significant advancement over current systems.
                                The integration with continuous miners in challenging geological conditions adds innovative application value.
                                The USP lies in combining higher capacity with portability and rapid deployment capabilities, addressing gaps in current mining support technology.
                                <br /><strong className="text-purple-800">Weighted Contribution: {((scores.novelty * 15) / 10).toFixed(2)}</strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-orange-600 pl-4 py-2 bg-orange-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-orange-900">4. Commercialization Strategy (25%) - Score: {scores.commercialization.toFixed(2)}/10</h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                The commercialization potential scores {scores.commercialization.toFixed(2)}/10 with the highest weightage (25%).
                                Partnership with JBEPL (manufacturing partner) provides a clear pathway to production and market entry.
                                Demonstrated demand from SECL and other coal companies ensures market viability and customer base.
                                Technology transfer agreements and manufacturing scale-up plans are well-defined. The go-to-market strategy includes pilot deployment,
                                performance validation, and gradual rollout across mining operations. Import substitution benefits add to commercial attractiveness.
                                <br /><strong className="text-orange-800">Weighted Contribution: {((scores.commercialization * 25) / 10).toFixed(2)}</strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-green-600 pl-4 py-2 bg-green-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-green-900">5. Financial Feasibility (15%) - Score: {scores.financialFeasibility.toFixed(2)}/10</h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                Financial analysis yields a score of {scores.financialFeasibility.toFixed(2)}/10.
                                The total project cost of ₹2.96 crore is reasonable for R&D scope including prototype development and field trials.
                                Budget allocation across phases is well-justified with clear cost breakdowns for equipment (₹1.2 crore), manpower (₹80 lakhs),
                                and operational expenses (₹96 lakhs). The requested budget of {formatINR(selectedProposal.financialBreakdown.requested)}
                                aligns with comparable projects (previous cost: {formatINR(selectedProposal.financialBreakdown.previousCost)}).
                                Expected ROI of {selectedProposal.financialBreakdown.estimatedROIpercent}% through safety improvements and productivity gains
                                supports economic viability. Cost-benefit analysis shows positive NPV over 5-year horizon.
                                <br /><strong className="text-green-800">Weighted Contribution: {((scores.financialFeasibility * 15) / 10).toFixed(2)}</strong>
                              </p>
                            </div>

                            <div className="border-l-4 border-cyan-600 pl-4 py-2 bg-cyan-50/50">
                              <h5 className="font-semibold text-sm mb-2 text-cyan-900">6. Team Capability (15%) - Score: {scores.team.toFixed(2)}/10</h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                The team scores {scores.team.toFixed(2)}/10 based on institutional expertise and past experience.
                                IIT (ISM) brings proven research capabilities in mining engineering and ground control with faculty expertise in rock mechanics.
                                SECL provides operational insights, field testing infrastructure, and real-world validation environment.
                                APHMEL offers specialized testing facilities for load testing and quality certification.
                                Combined track record in SAGES-I (300T) and SAGES-II (350T) development demonstrates capability to execute this advanced 500T project.
                                The project team includes experienced principal investigators with relevant publications and industry connections.
                                <br /><strong className="text-cyan-800">Weighted Contribution: {((scores.team * 15) / 10).toFixed(2)}</strong>
                              </p>
                            </div>

                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-300">
                              <h5 className="font-bold text-base mb-2 text-blue-900">Final Evaluation Summary</h5>
                              <p className="text-sm text-gray-800 leading-relaxed">
                                The proposal achieves an overall weighted score of <strong className="text-blue-900 text-lg">{scores.weightedTotal.toFixed(2)}/10</strong>,
                                calculated through the weighted sum method as per Modified S&T Guidelines (2021).
                                This score reflects strong performance across all evaluation criteria with particular strength in commercialization strategy (25% weight),
                                technical feasibility, and team capability. The financial analysis supports viability with justified budget and positive ROI projections.
                                The project addresses national priorities in mining safety and indigenous technology development.
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
                      <CardDescription className="text-xs">Click to navigate to specific sections in the proposal PDF</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 max-h-72 overflow-y-auto pr-2">
                        {tableOfContents.map((section, idx) => (
                          <div key={idx} className="space-y-1">
                            <button
                              onClick={() => window.open(`https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/view#page=${section.page}`, '_blank')}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors flex items-center justify-between group border border-transparent hover:border-primary/30"
                            >
                              <span className="font-medium group-hover:text-primary text-gray-800">{section.title}</span>
                              <span className="text-xs text-muted-foreground bg-primary/5 px-2 py-0.5 rounded">p.{section.page}</span>
                            </button>
                            {section.subsections && (
                              <div className="ml-4 space-y-1 border-l-2 border-primary/20 pl-2">
                                {section.subsections.map((sub, subIdx) => (
                                  <button
                                    key={subIdx}
                                    onClick={() => window.open(`https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/view#page=${sub.page}`, '_blank')}
                                    className="w-full text-left px-2 py-1.5 text-xs hover:bg-primary/5 rounded-md transition-colors flex items-center justify-between group"
                                  >
                                    <span className="group-hover:text-primary text-gray-700">{sub.title}</span>
                                    <span className="text-xs text-muted-foreground">p.{sub.page}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3 mb-4">
                    <Button
                      onClick={() => {
                        const ai = getAiDecision(selectedProposal);
                        setAiResponse(ai);
                        setShowChatbot(true);
                      }}
                    >
                      AI Suggestion
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        const pdfUrl = "https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/preview";
                        window.open(pdfUrl, '_blank', 'width=1000,height=800');
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Proposal PDF
                    </Button>
                  </div>

                  {/* Justification Section */}
                  {showJustification && (
                    <div className="mt-6 p-4 border-2 border-accent rounded-lg bg-accent/5">
                      <h4 className="font-medium mb-2">Justify Your Decision</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Please provide a detailed justification for your decision. This will be recorded and sent to the proposer.
                      </p>
                      <Textarea
                        placeholder="Enter your justification here..."
                        value={justification}
                        onChange={(e) => setJustification(e.target.value)}
                        className="min-h-[120px] mb-3"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => {
                          setShowJustification(false);
                          setSelectedAction("");
                          setJustification("");
                        }}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitDecision} className="bg-primary hover:bg-primary/90">
                          Submit Decision
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-span-1">
                  <div className="sticky top-6 space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Apex Committee Review</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        This proposal has passed initial review and requires final approval from the Apex Committee.
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
                          <span className="text-sm text-blue-700 font-medium">Full Proposal Document</span>
                        </a>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Nirnay Assistant</h4>
                      <p className="text-sm text-muted-foreground mb-2">Ask quick questions about this proposal.</p>
                      <Button onClick={() => alert('Opening small chat UI (placeholder)')}>Ask AI</Button>
                    </div>
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
                      Revision
                    </Button>
                    <Button
                      className="bg-slate-800 text-white hover:bg-slate-700 shadow-lg transition"
                      onClick={() => handleActionClick("accept")}
                    >
                      Final Approval
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
    </div>)
  );
}
