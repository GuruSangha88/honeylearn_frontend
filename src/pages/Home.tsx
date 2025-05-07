
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, MessageSquare, DollarSign, Wrench, Play, Star, LayoutDashboard, Shield, Sparkles } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import SkillsSection from "@/components/home/SkillsSection";
import ParentBenefitsSection from "@/components/home/ParentBenefitsSection";
import FaqSection from "@/components/home/FaqSection";
import AiLearningSection from "@/components/home/AiLearningSection";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <AiLearningSection />
      <SkillsSection />
      <div id="parent-benefits">
        <ParentBenefitsSection />
      </div>
      <CTASection />
      <FaqSection />
    </div>
  );
};

export default Home;
