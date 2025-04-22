import { Button } from "@/components/ui/button";
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
            Real-Life Skills for the Next Generation of Leaders
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            HoneyLearn teaches kids 5-12 leadership, money smarts, and confidence — all through fun challenges, videos, and games.
          </p>
          <div className="pt-4 flex gap-4">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white px-8">
              Start Free Trial
            </Button>
            {onWatchVideo}
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