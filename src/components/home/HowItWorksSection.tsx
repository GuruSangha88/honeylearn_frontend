import { Play, Star, LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const HowItWorksSection = () => {
  const steps = [{
    icon: <Star className="w-8 h-8 text-tutor-purple" />,
    title: "Pick a Challenge or Course",
    description: "Choose from our library of engaging courses"
  }, {
    icon: <Play className="w-8 h-8 text-tutor-purple" />,
    title: "Watch. Play. Do.",
    description: "Interactive lessons, games, & real-life tasks"
  }, {
    icon: <Star className="w-8 h-8 text-tutor-purple" />,
    title: "Earn Badges and Celebrate",
    description: "Track progress and unlock achievements"
  }, {
    icon: <LayoutDashboard className="w-8 h-8 text-tutor-purple" />,
    title: "Parent Updates",
    description: "Stay informed with detailed progress reports"
  }];
  return <section id="how-it-works" className="bg-tutor-dark-gray py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          How HoneyLearn Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => <Card key={index} className="glass-card relative">
              
            </Card>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;