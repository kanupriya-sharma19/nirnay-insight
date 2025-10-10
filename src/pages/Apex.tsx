
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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Under Review": "status-review",
      Approved: "status-approved",
      Rejected: "status-rejected",
    };
    return styles[status] || "status-pending";
  };

  const getThrustColor = (area: string) => {
    const colors: Record<string, string> = {
      Productivity: "bg-indigo-500",
      "Safety & Health": "bg-red-500",
      "Waste to Wealth": "bg-cyan-500",
      Innovation: "bg-royal",
      "Clean Coal": "bg-teal-500",
      Exploration: "bg-blue-500",
    };
    return colors[area] || "bg-primary";
  };

  const formatINR = (n: number) => {
    return `₹${(n / 100000).toFixed(2)}L`;
  };

  const renderStatusSummary = () => {
    const counts = {
      Approved: proposals.filter((p) => p.status === "Approved").length,
      "Under Review": proposals.filter((p) => p.status === "Under Review").length,
      Rejected: proposals.filter((p) => p.status === "Rejected").length,
    };

    return (
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(counts).map(([status, count]) => (
          <Badge key={status} className={`px-4 py-2 text-sm ${getStatusBadge(status)}`}>
            {status}: {count}
          </Badge>
        ))}
      </div>
    );
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

  const getBreakdownData = (p: Proposal) => {
    const tech = Math.min(10, (p.evaluationScore * 0.4) + 1);
    const fin = Math.min(10, (p.evaluationScore * 0.25));
    const impact = Math.min(10, (p.evaluationScore * 0.2) + 0.5);
    const novelty = Math.min(10, (p.evaluationScore * 0.15) + 0.3);
    return [
      { subject: "Technical", A: tech },
      { subject: "Financial", A: fin },
      { subject: "Impact", A: impact },
      { subject: "Novelty", A: novelty },
    ];
  };

  const getAiDecision = (p: Proposal) => {
    if (p.evaluationScore >= 8) return { decision: "Accept", reason: "High technical & financial scores." };
    if (p.evaluationScore >= 5) return { decision: "Revise", reason: "Needs improvements in cost breakdown." };
    return { decision: "Reject", reason: "Low evaluation score and feasibility concerns." };
  };


  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Priya Sharma" onLogout={() => navigate("/")} />

      <main className="flex-1 container mx-auto px-4 py-8">
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
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Select
            onValueChange={(val: string) => {
              setFilterType(val);
              setFilterValue("All");
            }}
            value={filterType}
          >
            <SelectTrigger className="w-48">
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
            <SelectTrigger className="w-56">
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

        {/* Proposals List */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">High-Scoring Proposals (Score ≥ 6.0)</CardTitle>
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
                            <FileText className="h-5 w-5 text-accent" />
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
                    <h4 className="font-medium mb-2">Evaluation Breakdown</h4>
                    <div style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height={260}>
                        <RadarChart cx="50%" cy="50%" outerRadius={80} data={getBreakdownData(selectedProposal)}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <Radar name="Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Financial Feasibility</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1 text-muted-foreground">Requested Budget</td>
                          <td className="py-1 font-medium">{formatINR(selectedProposal.financialBreakdown.requested)}</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Estimated ROI</td>
                          <td className="py-1 font-medium">{selectedProposal.financialBreakdown.estimatedROIpercent}%</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Previous Similar Project Cost</td>
                          <td className="py-1 font-medium">{formatINR(selectedProposal.financialBreakdown.previousCost)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Subtopics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProposal.subtopics.map((s: string) => (
                        <button key={s} className="px-3 py-1 rounded-full border text-sm text-muted-foreground hover:bg-accent/5" onClick={() => alert(`Highlighting section: ${s}`)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <Button onClick={() => {
                      const ai = getAiDecision(selectedProposal);
                      alert(`AI Suggestion: ${ai.decision}\nReason: ${ai.reason}`);
                    }}>AI Suggestion</Button>

                    <a href={selectedProposal.pdfLink} target="_blank" rel="noreferrer">
                      <Button variant="outline">View PDF</Button>
                    </a>
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
    </div>
  );
}
