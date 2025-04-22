
import { Lightbulb, MessageSquare, DollarSign, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SkillsSection = () => {
  const skills = [
    {
      icon: <Lightbulb className="w-8 h-8 text-tutor-blue" />,
      title: "Entrepreneurship",
      description: "Run mini businesses & solve real problems"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-tutor-blue" />,
      title: "Communication & Leadership",
      description: "Speak up, lead teams, give feedback"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-tutor-blue" />,
      title: "Money Skills",
      description: "Budget, save, earn and understand value"
    },
    {
      icon: <Wrench className="w-8 h-8 text-tutor-blue" />,
      title: "Life Skills",
      description: "Fix a flat tire, write a resume, cook a meal"
    }
  ];

  return (
    <section className="bg-tutor-dark-gray py-16 bg-gradient-to-br from-tutor-dark-gray to-tutor-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Skills They'll Actually Use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {skills.map((skill, index) => (
            <Card 
              key={index} 
              className="glass-card hover:scale-105 transition-transform duration-300 border-2 border-tutor-blue/20 shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center items-center w-16 h-16 bg-tutor-blue/10 rounded-full mx-auto">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-tutor-blue mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-300">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
