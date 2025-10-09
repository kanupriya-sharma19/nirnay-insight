// pages/Researcher.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus,
  Video,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const formTypes = [
  {
    id: 'form-i',
    name: 'Project Proposal',
    description: 'Format for submission of Project proposal (Form - I)',
    icon: FileText,
    status: 'completed',
    count: 5
  },
  {
    id: 'form-ia',
    name: 'Endorsement',
    description: 'Endorsement from Head of Institution (Form - IA)',
    icon: FileText,
    status: 'pending',
    count: 2
  },
  {
    id: 'form-ii',
    name: 'Fund Requisition',
    description: 'Fund Requisition for Project (Form - II)',
    icon: FileText,
    status: 'completed',
    count: 3
  },
  // Add more forms...
];

export default function ResearcherPage() {
  const navigate = useNavigate();

  const stats = [
    { label: "Forms Submitted", value: "12", icon: FileText, color: "text-accent" },
    { label: "Approved", value: "8", icon: CheckCircle, color: "text-success" },
    { label: "Pending Review", value: "3", icon: Clock, color: "text-warning" },
    { label: "Requires Revision", value: "1", icon: AlertCircle, color: "text-destructive" },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      "completed": "bg-success text-white",
      "pending": "bg-warning text-white",
      "draft": "bg-accent text-white",
    };
    return styles[status as keyof typeof styles] || "bg-muted";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Rajesh Kumar" onLogout={() => navigate('/')} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Researcher Portal 👨‍🔬</h1>
              <p className="text-primary-foreground/90">
                Submit and manage your R&D project forms and proposals
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-card text-primary hover:bg-card/90 shadow-lg"
              onClick={() => navigate('/form/form-i')}
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

        {/* Forms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {formTypes.map((form) => (
            <Card 
              key={form.id}
              className="border-2 hover:border-accent transition-colors cursor-pointer group"
              onClick={() => navigate(`/form/${form.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:shadow-glow transition">
                      <form.icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{form.name}</CardTitle>
                  </div>
                  <Badge className={getStatusBadge(form.status)}>
                    {form.count}
                  </Badge>
                </div>
                <CardDescription>{form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {form.status === 'completed' ? 'Ready to submit' : 
                     form.status === 'pending' ? 'Action required' : 'In draft'}
                  </span>
                  <Button variant="ghost" size="sm">
                    Open →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-accent transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-xl group-hover:shadow-glow transition">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Video Pitch</CardTitle>
                  <CardDescription>Upload 3-minute presentation for your proposal</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-accent transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-xl group-hover:shadow-glow transition">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>Monitor your proposal review status</CardDescription>
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