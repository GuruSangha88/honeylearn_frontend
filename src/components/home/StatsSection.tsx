
import { Separator } from "@/components/ui/separator";

const StatsSection = () => {
  const stats = [
    {
      percentage: "65%",
      description: "of jobs Generation Z will work in don't exist yet",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400"
    },
    {
      percentage: "78%",
      description: "of teachers say school doesn't prepare kids for real life",
      bgColor: "bg-teal-500/10",
      textColor: "text-teal-400"
    },
    {
      percentage: "92%",
      description: "of parents want their kids to learn practical life skills",
      bgColor: "bg-pink-500/10",
      textColor: "text-pink-400"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mb-16">
        <Separator className="bg-gray-700/30 h-[1px]" />
      </div>
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-16">
        Why Traditional Education Isn't Enough
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className={`w-32 h-32 rounded-full ${stat.bgColor} flex items-center justify-center mb-6`}>
              <span className={`text-4xl font-bold ${stat.textColor}`}>
                {stat.percentage}
              </span>
            </div>
            <p className="text-gray-300 text-center">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
