# 🚀 NovaSend — AI-Powered Marketing Messages

<div align="center">

![NovaSend Banner](https://img.shields.io/badge/NovaSend-AI%20Marketing%20Platform-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0yMiAyTDExIDEzTTIyIDJMMTUgMjJsLTQtOUwyIDEybDIwLTEweiIvPjwvc3ZnPg==)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google)](https://makersuite.google.com)
[![Twilio](https://img.shields.io/badge/Twilio-WhatsApp%20%26%20SMS-F22F46?style=flat-square&logo=twilio)](https://twilio.com)

**Generate AI-crafted marketing messages and send them via WhatsApp & SMS — in seconds.**

[Live Demo](https://novasend.vercel.app) · [Report Bug](https://github.com/yourusername/novasend/issues)

</div>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🤖 **Gemini AI Generation** | Context-aware marketing copy generated via Google's Gemini 1.5 Flash |
| 💬 **WhatsApp Sandbox** | Send messages via Twilio WhatsApp Sandbox |
| 📱 **SMS Campaigns** | Direct SMS delivery via Twilio API |
| 🎯 **Tone Selector** | Professional / Friendly / Urgent — 3 distinct AI tones |
| 📋 **Message Templates** | Pre-built campaign contexts for fast starts |
| 📊 **Message History** | Full log of every message — status, tone, recipient |
| 🌙 **Dark Mode** | System-aware dark/light mode toggle |
| 📋 **Copy to Clipboard** | One-click copy with character counter |
| 🔐 **Google OAuth** | Secure NextAuth.js + Google sign-in |
| 📱 **Fully Responsive** | Mobile-first, works on all screen sizes |

---

## 🏗️ Architecture

```
novasend/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth handler
│   │   ├── generate/route.ts             # Gemini AI generation
│   │   ├── send/route.ts                 # Twilio send + MongoDB log
│   │   └── messages/route.ts             # Fetch message history
│   ├── auth/
│   │   ├── signin/page.tsx               # Google OAuth sign-in page
│   │   └── error/page.tsx                # Auth error page
│   ├── dashboard/
│   │   ├── layout.tsx                    # Protected layout + auth check
│   │   ├── page.tsx                      # Dashboard home — channel selector
│   │   ├── whatsapp/page.tsx             # WhatsApp inbox
│   │   └── sms/page.tsx                  # SMS inbox
│   ├── globals.css                       # Global styles + animations
│   ├── layout.tsx                        # Root layout with providers
│   └── page.tsx                          # Public landing page
│
├── components/
│   ├── DashboardNav.tsx                  # Sidebar navigation
│   ├── DarkModeToggle.tsx                # Dark/light mode button
│   ├── MessageComposer.tsx               # Core send interface (reusable)
│   ├── MessageHistory.tsx                # Message log table
│   ├── SessionProvider.tsx               # NextAuth session wrapper
│   └── ThemeProvider.tsx                 # Dark mode context
│
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── gemini.ts                         # Gemini AI integration
│   ├── mongodb.ts                        # MongoDB connection (cached)
│   └── twilio.ts                         # Twilio SMS + WhatsApp helpers
│
├── models/
│   └── Message.ts                        # Mongoose message schema
│
├── types/
│   └── index.ts                          # TypeScript types + NextAuth extension
│
└── middleware.ts                         # Route protection for /dashboard
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier works)
- Google Cloud Console project
- Twilio account (free trial)
- Google AI Studio account (Gemini)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/novasend.git
cd novasend
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=          # Run: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID=         # From Google Cloud Console
GOOGLE_CLIENT_SECRET=     # From Google Cloud Console

# MongoDB
MONGODB_URI=              # From MongoDB Atlas

# Gemini AI
GEMINI_API_KEY=           # From Google AI Studio

# Twilio
TWILIO_ACCOUNT_SID=       # From Twilio Console
TWILIO_AUTH_TOKEN=        # From Twilio Console
TWILIO_PHONE_NUMBER=      # Your Twilio number (for SMS)
TWILIO_WHATSAPP_FROM=     # whatsapp:+14155238886 (sandbox default)
```

### 3. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 API Keys Setup Guide

### Google OAuth (NextAuth)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google+ API** / **Google Identity**
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. For production: `https://yourdomain.vercel.app/api/auth/callback/google`

### MongoDB Atlas
1. Create account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Create database user with read/write access
4. Get connection string → replace in `MONGODB_URI`
5. Add your IP to the allowlist (or allow all: `0.0.0.0/0` for Vercel)

### Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Model used: `gemini-1.5-flash` (free tier)

### Twilio
1. Sign up at [twilio.com](https://twilio.com)
2. Get Account SID and Auth Token from Console Dashboard
3. **For SMS**: Buy a phone number (free trial credit provided)
4. **For WhatsApp Sandbox**:
   - Go to Messaging → Try it out → Send a WhatsApp message
   - Note the sandbox number and join keyword
   - Recipient must text `join <keyword>` to `+14155238886` first

---

## 📦 Deployment on Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial NovaSend project setup"
git remote add origin https://github.com/yourusername/novasend.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and import your GitHub repo
2. Add all environment variables from `.env.local` in the Vercel dashboard
3. **Important**: Update `NEXTAUTH_URL` to your Vercel deployment URL
4. **Important**: Add Vercel URL to Google OAuth authorized redirect URIs
5. Click Deploy

### Step 3: Post-deployment
- Update `NEXTAUTH_URL=https://your-app.vercel.app`
- Add `https://your-app.vercel.app/api/auth/callback/google` to Google OAuth
- Add Vercel's server IPs to MongoDB Atlas allowlist (or use `0.0.0.0/0`)

---

## 🌿 Git Commit History Guide

Follow this commit style for clean history:

```bash
git commit -m "feat: initial project setup with Next.js + Tailwind"
git commit -m "feat: configure MongoDB with Mongoose message model"
git commit -m "feat: setup NextAuth with Google OAuth provider"
git commit -m "feat: build SaaS landing page with animations"
git commit -m "feat: implement Gemini AI message generation"
git commit -m "feat: integrate Twilio SMS sending"
git commit -m "feat: integrate Twilio WhatsApp sandbox"
git commit -m "feat: build message composer with tone selector"
git commit -m "feat: add message history with MongoDB persistence"
git commit -m "feat: implement dark mode toggle"
git commit -m "feat: add message templates and copy to clipboard"
git commit -m "feat: protect dashboard with NextAuth middleware"
git commit -m "refactor: modularize lib utilities (auth, gemini, twilio)"
git commit -m "fix: handle Twilio error responses gracefully"
git commit -m "fix: add loading states for generate and send actions"
git commit -m "deploy: configure Vercel environment variables"
```

---

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 13.5.6** (App Router) | Full-stack React framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **NextAuth.js** | Authentication with Google OAuth |
| **MongoDB + Mongoose** | Message persistence |
| **Google Gemini AI** | Marketing message generation |
| **Twilio** | WhatsApp + SMS delivery |
| **Vercel** | Deployment platform |
| **react-hot-toast** | Toast notifications |

---

## 📸 Screenshots

| Page | Description |
|------|-------------|
| Landing Page | Hero, features, how-it-works, CTA |
| Sign In | Google OAuth with branded UI |
| Dashboard | Channel selection home |
| WhatsApp Inbox | Compose + history |
| SMS Inbox | Compose + history |

---

## 🔒 Security

- All dashboard routes protected via `middleware.ts`
- Server-side session validation on all API routes
- Environment variables never exposed to client
- JWT strategy with `NEXTAUTH_SECRET`
- No sensitive keys in source code

---

## 📝 License

MIT License — Built for the Uniplicate Assignment.

---

<div align="center">
Built with ❤️ using Next.js, Gemini AI, and Twilio
</div>

