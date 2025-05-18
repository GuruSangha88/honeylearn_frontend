
import React from 'react';

const TestLesson = () => {
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

// This adds the script to the document in a non-React way
// It will only run on the client side
if (typeof document !== 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://elevenlabs.io/convai-widget/index.js';
  script.async = true;
  script.type = 'text/javascript';
  
  // Only add the script if it doesn't already exist
  if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
    document.head.appendChild(script);
  }
}

export default TestLesson;
