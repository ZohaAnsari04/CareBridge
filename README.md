# 🏥 CareBridge: AI Emergency & Healthcare Access System

> **Hackathon Theme:** TECH FOR A BETTER TOMORROW  
> **Core Mission:** When every second matters, connect the right information to the right care.  
> 🌐 **Live Application:** [https://carebridge-zoha.vercel.app/](https://carebridge-zoha.vercel.app/)

[![Live Deployment](https://img.shields.io/badge/Live%20Demo-carebridge--zoha.vercel.app-dc2626?style=for-the-badge&logo=vercel&logoColor=white)](https://carebridge-zoha.vercel.app/)

---

## 📌 Problem Statement

During acute medical emergencies, patients and bystanders experience intense stress and confusion:
1. **Uncertainty:** Inability to gauge whether symptoms represent an immediate life-threatening emergency or urgent care need.
2. **Facility Mismatch:** Patients arrive at community clinics that lack catheterization labs, pediatric trauma capabilities, or stroke neurology units.
3. **Data Loss During Handover:** Critical details (onset timeline, prior heart conditions, allergies, current blood thinners) are lost or delayed during the frantic transfer between bystander, paramedic, and ER intake.
4. **Family Disconnect:** Family members remain uninformed about which hospital their loved one was transported to.

---

## 💡 Solution

**CareBridge** is an AI-assisted emergency healthcare coordination platform that bridges the critical emergency care chain:

$$\text{Emergency} \longrightarrow \text{Assessment} \longrightarrow \text{Appropriate Action} \longrightarrow \text{Nearby Emergency Care} \longrightarrow \text{Structured Patient Summary} \longrightarrow \text{Care Coordination}$$

CareBridge is **strictly an emergency decision-support and coordination system**. It does **NOT** diagnose diseases or replace licensed physicians.

---

## 🌟 The Four Pillars of CareBridge

1. **🧠 ASSESS (AI Symptom Extraction & Deterministic Triage):**
   - Natural language input and voice assistant input parsing.
   - Deterministic rule-based safety engine (`CRITICAL`, `HIGH`, `MODERATE`, `LOW`).
   - 100% offline fallback so the system never fails when an AI API key is unavailable.
2. **🏥 LOCATE (Nearby Emergency Facilities):**
   - Interactive Leaflet emergency facility map with user location and color-coded emergency department markers.
   - Real-time routing distance, travel time estimates, and trauma capabilities (Level I/II Trauma, Stroke, Cardiac Cath).
3. **📋 SUMMARIZE (Structured Clinical Handover):**
   - Professional medical-style emergency handover sheet.
   - Paramedic & ER intake QR scanner for instant electronic health record ingestion.
   - Formatted for print or PDF export.
4. **👨‍👩‍👧 COORDINATE (Family & Healthcare Communication):**
   - Designated emergency contacts with instant simulated SMS dispatch.
   - Unique coordination tokens (`DISPATCH-XXXX`) with target hospital details.

---

## 🛡️ Medical Safety & Ethical Safeguards

- **Zero Diagnostic Claims:** CareBridge never informs a user "You have a heart attack" or "You are safe."
- **Deterministic Override:** Life-threatening red flags (loss of consciousness, acute respiratory arrest, uncontrolled hemorrhage, sudden neurological deficits) lock the triage level to `CRITICAL` without allowing an AI model to downgrade them.
- **Persistent Disclaimer:** Displayed across all assessment and result routes.
- **Demo Data Transparency:** All demo hospitals, triage wait times, and notifications are clearly labeled as prototype datasets.

---

## 🚀 Judge Demo Flow (< 3 Minutes)

CareBridge includes a dedicated **Judge Demo Bar** pinned to the top of the screen:

1. **Open CareBridge:** Arrive at `/` and view the live Care Coordination Network visualization.
2. **Click Demo Preset:** Click **"Chest Emergency"** in the top bar (or click `🚨 START EMERGENCY ASSESSMENT`).
3. **Review Assessment:** Notice the extracted symptoms (*chest discomfort, difficulty breathing, sweating*), severity (*severe*), and onset (*20m ago*).
4. **View Risk Result:** View the bold **🚨 POTENTIAL CRITICAL EMERGENCY DETECTED** banner with key indicators and direct emergency call modal.
5. **Locate Hospital:** Click **"Find Emergency Care"** to inspect the interactive hospital map and select *CareBridge Metro General Hospital* (Level I Trauma, 1.8 km).
6. **Generate Handover Summary:** Click **"Create Emergency Summary"** to review the clinical chart, demographic baseline, and paramedic QR code.
7. **Notify Emergency Contact:** Click **"Notify Emergency Contacts"** and press **"Notify Contact"** to observe the simulated encrypted SMS dispatch confirmation with delivery token.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 App Router, TypeScript, React 18
- **Design System:** Custom Vanilla CSS design system with CSS custom properties, responsive layout tokens, and clinical slate aesthetics
- **Icons:** Lucide React
- **Mapping:** Leaflet & OpenStreetMap with client tactical radar fallback
- **State Management:** LocalStorage synchronization with reactive activity timeline
- **AI / NLP Engine:** Deterministic rule engine + natural language extractor with graceful offline fallback

---

## 📁 Project Structure

```
CareBridge/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── assessment/analyze/route.ts  # Symptom extraction & safety triage
│   │   │   ├── hospitals/route.ts           # Facility discovery API
│   │   │   ├── hospitals/[id]/route.ts      # Facility detail API
│   │   │   ├── emergency-summary/route.ts   # Summary sheet API
│   │   │   ├── profile/route.ts             # Medical profile API
│   │   │   ├── contacts/route.ts            # Contacts API
│   │   │   └── notifications/route.ts       # Simulated SMS dispatch
│   │   ├── assessment/
│   │   │   ├── page.tsx                     # 4-step assessment wizard
│   │   │   └── result/page.tsx              # Triage urgency result
│   │   ├── hospitals/
│   │   │   ├── page.tsx                     # Facility discovery & interactive map
│   │   │   └── [id]/page.tsx                # Facility details & directions
│   │   ├── emergency-summary/page.tsx       # Medical handover sheet & QR
│   │   ├── contacts/page.tsx                # Emergency contact coordination
│   │   ├── emergency-profile/page.tsx       # Pre-hospital readiness profile
│   │   ├── dashboard/page.tsx               # Readiness & timeline console
│   │   ├── about/page.tsx                   # Hackathon mission & roadmap
│   │   ├── privacy/page.tsx                 # Patient privacy & notice
│   │   ├── globals.css                      # Healthcare CSS design system
│   │   └── layout.tsx                       # Root layout with Demo Bar & Nav
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                   # Header with emergency CTAs
│   │   │   ├── Footer.tsx                   # Footer with safety links
│   │   │   ├── EmergencyDisclaimer.tsx      # Persistent safety banner
│   │   │   └── DemoScenarioBar.tsx          # 1-Click judge test bar
│   │   ├── home/
│   │   │   └── HeroNetworkVisual.tsx        # Animated 4-node coordination visual
│   │   └── hospitals/
│   │       └── InteractiveHospitalMap.tsx   # Leaflet map with user & ED pins
│   └── lib/
│       ├── ai/
│       │   ├── types.ts                     # TypeScript schemas
│       │   ├── prompt.ts                    # Clinical intake system prompts
│       │   └── triage.ts                    # Deterministic safety rule engine
│       └── data/
│           ├── hospitals.ts                 # 8+ verified demo emergency facilities
│           ├── demoScenarios.ts             # 4 rich clinical scenarios
│           └── store.ts                     # LocalStorage reactive store
├── .env.example
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🌐 Live Deployment

CareBridge is deployed and live for testing on Vercel:

👉 **[https://carebridge-zoha.vercel.app/](https://carebridge-zoha.vercel.app/)**

You can immediately test the full end-to-end user journey directly in your browser:
- Emergency Assessment & Voice / Text Triage
- Interactive Metro Care Facility Discovery & Light Map
- Clinical Emergency Intake Summary Sheet & QR Code
- Prototype Family Notification Dispatch

---

## 💻 Running Locally

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd CareBridge
npm install
```

### 2. Environment Variables (Optional)
```bash
cp .env.example .env.local
```
*(CareBridge operates 100% out of the box with its built-in deterministic NLP engine even without API keys!)*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Verification
```bash
npm run build
npm start
```

---

## 🔮 Scalable Product Roadmap

- **Phase 1 (Current MVP):** AI-assisted assessment, hospital discovery, clinical summary sheet, family notification simulation.
- **Phase 2:** Live hospital emergency department bed availability & queue telemetry.
- **Phase 3:** Municipal 911 / 112 CAD ambulance dispatch integration.
- **Phase 4:** Apple Watch / WearOS automated crash & fall detection triggers.
- **Phase 5:** Low-bandwidth multi-lingual voice translation for tourists.
- **Phase 6:** Global interoperable FHIR / HL7 clinical health record exchange.

---

## ⚖️ Disclaimer

CareBridge provides AI-assisted emergency triage guidance and does not replace professional medical advice, diagnosis, or official municipal emergency services (911/112). All hospital wait times and SMS dispatches in this prototype are simulated for demonstration purposes.
