// pages/Researcher.tsx
import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Plus,
  Video,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  TrendingUp,
  Shield,
  Recycle,
  Zap,
  Factory,
  Search,
  Lightbulb,
} from "lucide-react";

const formTypes = [
  {
    id: "form-i",
    name: "Project Proposal",
    description: "Format for submission of Project proposal (Form - I)",
    icon: FileText,
    status: "completed" as const,
    count: 5,
  },
  {
    id: "form-ia",
    name: "Endorsement",
    description: "Endorsement from Head of Institution (Form - IA)",
    icon: FileText,
    status: "pending" as const,
    count: 2,
  },
  {
    id: "form-ii",
    name: "Fund Requisition",
    description: "Fund Requisition for Project (Form - II)",
    icon: FileText,
    status: "completed" as const,
    count: 3,
  },
];

export default function ResearcherPage() {
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);

  const notifications = [
    {
      title: "Development and Field Trial of 500 T Capacity SAGES-III",
      message: "Your proposal has been approved by SSRC",
      time: "2 hours ago",
      type: "approved" as const,
    },
    {
      title: "Electrostatic deposition and functionalization of MWCNTs",
      message: "Revision required — reviewer requested changes",
      time: "1 day ago",
      type: "revision" as const,
    },
  ];
  const proposals = [
    {
      title:
        "Development and Field Trial of 500 T Capacity SAGES-III for Use with Continuous Miners (Phase-III)",
      startDate: "01.07.2025",
      endDate: "30.06.2025",
      status: "Approved",
      thrustArea: "Innovation & Indigenization" as const,
    },
    {
      title:
        "Electrostatic deposition and functionalization of MWCNTs for detection of Coal Mine Methane (CMM)",
      startDate: "10.8.2025",
      endDate: "14.02.2025",
      status: "Revision Required",
      thrustArea: "Safety & Environment" as const,
    },
    {
      title:
        "Development of an instrument for prediction of roof falls in the goaf area in coal mines",
      startDate: "10.09.2025",
      endDate: "28.02.2026",
      status: "Rejected",
      thrustArea: "Clean Coal Technologies" as const,
    },
  ];

  const thrustAreas = {
    "Productivity Improvement": {
      icon: Shield,
      color: "bg-indigo-500",
      description:
        "Advanced technology for improvement of production & productivity",
    },
    "Safety & Environment": {
      icon: Shield,
      color: "bg-red-500",
      description: "Improvement of safety, health and environment",
    },
    "Waste to Wealth": {
      icon: Recycle,
      color: "bg-green-500",
      description: "Conversion of mining waste to valuable resources",
    },
    "Clean Coal Technologies": {
      icon: Zap,
      color: "bg-teal-500",
      description: "Alternative use of coal and clean coal technologies",
    },
    "Coal Beneficiation": {
      icon: Factory,
      color: "bg-blue-500",
      description: "Coal beneficiation and utilization",
    },
    Exploration: {
      icon: Search,
      color: "bg-amber-500",
      description: "Advanced exploration techniques",
    },
    "Innovation & Indigenization": {
      icon: Lightbulb,
      color: "bg-purple-500",
      description: "Innovation under Make-in-India Concept",
    },
  };

  const getThrustColor = (area: keyof typeof thrustAreas) => {
    return thrustAreas[area]?.color || "bg-primary";
  };

  const getThrustIcon = (area: keyof typeof thrustAreas) => {
    return thrustAreas[area]?.icon || FileText;
  };

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

  const getStatusBadge = (status: string) => {
    const styles = {
      "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Approved: "bg-green-100 text-green-800 border-green-200",
      "Revision Required": "bg-orange-100 text-orange-800 border-orange-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  const getFormStatusBadge = (status: "completed" | "pending" | "draft") => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      draft: "bg-blue-100 text-blue-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <GovtHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Banner */}

        <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, Dr. Kumar!
              </h1>
              <p className="text-primary-foreground/90">
                Track your proposals and manage your R&D projects efficiently
              </p>
            </div>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
              onClick={() => navigate("/form/form-i")}
            >
              <Plus className="mr-2 h-5 w-5" />
              New Proposal
            </Button>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-2 hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Proposals List */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">My Proposals</CardTitle>
            <CardDescription>
              Current projects under implementation
            </CardDescription>
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
                            <h3 className="font-bold text-lg text-gray-900">
                              {proposal.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge
                                className={`${getThrustColor(
                                  proposal.thrustArea
                                )} text-white`}
                              >
                                {proposal.thrustArea}
                              </Badge>
                              <Badge
                                className={getStatusBadge(proposal.status)}
                              >
                                {proposal.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mt-3">
                          <span> Submitted On: {proposal.startDate}</span>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        {proposal.status === "Revision Required" && (
                          <Button
                            size="sm"
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => navigate(`/revision/${index}`)}
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

        {/* Forms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {formTypes.map((form) => {
            const FormIcon = form.icon;
            return (
              <Card
                key={form.id}
                className="border-2 hover:border-blue-300 transition-colors cursor-pointer group hover:shadow-md"
                onClick={() => navigate(`/form/${form.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                        <FormIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{form.name}</CardTitle>
                    </div>
                    <Badge className={getFormStatusBadge(form.status)}>
                      {form.count}
                    </Badge>
                  </div>
                  <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {form.status === "completed"
                        ? "✅ Ready to submit"
                        : form.status === "pending"
                        ? "🔄 Action required"
                        : "📝 In draft"}
                    </span>
                    <Button variant="ghost" size="sm">
                      Open →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-blue-300 transition-colors cursor-pointer group hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Video Pitch 🎥</CardTitle>
                  <CardDescription>
                    Upload 3-minute presentation for your proposal
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-300 transition-colors cursor-pointer group hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Track Progress 📊</CardTitle>
                  <CardDescription>
                    Monitor your proposal review status
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>

      <GovtFooter />
    </div>
  );
}
