import { Star, LayoutDashboard, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const ParentBenefitsSection = () => {
  const benefits = [{
    icon: <Star className="w-8 h-8 text-tutor-purple" />,
    title: "Parent Reviews",
    description: "Join thousands of satisfied parents who trust HoneyLearn"
  }, {
    icon: <LayoutDashboard className="w-8 h-8 text-tutor-purple" />,
    title: "Learning Dashboard",
    description: "Track your child's progress and achievements"
  }, {
    icon: <Star className="w-8 h-8 text-tutor-purple" />,
    title: "Expert-Backed",
    description: "Developed with educators and child development experts"
  }, {
    icon: <Shield className="w-8 h-8 text-tutor-purple" />,
    title: "Safe & Private",
    description: "Your child's safety and privacy are our top priority"
  }];
  return <section className="bg-tutor-dark py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          Why Parents Love HoneyLearn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit, index) => {})}
        </div>
      </div>
    </section>;
};
export default ParentBenefitsSection;