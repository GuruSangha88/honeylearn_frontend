
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';
import Header from '@/components/Header';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, MessageSquare } from "lucide-react";

// Fallback component when ElevenLabs component fails to load
const FallbackConversation = ({ onSendMessage }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI tutor. What would you like to learn today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Notify parent component
    if (onSendMessage) {
      onSendMessage(input);
    }
    
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        text: "I understand. Could you tell me more about what you'd like to learn?", 
        isUser: false 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-lg p-3 ${
                msg.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="border-t border-gray-700 p-3 flex">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border border-gray-600 rounded-l-md p-2 text-white outline-none"
        />
        <Button 
          type="submit"
          className="rounded-l-none"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

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
  const [useFallback, setUseFallback] = useState(false);
  
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
            if (retryCount < MAX_RETRIES - 1) {
              setRetryCount(prevCount => prevCount + 1);
              loadScript(); // Try again
            } else {
              console.log("Using fallback interface after multiple failures");
              setScriptError(true);
              setUseFallback(true);
              setLoadingStage('Using simplified tutor interface');
              toast({
                title: "Notice",
                description: "Using simplified tutor interface due to connectivity issues.",
                variant: "default"
              });
            }
          }
        }, 2000);
      };
      
      script.onerror = (error) => {
        console.error("Error loading ElevenLabs script:", error);
        script.setAttribute('data-elevenlabs-failed', 'true');
        
        if (retryCount < MAX_RETRIES - 1) {
          console.log(`Retrying script load (${retryCount + 1}/${MAX_RETRIES})...`);
          setRetryCount(prevCount => prevCount + 1);
          timeoutRef.current = setTimeout(loadScript, 2000); // Longer delay between retries
          setLoadingStage(`Retrying script load (${retryCount + 1}/${MAX_RETRIES})...`);
        } else {
          console.log("Using fallback interface after multiple failures");
          setScriptError(true);
          setUseFallback(true);
          setLoadingStage('Using simplified tutor interface');
          toast({
            title: "Notice",
            description: "Using simplified tutor interface due to connectivity issues.",
            variant: "default"
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

  const handleFallbackMessage = (message) => {
    console.log("Fallback message sent:", message);
    // Here you could implement an alternative API call to process the message
    // For example, connecting to a server-side endpoint that uses OpenAI or another AI service
  };

  const startLesson = async () => {
    console.log("Start lesson clicked, agent loaded:", agentLoaded);
    setIsLoading(true);
    setIsStarted(true);
    
    toast({
      title: "Lesson Started",
      description: "Your AI tutor is preparing to help you learn!",
    });
    
    if (useFallback) {
      console.log("Using fallback interface");
      setIsLoading(false);
      return;
    }
    
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
          console.log("Switching to fallback interface");
          setUseFallback(true);
          setIsLoading(false);
          toast({
            title: "Notice",
            description: "Using simplified tutor interface due to technical issues.",
            variant: "default"
          });
        }
      } else {
        console.log("Convai component not ready yet, waiting...");
        // Check again after a delay
        if (retryCount < MAX_RETRIES * 2) {  // More retries for component readiness
          setRetryCount(prevCount => prevCount + 1);
          timeoutRef.current = setTimeout(checkComponentAndSendMessage, 2000);
        } else {
          console.error("Convai component failed to initialize after multiple attempts");
          console.log("Switching to fallback interface");
          setUseFallback(true);
          setIsLoading(false);
          toast({
            title: "Notice",
            description: "Using simplified tutor interface due to technical issues.",
            variant: "default"
          });
        }
      }
    };
    
    // Start checking after giving component time to render
    if (!useFallback) {
      timeoutRef.current = setTimeout(checkComponentAndSendMessage, 3000);
    } else {
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
          
          {isLoading && (
            <div className="flex items-center space-x-2 mt-4">
              <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
              <span>{loadingStage || 'Loading...'}</span>
            </div>
          )}
          
          {scriptError && !useFallback && (
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
                <div className="mt-4">
                  <Button 
                    onClick={() => {
                      setScriptError(false);
                      setRetryCount(1); // Trigger a retry
                      setUseFallback(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="bg-white text-red-600 border-red-300 hover:bg-red-50 mr-2"
                  >
                    Try Again
                  </Button>
                  <Button 
                    onClick={() => {
                      setUseFallback(true);
                      setScriptError(false);
                      startLesson();
                    }}
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Use Simple Mode
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your AI Tutor</h2>
            {useFallback && (
              <div className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <MessageSquare className="h-3 w-3 mr-1" />
                Simple Mode
              </div>
            )}
          </div>
          
          <div className="rounded-lg overflow-hidden" style={{ height: '500px' }}>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-4" />
                <p className="text-gray-600">Connecting to your AI tutor...</p>
              </div>
            ) : useFallback ? (
              <FallbackConversation onSendMessage={handleFallbackMessage} />
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
