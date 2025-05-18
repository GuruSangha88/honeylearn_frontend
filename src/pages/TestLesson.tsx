import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { isElevenLabsAvailable } from '../config/elevenlabs';
import Header from '@/components/Header';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, MessageSquare } from "lucide-react";
import ElevenLabsConvai from '@/components/ElevenLabsConvai';
import { trackEvent } from '@/utils/analytics';

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
  const [useFallback, setUseFallback] = useState(!isElevenLabsAvailable());
  
  const handleFallbackMessage = (message) => {
    console.log("Fallback message sent:", message);
    trackEvent('fallback_message_sent', { message });
    // Here you could implement an alternative API call to process the message
  };

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
    console.log("Error initializing ElevenLabs Convai, switching to fallback");
    setUseFallback(true);
    setIsLoading(false);
    trackEvent('elevenlabs_convai_error');
    toast({
      title: "Notice",
      description: "Using simplified tutor interface due to technical issues.",
      variant: "default"
    });
  };

  const startLesson = async () => {
    console.log("Start lesson clicked");
    setIsLoading(true);
    setIsStarted(true);
    setLoadingStage('Preparing your AI tutor...');
    
    trackEvent('lesson_started', { 
      mode: useFallback ? 'fallback' : 'elevenlabs'
    });
    
    toast({
      title: "Lesson Started",
      description: "Your AI tutor is preparing to help you learn!",
    });
    
    // If using fallback, we can stop loading immediately
    if (useFallback) {
      console.log("Using fallback interface");
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
          
          {useFallback && (
            <Alert variant="destructive" className="mt-4 max-w-md">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Connection Notice</AlertTitle>
              <AlertDescription>
                Using simplified tutor interface due to compatibility or connectivity issues.
                <div className="mt-2 text-sm text-gray-600">
                  This could be due to ad blockers, network issues, or browser settings.
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
                <p className="text-gray-600">{loadingStage || 'Connecting to your AI tutor...'}</p>
              </div>
            ) : useFallback ? (
              <FallbackConversation onSendMessage={handleFallbackMessage} />
            ) : (
              <ElevenLabsConvai 
                onInitialized={handleConvaiInitialized} 
                onError={handleConvaiError}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestLesson;
