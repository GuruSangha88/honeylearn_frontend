
import React, { useEffect } from 'react';

const TestLesson = () => {
  useEffect(() => {
    // Create script element for the ElevenLabs Convai widget
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test Lesson with ElevenLabs AI</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="mb-4">This is a test page integrating the ElevenLabs Convai widget.</p>
        <elevenlabs-convai agent-id="agent_01jvj8dgh5fdtt524zd6r5bffk"></elevenlabs-convai>
      </div>
    </div>
  );
};

export default TestLesson;
