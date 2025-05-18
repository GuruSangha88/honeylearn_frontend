
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';
import Header from '@/components/Header';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const TestLesson = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const convaiRef = useRef(null);
  const [agentLoaded, setAgentLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const loadScript = () => {
      // Check if script already exists to avoid duplicate loading
      const existingScript = document.querySelector('script[src="https://cdn.elevenlabs.io/convai/v1/index.js"]');
      
      if (existingScript) {
        console.log("ElevenLabs script already exists, setting agent as loaded");
        setAgentLoaded(true);
        setScriptError(false);
        return;
      }
      
      // Clean up any failed script tags first
      const failedScripts = document.querySelectorAll('script[data-elevenlabs-failed="true"]');
      failedScripts.forEach(script => {
        document.head.removeChild(script);
      });
      
      // Load the ElevenLabs Convai script
      const script = document.createElement('script');
      script.src = 'https://cdn.elevenlabs.io/convai/v1/index.js';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute('data-elevenlabs', 'true');
      
      script.onload = () => {
        console.log("ElevenLabs script loaded successfully");
        setAgentLoaded(true);
        setScriptError(false);
        setRetryCount(0); // Reset retry count on success
      };
      
      script.onerror = (error) => {
        console.error("Error loading ElevenLabs script:", error);
        script.setAttribute('data-elevenlabs-failed', 'true');
        
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying script load (${retryCount + 1}/${MAX_RETRIES})...`);
          setRetryCount(prevCount => prevCount + 1);
          // Try again with a delay
          setTimeout(loadScript, 1500);
        } else {
          setScriptError(true);
          toast({
            title: "Error",
            description: "Failed to load AI tutor resources after several attempts. Please check your internet connection and try again.",
            variant: "destructive"
          });
        }
      };
      
      document.head.appendChild(script);
    };
    
    loadScript();
    
    return () => {
      // Clean up script when component unmounts
      const script = document.querySelector('script[data-elevenlabs="true"]');
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [retryCount, toast]);

  const startLesson = () => {
    console.log("Start lesson clicked, agent loaded:", agentLoaded);
    
    // Even if the agent isn't fully loaded, we'll try to start the lesson
    // This is more user-friendly than blocking the button
    setIsLoading(true);
    setIsStarted(true);
    
    toast({
      title: "Lesson Started",
      description: "Your AI tutor is preparing to help you learn!",
    });
    
    // Give time for the component to render before sending the welcome message
    setTimeout(() => {
      try {
        console.log("Attempting to send welcome message, ref exists:", !!convaiRef.current);
        
        if (window.customElements && window.customElements.get('elevenlabs-convai') && convaiRef.current) {
          console.log("Sending welcome message to agent");
          // Create and dispatch the welcome event
          const welcomeEvent = new CustomEvent('convai-message', {
            detail: { message: "Hello, I'm ready to start my lesson!" }
          });
          convaiRef.current.dispatchEvent(welcomeEvent);
        } else {
          console.warn("Convai element is not fully initialized yet");
          // Show a toast to let the user know
          toast({
            title: "Still Loading",
            description: "The AI tutor is taking longer than expected to initialize. You may need to refresh the page if it doesn't respond soon.",
          });
        }
      } catch (error) {
        console.error("Error sending welcome message:", error);
        toast({
          title: "Error",
          description: "There was an issue starting the conversation. Please refresh the page and try again.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 4000); // Increased timeout to ensure component is fully rendered
  };
  
  // Mock user data for Header component
  const mockStudent = { name: "Student" };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header student={mockStudent} />
      <h1 className="text-2xl font-bold mb-6">Interactive Lesson</h1>
      
      {!isStarted ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Ready to start your lesson?</h2>
          <p className="text-gray-600 mb-8 text-center">
            Your AI tutor will guide you through this interactive session.
            Just click the button below to begin!
          </p>
          <Button 
            onClick={startLesson} 
            disabled={isLoading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Loading...' : 'Start Lesson'}
          </Button>
          
          {scriptError && (
            <Alert variant="destructive" className="mt-4 max-w-md">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                There was an issue loading the tutor resources. This could be due to:
                <ul className="list-disc ml-5 mt-2">
                  <li>Internet connection issues</li>
                  <li>Browser security settings</li>
                  <li>Ad blockers or content filters</li>
                </ul>
                Try refreshing the page or disabling any content blockers.
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Your AI Tutor</h2>
          <div className="rounded-lg overflow-hidden" style={{ height: '500px' }}>
            {/* Only render the elevenlabs-convai component after clicking the start button */}
            <elevenlabs-convai
              ref={convaiRef}
              agent-id={ELEVENLABS_CONFIG.agentId}
              api-key={ELEVENLABS_CONFIG.apiKey}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestLesson;
