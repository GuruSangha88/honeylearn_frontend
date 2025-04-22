
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TopicDetail from "./pages/TopicDetail";
import LessonDetail from "./pages/LessonDetail";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";
import SignUpFlow from "./pages/auth/SignUpFlow";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Toaster />
            <Sonner />
            <TopNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup/*" element={<SignUpFlow />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/topic/:topicId" element={<TopicDetail />} />
              <Route path="/lesson/:lessonId" element={<LessonDetail />} />
              <Route path="/parents" element={<ParentDashboard />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
