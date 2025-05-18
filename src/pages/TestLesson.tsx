
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const TestLesson = () => {
  const [text, setText] = useState('Hello, welcome to HoneyLearn! How can I help you today?');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const convaiRef = useRef<HTMLElement>(null);
  const [agentLoaded, setAgentLoaded] = useState(false);

  useEffect(() => {
    // Load the ElevenLabs Convai script
    const script = document.createElement('script');
    script.src = 'https://cdn.elevenlabs.io/convai/v1/index.js';
    script.async = true;
    
    script.onload = () => {
      setAgentLoaded(true);
      toast({
        title: "Agent Loaded",
        description: "The conversational agent is ready to talk!",
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleTalk = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text for the AI to speak.",
        variant: "destructive",
      });
      return;
    }

    if (agentLoaded && convaiRef.current) {
      // If the Convai agent is loaded, send the message to it
      // The official way to communicate with the agent
      const customEvent = new CustomEvent('convai-message', {
        detail: { message: text }
      });
      convaiRef.current.dispatchEvent(customEvent);
      
      toast({
        title: "Success",
        description: "Message sent to conversational agent!",
      });
    } else {
      setIsLoading(true);
      try {
        // Fallback to direct API call if agent isn't loaded
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': 'YOUR_ELEVENLABS_API_KEY',
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();

        toast({
          title: "Success",
          description: "AI is speaking now!",
        });
      } catch (error) {
        console.error('Error calling ElevenLabs API:', error);
        toast({
          title: "Error",
          description: "Failed to generate speech. Please check your API key and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Replace this value with your actual ElevenLabs agent ID
  // You can find this in your ElevenLabs dashboard
  const agentId = 'YOUR_AGENT_ID';  // <-- Replace this value

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test Lesson with ElevenLabs AI</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <p className="mb-4 text-gray-700">Enter text to say to the conversational agent:</p>
        <div className="space-y-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text for AI to speak..."
            className="w-full"
          />
          <Button 
            onClick={handleTalk} 
            disabled={isLoading}
            className="bg-tutor-purple hover:bg-tutor-dark-purple text-white"
          >
            {isLoading ? 'Processing...' : 'Talk to Agent'}
          </Button>
        </div>
      </div>

      {/* ElevenLabs Convai Widget */}
      <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Conversational Agent</h2>
        <div className="rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <elevenlabs-convai
            ref={convaiRef}
            agent-id={agentId}
            // The agent ID is used here
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
        <p className="text-amber-700 text-sm">
          <strong>Note:</strong> You need to:
          <ul className="list-disc ml-6 mt-2">
            <li>Replace 'YOUR_AGENT_ID' with the agent ID you created in ElevenLabs.</li>
            <li>Replace 'YOUR_ELEVENLABS_API_KEY' with your actual ElevenLabs API key for the direct API fallback.</li>
          </ul>
          You can get an API key by signing up at <a href="https://elevenlabs.io" className="underline" target="_blank" rel="noopener noreferrer">elevenlabs.io</a>.
        </p>
      </div>
    </div>
  );
};

export default TestLesson;
