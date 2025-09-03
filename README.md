# Pocket Rights Shield

A mobile-optimized web application that provides instant legal information and communication scripts for interactions with law enforcement, empowering users with knowledge and documentation tools.

## Features

### State-Specific Rights Guide
A mobile-optimized, one-page summary detailing user rights during police stops, tailored to their current location or selected state.

### Pre-written 'What to Say' Scripts
Contextualized scripts in multiple languages (initially English and Spanish) for common interaction scenarios with law enforcement, helping users avoid self-incrimination.

### Quick Record & Alert System
A one-tap feature to instantly record audio/video of an interaction and send an alert with location data to pre-selected emergency contacts.

### Location-Aware Content Generation
Automatically generates a shareable card based on the user's location, embedding relevant rights and scripts.

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **State Management**: React Context API, Zustand
- **API Integration**: OpenAI, Pinata (IPFS), Stripe
- **Authentication**: JWT-based authentication
- **Blockchain Integration**: Base RPC

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/         # Layout components (AppShell, Header, etc.)
│   └── ui/             # UI components (Button, Card, etc.)
├── context/            # React Context providers
├── data/               # Static data and mock data
├── features/           # Feature-specific components
│   ├── home/           # Home page components
│   ├── rights-guide/   # Rights guide components
│   ├── scripts/        # Script components
│   ├── recording/      # Recording components
│   └── share/          # Sharing components
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── App.jsx             # Main App component
└── routes.jsx          # Application routes
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/pocket-rights-shield.git
   cd pocket-rights-shield
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the following variables
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_PINATA_API_KEY=your_pinata_api_key
   VITE_PINATA_SECRET_API_KEY=your_pinata_secret_api_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Business Model

The application follows a tiered access model:
- **Free Tier**: Basic rights information and limited scripts
- **Premium Tier**: Full access to all features, including multilingual scripts, unlimited recordings, and emergency alerts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is provided for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction and change over time. Consult with a qualified attorney for advice specific to your situation.
