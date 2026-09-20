import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, AlertTriangle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div style={{ padding: '3.5rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#16a34a', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <ShieldCheck size={16} /> Privacy & Safety Architecture
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Healthcare Privacy Statement
          </h1>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            CareBridge is committed to patient agency, absolute transparency, and clear clinical boundaries.
          </p>
        </div>

        {/* Prototype Disclaimer Box */}
        <div className="card" style={{ background: '#fffbeb', borderColor: '#fde68a', padding: '1.75rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#92400e', marginBottom: '0.35rem' }}>
                Hackathon Demonstration Notice
              </h3>
              <p style={{ color: '#78350f', fontSize: '0.9rem', lineHeight: 1.6 }}>
                CareBridge is an academic and hackathon prototype. All notifications, carrier dispatches, and emergency department handovers presented in this demo application are simulated. This prototype does NOT claim HIPAA or GDPR compliance in its current demonstration sandbox.
              </p>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '1.75rem', background: '#ffffff', borderColor: '#e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#dc2626', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
              <Lock size={20} />
              <span>1. User-Controlled Authorization</span>
            </div>
            <p style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Your emergency medical information (blood group, allergies, conditions) is only shared with designated family contacts or healthcare providers whom you explicitly choose to notify.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem', background: '#ffffff', borderColor: '#e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#16a34a', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
              <Server size={20} />
              <span>2. Client-Side & Local Storage Sandbox</span>
            </div>
            <p style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Assessment answers, selected hospital targets, and contact details are stored securely in your local browser session storage. No personal identifiable health data is transmitted to unauthorized third-party trackers or ad networks.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem', background: '#ffffff', borderColor: '#e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#111827', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.1rem' }}>
              <EyeOff size={20} />
              <span>3. Medical Diagnosis Non-Replacement</span>
            </div>
            <p style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6 }}>
              CareBridge does not replace emergency medical dispatch or licensed clinical examinations. Any symptoms classified as high or critical urgency advise contacting municipal emergency services (911/112) immediately.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className="btn btn-secondary">
            <span>Return to CareBridge Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
