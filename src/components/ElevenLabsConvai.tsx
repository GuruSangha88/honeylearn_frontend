
import React, { useEffect, useRef, useState } from 'react';
import { loadElevenLabsScript } from '../elevenlabs';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/utils/analytics';

interface ElevenLabsConvaiProps {
  apiKey: string;
  agentId: string;
  voiceId?: string;
  modelId?: string;
  onInitialized?: () => void;
  onError?: () => void;
}

const ElevenLabsConvai = ({ 
  apiKey,
  agentId,
  voiceId,
  modelId,
  onInitialized, 
  onError 
}: ElevenLabsConvaiProps) => {
  const convaiRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    let mounted = true;
    let scriptLoadAttempts = 0;
    const MAX_ATTEMPTS = 3;
    
    const initializeConvai = async () => {
      if (!mounted) return;
      
      try {
        // Load the script
        const scriptLoaded = await loadElevenLabsScript();
        
        if (!scriptLoaded) {
          scriptLoadAttempts++;
          console.log(`Script load attempt ${scriptLoadAttempts} failed`);
          
          if (scriptLoadAttempts < MAX_ATTEMPTS) {
            // Retry after delay
            setTimeout(initializeConvai, 3000);
            return;
          }
          
          // All attempts failed
          console.error("Failed to load ElevenLabs script after multiple attempts");
          setIsLoading(false);
          if (onError) onError();
          return;
        }
        
        // Script loaded successfully
        setIsLoading(false);
        setIsInitialized(true);
        
        // Send welcome message after short delay
        setTimeout(() => {
          if (mounted && convaiRef.current && window.customElements.get('elevenlabs-convai')) {
            try {
              // Create and dispatch a welcome event
              const welcomeEvent = new CustomEvent('convai-message', {
                detail: { message: "Hello, I'm ready to start my lesson!" }
              });
              convaiRef.current.dispatchEvent(welcomeEvent);
              
              if (onInitialized) onInitialized();
            } catch (error) {
              console.error("Error sending welcome message:", error);
              if (onError) onError();
            }
          }
        }, 3000);
      } catch (error) {
        console.error("Error initializing ElevenLabs Convai:", error);
        setIsLoading(false);
        if (onError) onError();
      }
    };
    
    // Start initialization
    initializeConvai();
    
    // Clean up
    return () => {
      mounted = false;
    };
  }, [onInitialized, onError]);
  
  // Track when component is successfully initialized
  useEffect(() => {
    if (isInitialized) {
      trackEvent('ai_tutor_initialized');
    }
  }, [isInitialized]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
        <p className="text-gray-600">Loading AI tutor...</p>
      </div>
    );
  }
  
  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <p className="text-red-600">Failed to load AI tutor resources</p>
      </div>
    );
  }
  
  return (
    <elevenlabs-convai
      ref={convaiRef}
      agent-id={agentId}
      api-key={apiKey}
      voice-id={voiceId}
      model-id={modelId}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ElevenLabsConvai;
