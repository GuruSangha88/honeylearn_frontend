
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SubscriptionCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
          <div className="px-3 py-2 bg-yellow-500/10 rounded-md border border-yellow-500/20">
            <p className="text-sm font-medium">Active Subscription</p>
            <p className="text-xs text-gray-400">HoneyLearn Premium - $9.99/month</p>
          </div>
          <p className="text-sm text-gray-400">
            Your subscription provides full access to all learning materials and progress tracking for your students.
          </p>
        </div>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
