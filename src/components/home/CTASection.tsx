
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-tutor-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-xl"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
            Start Your Child's Real-World Education Today
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="text-yellow-400 fill-yellow-400 w-6 h-6" />
            ))}
          </div>
          
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of parents who trust HoneyLearn to teach their kids the skills that schools don't cover.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black px-8 text-base font-bold">
                Try for free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
