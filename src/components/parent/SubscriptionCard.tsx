
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackTrialStart } from "@/utils/analytics";

const SubscriptionCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isActive: boolean;
    isOnTrial: boolean;
    endDate: string | null;
    tier: string | null;
  }>({
    isActive: false,
    isOnTrial: false,
    endDate: null,
    tier: null
  });
  const { toast } = useToast();

  // Function to fetch subscription status
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
          // Call the check-subscription function to get real subscription data
          const { data, error } = await supabase.functions.invoke("check-subscription");
          
          if (error) {
            console.error("Error checking subscription:", error);
            return;
          }
          
          if (data) {
            // Format date for display
            let endDateFormatted = null;
            if (data.subscription_end) {
              const endDate = new Date(data.subscription_end);
              endDateFormatted = endDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
            }
            
            // Determine if user is on trial
            const now = new Date();
            const trialEnd = data.trial_end ? new Date(data.trial_end) : null;
            const isOnTrial = trialEnd && now < trialEnd;
            
            setSubscriptionStatus({
              isActive: data.subscribed,
              isOnTrial: isOnTrial,
              endDate: isOnTrial ? (trialEnd ? trialEnd.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : null) : endDateFormatted,
              tier: data.subscription_tier
            });
          } else {
            // Default values if no data returned
            setSubscriptionStatus({
              isActive: false,
              isOnTrial: false,
              endDate: null,
              tier: null
            });
          }
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };
    
    checkSubscriptionStatus();
    
    // Refresh subscription status every minute
    const intervalId = setInterval(checkSubscriptionStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error("User not authenticated. Please sign in again.");
      }

      const { data, error } = await supabase.functions.invoke("customer-portal", {
        body: { 
          userId: sessionData.session.user.id,
          email: sessionData.session.user.email 
        },
      });

      if (error) {
        console.error("Customer portal error:", error);
        throw error;
      }

      if (!data || !data.url) {
        throw new Error("Failed to create customer portal session - no URL returned");
      }
      
      // Redirect to the Stripe customer portal
      window.location.href = data.url;
    } catch (error: any) {
      console.error("Error accessing customer portal:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to access subscription management. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartTrial = async () => {
    setIsLoading(true);
    
    try {
      // Get the current user session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        throw new Error("User not authenticated. Please sign in again.");
      }

      const parentId = sessionData.session.user.id;
      const email = sessionData.session.user.email;

      // Call the Stripe checkout function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { parentId, email },
      });

      if (error) {
        console.error("Checkout function error:", error);
        throw error;
      }

      if (!data || !data.url) {
        throw new Error("Failed to create checkout session - no URL returned");
      }
      
      // Track trial start event
      trackTrialStart();
      
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#FCE20B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          Membership Details
        </CardTitle>
        <CardDescription>Manage your HoneyLearn subscription</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className={`px-3 py-2 rounded-md border ${
            subscriptionStatus.isActive 
              ? "bg-green-500/10 border-green-500/20" 
              : "bg-yellow-500/10 border-yellow-500/20"
          }`}>
            <p className="text-sm font-medium">
              {subscriptionStatus.isActive 
                ? "Active Subscription" 
                : "No Active Subscription"}
            </p>
            {subscriptionStatus.isActive ? (
              subscriptionStatus.isOnTrial ? (
                <p className="text-xs text-gray-400">Free Trial - Ends on {subscriptionStatus.endDate}</p>
              ) : (
                <p className="text-xs text-gray-400">
                  HoneyLearn {subscriptionStatus.tier || "Premium"} - $9.99/month
                  {subscriptionStatus.endDate && ` - Renews on ${subscriptionStatus.endDate}`}
                </p>
              )
            ) : (
              <p className="text-xs text-gray-400">Start your free 7-day trial today</p>
            )}
          </div>
          <p className="text-sm text-gray-400">
            {subscriptionStatus.isActive 
              ? "Your subscription provides full access to all learning materials and progress tracking for your students."
              : "Subscribe to get full access to all learning materials and progress tracking for your students."
            }
            {subscriptionStatus.isOnTrial && (
              <span className="block mt-1 font-medium text-[#FCE20B]">
                Enjoying your free trial? Your first payment will be processed after your trial ends.
              </span>
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {subscriptionStatus.isActive ? (
          <Button 
            onClick={handleManageSubscription}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Manage Subscription"
            )}
          </Button>
        ) : (
          <Button 
            onClick={handleStartTrial}
            disabled={isLoading}
            className="w-full bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black font-bold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Start Free Trial"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
