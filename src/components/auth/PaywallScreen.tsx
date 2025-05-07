
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaywallScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setIsLoading(true);

    try {
      // Get the current user session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error("User not authenticated. Please sign in again.");
      }

      const parentId = sessionData.session.user.id;
      const email = sessionData.session.user.email;

      console.log("Starting checkout with parent ID:", parentId, "and email:", email);

      // Call the Stripe checkout function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { parentId, email },
      });

      if (error) {
        console.error("Checkout function error:", error);
        throw error;
      }

      if (!data || !data.url) {
        console.error("No checkout URL returned:", data);
        throw new Error("Failed to create checkout session - no URL returned");
      }

      console.log("Redirecting to Stripe checkout:", data.url);
      
      // Use window.location.href for a full page redirect to Stripe
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Error starting checkout:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
        <p className="mt-2 text-gray-400">Start your learning journey today</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Premium Plan</h3>
          <p className="text-4xl font-bold text-[#FCE20B] mt-2">$29/month</p>
          <p className="text-gray-400 mt-2">Full access to all features</p>
        </div>
        
        <ul className="space-y-3">
          <li className="flex items-center text-white">
            <svg className="w-5 h-5 text-[#FCE20B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Unlimited lessons
          </li>
          <li className="flex items-center text-white">
            <svg className="w-5 h-5 text-[#FCE20B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Progress tracking
          </li>
          <li className="flex items-center text-white">
            <svg className="w-5 h-5 text-[#FCE20B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Personalized learning path
          </li>
        </ul>
        
        <Button 
          className="w-full bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black font-bold"
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Start Premium Plan"
          )}
        </Button>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>For testing, use Stripe test card:</p>
          <p className="font-mono mt-1">4242 4242 4242 4242</p>
          <p className="font-mono">Any future date, any CVC, any ZIP</p>
        </div>
      </div>
    </div>
  );
};

export default PaywallScreen;
