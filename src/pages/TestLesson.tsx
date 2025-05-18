import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
// Import your ElevenLabs API configuration file - Fixed import path
import * as elevenLabsConfig from '../elevenlabs';
import Header from '@/components/Header';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import ElevenLabsConvai from '@/components/ElevenLabsConvai';
import { trackEvent } from '@/utils/analytics';

const SimplifiedLesson = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [elevenLabsAvailable, setElevenLabsAvailable] = useState(true);
  const [apiKey, setApiKey] = useState('');
  
  // Get ElevenLabs API key from config on component mount
  useEffect(() => {
    const initializeElevenLabs = async () => {
      try {
        // Check if API key and agent ID exist in the config
        if (elevenLabsConfig.apiKey && elevenLabsConfig.agentId) {
          setApiKey(elevenLabsConfig.apiKey);
          console.log("ElevenLabs configuration loaded successfully");
        } else {
          console.error("ElevenLabs configuration incomplete. Missing API key or agent ID.");
          setElevenLabsAvailable(false);
        }
      } catch (error) {
        console.error("Error loading ElevenLabs config:", error);
        setElevenLabsAvailable(false);
      }
    };
    
    initializeElevenLabs();
  }, []);
  
  const handleConvaiInitialized = () => {
    console.log("ElevenLabs Convai successfully initialized");
    setIsLoading(false);
    trackEvent('elevenlabs_convai_initialized');
    toast({
      title: "AI Tutor Ready",
      description: "You can now start your interactive lesson!",
    });
  };

  const handleConvaiError = () => {
    console.error("Error initializing ElevenLabs Convai");
    setIsLoading(false);
    trackEvent('elevenlabs_convai_error');
    setElevenLabsAvailable(false);
    toast({
      title: "Connection Error",
      description: "Unable to connect to ElevenLabs. Please check your connection and try again.",
      variant: "destructive"
    });
  };

  const startLesson = async () => {
    console.log("Start lesson clicked");
    setIsLoading(true);
    setIsStarted(true);
    
    // Check if ElevenLabs configuration is complete before proceeding
    if (!apiKey || !elevenLabsConfig.agentId) {
      console.error("ElevenLabs configuration incomplete");
      setElevenLabsAvailable(false);
      setIsLoading(false);
      toast({
        title: "Configuration Error",
        description: "ElevenLabs API key or agent ID missing. Please check your configuration.",
        variant: "destructive"
      });
      return;
    }
    
    trackEvent('lesson_started', { 
      mode: 'elevenlabs',
      agentId: elevenLabsConfig.agentId
    });
    
    toast({
      title: "Connecting...",
      description: "Establishing connection to ElevenLabs AI tutor.",
    });
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
            Click the button below to begin!
          </p>
          
          <Button 
            onClick={startLesson} 
            disabled={isLoading}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Lesson
          </Button>
        </div>
      ) : (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-md" style={{ height: '600px' }}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full bg-gray-50">
              <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
              <p className="text-gray-600">Connecting to ElevenLabs AI tutor...</p>
              <p className="text-sm text-gray-400 mt-2">This may take a few seconds</p>
            </div>
          ) : elevenLabsAvailable ? (
            <ElevenLabsConvai 
              apiKey={apiKey}
              agentId={elevenLabsConfig.agentId || ""}
              voiceId={elevenLabsConfig.voiceId || ""}
              modelId={elevenLabsConfig.modelId || ""}
              onInitialized={handleConvaiInitialized} 
              onError={handleConvaiError}
            />
          ) : (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                Unable to connect to ElevenLabs AI. Please ensure your agent ID and API key are correctly configured.
                <div className="mt-2 text-sm">
                  Error details: Missing or invalid configuration parameters.
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default SimplifiedLesson;
