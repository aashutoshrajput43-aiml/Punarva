# Punarva — Where Every Resource Returns

> **Slogan**: *"Where every resource returns."* (पुनर्वा)  
> **Domain**: Surplus Food Rescue, Waste Management & Circular Economy  
> **UN SDG Alignment**: SDG 2 (Zero Hunger), SDG 11 (Sustainable Cities), SDG 12 (Responsible Consumption & Production), SDG 13 (Climate Action)  
> **Initiative**: Zero Waste National Innovation Initiative

---

## 🌟 Overview

**Punarva** is an AI-powered circular economy web application that connects surplus food donors (restaurants, hotels, caterers, banquet halls, and wedding events) and recyclable waste generators with verified NGOs, citizen courier volunteers, and municipal material recovery facilities (MRFs) in real time.

Built with an **expiry-first dispatch engine**, **FSSAI Good Samaritan safety compliance**, **real-time GIS telemetry radar**, and **automated Section 80G tax exemption certificates**, RescueBite solves both urban hunger and municipal landfill burden with a single closed-loop ecosystem.

---

## 🚀 Key Features

### 1. 🍲 5-Step Donate Wizard & 30-Second Fast Mode (`/donate`)

- **Donor Classification**: Selectable chips (Restaurant, Hotel, Marriage Hall, Caterer, Event Organizer, Corporate, Individual).
- **AI Food Freshness Inspector**: Evaluates food type, holding temperature, thermal decay curve, and FSSAI hygiene guidelines. Returns a 0–100 Freshness Score, verdict (`GENUINE`, `REVIEW`, `REJECT`), and priority urgency.
- **Geocoded Location**: Pinpoint GPS location picker with reverse geocoding and landmark tagging.
- **Fast Mode**: 1-click toggle collapsing the wizard into a high-speed form to log surplus in under 30 seconds.
- **4-Digit Delivery PIN**: Cryptographic handoff code generated at submission to guarantee secure delivery.
- **1-Click WhatsApp Share**: Instant `wa.me` deep link with prefilled mission details.

### 2. 🗺️ Flagship Live GIS Radar & Surplus Dispatch Map (`/map`)

- **Tactical Command Center**: Live ZULU time, telemetry uptime, GPS coordinates, dispatch count, tracked kg, and FSSAI certification badge.
- **City Quick-Tabs**: Fly directly between Indore (HQ), Bhopal, Delhi NCR, Mumbai Central, Pune City, Bangalore Hub, and National Overview.
- **Base Layer Switcher**: Toggle smoothly between OpenStreetMap Street Tiles and Esri World Imagery Satellite view.
- **AOI Zone Measurement Tool**: Draw an Area of Interest on the map to calculate area in km², count of active surplus lots, and net volume inside.
- **Animated Couriers & Route Lines**: Dashed cyan route lines with real-time ETA, distance tracking, and simulated courier movement.
- **Pulsing Emergency Markers**: Listings expiring within 2 hours pulse red on the radar for prioritized dispatch.

### 3. 🤖 RescueBot AI (Gemini 1.5 + Smart Deterministic Fallback)

- Floating assistant widget accessible on every page with online status indicator.
- Answers food donation rules, explains FSSAI legal protections, assists in waste segregation (e.g. *"Can an oily pizza box be recycled?"*), and guides navigation.
- Zero-dependency fallback: works flawlessly even if no API key is set!

### 4. ♻️ AI Waste Sorter & Recycler Match (`/waste-sorter`)

- Photo and text classification for Wet/Organic, Dry Recyclable Paper, Plastic (PET/HDPE), Glass, Metal, and E-waste.
- Do's and Don'ts segregation guidance to stop contamination at source.
- **"Where Does It Go?"**: Visual circular pathway explaining municipal Bio-CNG digestion and granulation.
- **Nearby Recyclers**: Map and list of verified collectors and MRF centers with 1-click pickup booking.

### 5. 📜 Automated Section 80G Tax Exemption Certificate (PDF)

- Built-in PDF generator creating official Section 80G donation receipts upon delivery.
- Displays donor details, meal equivalents (3 meals/kg), carbon offset (2.5 kg CO₂/kg), receiving NGO Darpan registration ID, and ledger verification hash.

### 6. 🏆 Karma Leaderboard & Civic Gamification (`/leaderboard`)

- 4 Civic Tiers: **Rescuer** (0–999 pts), **Guardian** (1,000–4,999 pts), **Champion** (5,000–14,999 pts), and **Legend** (15,000+ pts).
- Filterable rankings (All Time, Monthly, Weekly) with live polling synchronization.
- **Rewards & Milestones**: Claimable partner restaurant vouchers, thermal bag swag kits, and municipal civic honor certificates.

### 7. 🛡️ Admin Control Center (`/admin`)

- 12 Dedicated Management Modules: Overview, Donations & Food, Operations Map, Messages Inbox, CMS Editor, Restaurants & Donors, NGO Partners, Verifications, Users & Roles, Audit Trail, Impact Analytics, System Health.
- **Live Verification Gate**: AI Verification Score cards with 1-click `[Approve & Publish Live]` (instantly reflects on live radar) and `[Reject]`.
- Dynamic CMS Website Editor for live helpline and hero headline updates.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 14 (App Router) + React 18 + TypeScript |
| **Styling** | Tailwind CSS + Dark/Light Theme Provider + Glassmorphism |
| **Icons & UI** | Lucide React + Framer Motion |
| **Database & ORM** | Prisma ORM with SQLite (Local) / Neon PostgreSQL (Production) |
| **GIS & Maps** | Leaflet + OpenStreetMap + Esri World Imagery Satellite |
| **AI Intelligence** | Google Gemini API (`gemini-1.5-flash`) + Deterministic Safety Rule Engine |
| **PDF Generation** | jsPDF (Section 80G Tax Certificates) |
| **Authentication** | JWT HTTP-Only Cookies + Role-Based Access Control |

---

## ⚡ Quick Start & Setup

### 1. Prerequisites

- Node.js v18.0.0 or higher
- npm or pnpm

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/rescuebite/rescuebite.git
cd rescuebite
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default `.env` configuration (works out of the box with zero external setup):

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="rescuebite-production-secret-token-2026"
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY="" # Optional: Smart deterministic rule fallback active if empty
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_HELPLINE="+91 98765 43210"
NEXT_PUBLIC_SUPPORT_EMAIL="hello@rescuebite.in"
```

### 4. Initialize Database & Seed Demo Data

```bash
npx prisma db push
npm run seed
```

This seeds 4 demo user roles, 15+ geocoded food listings across Indore, Bhopal, Delhi NCR, Mumbai, and Bangalore, active simulated couriers, verified NGOs, and municipal recycling centers.

### 5. Run the Application

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🔑 Demo Login Accounts

All accounts are pre-seeded and accessible via **1-click auto-fill buttons** on the `/login` page:

| Role | Email | Password | Access Capabilities |
| --- | --- | --- | --- |
| **Super Admin** | `admin@rescuebite.in` | `admin123` | Full Admin Control Center (`/admin`), Verification Queue, CMS Editor |
| **Food Donor** | `donor@sayaji.com` | `donor123` | Donate Wizard (`/donate`), Donation Tracking, 80G PDF Receipts |
| **Volunteer Driver** | `volunteer@rescuebite.in` | `volunteer123` | Volunteer Courier Dashboard (`/volunteer`), GPS Navigation, Drop Confirmations |
| **NGO Partner** | `ngo@robinhoodarmy.org` | `ngo123` | Receiving Shelter View, Food Intakes, Darpan Compliance |

---

## 🌐 Deployment to Vercel

1. Push your repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Set the Environment Variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string (`postgresql://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require`)
   - `NEXTAUTH_SECRET`: A 32-character secret key
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g. `https://rescuebite.vercel.app`)
   - `GEMINI_API_KEY`: Your Google Gemini API key
4. In `prisma/schema.prisma`, change `datasource db` provider to:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

5. Deploy! Vercel will automatically run `next build` and optimize all routes.

---

## 🎤 3-Minute Ideathon Pitch Script

*Time: 180 seconds | Target: Sustainability, Civic Tech & AI Hackathon Judges*

### [00:00 - 00:30] Hook & Problem
>
> *"Good morning judges! India is currently facing a cruel paradox: while 40% of all food produced is wasted in banquet halls, hotels, and weddings, over 19 crore people go to sleep hungry every night. Worse yet, decomposing food in landfills releases potent methane gas, driving climate change.*  
> *Meet **RescueBite** — an AI-powered platform transforming surplus into sustenance, and waste into a resource."*

### [00:30 - 01:15] Live Product Demo: Donate & AI Freshness
>
> *(Show `/donate` on screen)*  
> *"When a hotel manager at Sayaji Banquets in Indore has 25 kg of surplus Paneer Butter Masala at 11 PM, they open RescueBite. In under 30 seconds, our AI Computer Vision inspects the food photo, verifies holding temperature and steam, and assigns a 96.5% Genuine Freshness Score.*  
> *Under FSSAI Good Samaritan regulations, the donor is completely legally protected. The system automatically creates a 4-digit security PIN and dispatches the nearest volunteer courier."*

### [01:15 - 02:00] GIS Radar, Matching Engine & 80G Receipt
>
> *(Show `/map` and `/volunteer` on screen)*  
> *"On our tactical GIS Radar, you can see live volunteer drivers moving in real time. The AI matching engine scores the mission based on expiry urgency and distance, matching Karan Sharma on his motorcycle with Robin Hood Army.*  
> *Upon arrival, the NGO verifies food quality, enters the 4-digit PIN, and boom — the mission is marked Delivered! The system instantly generates an auditable Section 80G tax deduction certificate as a downloadable PDF with CO₂ and meal calculations."*

### [02:00 - 02:30] Waste Sorter & Circular Economy
>
> *(Show `/waste-sorter` on screen)*  
> *"What about unavoidable food residue or contaminated packaging? Our AI Waste Sorter tells citizens exactly how to segregate — for instance, tearing off the clean lid of a pizza box for paper recycling while composting the greasy base at Indore's Asia-largest Gobar-Dhan Bio-CNG plant.*  
> *Users earn Karma points on our civic leaderboard, redeeming real vouchers and municipal honors."*

### [02:30 - 03:00] Closing & Impact
>
> *"RescueBite isn't a mock-up — it is a production-grade, fully working system aligned with UN SDGs 2, 11, 12, and 13. With RescueBite: No food wasted. No one left hungry. Thank you!"*

---

## 👥 Project Team

**RescueBite Initiative**  
*Acropolis Institute of Technology and Research, Indore*

- **Ishu Vishwakarma** — Systems Architecture & Backend
- **Arth Joshi** — AI Vision & Intelligence Engine
- **Abhijeet Meena** — Geospatial Telemetry & OSRM Routing
- **Aayush Batole** — Full-Stack Lead Developer & UI/UX
- **Aashutosh Rajput** — Food Safety, CSR & Policy Lead

---
© 2026 RescueBite India. Built with open civic standards.
