
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const TestLesson = () => {
  const [text, setText] = useState('Hello, welcome to HoneyLearn! How can I help you today?');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTalk = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text for the AI to speak.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Using ElevenLabs Text to Speech API
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You'll need to replace this with your actual API key from ElevenLabs
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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test Lesson with ElevenLabs AI</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <p className="mb-4 text-gray-700">Enter text for the AI to speak:</p>
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
            {isLoading ? 'Speaking...' : 'Talk'}
          </Button>
        </div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-amber-700 text-sm">
          <strong>Note:</strong> You need to replace 'YOUR_ELEVENLABS_API_KEY' with your actual ElevenLabs API key.
          You can get one by signing up at <a href="https://elevenlabs.io" className="underline" target="_blank" rel="noopener noreferrer">elevenlabs.io</a>.
        </p>
      </div>
    </div>
  );
};

export default TestLesson;
