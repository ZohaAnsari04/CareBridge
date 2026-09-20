import React from 'react';
import Link from 'next/link';
import { 
  AlertCircle, 
  MapPin, 
  User, 
  ShieldCheck, 
  Clock, 
  Activity, 
  FileText, 
  Users, 
  ArrowRight, 
  Building2, 
  CheckCircle, 
  Sparkles,
  Stethoscope,
  Heart
} from 'lucide-react';
import HeroNetworkVisual from '@/components/home/HeroNetworkVisual';

export default function LandingPage() {
  const pillars = [
    {
      num: '01',
      title: 'ASSESS',
      tagline: 'AI-Assisted Symptom Understanding',
      desc: 'Transforms natural speech and clinical indicators into structured triage categories without making speculative disease diagnoses.',
      icon: Activity,
      color: '#dc2626',
      bg: '#fef2f2'
    },
    {
      num: '02',
      title: 'LOCATE',
      tagline: 'Nearby Emergency Facilities',
      desc: 'Matches patient urgency with appropriate care capabilities: Level I/II Trauma Centers, specialized Cardiac & Stroke EDs, or Urgent Care.',
      icon: MapPin,
      color: '#16a34a',
      bg: '#f0fdf4'
    },
    {
      num: '03',
      title: 'SUMMARIZE',
      tagline: 'Structured Clinical Handover',
      desc: 'Generates instant, formatted patient handover summaries with onset timelines, red flags, allergies, and vitals ready for ER triage nurses.',
      icon: FileText,
      color: '#ea580c',
      bg: '#fff7ed'
    },
    {
      num: '04',
      title: 'COORDINATE',
      tagline: 'Patients, Families & Hospitals',
      desc: 'Dispatches emergency notifications to designated contacts with real-time target hospital details and coordination tokens.',
      icon: Users,
      color: '#dc2626',
      bg: '#fef2f2'
    }
  ];

  return (
    <div>
      {/* Hero Section with Subtle Red Accent */}
      <section style={{ 
        padding: '4.5rem 0 3.5rem 0', 
        position: 'relative', 
        overflow: 'hidden',
        background: 'radial-gradient(circle at 70% 40%, rgba(220, 38, 38, 0.08), transparent 45%)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
            {/* Tagline pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', color: '#b91c1c', fontWeight: 700, marginBottom: '1.5rem' }}>
              <Heart size={14} fill="#dc2626" stroke="#dc2626" /> TECH FOR A BETTER TOMORROW • HEALTHCARE ACCESS
            </div>

            <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.25rem' }}>
              When every second matters, <br />
              <span style={{ color: '#dc2626' }}>
                CareBridge connects you to care.
              </span>
            </h1>

            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: '#4b5563', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
              AI-assisted emergency assessment, nearby care discovery, structured emergency summaries, and trusted-contact coordination — in one place.
            </p>

            {/* Primary & Secondary CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/assessment" className="btn btn-emergency btn-lg" id="hero-start-assessment">
                <AlertCircle size={20} />
                <span>🚨 START EMERGENCY ASSESSMENT</span>
              </Link>
              <Link href="/hospitals" className="btn btn-secondary btn-lg" id="hero-find-care">
                <MapPin size={20} color="#dc2626" />
                <span>🏥 FIND EMERGENCY CARE</span>
              </Link>
              <Link href="/emergency-profile" className="btn btn-secondary btn-lg" id="hero-view-profile">
                <User size={18} />
                <span>VIEW EMERGENCY PROFILE</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual: Healthcare Coordination Network */}
          <HeroNetworkVisual />
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section style={{ padding: '5rem 0', background: '#f8fafc', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              The CareBridge Framework
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
              Four Pillars of Emergency Access
            </h2>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '640px', margin: '0.75rem auto 0 auto' }}>
              Moving safely from acute distress to coordinated, structured emergency care.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.num} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '12px', background: pillar.bg, border: `1px solid ${pillar.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: pillar.color }}>
                      <Icon size={22} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#d1d5db' }}>
                      {pillar.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '0.25rem' }}>
                    {pillar.title}
                  </h3>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: pillar.color, marginBottom: '0.75rem' }}>
                    {pillar.tagline}
                  </div>
                  <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Demo Scenarios Section */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div className="card" style={{ background: '#ffffff', borderColor: '#e5e7eb', padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#b91c1c', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} /> Optimized for Hackathon Presentation
                </div>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#111827' }}>
                  Demonstrate the Complete Flow in Under 3 Minutes
                </h2>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '600px' }}>
                  Select any preset in the top Demo Bar or start the conversational assessment to test symptom extraction, deterministic triage, hospital geolocation, and instant emergency handover sheet.
                </p>
              </div>

              <Link href="/assessment" className="btn btn-emergency">
                <span>Start Interactive Flow</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <span className="badge-urgency critical" style={{ marginBottom: '0.5rem' }}>CRITICAL</span>
                <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Chest Emergency</div>
                <div style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '0.3rem' }}>Chest pressure + breathing difficulty + diaphoresis</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <span className="badge-urgency high" style={{ marginBottom: '0.5rem' }}>HIGH</span>
                <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Orthopedic Trauma</div>
                <div style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '0.3rem' }}>Fall from height + severe extremity deformity</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <span className="badge-urgency moderate" style={{ marginBottom: '0.5rem' }}>MODERATE</span>
                <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Persistent High Fever</div>
                <div style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '0.3rem' }}>103°F febrile illness + dehydration risk</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <span className="badge-urgency low" style={{ marginBottom: '0.5rem' }}>LOW</span>
                <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Mild Non-Emergency</div>
                <div style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '0.3rem' }}>Isolated rash without systemic distress</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Non-Diagnosis Guarantee */}
      <section style={{ padding: '4rem 0', background: '#f8fafc', borderTop: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <ShieldCheck size={16} /> Clinical Ethics & Safety Architecture
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                Designed for Safety, Not Speculation.
              </h2>
              <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Unlike general consumer chatbots that hallucinate medical conditions, CareBridge employs a deterministic safety layer. The AI parses input into structured clinical signs, while transparent rule engines categorize urgency and route directly to licensed emergency responders.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#1f2937', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Zero Diagnostic Claims:</strong> We never tell a patient they have a specific disease or are "100% fine".</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#1f2937', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Deterministic Escalation:</strong> Unconsciousness, chest pressure, and acute bleeding immediately trigger emergency pathways.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#1f2937', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>AI Fallback Built-In:</strong> Continues functioning flawlessly even when AI API networks are offline.</span>
                </li>
              </ul>
            </div>

            <div className="card" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#dc2626', fontWeight: 800, fontSize: '0.95rem' }}>
                <Stethoscope size={18} /> Deterministic Safety Rules vs AI Extraction
              </div>
              <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ padding: '0.85rem', background: '#fef2f2', borderRadius: '10px', borderLeft: '3px solid #dc2626' }}>
                  <strong style={{ color: '#b91c1c' }}>Critical Safety Override:</strong>
                  <div style={{ color: '#4b5563', marginTop: '2px' }}>Loss of consciousness or severe acute breathing distress immediately locks triage level to CRITICAL. No AI model can downgrade this.</div>
                </div>
                <div style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '10px', borderLeft: '3px solid #111827' }}>
                  <strong style={{ color: '#111827' }}>NLP Feature Extraction:</strong>
                  <div style={{ color: '#4b5563', marginTop: '2px' }}>Extracts onset timeline, associated symptoms, pain character, and bystander context into structured JSON for hospital ER intake.</div>
                </div>
                <div style={{ padding: '0.85rem', background: '#f0fdf4', borderRadius: '10px', borderLeft: '3px solid #16a34a' }}>
                  <strong style={{ color: '#16a34a' }}>Structured Handover:</strong>
                  <div style={{ color: '#4b5563', marginTop: '2px' }}>Creates standardized clinical emergency summary ready for hospital emergency nurses and family members.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
