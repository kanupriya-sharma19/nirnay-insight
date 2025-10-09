import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Video,
  Bell,
  TrendingUp,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const proposals = [
    {
      id: "PRO-2024-001",
      title: "AI-based Coal Quality Assessment System",
      thrustArea: "Innovation",
      status: "Under Review",
      submittedDate: "2024-01-15",
      progress: 60,
      reviewer: "Dr. Kumar",
    },
    {
      id: "PRO-2024-002",
      title: "Sustainable Mining Practices using IoT",
      thrustArea: "Clean Coal",
      status: "Approved",
      submittedDate: "2024-01-10",
      progress: 100,
      reviewer: "Dr. Sharma",
    },
    {
      id: "PRO-2023-045",
      title: "Worker Safety Enhancement through ML",
      thrustArea: "Safety & Health",
      status: "Revision Required",
      submittedDate: "2023-12-20",
      progress: 40,
      reviewer: "Dr. Patel",
    },
  ];

  const stats = [
    { label: "Total Proposals", value: "3", icon: FileText, color: "text-accent" },
    { label: "Approved", value: "1", icon: CheckCircle, color: "text-success" },
    { label: "Under Review", value: "1", icon: Clock, color: "text-warning" },
    { label: "Success Rate", value: "33%", icon: TrendingUp, color: "text-royal" },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      "Under Review": "status-review",
      "Approved": "status-approved",
      "Revision Required": "status-pending",
      "Rejected": "status-rejected",
    };
    return styles[status as keyof typeof styles] || "status-pending";
  };

  const getThrustColor = (area: string) => {
    const colors = {
      "Productivity": "bg-indigo-500",
      "Safety & Health": "bg-red-500",
      "Waste to Wealth": "bg-cyan-500",
      "Innovation": "bg-royal",
      "Clean Coal": "bg-teal-500",
      "Exploration": "bg-blue-500",
    };
    return colors[area as keyof typeof colors] || "bg-primary";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Rajesh Kumar" onLogout={() => navigate("/login")} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Kumar! 👋</h1>
              <p className="text-primary-foreground/90">
                Track your proposals and manage your R&D projects efficiently
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-card text-primary hover:bg-card/90 shadow-lg"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <Plus className="mr-2 h-5 w-5" />
              New Proposal
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-accent/10 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Notifications */}
        <Card className="mb-8 border-2 border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              <CardTitle>Recent Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Proposal PRO-2024-002 Approved!</p>
                  <p className="text-sm text-muted-foreground">Your proposal has been approved by SSRC. Check details.</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium">Action Required: PRO-2023-045</p>
                  <p className="text-sm text-muted-foreground">Expert reviewer has requested revisions. Please review comments.</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposals List */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">My Proposals</CardTitle>
            <CardDescription>Track and manage your research proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposals.map((proposal) => (
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
                          <p className="text-sm text-muted-foreground mb-2">{proposal.id}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={`govt-badge ${getThrustColor(proposal.thrustArea)} text-white`}>
                              {proposal.thrustArea}
                            </Badge>
                            <Badge className={`govt-badge ${getStatusBadge(proposal.status)}`}>
                              {proposal.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Submitted: {proposal.submittedDate}</span>
                            <span>•</span>
                            <span>Reviewer: {proposal.reviewer}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Evaluation Progress</span>
                          <span className="font-medium text-primary">{proposal.progress}%</span>
                        </div>
                        <Progress value={proposal.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      {proposal.status === "Revision Required" && (
                        <Button size="sm" className="flex-1 bg-warning hover:bg-warning/90">
                          Submit Revision
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-2 hover:border-accent transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-xl group-hover:shadow-glow transition">
                  <Upload className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Submit New Proposal</CardTitle>
                  <CardDescription>Upload your research proposal documents</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-accent transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-xl group-hover:shadow-glow transition">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Upload Video Pitch</CardTitle>
                  <CardDescription>Add a video presentation for your proposal</CardDescription>
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
