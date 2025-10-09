// pages/FormSubmission.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GovtHeader } from "@/components/GovtHeader";
import { GovtFooter } from "@/components/GovtFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  ArrowLeft,
  Save,
  Send,
  Video,
  User,
  Building,
  Calendar,
  DollarSign,
  CheckCircle
} from "lucide-react";

const formTemplates = {
  'form-i': {
    title: 'Project Proposal (Form - I)',
    description: 'Format for submission of Project proposal',
    fields: [
      { name: 'projectTitle', label: 'Project Title', type: 'text', required: true },
      { name: 'thrustArea', label: 'Thrust Area', type: 'select', options: ['Productivity', 'Safety & Health', 'Waste to Wealth', 'Innovation', 'Clean Coal', 'Exploration'], required: true },
      { name: 'duration', label: 'Project Duration (Months)', type: 'number', required: true },
      { name: 'totalBudget', label: 'Total Budget (₹)', type: 'number', required: true },
      { name: 'objectives', label: 'Objectives', type: 'textarea', required: true },
      { name: 'methodology', label: 'Methodology', type: 'textarea', required: true },
      { name: 'expectedOutcome', label: 'Expected Outcome', type: 'textarea', required: true },
    ]
  },
  'form-ia': {
    title: 'Endorsement from Head of Institution (Form - IA)',
    description: 'Endorsement from Head of the Institution / Organisation',
    fields: [
      { name: 'headName', label: 'Head of Institution Name', type: 'text', required: true },
      { name: 'headDesignation', label: 'Designation', type: 'text', required: true },
      { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
      { name: 'endorsementDate', label: 'Endorsement Date', type: 'date', required: true },
      { name: 'remarks', label: 'Remarks', type: 'textarea', required: false },
    ]
  },
  'form-ii': {
    title: 'Fund Requisition (Form - II)',
    description: 'Fund Requisition for Project',
    fields: [
      { name: 'proposalId', label: 'Proposal ID', type: 'text', required: true },
      { name: 'requisitionAmount', label: 'Requisition Amount (₹)', type: 'number', required: true },
      { name: 'purpose', label: 'Purpose of Requisition', type: 'textarea', required: true },
      { name: 'utilizationPeriod', label: 'Utilization Period (Months)', type: 'number', required: true },
    ]
  }
  // Add other form templates similarly...
};

export default function FormSubmission() {
  const { formType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formTemplate = formTemplates[formType as keyof typeof formTemplates];

  useEffect(() => {
    if (!formTemplate) {
      navigate('/');
    }
  }, [formTemplate, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setVideoFile(file);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Navigate back to dashboard or show success message
    navigate('/');
  };

  if (!formTemplate) {
    return <div>Form not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GovtHeader showAuth userName="Dr. Rajesh Kumar" onLogout={() => navigate('/')} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">{formTemplate.title}</h1>
            <p className="text-muted-foreground">{formTemplate.description}</p>
          </div>
          <Badge className="ml-auto govt-badge bg-accent text-white">
            Draft
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Form Details</CardTitle>
                <CardDescription>
                  Please fill all the required fields carefully
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formTemplate.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      
                      {field.type === 'text' && (
                        <Input
                          id={field.name}
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}
                      
                      {field.type === 'number' && (
                        <Input
                          id={field.name}
                          type="number"
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}
                      
                      {field.type === 'date' && (
                        <Input
                          id={field.name}
                          type="date"
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                        />
                      )}
                      
                      {field.type === 'textarea' && (
                        <Textarea
                          id={field.name}
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          rows={4}
                        />
                      )}
                      
                      {field.type === 'select' && (
                        <Select onValueChange={(value) => handleInputChange(field.name, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}

                  {/* File Upload Section */}
                  <div className="space-y-4 pt-6 border-t">
                    <Label>Supporting Documents</Label>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-4 border-2 border-dashed rounded-lg">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">Upload supporting documents</p>
                          <p className="text-sm text-muted-foreground">PDF, DOC, DOCX (Max 10MB)</p>
                        </div>
                        <Input type="file" accept=".pdf,.doc,.docx" className="max-w-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="button" variant="outline" className="flex-1">
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Form
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Pitch Card */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-accent" />
                  Video Pitch
                </CardTitle>
                <CardDescription>
                  Upload a 3-minute video presentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!videoFile ? (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-2">Upload Video Pitch</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      MP4, MOV, AVI (Max 50MB, 3 minutes)
                    </p>
                    <Input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div className="flex-1">
                        <p className="font-medium">Video Uploaded</p>
                        <p className="text-sm text-muted-foreground">{videoFile.name}</p>
                      </div>
                    </div>
                    {uploadProgress < 100 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      Replace Video
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Form Progress */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Submission Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Form Completion</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Basic Details</span>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Documents</span>
                      <span className="text-warning">Pending</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Video Pitch</span>
                      <span className="text-warning">Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Other Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(formTemplates).map(([key, form]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="w-full justify-start h-auto py-3"
                      onClick={() => navigate(`/form/${key}`)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{form.title.split('(')[0]}</div>
                        <div className="text-xs text-muted-foreground">{form.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <GovtFooter />
    </div>
  );
}