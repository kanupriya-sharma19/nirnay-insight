
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import ProposalCard from "@/components/ProposalCard";
import ProposalModal from "@/components/ProposalModal";

interface Proposal {
  id: number;
  title: string;
  submittedBy: string;
  department: string;
  status: string;
  dateSubmitted: string;
  content: string;
}

export default function ApexPage() {
  // Hardcoded proposals data
  const initialProposals: Proposal[] = [
    {
      id: 1,
      title: "Smart Irrigation System for Agriculture",
      submittedBy: "Team AgriTech",
      department: "Electronics Engineering",
      status: "Accepted by NACCER",
      dateSubmitted: "2025-01-15",
      content: "A comprehensive IoT-based smart irrigation system that uses soil moisture sensors, weather data, and machine learning algorithms to optimize water usage in agricultural fields. The system includes:\n\n• Real-time soil moisture monitoring\n• Weather prediction integration\n• Automated water valve control\n• Mobile app for remote monitoring\n• Water usage analytics and reporting\n\nExpected Impact: 30% reduction in water usage while maintaining crop yield. The system will help farmers make data-driven decisions and contribute to sustainable agriculture practices."
    },
    {
      id: 2,
      title: "AI-Powered Medical Diagnosis Assistant",
      submittedBy: "HealthTech Innovators",
      department: "Computer Science",
      status: "Accepted by NACCER",
      dateSubmitted: "2025-01-12",
      content: "An artificial intelligence system designed to assist medical professionals in diagnosing diseases through image analysis and symptom correlation. Key features include:\n\n• X-ray and MRI image analysis using deep learning\n• Symptom pattern recognition\n• Integration with electronic health records\n• Confidence scoring for diagnoses\n• Clinical decision support recommendations\n\nExpected Impact: Improve diagnostic accuracy by 25% and reduce diagnosis time by 40%. The system will be particularly beneficial in rural areas with limited access to specialist doctors."
    }
  ];

  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>(initialProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProposals = localStorage.getItem("apexProposals");
    if (savedProposals) {
      const parsedProposals = JSON.parse(savedProposals);
      setProposals(parsedProposals);
      setFilteredProposals(parsedProposals);
    }
  }, []);

  // Filter and search proposals
  useEffect(() => {
    let filtered = proposals.filter(proposal => {
      const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           proposal.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === "all" || proposal.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.dateSubmitted).getTime();
      const dateB = new Date(b.dateSubmitted).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredProposals(filtered);
  }, [proposals, searchTerm, departmentFilter, sortOrder]);

  const handleViewDetails = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (proposalId: number, newStatus: string) => {
    const updatedProposals = proposals.map(proposal =>
      proposal.id === proposalId ? { ...proposal, status: newStatus } : proposal
    );
    setProposals(updatedProposals);
    
    // Save to localStorage
    localStorage.setItem("apexProposals", JSON.stringify(updatedProposals));
  };

  const departments = Array.from(new Set(proposals.map(p => p.department)));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Apex Committee Dashboard
          </h1>
          <p className="text-gray-600">
            Review and manage proposals accepted by NACCER
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search proposals by title or submitter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full md:w-auto"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4 mr-2" />
              ) : (
                <SortDesc className="h-4 w-4 mr-2" />
              )}
              Sort by Date
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-blue-600">{proposals.length}</div>
            <div className="text-sm text-gray-600">Total Proposals</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-green-600">
              {proposals.filter(p => p.status === "Approved").length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-red-600">
              {proposals.filter(p => p.status === "Rejected").length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="text-2xl font-bold text-blue-600">
              {proposals.filter(p => p.status === "Accepted by NACCER").length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No proposals found matching your criteria</div>
          </div>
        )}

        {/* Modal */}
        <ProposalModal
          proposal={selectedProposal}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
}
