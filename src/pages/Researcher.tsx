// pages/Researcher.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Recycle,
  Zap,
  Factory,
  Search,
  Lightbulb,
} from "lucide-react";
import LoadingAnimation from "@/components/animation/Loader";

export default function ResearcherPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
  )

  const proposals = [
      {
      title:
        "Assessing the Abiotic and Biotic Factors in Pit Lakes for Sustainable Management of Water and Environment",
      startDate: "01.09.2025",
      endDate: "30.06.2025",
      status: "Approved",
      thrustArea: "Innovation & Indigenization" as const,
    },
      {
      title:
        "Electrostatic deposition and functionalization of MWCNTs for detection of Coal Mine Methane (CMM)",
      startDate: "10.08.2025",
      endDate: "14.02.2025",
      status: "Revision Required",
      thrustArea: "Safety & Environment" as const,
    },
  
    {
      title:
        "Development of High-Capacity (500T) SAGES-III Goaf Edge Support System",
      startDate: "13.10.2025",
      endDate: "30.06.2025",
      status: "Under Review",
      thrustArea: "Innovation & Indigenization" as const,
    },
  
  
  ];

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


  const getThrustColor = (area: keyof typeof thrustAreas) =>
    thrustAreas[area]?.color;

  const getThrustIcon = (area: keyof typeof thrustAreas) =>
    thrustAreas[area]?.icon || FileText;

  const stats = [
    {
      label: "Total Proposals",
      value: "3",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Accepted",
      value: "1",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Under Review",
      value: "2",
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "Success Rate",
      value: "33%",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  const formTemplates = [
    "Form - I: Project Proposal",
    "Form - IA: Endorsement from Head of Institution",
    "Form - II: Fund Requisition",
    "Form - III: Financial Expenditure Statement",
    "Form - IV: Expenditure Statement for Equipment",
    "Form - V: Physical Progress Report",
    "Form - VI: Project Completion Report",
    "Form - VII: Extension of Project Duration",
    "Form - VIII: Cost Revision or Re-appropriation",
    "Form - IX: List of Equipment Procured in the Past",
    "Form - X: List of Computer and Accessories Procured",
    "Form - XI: Justification of Salary & Wages",
    "Form - XII: Justification for TA-DA",
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Approved: "bg-green-100 text-green-800 border-green-200",
      "Revision Required": "bg-orange-100 text-orange-800 border-orange-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  return (
    isLoading?<LoadingAnimation/>:(
    <div className="min-h-screen flex flex-col bg-gray-50">
      <GovtHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, Prof Singh!</h1>
              <p className="text-blue-100">
                Track your proposals and manage your R&D projects efficiently
              </p>
            </div>
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
              onClick={() => navigate("/form/form-i")}
            >
              <Plus className="mr-2 h-5 w-5" />
              New Proposal
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Proposals */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">My Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposals.map((proposal, index) => {
                const ThrustIcon = getThrustIcon(proposal.thrustArea);
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border-2 hover:border-blue-300 transition-colors bg-white hover:shadow-md"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <ThrustIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{proposal.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge className={`${getThrustColor(proposal.thrustArea)}`}>
                                {proposal.thrustArea}
                              </Badge>
                              <Badge className={getStatusBadge(proposal.status)}>
                                {proposal.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          Submitted On: {proposal.startDate}
                        </p>
                      </div>

                      <div className="flex lg:flex-col gap-2">
                     
                        {proposal.status === "Revision Required" && (
                          <Button
                            size="lg"
                            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition"
                            onClick={() => navigate(`/revision`)}
                          >
                            Complete Revision
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Other Forms (non-clickable) */}
        <Card className="border-2 mb-12">
          <CardHeader>
            <CardTitle>All proposal related forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {formTemplates.map((form, index) => (
                <div
                  key={index}
                  className="flex items-center border rounded-md px-3 py-2 bg-gray-50 text-gray-700 text-sm hover:bg-gray-100 cursor-default"
                >
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  {form}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <GovtFooter />
    </div>
    )
  );
}
