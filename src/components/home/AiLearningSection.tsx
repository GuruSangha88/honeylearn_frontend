import { Sparkles, Bot, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const AiLearningSection = () => {
  return <section className="py-16 bg-gradient-to-b from-tutor-dark to-tutor-dark-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 order-2 md:order-1">
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-purple-500/20">
                <div className="relative">
                  <img src="/lovable-uploads/8fe78391-45b2-429a-b523-6e9d80c8f4ca.png" alt="AI Learning Interface with Money Lesson" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">AI Assistant</span>
                      </div>
                      <p className="text-lg font-medium">Teaching kids skills that matter</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-tutor-purple text-white p-3 rounded-full shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-400 w-6 h-6" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                AI Guided Learning
              </h2>
            </div>
            
            <p className="text-xl text-gray-300">
              HoneyLearn lessons are fun and interactive, and use the latest AI technology to ensure your kid learns exactly what will get them ahead!
            </p>
            
            <ul className="space-y-4">
              {[{
              icon: <Bot className="w-5 h-5 text-purple-400" />,
              title: "Personalized Learning Path",
              description: "AI adapts lessons to your child's interests and learning style"
            }, {
              icon: <Book className="w-5 h-5 text-blue-400" />,
              title: "Interactive Challenges",
              description: "Engaging scenarios that make learning feel like play"
            }].map((item, i) => <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-tutor-dark-gray p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </li>)}
            </ul>
            
            <div className="pt-4">
              <Link to="/signup">
                <Button size="lg" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black px-8 text-base font-bold">
                  Start learning today &gt;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AiLearningSection;