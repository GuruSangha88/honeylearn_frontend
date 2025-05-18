
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';

const TestLesson = () => {
  const [text, setText] = useState('Hello, welcome to HoneyLearn! How can I help you today?');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const convaiRef = useRef<HTMLElement>(null);
  const [agentLoaded, setAgentLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');

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
            'xi-api-key': apiKey || 'YOUR_ELEVENLABS_API_KEY', // Use entered API key if available
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

      {/* Add API key input field */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <p className="mb-4 text-gray-700">ElevenLabs API Key (for direct TTS fallback):</p>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your ElevenLabs API key"
          className="w-full"
        />
        <p className="mt-2 text-xs text-gray-500">
          This key is only stored in your browser's memory and is not saved anywhere.
        </p>
      </div>

      {/* ElevenLabs Convai Widget */}
      <div className="mt-6 border rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Conversational Agent</h2>
        <div className="rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <elevenlabs-convai
            ref={convaiRef}
            agent-id={ELEVENLABS_CONFIG.agentId}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
        <p className="text-amber-700 text-sm">
          <strong>Note:</strong> You need to:
          <ul className="list-disc ml-6 mt-2">
            <li>Add your agent ID in the <code>src/config/elevenlabs.ts</code> file.</li>
            <li>Enter your ElevenLabs API key in the field above for the direct API fallback.</li>
          </ul>
          You can get an API key by signing up at <a href="https://elevenlabs.io" className="underline" target="_blank" rel="noopener noreferrer">elevenlabs.io</a>.
        </p>
      </div>
    </div>
  );
};

export default TestLesson;
