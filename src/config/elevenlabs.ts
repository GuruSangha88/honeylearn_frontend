
// ElevenLabs Configuration
// The agent ID is a public identifier that can be included in the frontend
export const ELEVENLABS_CONFIG = {
  agentId: 'agent_01jvj8dgh5fdtt524zd6r5bffk', // Replace with your actual ElevenLabs agent ID
  
  // NOTE: This is only for fallback direct API access
  // In a real production app, all API calls should go through a backend service
  voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah's voice ID
  modelId: 'eleven_multilingual_v2',
};

// For API key handling:
// 1. In development: Add your key using the updateApiKey function (it will only be stored in memory)
// 2. In production: Set up a backend service to handle the API calls to protect your key

let apiKey = '';

export const getApiKey = () => apiKey;
export const updateApiKey = (key: string) => {
  apiKey = key;
};
