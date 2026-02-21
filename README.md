# NovaSend - Unified Inbox Assignment

NovaSend is a Unified Inbox web app built for the Uniplicate assignment.
It lets authenticated users generate AI marketing messages with Gemini and send them using Twilio over WhatsApp (Sandbox) and SMS.

## Live Links

- GitHub: `REPLACE_WITH_YOUR_GITHUB_REPO_URL`
- Vercel: `REPLACE_WITH_YOUR_VERCEL_DEPLOYMENT_URL`

## Tech Stack

- Next.js 13 (App Router) + TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)
- Gemini API (`@google/generative-ai`)
- Twilio (WhatsApp Sandbox + SMS)
- MongoDB + Mongoose (message logs)

## Implemented Requirements

- Public landing page at `/` (responsive, hero, features, CTA, footer)
- Auth with NextAuth.js and secure session handling
- Protected dashboard routes (`/dashboard/*`)
- Dashboard home with two channels:
  - `/dashboard/whatsapp`
  - `/dashboard/sms`
- Gemini-based marketing message generation
- Editable preview before sending
- Twilio sending for both WhatsApp and SMS
- Success and error feedback in UI
- Loading states while generating and sending
- Message log persistence and history view (recommended optional)
- Modular architecture (`app`, `components`, `lib`, `models`, `types`)

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

## Environment Variables

Create `.env.local` from `.env.example` and fill values:

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

## Local Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Twilio Notes

- WhatsApp uses Twilio Sandbox by default.
- Recipients must join sandbox first by sending the join keyword to `+1 415 523 8886`.
- Phone numbers should be in E.164 format (example: `+919876543210`).

## Deployment (Vercel)

1. Push project to GitHub.
2. Import repository in Vercel.
3. Add all environment variables from `.env.local` in Vercel Project Settings.
4. Set `NEXTAUTH_URL` to your production URL.
5. Add Google OAuth callback:
   - `https://YOUR_DOMAIN/api/auth/callback/google`
6. Deploy and verify:
   - Sign-in works
   - Message generation works
   - WhatsApp Sandbox send works
   - SMS send works

## Suggested Commit Breakdown

Use meaningful commits such as:

- `feat: setup nextauth authentication`
- `feat: implement whatsapp inbox flow`
- `feat: implement sms inbox flow`
- `feat: integrate gemini generation api`
- `feat: integrate twilio send api`
- `refactor: modularize auth gemini twilio utilities`
- `fix: validate send channel and improve api errors`
- `docs: update readme and env setup for submission`

## Submission Checklist

- GitHub repository URL added in this README
- Vercel deployment URL added in this README
- Environment variables configured in Vercel
- WhatsApp and SMS flows tested end-to-end
- Clean lint/build run before submission
- Email sent to `team@unplicate.in` with:
  - Full Name
  - GitHub Link
  - Live Deployment Link
