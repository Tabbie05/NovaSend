# NovaSend - Unified Inbox

NovaSend is a full-stack Unified Inbox web application built for the Unplicate assignment. It allows authenticated users to generate AI-powered marketing copy using Gemini and send campaigns through Twilio over WhatsApp (Sandbox) and SMS.

## Live Submission Links

- Live App (Vercel): https://nova-send-uyk5.vercel.app/
- GitHub Repository: https://github.com/Tabbie05/NovaSend

## Assignment Compliance Checklist

- Public landing page at `/` (no auth required)
- NextAuth.js authentication with secure session handling
- Protected dashboard routes under `/dashboard/*`
- Gemini-powered message generation with editable preview
- Twilio WhatsApp Sandbox sending flow
- Twilio SMS sending flow
- Loading states and error handling for generate/send actions
- Modular architecture with reusable `lib/`, `components/`, `models/`, and API route layers
- Message log persistence in MongoDB
- Live deployment on Vercel

## Features

- Clean public landing page with hero, feature highlights, CTA, and footer
- Google OAuth sign-in with custom sign-in and auth error pages
- Dashboard with channel navigation:
  - `/dashboard/whatsapp`
  - `/dashboard/sms`
- Shared message composer flow for both channels:
  - Enter campaign context
  - Choose tone (`professional`, `friendly`, `urgent`)
  - Generate copy with Gemini
  - Edit generated copy before send
  - Send via Twilio
- Message history panel with status filters (`all`, `sent`, `failed`) and pagination
- Light/Dark theme toggle with persisted preference

## Demo Flow (Evaluator Quick Test)

1. Open `https://nova-send-uyk5.vercel.app/`.
2. Click **Get Started** and sign in with Google.
3. Go to **WhatsApp Inbox**.
4. Enter campaign context, choose tone, and click **Generate Message**.
5. Confirm editable preview appears.
6. Enter recipient in E.164 format and click **Send Message**.
7. Verify success/error toast and history entry update.
8. Repeat in **SMS Inbox**.

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)
- Gemini API (`@google/generative-ai`)
- Twilio (WhatsApp Sandbox + SMS)
- MongoDB + Mongoose

## Project Structure

```txt
app/
  api/
    auth/[...nextauth]/route.ts
    generate/route.ts
    messages/route.ts
    send/route.ts
  auth/
    error/page.tsx
    signin/page.tsx
  dashboard/
    layout.tsx
    page.tsx
    sms/page.tsx
    whatsapp/page.tsx
  globals.css
  layout.tsx
  page.tsx

components/
  Button.tsx
  Card.tsx
  DashboardLayout.tsx
  DarkModeToggle.tsx
  GenerateMessageForm.tsx
  Input.tsx
  LoadingSkeleton.tsx
  MessageHistory.tsx
  Navbar.tsx
  SessionProvider.tsx
  Sidebar.tsx
  Textarea.tsx
  ThemeProvider.tsx
  Toast.tsx

lib/
  auth.ts
  gemini.ts
  mongodb.ts
  twilio.ts
  ui.ts

models/
  Message.ts

types/
  index.ts
```

## Authentication & Security

- NextAuth middleware protects `/dashboard/:path*`.
- Additional server-side session checks are implemented in protected layouts and API routes.
- Unauthorized API requests return `401`.
- Secrets are managed through environment variables only.

## Environment Variables

Create `.env.local` in the project root:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Gemini
GEMINI_API_KEY=your_gemini_api_key
# Optional (defaults handled in code)
GEMINI_MODEL=gemini-2.5-flash

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Twilio Sandbox Notes

- WhatsApp delivery uses Twilio Sandbox.
- Recipient numbers must join the sandbox before receiving WhatsApp messages.
- Use E.164 format for recipients (example: `+919876543210`).

## Build & Quality Checks

```bash
npm run lint
npm run build
npm run start
```

## Deployment (Vercel)

1. Push code to GitHub.
2. Import project in Vercel.
3. Add all environment variables from `.env.local`.
4. Set `NEXTAUTH_URL` to your production URL.
5. Add Google OAuth callback URL:

```txt
https://YOUR_DOMAIN/api/auth/callback/google
```

6. Redeploy and verify:
   - sign in
   - generate message
   - send WhatsApp sandbox message
   - send SMS

## API Overview

- `POST /api/generate`
  - Input: `context`, `tone`, `channel`
  - Output: generated marketing message
- `POST /api/send`
  - Input: `to`, `message`, `channel`, `tone`, `context`
  - Action: send via Twilio + persist log
- `GET /api/messages`
  - Query: `channel`, optional `status`, `limit`, `page`
  - Output: paginated message logs for authenticated user

## Screenshots

Add screenshots under `public/screenshots/` and update links below:

```md
![Landing Page](public/screenshots/landing.png)
![Dashboard Overview](public/screenshots/dashboard-overview.png)
![WhatsApp Inbox](public/screenshots/whatsapp-inbox.png)
![SMS Inbox](public/screenshots/sms-inbox.png)
```

## Author

- Name: Shaikh Tayba
- GitHub: https://github.com/Tabbie05
- Portfolio: https://myportfolio-sable-nine.vercel.app/

