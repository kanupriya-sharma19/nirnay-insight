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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  FileText,
  Calendar,
  User,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function RevisionPage() {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const proposalDetails = {
    title:
      "Electrostatic deposition and functionalization of MWCNTs for detection of Coal Mine Methane (CMM)",
    submittedDate: "10.08.2025",
    reviewer: "Dr. Sharma, Senior Scientific Officer",
    reviewDate: "15.08.2025",
    thrustArea: "Safety & Environment",
  };

  const revisionItems = [
    {
      section: "Methodology",
      comment:
        "The proposed electrostatic deposition technique needs more detailed explanation. Please include specific voltage ranges, electrode materials, and deposition time parameters.",
      severity: "high" as const,
      requirement:
        "Add detailed technical specifications in Section 3.2 of Form-I",
    },
    {
      section: "Budget Justification",
      comment:
        "Equipment cost for MWCNT functionalization apparatus appears overestimated. Please provide vendor quotations and justify the requirement.",
      severity: "high" as const,
      requirement:
        "Submit updated Form-IV with vendor quotations attached",
    },
    {
      section: "Literature Review",
      comment:
        "Recent publications (2023-2025) on similar methane detection systems are missing. Please update the literature review with at least 5 recent relevant papers.",
      severity: "medium" as const,
      requirement:
        "Update Section 2 with recent publications and comparative analysis",
    },
    {
      section: "Expected Outcomes",
      comment:
        "Quantifiable metrics for detection sensitivity and response time need to be specified. What are the target detection limits?",
      severity: "medium" as const,
      requirement:
        "Add specific performance metrics in Section 6 of Form-I",
    },
    {
      section: "Institutional Support",
      comment:
        "Form-IA endorsement is missing signature from the Head of Department. Please resubmit with proper authorization.",
      severity: "high" as const,
      requirement:
        "Resubmit Form-IA with HOD signature and institutional stamp",
    },
  ];

  const handleCheckItem = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const allChecked = revisionItems.every((_, index) => checkedItems[index]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <GovtHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Alert */}
        <div className="rounded-lg bg-warning/10 border-2 border-warning p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-warning/20 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Revision Required
              </h2>
              <p className="text-gray-700">
                Your proposal has been reviewed and requires revisions before it can
                be approved. Please address all the points mentioned below and
                resubmit your proposal.
              </p>
            </div>
          </div>
        </div>

        {/* Proposal Details */}
        <Card className="border-2 mb-8">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl">Proposal Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {proposalDetails.title}
                </h3>
                <Badge className="bg-orange-500 text-white">
                  {proposalDetails.thrustArea}
                </Badge>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted On</p>
                    <p className="font-semibold">{proposalDetails.submittedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Reviewed By</p>
                    <p className="font-semibold">{proposalDetails.reviewer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Review Date</p>
                    <p className="font-semibold">{proposalDetails.reviewDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revision Requirements */}
        <Card className="border-2 mb-8">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl">Revision Requirements</CardTitle>
            <CardDescription>
              Please review and address each of the following points
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {revisionItems.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border-2 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id={`item-${index}`}
                      checked={checkedItems[index] || false}
                      onCheckedChange={() => handleCheckItem(index)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          variant={item.severity === "high" ? "destructive" : "outline"}
                          className={
                            item.severity === "high"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {item.severity === "high" ? (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          ) : null}
                          {item.severity === "high" ? "High Priority" : "Medium Priority"}
                        </Badge>
                        <span className="font-bold text-gray-900">
                          {item.section}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Reviewer Comment:
                          </p>
                          <p className="text-gray-600">{item.comment}</p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-primary p-3 rounded">
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Required Action:
                          </p>
                          <p className="text-sm text-gray-600">{item.requirement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <Card className="border-2 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {allChecked ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <p className="text-green-700 font-semibold">
                      All items reviewed. You can now proceed to update your proposal.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6 text-gray-500" />
                    <p className="text-gray-600">
                      Review all revision requirements before proceeding
                    </p>
                  </>
                )}
              </div>

              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                onClick={() => navigate("/update-form")}
                disabled={!allChecked}
              >
                Proceed to Update Form
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <GovtFooter />
    </div>
  );
}
