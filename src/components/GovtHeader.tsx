// components/GovtHeader.tsx
import { Button } from "@/components/ui/button";
import {
  Shield,
  Menu,
  Bell,
  User,
  LogOut,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface GovtHeaderProps {
  showAuth?: boolean;
  onLogout?: () => void;
  userName?: string;
}

interface Notification {
  title: string;
  message: string;
  time: string;
  type: "approved" | "revision";
}

export const GovtHeader = ({
  showAuth = true,
  onLogout,
  userName = "Prof. U. K. Singh",
}: GovtHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  // Notifications based on role/user
  const notifications: Notification[] =
  userName === "Prof. U. K. Singh"
    ? [
        {
          title: "Development and Field Trial of 500 T Capacity SAGES-III",
          message: "Your proposal has been approved by SSRC",
          time: "2 hours ago",
          type: "approved",
        },
        {
          title: "Electrostatic deposition and functionalization of MWCNTs",
          message: "Revision required — reviewer requested changes",
          time: "1 day ago",
          type: "revision",
        },
      ]
    : userName === "Dr. Priya Sharma"
    ? [
        {
          title: "New High-Priority Proposal Received",
          message:
            "WW-2024-011: Advanced Coal Waste Recycling Technology - Score: 8.7/10",
          time: "30 minutes ago",
          type: "approved",
        },
        {
          title: "Quarterly Review Meeting",
          message: "Apex Committee meeting scheduled for next week",
          time: "2 hours ago",
          type: "revision",
        },
      ]
    : [
        {
          title: "New Proposal Received",
          message: "A new research proposal has been submitted for your review.",
          time: "1 hour ago",
          type: "approved",
        },
        {
          title: "Revised Proposal Received",
          message:
            "A previously reviewed proposal has been revised and resubmitted.",
          time: "3 hours ago",
          type: "revision",
        },
      ];


  return (
    <>
      {/* Government Header */}
      <div className="bg-primary text-primary-foreground py-1 pl-2 border-b-2 border-saffron">
        <div className="w-full flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 justify-start text-left pl-0">
            <div
              className="h-12 w-12 flex items-center justify-center ml-0"
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
          <img src="/logo.png" alt="Logo" className="h-8  object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    NIRNAY | HackX01
                  </h1>
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

              {userName === "Dr. Ghanshyam Tiwari" ? (
                <>
                  <a
                    href="/proposals"
                    className="text-foreground hover:text-accent transition font-medium"
                  >
                    Proposals
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
                </>
              ) : (
                <>
                  <a
                    href="/"
                    className="text-foreground hover:text-accent transition font-medium"
                  >
                    Proposals
                  </a>
                  <a
                    href="/analytics"
                    className="text-foreground hover:text-accent transition font-medium"
                  >
                    Forms
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-accent transition font-medium"
                  >
                    Help
                  </a>
                </>
              )}
            </nav>

            {/* User Section */}
            <div className="flex items-center gap-3">
              {/* Notifications Bell */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setNotifOpen(true)}
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
                )}
              </Button>

              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-lg">
                  <User className="h-5 w-5 text-accent" />
                  <div className="hidden md:block text-sm">
                    <p className="font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {userName === "Dr. Priya Sharma" ? "Apex Committee Member" : "Researcher"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (onLogout) onLogout();
                    navigate("/"); // redirect to home page
                  }}
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
                  href="/NACCER"
                  className="text-foreground hover:text-accent transition font-medium py-2"
                >
                  Dashboard
                </a>
                <a
                  href="/proposals"
                  className="text-foreground hover:text-accent transition font-medium py-2"
                >
                  Proposals
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
                    <p className="text-xs text-muted-foreground">
                      {userName === "Dr. Priya Sharma" ? "Apex Committee Member" : "Researcher"}
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Notifications Popup */}
      <Dialog open={notifOpen} onOpenChange={() => setNotifOpen(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Notifications
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-3">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No new notifications
              </p>
            ) : (
              notifications.map((notif, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    notif.type === "approved" ? "bg-green-50" : "bg-yellow-50"
                  }`}
                >
                  {notif.type === "approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-gray-600">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
