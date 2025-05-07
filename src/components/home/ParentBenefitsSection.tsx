
import { Star, LayoutDashboard, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ParentBenefitsSection = () => {
  const benefits = [{
    icon: <Star className="w-8 h-8 text-tutor-purple" />,
    title: "Parent Reviews",
    description: "Join thousands of satisfied parents who trust HoneyLearn"
  }, {
    icon: <Star className="w-8 h-8 text-tutor-purple" />,
    title: "Expert-Backed",
    description: "Developed by real business leaders"
  }, {
    icon: <Shield className="w-8 h-8 text-tutor-purple" />,
    title: "Safe & Private",
    description: "Your child's safety and privacy are our top priority"
  }];

  return <section className="bg-tutor-dark py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          Parents Love HoneyLearn
        </h2>
        <div className="max-w-2xl mx-auto text-center text-yellow-500 mb-12 italic font-bold">
          "It's not just academics—it's teaching my kids how to be independent, think like leaders, and understand money. That's what school's missing." - A HoneyLearn Parent
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-tutor-dark-gray border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-tutor-gray">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>;
};

export default ParentBenefitsSection;
