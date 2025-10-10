import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import GoogleTranslate from "./components/GoogleTranslate";
import ResearcherPage from "./pages/Researcher";
import ApexPage from "./pages/Apex";
import RevisionPage from "./pages/Revision";
import FormSubmission from "./pages/Forms";
import UpdateFormPage from "./pages/UpdateForm"
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <GoogleTranslate /> */}

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/index" element={<Index />} />
          <Route path="/NACCER" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/researcher" element={<ResearcherPage />} />
          <Route path="/apex" element={<ApexPage />} />
                    <Route path="/update-form" element={<UpdateFormPage />} />

                    <Route path="/revision" element={<RevisionPage />} />

          <Route path="/form/:formType" element={<FormSubmission />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
