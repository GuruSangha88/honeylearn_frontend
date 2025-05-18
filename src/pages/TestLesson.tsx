
import React, { useEffect, useRef } from 'react';

const TestLesson = () => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the script is loaded
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    
    // Create a promise to know when the script is loaded
    const scriptLoaded = new Promise<void>((resolve) => {
      script.onload = () => resolve();
    });
    
    // Add script to head if it doesn't exist
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      document.head.appendChild(script);
    } else {
      // If script already exists, resolve immediately
      scriptLoaded.then(() => {
        // Force re-render of the widget if needed
        if (widgetContainerRef.current) {
          const existingWidget = widgetContainerRef.current.querySelector('elevenlabs-convai');
          if (!existingWidget) {
            const widget = document.createElement('elevenlabs-convai');
            widget.setAttribute('agent-id', 'agent_01jvj8dgh5fdtt524zd6r5bffk');
            widgetContainerRef.current.appendChild(widget);
          }
        }
      });
    }

    return () => {
      // No need to remove the script as it might be used by other components
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Test Lesson with ElevenLabs AI</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="mb-4">This is a test page integrating the ElevenLabs Convai widget.</p>
        <div ref={widgetContainerRef} className="elevenlabs-widget-container">
          {/* The widget will be inserted here by the useEffect */}
          <elevenlabs-convai agent-id="agent_01jvj8dgh5fdtt524zd6r5bffk"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default TestLesson;
