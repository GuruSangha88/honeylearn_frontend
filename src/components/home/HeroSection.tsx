
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  onWatchVideo: () => void;
}

const HeroSection = ({ onWatchVideo }: HeroSectionProps) => {
  return (
    <section className="bg-tutor-dark py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
            Real-Life Skills for the Next Generation of Leaders
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            HoneyLearn teaches kids 5–12 leadership, money smarts, and confidence — all through fun challenges, videos, and games.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-tutor-purple hover:bg-tutor-dark-purple">
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onWatchVideo}
              className="border-tutor-purple text-tutor-purple hover:bg-tutor-purple/10"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch How It Works
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="aspect-video bg-tutor-dark-gray rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
              alt="Kids learning with HoneyLearn"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
