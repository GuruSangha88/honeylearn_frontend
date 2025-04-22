
import { Lightbulb, MessageSquare, DollarSign, Wrench } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      icon: <Lightbulb className="text-blue-300 w-8 h-8" />,
      title: "Entrepreneurship",
      description: "Run mini businesses & solve real problems",
      gradient: "from-blue-500/10 to-blue-700/10",
      borderColor: "from-blue-400 to-blue-600",
      hoverBg: "bg-blue-400/5",
      textColor: "text-blue-300"
    },
    {
      icon: <MessageSquare className="text-teal-300 w-8 h-8" />,
      title: "Communication & Leadership",
      description: "Speak up, lead teams, give feedback",
      gradient: "from-teal-500/10 to-teal-700/10",
      borderColor: "from-teal-400 to-teal-600",
      hoverBg: "bg-teal-400/5",
      textColor: "text-teal-300"
    },
    {
      icon: <DollarSign className="text-green-300 w-8 h-8" />,
      title: "Money Skills",
      description: "Budget, save, earn and understand value",
      gradient: "from-green-500/10 to-green-700/10",
      borderColor: "from-green-400 to-green-600",
      hoverBg: "bg-green-400/5",
      textColor: "text-green-300"
    },
    {
      icon: <Wrench className="text-purple-300 w-8 h-8" />,
      title: "Life Skills",
      description: "Fix a flat tire, write a resume, cook a meal",
      gradient: "from-purple-500/10 to-purple-700/10",
      borderColor: "from-purple-400 to-purple-600",
      hoverBg: "bg-purple-400/5",
      textColor: "text-purple-300"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-16">
        Skills They'll Actually Use
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-gradient-to-br ${skill.gradient} rounded-2xl p-6 relative group cursor-pointer`}
          >
            <div className={`absolute inset-0 ${skill.hoverBg} rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300`}></div>
            <div className="relative z-10">
              {skill.icon}
              <h3 className={`text-xl font-bold ${skill.textColor} mb-2 mt-4`}>
                {skill.title}
              </h3>
              <p className="text-gray-400">{skill.description}</p>
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${skill.borderColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
