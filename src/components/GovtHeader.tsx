import { Button } from "@/components/ui/button";
import { Shield, Menu, Bell, User, LogOut } from "lucide-react";
import { useState } from "react";

interface GovtHeaderProps {
  showAuth?: boolean;
  onLogout?: () => void;
  userName?: string;
}

export const GovtHeader = ({
  showAuth = true,
  onLogout,
  userName = "Dr. Rajesh Kumar",
}: GovtHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Government Header */}
      <div className="bg-primary text-primary-foreground py-1 pl-2 border-b-2 border-saffron">
        <div className="w-full flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 justify-start text-left pl-0">
            <div
              className="h-12 w-12 flex items-center justify-center  ml-0"
              style={{
                backgroundImage: 'url("/National-Emblem.png")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <span className="font-semibold">Ministry of Coal</span>
            <span className="font-semibold">| HackX01</span>
          </div>

          <div className="flex items-center gap-4 pr-14">
            <button className="text-xs hover-text-secondary transition hidden md:inline">
              Skip to Main Content
            </button>
            <button className="text-xs hover-text-secondary transition hidden md:inline">
              A-
            </button>
            <button className="text-xs hover-text-secondary transition hidden md:inline">
              A
            </button>
            <button className="text-xs hover-text-secondary transition hidden md:inline">
              A+
            </button>
            <button className="text-xs hover-text-secondary transition hidden md:inline">
              ☾
            </button>
            <button className="text-xs hover-text-secondary transition hidden md:inline">
              Screen Reader
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-card border-b border-border shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-primary p-3 rounded-xl shadow-glow">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">NIRNAY</h1>
                  <p className="text-xs text-muted-foreground">
                    AI-Powered R&D Evaluation System
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Home
              </a>
              <a
                href="/dashboard"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Dashboard
              </a>
              <a
                href="/analytics"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Analytics
              </a>
              <a
                href="#"
                className="text-foreground hover:text-accent transition font-medium"
              >
                Help
              </a>
            </nav>

            {/* User Section - Always show user info, no login/signup */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>

              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-lg">
                  <User className="h-5 w-5 text-accent" />
                  <div className="hidden md:block text-sm">
                    <p className="font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">Researcher</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

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
                <a
                  href="/"
                  className="text-foreground hover:text-accent transition font-medium py-2"
                >
                  Home
                </a>
                <a
                  href="/dashboard"
                  className="text-foreground hover:text-accent transition font-medium py-2"
                >
                  Dashboard
                </a>
                <a
                  href="/analytics"
                  className="text-foreground hover:text-accent transition font-medium py-2"
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-accent transition font-medium py-2"
                >
                  Help
                </a>
                {/* User info in mobile menu */}
                <div className="flex items-center gap-3 py-2 border-t border-border mt-2 pt-3">
                  <User className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">Researcher</p>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
