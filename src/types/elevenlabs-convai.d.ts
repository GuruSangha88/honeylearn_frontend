
declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      'agent-id'?: string;
      'api-key'?: string;
      'voice-id'?: string;
      'model-id'?: string;
    }, HTMLElement>;
  }
}

// Extend window with custom event
interface CustomEventMap {
  'convai-message': CustomEvent<{ message: string }>;
}

declare global {
  interface HTMLElementEventMap extends CustomEventMap {}
}
