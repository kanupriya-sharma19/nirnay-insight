import { Button } from "@/components/ui/button";
import { Shield, Menu, Bell, User, LogOut } from "lucide-react";
import { useState } from "react";

interface GovtHeaderProps {
  showAuth?: boolean;
  onLogout?: () => void;
  userName?: string;
}

export const GovtHeader = ({ showAuth = false, onLogout, userName }: GovtHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Government of India */}
      <div className="bg-primary text-primary-foreground py-2 px-4 border-b-2 border-saffron">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Government of India"
              className="h-6 w-6"
            />
            <span className="font-semibold">Government of India</span>
            <span className="hidden md:inline text-primary-foreground/80 ml-2">| Ministry of Coal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs hover:text-secondary transition">हिंदी</button>
            <button className="text-xs font-medium">English</button>
            <button className="text-xs hover:text-secondary transition hidden md:inline">A+</button>
            <button className="text-xs hover:text-secondary transition hidden md:inline">A-</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-card border-b border-border shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-primary p-3 rounded-xl shadow-glow">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">NIRNAY</h1>
                  <p className="text-xs text-muted-foreground">AI-Powered R&D Evaluation System</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-foreground hover:text-accent transition font-medium">Home</a>
              <a href="/dashboard" className="text-foreground hover:text-accent transition font-medium">Dashboard</a>
              <a href="/analytics" className="text-foreground hover:text-accent transition font-medium">Analytics</a>
              <a href="#" className="text-foreground hover:text-accent transition font-medium">Help</a>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {showAuth ? (
                <>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
                  </Button>
                  <div className="flex items-center gap-2 pl-3 border-l border-border">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                    <div className="hidden md:block text-sm">
                      <p className="font-medium">{userName || "User"}</p>
                    </div>
                    {onLogout && (
                      <Button variant="ghost" size="icon" onClick={onLogout}>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex gap-2">
                  <Button variant="outline" asChild>
                    <a href="/login">Login</a>
                  </Button>
                  <Button className="gradient-primary" asChild>
                    <a href="/login">Sign Up</a>
                  </Button>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-3">
                <a href="/" className="text-foreground hover:text-accent transition font-medium py-2">Home</a>
                <a href="/dashboard" className="text-foreground hover:text-accent transition font-medium py-2">Dashboard</a>
                <a href="/analytics" className="text-foreground hover:text-accent transition font-medium py-2">Analytics</a>
                <a href="#" className="text-foreground hover:text-accent transition font-medium py-2">Help</a>
                {!showAuth && (
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <a href="/login">Login</a>
                    </Button>
                    <Button className="gradient-primary flex-1" asChild>
                      <a href="/login">Sign Up</a>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
