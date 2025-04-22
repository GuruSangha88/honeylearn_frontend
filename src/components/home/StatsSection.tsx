
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    {
      percentage: "65%",
      description: "of jobs Generation Z will work in don't exist yet"
    },
    {
      percentage: "78%",
      description: "of teachers say school doesn't prepare kids for real life"
    },
    {
      percentage: "92%",
      description: "of parents want their kids to learn practical life skills"
    }
  ];

  return (
    <section className="bg-tutor-dark-gray py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Why Traditional Education Isn't Enough
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-6 text-center">
                <p className="text-4xl md:text-5xl font-bold text-tutor-purple mb-4">
                  {stat.percentage}
                </p>
                <p className="text-gray-300">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
