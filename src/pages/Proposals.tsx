import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Building2, Star, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useNavigate } from "react-router-dom";


// Mock StatusBadge component
const StatusBadge = ({ status }: { status: string }) => (
  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
    {status}
  </span>
);


interface Proposal {
  id: number;
  title: string;
  submittedBy: string;
  department: string;
  status: string;
  dateSubmitted: string;
  content: string;
  abstract: string;
  needsEvaluation?: boolean;
}

const dummyProposals: Proposal[] = [
  {
    id: 1,
    title: "Implementation of Digital Infrastructure for Rural Healthcare Centers",
    submittedBy: "Dr. Rajesh Kumar",
    department: "Ministry of Health and Family Welfare",
    status: "Pending Evaluation",
    dateSubmitted: "2024-10-05",
    needsEvaluation: true,
    abstract: "A comprehensive digital transformation initiative for rural healthcare centers across India, focusing on telemedicine facilities, electronic health records, and mobile diagnostic units to improve healthcare accessibility in remote areas.",
    content: `This proposal outlines a comprehensive plan to digitize healthcare infrastructure in rural areas across India. The initiative aims to establish telemedicine facilities, electronic health records systems, and mobile health units equipped with digital diagnostic tools.

Key Components:
1. Installation of high-speed internet connectivity in 500 rural healthcare centers
2. Training of healthcare workers on digital tools and telemedicine platforms
3. Development of a centralized patient database system
4. Mobile health units with portable diagnostic equipment

Expected Outcomes:
- Improved access to healthcare services in remote areas
- Reduced patient travel time and costs
- Better health data collection and analysis
- Enhanced coordination between rural and urban healthcare facilities

Budget Requirement: ₹250 crores over 3 years
Timeline: 36 months for complete implementation

The proposal addresses the critical need for healthcare accessibility in rural India and aligns with the Digital India initiative.`
  },
  {
    id: 2,
    title: "National AI-Powered Education Platform for Skill Development",
    submittedBy: "Prof. Anita Sharma",
    department: "Ministry of Education",
    status: "Pending Evaluation", 
    dateSubmitted: "2024-10-08",
    needsEvaluation: true,
    abstract: "An innovative AI-powered education platform designed to revolutionize skill development across India using personalized learning paths, industry integration, VR training modules, and blockchain-based certification systems.",
    content: `This proposal presents an innovative AI-powered education platform designed to revolutionize skill development across India. The platform will leverage artificial intelligence to provide personalized learning experiences and bridge the skill gap in various industries.

Key Features:
1. AI-driven personalized learning paths based on individual aptitude and career goals
2. Integration with industry partners for real-time skill demand analysis
3. Virtual reality modules for hands-on training in technical fields
4. Multilingual support covering 22 official Indian languages
5. Blockchain-based certification system for verified skill credentials

Target Beneficiaries:
- 10 million students and working professionals in the first phase
- Focus on emerging technologies: AI, IoT, renewable energy, biotechnology
- Special emphasis on women and marginalized communities

Innovation Aspects:
- Advanced machine learning algorithms for adaptive learning
- Integration with job portals for direct employment opportunities
- Real-time industry feedback mechanism
- Gamification elements to enhance engagement

Budget Requirement: ₹500 crores over 4 years
Expected ROI: 300% through increased employment and productivity

This platform will position India as a global leader in AI-powered education and significantly contribute to the vision of Atmanirbhar Bharat.`
  }
];

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>(dummyProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);

  const handleViewDetails = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  
  const navigate = useNavigate();

  const handleEvaluate = async (proposalId: number, proposalData: Proposal) => {
  setIsEvaluating(true);
  setEvaluationResult(null);

  await new Promise((resolve) => setTimeout(resolve, 7000));

  const mockResult = "EVALUATION_RESULT_PLACEHOLDER";
  setEvaluationResult(mockResult);
  setIsEvaluating(false);

  navigate(`/evaluate/${proposalId}`, { state: { proposal: proposalData } });
};

  const getDaysAgo = (dateSubmitted: string) => {
    const submitted = new Date(dateSubmitted);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - submitted.getTime());
    const diffDays = Math.ceil(diffTime / (100 * 1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen">

      
      <div className="container mx-auto px-4 ">
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-6">
                  {/* Left side - Proposal info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {proposal.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{proposal.submittedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            <span>{proposal.department}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <StatusBadge status={proposal.status} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Days ago and buttons */}
                  <div className="flex flex-col items-end gap-3 min-w-[200px]">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Received before</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {getDaysAgo(proposal.dateSubmitted)} days
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full">
                      <Button 
                        onClick={() => handleViewDetails(proposal)}
                        variant="outline"
                        className="w-full bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Evaluate using NIRNAY
                      </Button>
                      
                      {/* {proposal.needsEvaluation && (
                        <Button 
                          onClick={() => handleEvaluate(proposal.id , proposal)}
                          className="w-full bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Evaluate using NIRNAY
                        </Button>
                      )} */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {proposals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
            <p className="text-gray-600">There are currently no research proposals to review.</p>
          </div>
        )}
      </div>

      {/* Abstract Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
              {selectedProposal?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="grid grid-cols-3 gap-6">
              {/* Left side - Full Abstract */}
              <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{selectedProposal.submittedBy}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{selectedProposal.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedProposal.dateSubmitted).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedProposal.status} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Abstract</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {selectedProposal.content}
                  </div>
                </div>
              </div>
              
              {/* Right side - Ask Nirnay Panel */}
              <div className="col-span-1 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Ask Nirnay</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Get AI-powered evaluation and insights on this research proposal
                  </p>
                  
                  {!isEvaluating && !evaluationResult && (
                    <Button 
                      onClick={() => handleEvaluate(selectedProposal.id , selectedProposal)}
                      variant="outline"
                      className="w-full bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Evaluate Proposal
                    </Button>
                  )}
                  
                  {isEvaluating && (
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="relative w-16 h-16 mb-4">
                          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Evaluating with Nirnay AI</p>
                        <p className="text-xs text-gray-600 text-center">Analyzing proposal content and generating insights...</p>
                      </div>
                    </div>
                  )}
                  
                  {evaluationResult && (
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Evaluation Result</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {evaluationResult}
                        </p>
                      </div>
                      <Button 
                        onClick={() => {
                          setEvaluationResult(null);
                          handleEvaluate(selectedProposal.id , selectedProposal);
                        }}
                        variant="outline"
                        className="w-full bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                      >
                        Re-evaluate
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEvaluationResult(null);
                    setIsEvaluating(false);
                  }}
                  className="w-full bg-slate-800 text-white hover:bg-slate-500 shadow-lg transition"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>


    </div>
  );
}