import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Target,
  Award
} from "lucide-react";
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const navigate = useNavigate();

  const thrustAreaData = [
    { name: "Productivity", value: 28, color: "#4F46E5" },
    { name: "Safety & Health", value: 22, color: "#DC2626" },
    { name: "Clean Coal", color: "#14B8A6", value: 18 },
    { name: "Innovation", value: 16, color: "#2563EB" },
    { name: "Waste to Wealth", value: 10, color: "#06B6D4" },
    { name: "Exploration", value: 6, color: "#0EA5E9" },
  ];

  const statusData = [
    { name: "Approved", value: 45, color: "#16A34A" },
    { name: "Under Review", value: 30, color: "#F59E0B" },
    { name: "Revision Required", value: 15, color: "#EAB308" },
    { name: "Rejected", value: 10, color: "#DC2626" },
  ];

  const trendData = [
    { month: "Jan", submissions: 12, approved: 8 },
    { month: "Feb", submissions: 15, approved: 10 },
    { month: "Mar", submissions: 18, approved: 12 },
    { month: "Apr", submissions: 22, approved: 15 },
    { month: "May", submissions: 20, approved: 14 },
    { month: "Jun", submissions: 25, approved: 18 },
  ];

  const institutionData = [
    { name: "IIT Delhi", value: 25 },
    { name: "IIT Kharagpur", value: 22 },
    { name: "IIT BHU", value: 18 },
    { name: "NIT Rourkela", value: 15 },
    { name: "ISM Dhanbad", value: 12 },
    { name: "Others", value: 8 },
  ];

  const stats = [
    { label: "Total Proposals", value: "156", change: "+12%", icon: FileText, color: "text-accent" },
    { label: "Approved", value: "70", change: "+8%", icon: CheckCircle, color: "text-success" },
    { label: "Success Rate", value: "45%", change: "+5%", icon: Award, color: "text-royal" },
    { label: "Avg. Review Time", value: "28 days", change: "-3 days", icon: Clock, color: "text-warning" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovtHeader showAuth userName="Dr. NaCCER Admin" onLogout={() => navigate("/login")} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into R&D proposal evaluations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-accent/10 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge className={stat.change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}>
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Thrust Area Distribution */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                <CardTitle>Proposals by Thrust Area</CardTitle>
              </div>
              <CardDescription>Distribution across research focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={thrustAreaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {thrustAreaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-accent" />
                <CardTitle>Proposal Status</CardTitle>
              </div>
              <CardDescription>Current evaluation status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trend Analysis */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <CardTitle>Submission & Approval Trends</CardTitle>
            </div>
            <CardDescription>6-month trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="submissions" stroke="#2563EB" strokeWidth={2} name="Submissions" />
                <Line type="monotone" dataKey="approved" stroke="#16A34A" strokeWidth={2} name="Approved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Institution Performance */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <CardTitle>Top Institutions</CardTitle>
            </div>
            <CardDescription>Proposal submissions by institution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={institutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>

      <GovtFooter />
    </div>
  );
}
