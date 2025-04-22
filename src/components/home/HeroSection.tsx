import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onWatchVideo?: () => void;
}

const HeroSection = ({
  onWatchVideo
}: HeroSectionProps) => {
  return <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text leading-tight">
            What If Your Kid Learned the Skills That Actually Mattered?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            Schools teach facts. HoneyLearn teaches how to think, lead, earn, and thrive — in the real world.
          </p>
          <div className="pt-4 flex gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black px-8 text-base font-bold">
                Try for free &gt;
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl overflow-hidden">
            <img src="/lovable-uploads/f48a591f-9a92-4f14-848e-b66104e4675c.png" alt="Interactive learning platform" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
