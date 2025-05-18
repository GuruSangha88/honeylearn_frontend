
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';
import Header from '@/components/Header';

const TestLesson = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const convaiRef = useRef(null);
  const [agentLoaded, setAgentLoaded] = useState(false);

  useEffect(() => {
    // Load the ElevenLabs Convai script
    const script = document.createElement('script');
    script.src = 'https://cdn.elevenlabs.io/convai/v1/index.js';
    script.async = true;
    
    script.onload = () => {
      console.log("ElevenLabs script loaded successfully");
      setAgentLoaded(true);
    };
    
    script.onerror = (error) => {
      console.error("Error loading ElevenLabs script:", error);
      toast({
        title: "Error",
        description: "Failed to load AI tutor resources. Please try again later.",
        variant: "destructive"
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [toast]);

  const startLesson = () => {
    if (!agentLoaded) {
      toast({
        title: "Not Ready",
        description: "AI tutor resources are still loading. Please wait a moment.",
      });
      return;
    }
    
    try {
      console.log("Starting lesson...");
      setIsLoading(true);
      setIsStarted(true);
      
      toast({
        title: "Lesson Started",
        description: "Your AI tutor is ready to help you learn!",
      });
      
      // Give time for the component to render before sending the welcome message
      setTimeout(() => {
        if (convaiRef.current) {
          console.log("Sending welcome message to agent");
          const welcomeEvent = new CustomEvent('convai-message', {
            detail: { message: "Hello, I'm ready to start my lesson!" }
          });
          convaiRef.current?.dispatchEvent(welcomeEvent);
        } else {
          console.error("Convai element ref is not available");
        }
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error starting lesson:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
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
        </div>
      ) : (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Your AI Tutor</h2>
          <div className="rounded-lg overflow-hidden" style={{ height: '500px' }}>
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
