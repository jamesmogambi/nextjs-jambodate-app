<div align="center">
  <img width="1200" height="475" alt="JamboDate Banner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# JamboDate

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Proprietary-blue)]()

**JamboDate** is a modern dating platform built exclusively for Kenyan singles seeking genuine, meaningful connections. Designed with authenticity, safety, and cultural relevance at its core, JamboDate moves beyond superficial swiping to foster intentional relationships grounded in shared values and verified identities.

---

## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Safety & Moderation](#safety--moderation)
- [Premium Features](#premium-features)
- [License](#license)

---

## Key Features

### Core Dating Experience
- **Email & Password Authentication** — Firebase Auth with secure credential management
- **Strict 18+ Enforcement** — Age verification during registration prevents underage signups
- **Profile Onboarding** — Multi-step flow capturing bio, photos, interests, lifestyle, and relationship intentions
- **Discovery Engine** — Swipe-based discovery with filters for age range, gender, location, and relationship goals

### Matching & Communication
- **Intentional Matching** — Matches are created only when both users express mutual interest (like each other)
- **Private Messaging** — Real-time chat unlocked exclusively for matched pairs; no unsolicited messages
- **Relationship Intentions** — Users specify whether they seek Marriage, Serious Relationship, Dating, or Friendship
- **Compatibility Scoring** — Algorithmically-derived compatibility scores guide discovery ordering

### Verification & Authenticity
- **Identity Verification** — Selfie posture matching + optional ID document review by moderators
- **Kenyan County Support** — Profiles are tied to specific counties and cities (Nairobi, Mombasa, Kisumu, Eldoret, etc.)
- **Community Data** — Demo mode with curated sample Kenyan profiles for development and testing

### Premium Features
- **JamboDate Plus** — KES 499/month: unlimited likes, rewind passes, county location filtering
- **JamboDate Gold** — KES 950/month: see who liked you, super connects, free profile boosts, priority verification
- **Profile Boosting** — Temporarily increase visibility in discovery results

### Safety & Moderation
- **Emergency Helplines** — Integrated Kenyan emergency numbers (GBV Toll-Free: 1195, Police: 999/112)
- **Proactive Moderation** — Automated detection of scams, inappropriate content, and suspicious behavior
- **Report & Block** — One-tap blocking and escalation to the Nairobi-based trust team
- **Admin Dashboard** — Moderation panel for verification approvals, user suspension/banning

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Runtime** | React 19 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS 4 + PostCSS |
| **Backend** | Firebase (Auth, Firestore, Storage) + Express server |
| **Image Processing** | Cloudinary |
| **AI Integration** | Google Gemini API |
| **Email Service** | Nodemailer |
| **Deployment** | Firebase App Hosting |

---

## Architecture

JamboDate follows a **client-first architecture** with Firebase as the backend-as-a-service:

- **Client (Next.js Browser)**: Handles all UI, authentication, real-time profile discovery, and messaging via Firebase Firestore real-time listeners
- **Server (Express/Next.js)**: Custom `server.mjs` provides HTTP handling with CORS support and proxy capabilities
- **Firebase Firestore**: Stores all user data across collections (`users`, `profiles`, `preferences`, `photos`, `verification_requests`, `reports`, `blocks`, `likes`, `matches`, `messages`)
- **Firebase Auth**: Manages user authentication and session state
- **Firebase Storage / Cloudinary**: Photo storage and transformation pipeline
- **Server-side API Routes**: Handle verification email notifications and other server-side logic

The app supports **dual-mode operation**: a demo mode using `localStorage` for rapid development/testing without Firebase, and a production mode with real Firestore-backed data for authenticated users.

---

## Prerequisites

- **Node.js** 18+ (tested with Node.js 22)
- **npm** 10+
- Firebase project (see [Environment Variables](#environment-variables))
- Cloudinary account (for image uploads)
- Gemini API key (for AI features)

---

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file based on the development template:

```bash
cp .env.development .env.local
```

Update the values with your own credentials:

- `NEXT_PUBLIC_FIREBASE_*` — Firebase project configuration
- `GEMINI_API_KEY` — Google Gemini API key
- `CLOUDINARY_*` — Cloudinary cloud name, API key, and secret
- `EMAIL_USER` / `EMAIL_PASSWORD` — SMTP credentials for email notifications

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Run Type Checking

```bash
npm run lint
```

---

## Project Structure

```
jambodate/
├── app/                          # Next.js App Router routes
│   ├── admin/                    # Admin moderation dashboard
│   ├── api/                      # API routes (verification, email, payments)
│   │   └── boost/
│   │   └── verification/
│   ├── discover/                 # Swipe-based profile discovery
│   ├── likes/                    # Likes management
│   ├── login/                    # Login page
│   ├── matches/                  # Match list and match detail views
│   ├── messages/                 # Private messaging (matched pairs only)
│   ├── onboarding/               # Profile creation onboarding flow
│   ├── premium/                  # Subscription plans (Plus, Gold)
│   ├── profile/                  # Public profile and profile editor
│   │   ├── edit/                # Edit profile page
│   ├── register/                 # Registration with age verification
│   ├── safety/                   # Safety center / emergency resources
│   ├── settings/                 # User settings and preferences
│   ├── verification/             # Identity verification flow
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Landing / home page
├── components/                   # React components
│   ├── auth/                     # Auth guards and protected routes
│   ├── boost/                    # Boost feature components
│   ├── layout/                   # Layout components (Navbar, Sidebar, BottomNav)
│   ├── providers/                # Client providers (AuthProvider, theme)
│   └── ui/                       # Reusable UI components
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── ProfileCard.tsx
│       ├── Toast.tsx
│       ├── VerificationBadge.tsx
│       └── ...
├── lib/                          # Core application logic
│   ├── context/                  # React context providers
│   │   └── AuthContext.tsx       # Centralized auth, profile, matching, and messaging state
│   ├── data/                     # Static/sample data
│   │   └── kenyanProfiles.ts     # Curated Kenyan demo profiles
│   ├── server/                   # Server-side utilities
│   │   └── firebaseAdmin.ts
│   ├── firebase.ts               # Firebase client initialization
│   ├── cloudinary.ts             # Cloudinary upload helpers
│   ├── email.ts                  # Nodemailer email service
│   ├── utils.ts                  # Utility functions (age calc, filtering, etc.)
│   ├── analytics.ts              # Analytics utilities
│   ├── payments/                 # Payment processing (M-Pesa)
│   ├── boost/                    # Boost logic
│   └── auth.ts                   # Auth utilities
├── types/                        # TypeScript type definitions
│   └── index.ts
├── public/                       # Static assets
├── firebase-blueprint.json       # Firebase data schema blueprint
├── firebase-applet-config.json   # Firebase project configuration
├── server.mjs                    # Custom Express/Next.js server
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json
```

---

## Data Model

JamboDate uses a Firestore schema defined in `firebase-blueprint.json`, with the following core collections:

| Collection | Purpose |
|---|---|
| `users/{uid}` | Private user account records (PII isolated, owner read/write only) |
| `profiles/{pid}` | Public dating profiles visible to matches |
| `preferences/{uid}` | Match preferences (age range, gender, location, intentions) |
| `photos/{pid}` | Photo metadata linked to Cloudinary storage |
| `users/{uid}/likes_received` | Incoming like records (subcollection) |
| `users/{uid}/likes_sent` | Outgoing like records (subcollection) |
| `matches` | Match records linking two users |
| `messages` | Chat messages within a match |
| `verification_requests` | Identity verification submissions |
| `reports` | User reports for moderation |

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID` | Firestore database ID |
| `GEMINI_API_KEY` | Google Gemini API key |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset |
| `EMAIL_USER` | SMTP email username |
| `EMAIL_PASSWORD` | SMTP email password |
| `APP_URL` | Application URL (for OAuth callbacks, self-referential links) |

---

## Deployment

JamboDate is deployed on **Firebase App Hosting** with automatic CI from GitHub:

```bash
# Build for production
npm run build

# Start the production server
npm start
```

### Firebase App Hosting Deployment Steps

1. Connect your GitHub repository to Firebase App Hosting
2. Set environment variables via the Firebase Console Secrets panel
3. Ensure `package-lock.json` is in sync with `package.json` (run `npm install` to regenerate if needed)
4. Deploy via the Firebase Console or `firebase deploy --apphosting`

### Recommended Node Version

Node.js 22 LTS is recommended for production deployments.

---

## Safety & Moderation

JamboDate is built with Kenyan user safety as a top priority:

- **Emergency Resources**: Kenyan GBV Toll-Free (1195) and Police (999/112) hotlines are surfaced in the app's safety center
- **Zero Scam Tolerance**: Proactive moderation detects and removes scam profiles, financial solicitations, and fake accounts
- **Verification Program**: Verified members (green badge) gain 3x more matches and build trust
- **Report & Block System**: Members can report inappropriate behavior or block users directly
- **18+ Only**: Strict age verification during registration with automated checks

---

## Premium Features

### JamboDate Plus — KES 499/month
- Unlimited daily likes
- Rewind accidental passes
- County-level location filtering

### JamboDate Gold — KES 950/month (Most Popular)
- See who already liked you
- 5 Super Connects per week
- 1 free Profile Boost per month
- Priority verification queue

Payments are processed via **M-Pesa**, Kenya's dominant mobile money platform.

---

## License

This project is proprietary software developed by JamboDate Technologies Ltd. All rights reserved.
```
