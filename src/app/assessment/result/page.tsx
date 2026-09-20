'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  FileText, 
  PhoneCall, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Building2,
  Users
} from 'lucide-react';
import { CareBridgeStorage } from '@/lib/data/store';
import { TriageResult, AssessmentAnswers } from '@/lib/ai/types';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';

export default function AssessmentResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TriageResult | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswers | null>(null);
  const [showCallConfirm, setShowCallConfirm] = useState(false);

  useEffect(() => {
    const res = CareBridgeStorage.getResult();
    const ans = CareBridgeStorage.getAnswers();

    if (!res) {
      const fallbackResult: TriageResult = {
        urgency: 'HIGH',
        headline: 'Potential Emergency Indicators Detected',
        explanation: 'Reported symptoms include severe chest discomfort and breathing difficulty requiring immediate professional medical evaluation.',
        keyIndicators: [
          'Severe chest discomfort or pressure',
          'Acute shortness of breath',
          'Sudden onset within 30 minutes'
        ],
        recommendedAction: 'Seek immediate professional emergency care. Transport to the nearest emergency department or contact emergency services.',
        actionPathway: 'CALL_EMERGENCY',
        timestamp: new Date().toISOString(),
        aiProcessed: true,
        modelUsed: 'CareBridge Clinical NLP v1.2'
      };
      setResult(fallbackResult);
      CareBridgeStorage.setResult(fallbackResult);
    } else {
      setResult(res);
    }

    if (ans) setAnswers(ans);
  }, []);

  if (!result) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center', background: '#ffffff' }}>
        <div className="container">
          <p style={{ color: '#4b5563' }}>Loading assessment evaluation...</p>
        </div>
      </div>
    );
  }

  const isCritical = result.urgency === 'CRITICAL';
  const isHigh = result.urgency === 'HIGH';
  const isUrgent = isCritical || isHigh;

  return (
    <div style={{ padding: '3.5rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Soft Red / Status Alert Container */}
        <div 
          className="card" 
          style={{ 
            borderColor: isUrgent ? '#fecaca' : '#bbf7d0',
            background: isUrgent ? '#fef2f2' : '#f0fdf4',
            padding: '2.5rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={`pulse-dot ${result.urgency.toLowerCase()}`} style={{ width: '0.85rem', height: '0.85rem' }} />
              <div>
                <span style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Risk Classification
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '2px' }}>
                  <span className={`badge-urgency ${result.urgency.toLowerCase()}`} style={{ fontSize: '1.1rem', padding: '0.4rem 1rem' }}>
                    {result.urgency}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#6b7280', background: '#ffffff', border: '1px solid #e5e7eb', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
              Evaluated: {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>

          <h1 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 900, color: isUrgent ? '#991b1b' : '#166534', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {result.headline}
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '700px' }}>
            {result.explanation}
          </p>

          {/* Key Indicators Detected */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Key Indicators Detected
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {result.keyIndicators.map((indicator, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#111827', fontSize: '0.95rem', fontWeight: 500 }}>
                  <CheckCircle2 size={18} color={isUrgent ? '#dc2626' : '#16a34a'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Step Box */}
          <div style={{ background: '#ffffff', border: `1px solid ${isUrgent ? '#fecaca' : '#bbf7d0'}`, borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: isUrgent ? '#b91c1c' : '#16a34a', marginBottom: '0.35rem' }}>
              Recommended Next Action
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
              {result.recommendedAction}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {isUrgent && (
              <button 
                type="button" 
                onClick={() => setShowCallConfirm(true)}
                className="btn btn-emergency btn-lg"
                id="cta-call-emergency"
              >
                <PhoneCall size={20} />
                <span>CONTACT EMERGENCY SERVICES (911/112)</span>
              </button>
            )}

            <Link href="/hospitals" className="btn btn-primary btn-lg" id="cta-find-hospital">
              <MapPin size={20} />
              <span>FIND EMERGENCY CARE</span>
            </Link>

            <Link href="/emergency-summary" className="btn btn-secondary btn-lg" id="cta-create-summary">
              <FileText size={20} color="#dc2626" />
              <span>CREATE EMERGENCY SUMMARY</span>
            </Link>
          </div>
        </div>

        {/* Coordination Next Steps Card */}
        <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
            Recommended Emergency Coordination Pathway
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <Link href="/hospitals" style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'block' }}>
              <div style={{ color: '#dc2626', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>1. Locate Nearest ED</span>
                <ArrowRight size={15} />
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.82rem', marginTop: '0.4rem' }}>
                {DEMO_HOSPITALS[0].name} is 1.8 km away with 24/7 Level I Trauma.
              </div>
            </Link>

            <Link href="/emergency-summary" style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'block' }}>
              <div style={{ color: '#111827', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>2. Emergency Handover</span>
                <ArrowRight size={15} />
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.82rem', marginTop: '0.4rem' }}>
                Formatted summary with QR code ready for ambulance / triage intake.
              </div>
            </Link>

            <Link href="/contacts" style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'block' }}>
              <div style={{ color: '#111827', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>3. Alert Family</span>
                <ArrowRight size={15} />
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.82rem', marginTop: '0.4rem' }}>
                Dispatch simulated SMS alert to Sarah Reynolds & Marcus Reynolds.
              </div>
            </Link>
          </div>
        </div>

        {/* Safety Disclaimer Footer */}
        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '0.8125rem', color: '#6b7280', textAlign: 'center' }}>
          <strong>Medical Safety Guarantee:</strong> CareBridge does not formulate medical disease diagnoses or replace licensed physicians. The categorization above reflects deterministic urgency thresholds designed for rapid care coordination.
        </div>
      </div>

      {/* Emergency Call Simulation Modal */}
      {showCallConfirm && (
        <div className="modal-overlay" onClick={() => setShowCallConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626', marginBottom: '1rem' }}>
              <PhoneCall size={28} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827' }}>
                Contacting Emergency Services
              </h3>
            </div>

            <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              In a genuine life-threatening crisis, dialing <strong>911 (North America)</strong> or <strong>112 (Europe/International)</strong> connects directly to local municipal emergency dispatch.
            </p>

            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#991b1b' }}>
                Ready to speak to Emergency Dispatcher:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.4rem' }}>
                • Tell dispatcher: "Patient with {answers?.selectedSymptoms[0]?.replace(/_/g, ' ') || 'acute severe distress'}, conscious: {answers?.conscious || 'yes'}."<br />
                • State your exact physical address or landmark immediately.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button"
                onClick={() => setShowCallConfirm(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <a 
                href="tel:911" 
                className="btn btn-emergency"
                onClick={() => setShowCallConfirm(false)}
              >
                <PhoneCall size={16} />
                <span>Place Emergency Call (tel:911)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
