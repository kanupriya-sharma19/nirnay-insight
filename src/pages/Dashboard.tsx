import React, { useMemo, useState } from "react";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

// Upgraded Dashboard component
export default function Dashboard() {
  const navigate = useNavigate();

  // sample proposals extended with new fields
  const proposals = [
    {
      id: "II-2024-001",
      title: "AI-based Coal Quality Assessment System",
      thrustArea: "Innovation & Indigenization",
      status: "Under Review",
      submittedDate: "2025-01-15",
      evaluationScore: 6.0,
      progress: 60,
      reviewer: "Dr. Kumar",
      instituteName: "IIT Dhanbad",
      pdfLink: "/static/proposals/PRO-2024-001.pdf",
      financialBreakdown: { requested: 50_00_000, estimatedROIpercent: 12, previousCost: 40_00_000 },
      subtopics: ["Sensor calibration", "Data pipeline", "Model validation"],
      aiInsights: "Technical feasibility is good; scale-up cost needs attention.",
    },
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
      financialBreakdown: { requested: 10_00_000, estimatedROIpercent: 5, previousCost: 8_00_000 },
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
      financialBreakdown: { requested: 45_00_000, estimatedROIpercent: 15, previousCost: 42_00_000 },
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
      financialBreakdown: { requested: 60_00_000, estimatedROIpercent: 18, previousCost: 55_00_000 },
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
      financialBreakdown: { requested: 35_00_000, estimatedROIpercent: 25, previousCost: 30_00_000 },
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
      financialBreakdown: { requested: 40_00_000, estimatedROIpercent: 10, previousCost: 38_00_000 },
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
      financialBreakdown: { requested: 25_00_000, estimatedROIpercent: 8, previousCost: 20_00_000 },
      subtopics: ["Air quality sensors", "Alert systems"],
      aiInsights: "Feasible and low-cost but needs better integration strategy.",
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
      financialBreakdown: { requested: 70_00_000, estimatedROIpercent: 6, previousCost: 65_00_000 },
      subtopics: ["CO2 adsorption", "Carbon utilization"],
      aiInsights: "Innovative idea but lacks clear industrial scalability plan.",
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
      "Exploration"
    ],
    "Evaluation Score": ["All", "≥ 8", "5–7", "Below 5"],
    "Submit Date": ["All", "Last 7 Days", "Last 30 Days", "Older"],
  } as const;

  const [filterType, setFilterType] = useState<string>("Status");
  const [filterValue, setFilterValue] = useState<string>("All");

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any | null>(null);
  const [showJustification, setShowJustification] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [justification, setJustification] = useState("");

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

  const getAiDecision = (p: any) => {
    if (p.evaluationScore >= 8) return { decision: "Accept", reason: "High technical & financial scores." };
    if (p.evaluationScore >= 5) return { decision: "Revise", reason: "Needs improvements in cost breakdown." };
    return { decision: "Reject", reason: "Low evaluation score and feasibility concerns." };
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

  const formatINR = (n: number) => {
    return `₹${(n / 100000).toFixed(2)}L`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Rajesh Kumar" onLogout={() => navigate("/")} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Kumar! 👋</h1>
              <p className="text-primary-foreground/90">Track your proposals and manage your R&D projects efficiently</p>
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
            <CardTitle className="text-2xl">My Proposals</CardTitle>
            <CardDescription>Track and manage your research proposals</CardDescription>
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

                            <p className="text-sm text-muted-foreground mb-1">• {proposal.instituteName}</p>

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

                      <div className="flex lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 ">
                        <Button variant="outline" size="lg" className="bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition" onClick={() => openDetails(proposal)}>
                          View Details
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
              <DialogTitle>Proposal Details</DialogTitle>
            </DialogHeader>

            {selectedProposal && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-2">{selectedProposal.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedProposal.id} • {selectedProposal.instituteName} • {selectedProposal.submittedDate}</p>

                  <div className="mb-4">
                    <h4 className="font-medium">AI Evaluation Summary</h4>
                    <p className="text-sm text-muted-foreground mt-1">{selectedProposal.aiInsights}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className={`govt-badge ${getStatusBadge(selectedProposal.status)}`}>{selectedProposal.status}</Badge>
                      <Badge className="govt-badge bg-primary text-white">Score: {selectedProposal.evaluationScore.toFixed(1)}/10</Badge>
                    </div>
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

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Compare with Past Projects</h4>
                    <p className="text-sm text-muted-foreground">Comparison (cost focus): This proposal requests {formatINR(selectedProposal.financialBreakdown.requested)} compared to a previous similar project which cost {formatINR(selectedProposal.financialBreakdown.previousCost)}.</p>
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
                      <h4 className="font-medium mb-2">AI Evaluation</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        AI has analyzed this proposal based on technical merit, financial feasibility, and impact assessment.
                      </p>
                    </div>

                    {/* <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Financial Snapshot</h4>
                      <p className="text-sm text-muted-foreground">Requested: {formatINR(selectedProposal.financialBreakdown.requested)}</p>
                      <p className="text-sm text-muted-foreground">ROI: {selectedProposal.financialBreakdown.estimatedROIpercent}%</p>
                    </div> */}

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