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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Send,
  FileText,
  AlertCircle,
  Eye,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { TableField } from "@/components/TableField.tsx";
import { generatePDF } from "@/lib/pdfGenerator";

const revisionFormTemplate = {
  title: "Project Proposal Revision (Form - I)",
  description: "R&D project proposal revision for coal sector research and development",
};

const calculateCompletion = (formData: any, requiredFields: string[]) => {
  if (!requiredFields.length) return 0;

  const filledFields = requiredFields.filter((field) => {
    const value = formData[field];
    if (Array.isArray(value)) {
      return (
        value.length > 0 &&
        value.some((row: any) =>
          Object.values(row).some(
            (cell) => cell && cell.toString().trim() !== ""
          )
        )
      );
    }
    return value !== undefined && value !== null && value !== "";
  }).length;

  return Math.round((filledFields / requiredFields.length) * 100);
};

export default function UpdateFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    projectTitle:
      "Electrostatic deposition and functionalization of MWCNTs for detection of Coal Mine Methane (CMM)",
    implementingAgency: "Indian Institute of Technology, Delhi",
    projectLeader: "Dr. Kumar",
    thrustArea: "Safety & Environment",
    duration: "24",
    totalBudget: "45,00,000",
    methodology: "",
    literatureReview: "",
    expectedOutcomes: "",
    budgetJustification: "",
    proposedOutlay: [],
    equipmentOutlay: [],
    consumableOutlay: [],
  });

  const [uploads, setUploads] = useState({
    formIA: false,
    formIV: false,
    quotations: false,
  });

  const requiredFields = [
    "methodology",
    "literatureReview",
    "expectedOutcomes",
    "budgetJustification",
    "proposedOutlay",
    "equipmentOutlay",
  ];

  const completionPercentage = calculateCompletion(formData, requiredFields);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof typeof uploads) => {
    setUploads((prev) => ({ ...prev, [field]: true }));
    toast.success("File uploaded successfully");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  const handleViewPDF = () => {
    generatePDF(formData, revisionFormTemplate);
  };

  const handleSubmit = () => {
    // Validation
    const emptyFields = requiredFields.filter((field) => {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    });

    if (emptyFields.length > 0) {
      toast.error("Please fill all required sections");
      return;
    }

    if (!uploads.formIA || !uploads.formIV || !uploads.quotations) {
      toast.error("Please upload all required documents");
      return;
    }

    toast.success("Proposal submitted successfully for review");
    setTimeout(() => {
      navigate("/researcher");
    }, 1500);
  };

  const thrustAreas = [
    "Productivity Improvement",
    "Safety & Environment",
    "Waste to Wealth",
    "Clean Coal Technologies",
    "Coal Beneficiation",
    "Exploration",
    "Innovation & Indigenization",
  ];

  const revisionHighlights = [
    "Update methodology with technical specifications (Section 3.2)",
    "Add recent literature (2023-2025) in Section 2",
    "Specify quantifiable performance metrics in Section 6",
    "Submit Form-IV with vendor quotations",
    "Resubmit Form-IA with HOD signature",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <GovtHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Update Proposal</h1>
          </div>
          <p className="text-gray-600">
            Form-I: Project Proposal (Revision Submission)
          </p>
        </div>

        {/* Revision Alert */}
        <Card className="border-2 border-warning mb-8 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-3">
                  Key Revision Points to Address
                </h3>
                <ul className="space-y-2">
                  {revisionHighlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-warning font-bold">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="border-2 mb-8">
          <CardHeader className="bg-gray-50">
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Project details and investigator information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="projectTitle" className="text-base font-semibold">
                  Project Title *
                </Label>
                <Input
                  id="projectTitle"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="principalInvestigator" className="text-base font-semibold">
                    Principal Investigator *
                  </Label>
                  <Input
                    id="principalInvestigator"
                    value={formData.principalInvestigator}
                    onChange={(e) =>
                      handleInputChange("principalInvestigator", e.target.value)
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="institution" className="text-base font-semibold">
                    Institution *
                  </Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="thrustArea" className="text-base font-semibold">
                    Thrust Area *
                  </Label>
                  <Select
                    value={formData.thrustArea}
                    onValueChange={(value) => handleInputChange("thrustArea", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {thrustAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-base font-semibold">
                    Duration (months) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="totalBudget" className="text-base font-semibold">
                    Total Budget (₹) *
                  </Label>
                  <Input
                    id="totalBudget"
                    value={formData.totalBudget}
                    onChange={(e) => handleInputChange("totalBudget", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Methodology Section - Revision Required */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  8.1 Methodology
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    Revision Required
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  Add detailed technical specifications including voltage ranges, electrode
                  materials, and deposition time parameters (Max. 200 words)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Describe the detailed methodology with all technical specifications..."
              value={formData.methodology}
              onChange={(e) => handleInputChange("methodology", e.target.value)}
              className="min-h-[200px]"
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Literature Review - Revision Required */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div>
              <CardTitle className="flex items-center gap-2">
                17. Past Experience and Institutional Expertise
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Update Required
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                Include at least 5 recent publications (2023-2025) on similar methane
                detection systems
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Provide updated literature review with recent publications..."
              value={formData.literatureReview}
              onChange={(e) => handleInputChange("literatureReview", e.target.value)}
              className="min-h-[200px]"
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Expected Outcomes - Revision Required */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div>
              <CardTitle className="flex items-center gap-2">
                7. How the Project is Beneficial to Coal Industry
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Update Required
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                Specify quantifiable metrics for detection sensitivity, response time, and
                target detection limits
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              placeholder="List expected outcomes with specific performance metrics..."
              value={formData.expectedOutcomes}
              onChange={(e) => handleInputChange("expectedOutcomes", e.target.value)}
              className="min-h-[200px]"
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Proposed Outlay Table */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div>
              <CardTitle className="flex items-center gap-2">
                9. Details of Proposed Outlay (₹ in Lakhs)
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Revision Required
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                Provide detailed budget breakdown for each year
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <TableField
              field={{
                name: "proposedOutlay",
                label: "Proposed Outlay",
                columns: ["Item", "1st Year", "2nd Year", "3rd Year", "Total Cost"],
              }}
              value={formData.proposedOutlay || []}
              onChange={(value) => handleInputChange("proposedOutlay", value)}
            />
          </CardContent>
        </Card>

        {/* Equipment Outlay Table */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div>
              <CardTitle className="flex items-center gap-2">
                13. Outlay for Equipment
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Revision Required
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                List all equipment with specifications and costs
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <TableField
              field={{
                name: "equipmentOutlay",
                label: "Equipment Outlay",
                columns: [
                  "Generic Name of Equipment",
                  "Specifications",
                  "Number",
                  "Imported/Indigenous",
                  "Estimated Cost (₹ in Lakhs)",
                  "Foreign Exchange Component",
                ],
              }}
              value={formData.equipmentOutlay || []}
              onChange={(value) => handleInputChange("equipmentOutlay", value)}
            />
          </CardContent>
        </Card>

        {/* Consumable Outlay Table */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div>
              <CardTitle className="flex items-center gap-2">
                15. Outlay for Consumable Materials
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Update Required
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                Provide year-wise breakdown of consumable materials
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <TableField
              field={{
                name: "consumableOutlay",
                label: "Consumable Outlay",
                columns: [
                  "Head",
                  "1st Year (₹)",
                  "2nd Year (₹)",
                  "3rd Year (₹)",
                  "Total (₹)",
                  "Foreign Exchange Component",
                ],
              }}
              value={formData.consumableOutlay || []}
              onChange={(value) => handleInputChange("consumableOutlay", value)}
            />
          </CardContent>
        </Card>

        {/* Equipment Justification */}
        <Card className="border-2 border-warning mb-8">
          <CardHeader className="bg-warning/5">
            <div>
              <CardTitle className="flex items-center gap-2">
                14. Justification for Equipment
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Revision Required
                </Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                Provide detailed justification for equipment costs and specifications
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Justify all equipment items with proper reasoning..."
              value={formData.budgetJustification}
              onChange={(e) => handleInputChange("budgetJustification", e.target.value)}
              className="min-h-[150px]"
              rows={5}
            />
          </CardContent>
        </Card>

        {/* Document Uploads */}
        <Card className="border-2 mb-8">
          <CardHeader className="bg-gray-50">
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>Upload all mandatory forms and supporting documents</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Form-IA (with HOD Signature)</p>
                    <p className="text-sm text-gray-600">
                      Institutional endorsement with proper authorization
                    </p>
                  </div>
                </div>
                {uploads.formIA ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleFileChange("formIA")}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Form-IV (Updated)</p>
                    <p className="text-sm text-gray-600">
                      Expenditure statement for equipment with revisions
                    </p>
                  </div>
                </div>
                {uploads.formIV ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleFileChange("formIV")}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold">Vendor Quotations</p>
                    <p className="text-sm text-gray-600">
                      Equipment quotations for budget justification
                    </p>
                  </div>
                </div>
                {uploads.quotations ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleFileChange("quotations")}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress and Actions */}
        <div className="space-y-6 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Form Completion</span>
                  <span className="text-primary font-semibold">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSaveDraft}
              className="w-full sm:w-auto"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Draft
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleViewPDF}
              className="w-full sm:w-auto"
            >
              <Eye className="mr-2 h-5 w-5" />
              Preview PDF
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={completionPercentage < 100}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              <Send className="mr-2 h-5 w-5" />
              Submit for Review
            </Button>
          </div>
        </div>
      </main>

      <GovtFooter />
    </div>
  );
}
