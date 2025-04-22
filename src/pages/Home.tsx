
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, MessageSquare, DollarSign, Wrench, Play, Star, LayoutDashboard, Shield } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import SkillsSection from "@/components/home/SkillsSection";
// Import removed: import HowItWorksSection from "@/components/home/HowItWorksSection";
import ParentBenefitsSection from "@/components/home/ParentBenefitsSection";
import FaqSection from "@/components/home/FaqSection";

const Home = () => {
  const scrollToVideo = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection onWatchVideo={scrollToVideo} />
      <StatsSection />
      <SkillsSection />
      {/* HowItWorksSection removed */}
      <ParentBenefitsSection />
      <FaqSection />
    </div>
  );
};

export default Home;
