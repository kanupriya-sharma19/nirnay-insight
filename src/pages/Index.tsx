import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, TrendingUp, Users, Target, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Evaluation",
      description: "Advanced artificial intelligence analyzes proposals for thrust area alignment, novelty, and feasibility",
      color: "text-royal"
    },
    {
      icon: Target,
      title: "Thrust Area Matching",
      description: "Automatic categorization across 6 key research areas: Productivity, Safety, Innovation, and more",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Streamlined workflow reduces evaluation time from months to weeks",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Dedicated interfaces for Researchers, NaCCER officials, and Expert Reviewers",
      color: "text-success"
    },
  ];

  const thrustAreas = [
    { name: "⚙️ Productivity", color: "bg-indigo-500" },
    { name: "🧯 Safety & Health", color: "bg-red-500" },
    { name: "♻️ Waste to Wealth", color: "bg-cyan-500" },
    { name: "🔬 Innovation", color: "bg-royal" },
    { name: "🌫️ Clean Coal", color: "bg-teal-500" },
    { name: "🗺️ Exploration", color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader />

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-royal/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary-foreground/20">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Ministry of Coal, Government of India</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              NIRNAY
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-primary-foreground/90">
              National Intelligent Research & Development Network
            </p>
            <p className="text-xl mb-8 text-primary-foreground/80">
              for Analytical Year-round Yield
            </p>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-saffron rounded"></div>
              <div className="h-1 w-16 bg-primary-foreground rounded"></div>
              <div className="h-1 w-16 bg-green-india rounded"></div>
            </div>

            <p className="text-lg mb-12 max-w-2xl mx-auto text-primary-foreground/90">
              AI-powered proposal evaluation system revolutionizing R&D assessment in the coal sector through intelligent analysis and streamlined workflows
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-card text-primary hover:bg-card/90 shadow-glow text-lg px-8"
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Intelligent Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets government research evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-accent hover:shadow-lg transition-all group">
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-xl bg-accent/10 w-fit mb-4 ${feature.color} group-hover:shadow-glow transition`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Thrust Areas Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Research Thrust Areas</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Six key focus areas driving innovation in coal sector R&D
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {thrustAreas.map((area, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all group cursor-pointer">
                <CardContent className="py-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${area.color} flex items-center justify-center text-2xl`}>
                      {area.name.charAt(0)}
                    </div>
                    <span className="text-lg font-semibold text-primary">{area.name.slice(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Evaluation Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamlined workflow from submission to approval
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: 1, title: "Proposal Submission", desc: "Researchers submit proposals with 13 LaTeX sections and video pitch" },
                { step: 2, title: "AI Analysis", desc: "NIRNAY evaluates thrust area match, novelty, plagiarism, and feasibility" },
                { step: 3, title: "Expert Review", desc: "CIL experts review AI recommendations and provide detailed feedback" },
                { step: 4, title: "SSRC Approval", desc: "Standing Scientific Research Committee makes final decision" },
              ].map((process) => (
                <div key={process.step} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-glow">
                    {process.step}
                  </div>
                  <Card className="flex-1 border-2 group-hover:border-accent transition-colors">
                    <CardContent className="py-4">
                      <h3 className="text-xl font-bold text-primary mb-2">{process.title}</h3>
                      <p className="text-muted-foreground">{process.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform R&D Evaluation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Join the future of intelligent research proposal assessment
          </p>
          <Button 
            size="lg" 
            className="bg-card text-primary hover:bg-card/90 shadow-glow text-lg px-8"
            onClick={() => navigate("/login")}
          >
            Access NIRNAY Platform
          </Button>
        </div>
      </section>

      <GovtFooter />
    </div>
  );
}
