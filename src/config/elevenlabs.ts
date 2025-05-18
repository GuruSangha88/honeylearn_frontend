
// ElevenLabs Configuration
export const ELEVENLABS_CONFIG = {
  agentId: 'agent_01jvj8dgh5fdtt524zd6r5bffk', // Replace this with your actual ElevenLabs agent ID
  voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah's voice ID
  modelId: 'eleven_multilingual_v2',
  
  // This is a hardcoded API key that should be replaced with your actual key
  // In production, this should be moved to environment variables or server-side code
  apiKey: 'sk_4cebd1fb9bcc0bfc7bec143fb2d8312e1c442c2e7858ce1a', // Replace with your actual API key
};

// Helper function to check if ElevenLabs is available in the browser environment
export const isElevenLabsAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         !window.location.hostname.includes('localhost') &&
         navigator.onLine;
};

// Helper functions for ElevenLabs integration
export const loadElevenLabsScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script is already loaded and component is registered
    if (window.customElements && window.customElements.get('elevenlabs-convai')) {
      console.log("ElevenLabs component is already registered");
      resolve(true);
      return;
    }
    
    // Remove any existing failed scripts
    const existingScripts = document.querySelectorAll('script[data-elevenlabs]');
    existingScripts.forEach(script => {
      document.head.removeChild(script);
    });
    
    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://cdn.elevenlabs.io/convai/v1/index.js';
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute('data-elevenlabs', 'true');
    
    // Set timeout for script loading
    const timeoutId = setTimeout(() => {
      console.error("ElevenLabs script load timeout");
      resolve(false);
    }, 10000); // 10 seconds timeout
    
    script.onload = () => {
      clearTimeout(timeoutId);
      // Give time for component registration
      setTimeout(() => {
        const isRegistered = !!(window.customElements && 
                               window.customElements.get('elevenlabs-convai'));
        console.log(`ElevenLabs component registered: ${isRegistered}`);
        resolve(isRegistered);
      }, 2000);
    };
    
    script.onerror = () => {
      clearTimeout(timeoutId);
      console.error("Error loading ElevenLabs script");
      resolve(false);
    };
    
    document.head.appendChild(script);
  });
};

