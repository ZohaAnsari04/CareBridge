import React from 'react';
import Link from 'next/link';
import { Heart, ShieldAlert, Cpu, Phone, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Col 1 */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <img 
                src="/carebridge-logo.png" 
                alt="CareBridge" 
                style={{ height: '42px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} 
              />
            </div>
            <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem', maxWidth: '380px' }}>
              AI-assisted emergency healthcare coordination platform connecting patients, nearby emergency departments, and family responders in critical minutes.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#b91c1c', fontWeight: 600 }}>
              <Award size={14} /> Hackathon Theme: Tech for a Better Tomorrow
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h4>Emergency Journey</h4>
            <ul>
              <li><Link href="/assessment">Start Assessment</Link></li>
              <li><Link href="/hospitals">Find Emergency Facilities</Link></li>
              <li><Link href="/emergency-summary">Clinical Summary Sheet</Link></li>
              <li><Link href="/contacts">Family Coordination</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h4>Preparedness</h4>
            <ul>
              <li><Link href="/emergency-profile">Emergency Health ID</Link></li>
              <li><Link href="/dashboard">Readiness Dashboard</Link></li>
              <li><Link href="/about">Pillars & Business Model</Link></li>
              <li><Link href="/privacy">Healthcare Privacy Notice</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h4>Safety Safeguards</h4>
            <div style={{ fontSize: '0.8125rem', color: '#4b5563', lineHeight: 1.5 }}>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: '#111827' }}>Deterministic Safety Layer:</strong> Critical red flags trigger immediate emergency escalation pathways.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontWeight: 600 }}>
                <Cpu size={14} /> AI Extraction + Rule Safety
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ color: '#6b7280' }}>
            CareBridge Emergency Prototype © 2026 • CareBridge is an AI-assisted prototype and does not replace professional medical advice or emergency services.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/privacy" style={{ color: '#4b5563' }}>Privacy Notice</Link>
            <Link href="/about" style={{ color: '#4b5563' }}>Architecture & Roadmap</Link>
            <span style={{ color: '#9ca3af' }}>v1.0.0-PROTOTYPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
