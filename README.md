# MockData AI

MockData AI is an AI-powered Micro-SaaS for generating statistically accurate, fake data (JSON) for developers. Perfect for testing databases and applications without violating GDPR/CCPA compliance.

## Features
- **AI Data Generation**: Uses OpenRouter and Gemini to parse schemas and generate realistic fake data.
- **Custom Schemas**: Write schemas in plain english or JSON formats.
- **PGlite Integration**: (MVP ready) for tracking generation history.
- **E2E Tested**: Uses Playwright to ensure Golden Path reliability.
- **Modern UI**: Dark mode, glassmorphism UI built with Next.js and Tailwind CSS.

## Getting Started

1. Clone the repository.
2. Run \`npm install\`.
3. Create a \`.env.local\` file with your \`OPENROUTER_API_KEY\`.
4. Start the development server with \`npm run dev\`.

## Production

This project is configured for Vercel deployments. It is an MVP generated as part of the daily Micro-SaaS protocol.
