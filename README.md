# HoneyLearn

HoneyLearn is an interactive language learning platform that helps users learn new languages through engaging lessons and voice-based interactions.

## Features

- Interactive language lessons
- Voice-based learning with ElevenLabs integration
- Real-time progress tracking
- User authentication and profile management
- Subscription management with Stripe integration

## Tech Stack

- React/TypeScript
- Supabase for backend and authentication
- ElevenLabs for voice synthesis
- Stripe for payment processing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add required environment variables (see `.env.example`)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
