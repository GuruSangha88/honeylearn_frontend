
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';
import Header from '@/components/Header';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

const TestLesson = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const { toast } = useToast();
  const convaiRef = useRef(null);
  const [agentLoaded, setAgentLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;
  const timeoutRef = useRef(null);

  // Clean up function to remove any timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // First, check if the script is already loaded
    if (window.customElements && window.customElements.get('elevenlabs-convai')) {
      console.log("ElevenLabs component is already registered");
      setAgentLoaded(true);
      setScriptError(false);
      return;
    }

    const loadScript = () => {
      setLoadingStage('Loading ElevenLabs script...');
      
      // Check if script already exists to avoid duplicate loading
      const existingScript = document.querySelector('script[data-elevenlabs="true"]');
      
      if (existingScript) {
        console.log("ElevenLabs script element exists in DOM");
        // The script exists but may have failed to load completely
        // Let's check if the custom element is registered
        if (window.customElements && window.customElements.get('elevenlabs-convai')) {
          console.log("ElevenLabs component is registered");
          setAgentLoaded(true);
          setScriptError(false);
          setLoadingStage('ElevenLabs script loaded successfully');
          return;
        } else {
          // Script exists but component isn't registered - remove the script to try again
          console.log("Script exists but component not registered, removing script to retry");
          document.head.removeChild(existingScript);
        }
      }
      
      // Clean up any failed script tags
      const failedScripts = document.querySelectorAll('script[data-elevenlabs-failed="true"]');
      failedScripts.forEach(script => script.parentNode.removeChild(script));
      
      // Create a new script element
      const script = document.createElement('script');
      script.src = 'https://cdn.elevenlabs.io/convai/v1/index.js';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute('data-elevenlabs', 'true');
      
      script.onload = () => {
        console.log("ElevenLabs script loaded successfully");
        
        // Give the browser some time to register the custom element
        timeoutRef.current = setTimeout(() => {
          if (window.customElements && window.customElements.get('elevenlabs-convai')) {
            setAgentLoaded(true);
            setScriptError(false);
            setRetryCount(0);
            setLoadingStage('ElevenLabs component registered successfully');
          } else {
            console.warn("Script loaded but component not registered");
            if (retryCount < MAX_RETRIES) {
              setRetryCount(prevCount => prevCount + 1);
              loadScript(); // Try again
            } else {
              setScriptError(true);
              setLoadingStage('Failed to initialize ElevenLabs component');
            }
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error("Error loading ElevenLabs script:", error);
        script.setAttribute('data-elevenlabs-failed', 'true');
        
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying script load (${retryCount + 1}/${MAX_RETRIES})...`);
          setRetryCount(prevCount => prevCount + 1);
          timeoutRef.current = setTimeout(loadScript, 2000); // Longer delay between retries
          setLoadingStage(`Retrying script load (${retryCount + 1}/${MAX_RETRIES})...`);
        } else {
          setScriptError(true);
          setLoadingStage('Failed to load ElevenLabs script after multiple attempts');
          toast({
            title: "Error",
            description: "Failed to load AI tutor resources after several attempts. Please check your internet connection and try again.",
            variant: "destructive"
          });
        }
      };
      
      document.head.appendChild(script);
    };
    
    // Start loading the script
    loadScript();
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [retryCount, toast]);

  // Check if convai element is ready
  const isConvaiReady = () => {
    return (
      convaiRef.current && 
      window.customElements && 
      window.customElements.get('elevenlabs-convai') &&
      document.querySelector('elevenlabs-convai') !== null
    );
  };

  const startLesson = async () => {
    console.log("Start lesson clicked, agent loaded:", agentLoaded);
    setIsLoading(true);
    setIsStarted(true);
    
    toast({
      title: "Lesson Started",
      description: "Your AI tutor is preparing to help you learn!",
    });
    
    // Polling mechanism to wait for the component to be ready
    const checkComponentAndSendMessage = () => {
      console.log("Checking if convai component is ready...");
      
      if (isConvaiReady()) {
        console.log("Convai component is ready, sending welcome message");
        try {
          // Create and dispatch the welcome event
          const welcomeEvent = new CustomEvent('convai-message', {
            detail: { message: "Hello, I'm ready to start my lesson!" }
          });
          convaiRef.current.dispatchEvent(welcomeEvent);
          setIsLoading(false);
        } catch (error) {
          console.error("Error sending welcome message:", error);
          toast({
            title: "Error",
            description: "There was an issue starting the conversation. Please refresh the page and try again.",
            variant: "destructive"
          });
          setIsLoading(false);
        }
      } else {
        console.log("Convai component not ready yet, waiting...");
        // Check again after a delay
        if (retryCount < MAX_RETRIES * 2) {  // More retries for component readiness
          setRetryCount(prevCount => prevCount + 1);
          timeoutRef.current = setTimeout(checkComponentAndSendMessage, 2000);
        } else {
          console.error("Convai component failed to initialize after multiple attempts");
          toast({
            title: "Error",
            description: "The AI tutor interface didn't load correctly. Please refresh the page and try again.",
            variant: "destructive"
          });
          setIsLoading(false);
        }
      }
    };
    
    // Start checking after giving component time to render
    timeoutRef.current = setTimeout(checkComponentAndSendMessage, 3000);
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
          
          {agentLoaded && !scriptError ? (
            <Button 
              onClick={startLesson} 
              disabled={isLoading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? 'Loading...' : 'Start Lesson'}
            </Button>
          ) : isLoading || retryCount > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 mb-4">
                <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                <span>{loadingStage || 'Loading...'}</span>
              </div>
              <Button 
                size="lg"
                variant="outline"
                disabled={true}
                className="border-blue-300 text-blue-500"
              >
                Preparing Lesson...
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => {
                setIsLoading(true);
                setRetryCount(1); // Trigger a retry
              }}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Lesson
            </Button>
          )}
          
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
                <div className="mt-4">
                  <Button 
                    onClick={() => {
                      setScriptError(false);
                      setRetryCount(1); // Trigger a retry
                    }}
                    variant="outline"
                    size="sm"
                    className="bg-white text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Your AI Tutor</h2>
          <div className="rounded-lg overflow-hidden" style={{ height: '500px' }}>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
                <p className="text-gray-600">Connecting to your AI tutor...</p>
              </div>
            ) : (
              <elevenlabs-convai
                ref={convaiRef}
                agent-id={ELEVENLABS_CONFIG.agentId}
                api-key={ELEVENLABS_CONFIG.apiKey}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestLesson;
