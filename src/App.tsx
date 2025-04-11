
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Curriculum from "./pages/Curriculum";
import TopicDetail from "./pages/TopicDetail";
import LessonDetail from "./pages/LessonDetail";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TopNav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/topic/:topicId" element={<TopicDetail />} />
            <Route path="/lesson/:lessonId" element={<LessonDetail />} />
            <Route path="/parents" element={<ParentDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
