# NovaSend - Unified Inbox

NovaSend is a unified inbox app that lets authenticated users generate AI marketing messages with Gemini and send them via Twilio over WhatsApp (Sandbox) and SMS.

## Live Links

- GitHub: `REPLACE_WITH_YOUR_GITHUB_REPO_URL`
- Deployment: `REPLACE_WITH_YOUR_DEPLOYMENT_URL`

## Screenshots

Add images to `public/screenshots/` and update the paths below.

```md
![Landing Page](public/screenshots/landing.png)
![Dashboard Home](public/screenshots/dashboard.png)
![WhatsApp Composer](public/screenshots/whatsapp.png)
![SMS Composer](public/screenshots/sms.png)
```

## Tech Stack

- Next.js 13 (App Router) + TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)
- Gemini API (`@google/generative-ai`)
- Twilio (WhatsApp Sandbox + SMS)
- MongoDB + Mongoose

## Features

- Public landing page at `/`
- Google OAuth auth flow with NextAuth
- Protected dashboard routes at `/dashboard/*`
- AI message generation + editable preview
- WhatsApp (sandbox) and SMS delivery via Twilio
- Success/error feedback and loading states
- Message log persistence

## Setup

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB connection string (local or Atlas)
- Google OAuth app credentials
- Gemini API key
- Twilio account credentials (with WhatsApp Sandbox enabled)

### Install

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root with the following values:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database
MONGODB_URI=your_mongodb_connection_string

# Gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

## Run Locally

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Twilio Notes

- WhatsApp uses the Twilio Sandbox by default.
- Recipients must join the sandbox before receiving messages.
- Phone numbers must be in E.164 format (example: `+919876543210`).

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Add all variables from `.env.local` in Vercel Project Settings.
4. Set `NEXTAUTH_URL` to your production URL.
5. Add the Google OAuth callback URL:

```txt
https://YOUR_DOMAIN/api/auth/callback/google
```

6. Deploy and verify:

- Sign-in works
- Message generation works
- WhatsApp Sandbox send works
- SMS send works

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```txt
app/
  api/
    auth/[...nextauth]/route.ts
    generate/route.ts
    send/route.ts
    messages/route.ts
  auth/
    signin/page.tsx
    error/page.tsx
  dashboard/
    layout.tsx
    page.tsx
    whatsapp/page.tsx
    sms/page.tsx
  layout.tsx
  page.tsx

components/
  DashboardNav.tsx
  MessageComposer.tsx
  MessageHistory.tsx
  SessionProvider.tsx
  ThemeProvider.tsx
  DarkModeToggle.tsx

lib/
  auth.ts
  gemini.ts
  twilio.ts
  mongodb.ts

models/
  Message.ts
```
