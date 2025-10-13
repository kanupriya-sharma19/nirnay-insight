import React from "react";
import { useState, useEffect , useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Bot, FileText, MessageSquare, Save, Send, Shield } from "lucide-react";
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
// import LoadingAnimation from "@/components/animation/Loader";
import { toast } from "sonner";
import ChatbotPopup from "@/pages/ChatbotPopup";
import AISuggestedProposals from "./Suggestions";
import AISummary from "./AISummary";
import AnimatedScoreCard from "./AnimatedScorecard";
import EvaluationLoader from "@/components/animation/EvaluationLoader";

interface EvaluationScores {
  technicalFeasibility: number;
  potentialImpact: number;
  novelty: number;
  commercialization: number;
  financialFeasibility: number;
  team: number;
  weightedTotal: number;
}

interface ProposalData {
  id: string;
  title: string;
  thrustArea: string;
  instituteName: string;
  principalInvestigator: string;
  submittedDate: string;
  requestedAmount: number;
  estimatedROI: number;
  previousCost: number;
}

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

export default function NirnayEvaluation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [isEvaluationLoading, setIsEvaluationLoading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [evaluationNotes, setEvaluationNotes] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const evaluationRef = useRef(null);

  // Mock proposal data
  const proposalData: ProposalData = {
    id: id || "UE-2024-001",
    title: "Development of High-Capacity (500T) SAGES-III Goaf Edge Support System",
    thrustArea: "Safety & Environment",
    instituteName: "IIT (ISM) Dhanbad",
    principalInvestigator: "Prof. U. K. Singh",
    submittedDate: "2024-12-15",
    requestedAmount: 296_00_000,
    estimatedROI: 18,
    previousCost: 280_00_000
  };

  // Generate evaluation scores
  const getEvaluationScores = (): EvaluationScores => {
    const technicalFeasibility = 9.5;
    const potentialImpact = 9.4;
    const novelty = 9.1;
    const commercialization = 9.8;
    const financialFeasibility = 9;
    const team = 8.9;

    return {
      technicalFeasibility,
      potentialImpact,
      novelty,
      commercialization,
      financialFeasibility,
      team,
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

  const scores = getEvaluationScores();

  const criteria = [
    {
      name: "Technical Feasibility",
      score: scores.technicalFeasibility,
      weight: 15,
      details: "Feasibility & reasonability of technical claims, methodology, roadmap",
      explanation: "The proposed SAGES-III system demonstrates strong technical feasibility with a score of " + scores.technicalFeasibility.toFixed(2) + "/10. The design builds upon proven SAGES-II technology, with incremental improvements to achieve 500T capacity. The collaboration between IIT (ISM), SECL, APHMEL, and JBEPL ensures access to necessary facilities and expertise. The methodology is well-defined with clear phases from design to field deployment. The technical roadmap is realistic with appropriate milestones."
    },
    {
      name: "Potential Impact",
      score: scores.potentialImpact,
      weight: 15,
      details: "Environmental sustainability, market size, customer demographic",
      explanation: "Scoring " + scores.potentialImpact.toFixed(2) + "/10, this project addresses critical safety needs in underground coal mining. The enhanced load capacity enables safer operations in high-stress zones and supports increased mechanization. Expected benefits include reduced roof fall incidents, improved worker safety, and enhanced productivity in depillaring operations. The environmental sustainability aspect is strong with focus on safer extraction methods and reduced accidents."
    },
    {
      name: "Novelty",
      score: scores.novelty,
      weight: 15,
      details: "USP(s) of the technology, national importance",
      explanation: "With a novelty score of " + scores.novelty.toFixed(2) + "/10, the project introduces indigenous development of high-capacity goaf edge support systems. While building on existing SAGES technology, the 500T capacity represents a significant advancement over current systems. The integration with continuous miners in challenging geological conditions adds innovative application value. The USP lies in combining higher capacity with portability and rapid deployment capabilities, addressing gaps in current mining support technology."
    },
    {
      name: "Commercialization Strategy",
      score: scores.commercialization,
      weight: 25,
      details: "Value addition for customers, go-to-market plan, techno-commercial viability",
      explanation: "The commercialization potential scores " + scores.commercialization.toFixed(2) + "/10 with the highest weightage (25%). Partnership with JBEPL (manufacturing partner) provides a clear pathway to production and market entry. Demonstrated demand from SECL and other coal companies ensures market viability and customer base. Technology transfer agreements and manufacturing scale-up plans are well-defined. The go-to-market strategy includes pilot deployment, performance validation, and gradual rollout across mining operations. Import substitution benefits add to commercial attractiveness."
    },
    {
      name: "Financial Feasibility",
      score: scores.financialFeasibility,
      weight: 15,
      details: "Budget justification, cost-benefit analysis, ROI projections",
      explanation: "Financial analysis yields a score of " + scores.financialFeasibility.toFixed(2) + "/10. The total project cost of ₹2.96 crore is reasonable for R&D scope including prototype development and field trials. Budget allocation across phases is well-justified with clear cost breakdowns for equipment (₹1.2 crore), manpower (₹80 lakhs), and operational expenses (₹96 lakhs). The requested budget of ₹" + (proposalData.requestedAmount / 100000).toFixed(2) + "L aligns with comparable projects (previous cost: ₹" + (proposalData.previousCost / 100000).toFixed(2) + "L). Expected ROI of " + proposalData.estimatedROI + "% through safety improvements and productivity gains supports economic viability. Cost-benefit analysis shows positive NPV over 5-year horizon."
    },
    {
      name: "Team",
      score: scores.team,
      weight: 15,
      details: "Technical & business expertise, mentors",
      explanation: "The team scores " + scores.team.toFixed(2) + "/10 based on institutional expertise and past experience. IIT (ISM) brings proven research capabilities in mining engineering and ground control with faculty expertise in rock mechanics. SECL provides operational insights, field testing infrastructure, and real-world validation environment. APHMEL offers specialized testing facilities for load testing and quality certification. Combined track record in SAGES-I (300T) and SAGES-II (350T) development demonstrates capability to execute this advanced 500T project. The project team includes experienced principal investigators with relevant publications and industry connections."
    }
  ];

  const formatINR = (n: number) => {
    return `₹${(n / 100000).toFixed(2)}L`;
  };

  const getThrustColor = (area: string) => {
    const colors: Record<string, string> = {
      "Safety & Environment": "bg-red-500"
    };
    return colors[area] || "bg-primary";
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoading(false);
      // setIsEvaluationLoading(true);
    }, 2000);
  //   const timer2 = setTimeout(() => {
  //     setIsEvaluationLoading(false);
  // }, 3000);
    return () => {clearTimeout(timer1) 
    // clearTimeout(timer2);
  }}, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsEvaluationLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleSaveEvaluation = () => {
    toast.success("Evaluation notes saved successfully!");
  };

  const handleSubmitEvaluation = () => {
    if (!evaluationNotes.trim()) {
      toast.error("Please add evaluation notes before submitting");
      return;
    }
    toast.success("Evaluation submitted successfully!");
    setTimeout(() => {
      navigate("/naccer");
    }, 1500);
  };
  
  if (isLoading) {
    return <EvaluationLoader />;
  }
  // if (isEvaluationLoading) {
  //   return <LoadingAnimation />;
  // }


  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Ghanshyam Tiwari" onLogout={() => navigate("/")} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h1 className="text-2xl font-bold text-primary mb-2">{proposalData.title}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={`${getThrustColor(proposalData.thrustArea)} text-white`}>
                {proposalData.thrustArea}
              </Badge>
              <Badge variant="outline">{proposalData.id}</Badge>
              <Badge variant="outline">{proposalData.instituteName}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>PI: {proposalData.principalInvestigator} • Submitted: {proposalData.submittedDate}</p>
              <p className="mt-1">Requested: {formatINR(proposalData.requestedAmount)} • Estimated ROI: {proposalData.estimatedROI}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AISummary />

            {/* Weighted Score Table */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">AI Evaluation Explanation</h4>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-3">
                  <div className="relative">
                    <Bot className="h-10 w-10 text-primary animate-spin-slow" />
                  </div>
                  <p className="text-sm text-muted-foreground">AI is analyzing proposal</p>
                </div>
              ) : (
                <>
                  {/* Weighted Score Table */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 mb-6 animate-fadeIn">
                    <h5 className="font-semibold text-sm mb-3 text-blue-900">
                      Weighted Score Calculation (Modified S&T Guidelines 2021)
                    </h5>
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
                          {criteria.map((criterion, idx) => (
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
                          ))}
                          <tr className="bg-blue-200/70 font-bold border-t-2 border-blue-400">
                            <td className="py-3 px-2 text-gray-900">Total Weighted Score</td>
                            <td className="text-center py-3 px-2"></td>
                            <td className="text-center py-3 px-2 text-gray-900">100%</td>
                            <td className="text-right py-3 px-2">
                              <span className="text-lg text-blue-900">
                                {scores.weightedTotal.toFixed(2)} / 10
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
                  <div className="space-y-4 animate-fadeIn">
                    {criteria.map((criterion, idx) => (
                      <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50">
                        <h5 className="font-semibold text-sm mb-2 text-blue-900">
                          {idx + 1}. {criterion.name} ({criterion.weight}%) - Score: {criterion.score.toFixed(2)}/10
                        </h5>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {criterion.explanation}
                          <br /><strong className="text-blue-800">Weighted Contribution: {((criterion.score * criterion.weight) / 10).toFixed(2)}</strong>
                        </p>
                      </div>
                    ))}

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
                  </div>
                </>
              )}
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

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Overall Score Card */}
              <AnimatedScoreCard />

              {/* Score Summary */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-base">Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {criteria.map((criterion, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{criterion.name}</span>
                        <span className="font-semibold text-primary">{criterion.score.toFixed(1)}</span>
                      </div>
                      <Progress value={criterion.score * 10} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Ask Nirnay */}
              <Card className="border-2 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    Ask Nirnay
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Get AI insights about this proposal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setShowChatbot(true)} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Nirnay Assistant
                  </Button>
                </CardContent>
              </Card>

              {/* Document Access */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const pdfUrl = "https://drive.google.com/file/d/1YL_wqSUwGTMOTe5ye4SrIssluGJmsedu/preview";
                      window.open(pdfUrl, '_blank', 'width=1000,height=800');
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Proposal
                  </Button>
                    
                    
                </CardContent>
              </Card>
                      
            </div>
          </div>
        </div>
      </main>
      <AISuggestedProposals />
            <div className="w-full h-32 flex mb-10">
  {/* Left Half - Empty */}
  <div className="w-1/2 h-full"></div>
  
  {/* Right Half - Button More to the Right */}
  <div className="w-1/2 h-full flex justify-end items-center pr-20">
    <Button
      variant="outline"
      onClick={() => navigate("/naccer")}
      className="bg-slate-800 text-white hover:bg-slate-700"
    >
      ← Back to Proposals
    </Button>
  </div>
</div>

      {showChatbot && (
        <ChatbotPopup
          isChatOpen={showChatbot}
          onClose={() => setShowChatbot(false)}
        />
      )}

      <GovtFooter />
    </div>
  );
}