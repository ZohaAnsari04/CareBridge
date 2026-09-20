import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  Building2, 
  Network, 
  Briefcase, 
  ShieldCheck, 
  Milestone,
  Heart
} from 'lucide-react';

export default function AboutPage() {
  const roadmapPhases = [
    { phase: 'Phase 1 (Current MVP)', title: 'AI-Assisted Assessment + Hospital Discovery', status: 'COMPLETED', desc: 'Deterministic safety rules, NLP symptom extraction with offline fallback, nearby hospital mapping, emergency summary sheet, and family notification simulation.' },
    { phase: 'Phase 2', title: 'Live Hospital Bed & Triage Availability', status: 'IN ROADMAP', desc: 'Real-time telemetry integration with hospital emergency departments displaying live bed availability and queue wait times.' },
    { phase: 'Phase 3', title: 'Municipal 911 / 112 Ambulance CAD Dispatch', status: 'IN ROADMAP', desc: 'Direct computer-aided dispatch (CAD) integration passing structured JSON patient vitals directly to en-route paramedic crews.' },
    { phase: 'Phase 4', title: 'Wearable Emergency Sensor Detection', status: 'IN ROADMAP', desc: 'Automatic emergency trigger detection via Apple Watch / WearOS for high-impact falls, severe arrhythmias, or vehicular collisions.' },
    { phase: 'Phase 5', title: 'Multilingual Voice Emergency Assistant', status: 'IN ROADMAP', desc: 'Real-time multi-dialect speech translation for bystanders and tourists in unfamiliar countries during life-threatening crises.' },
    { phase: 'Phase 6', title: 'Interoperable Global FHIR Healthcare Records', status: 'IN ROADMAP', desc: 'Secure biometric authentication linking full clinical history with EHR platforms (Epic, Cerner) across national boundaries.' }
  ];

  const marketSegments = [
    { title: 'Hospitals & Emergency Health Systems', desc: 'Accelerates emergency room intake, reduces triage administrative bottlenecks, and delivers structured patient summaries before ambulance arrival.', icon: Building2 },
    { title: 'Regional Healthcare Networks', desc: 'Coordinates patient distribution across trauma levels to prevent overcrowding of major regional medical centers.', icon: Network },
    { title: 'Enterprise Employers & Remote Workforces', desc: 'Ensures employee duty-of-care with pre-configured emergency profiles and rapid coordination during workplace medical crises.', icon: Briefcase },
    { title: 'Health Insurance Providers', desc: 'Directs policyholders to appropriate clinical pathways (preventing expensive and unnecessary ER visits when urgent care suffices).', icon: ShieldCheck }
  ];

  return (
    <div style={{ padding: '3.5rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', color: '#b91c1c', fontWeight: 700, marginBottom: '1.25rem' }}>
            <Award size={15} /> TECH FOR A BETTER TOMORROW • HACKATHON
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            CareBridge Mission & Architecture
          </h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            Bridging the high-stakes gap between acute patient distress and organized medical care through responsible, deterministic emergency coordination.
          </p>
        </div>

        {/* Product Statement */}
        <div className="card" style={{ background: '#f8fafc', borderColor: '#e5e7eb', padding: '2.25rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827', marginBottom: '0.75rem' }}>
            Core Product Statement
          </h2>
          <p style={{ color: '#374151', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            CareBridge is an AI-assisted emergency healthcare coordination platform that helps users navigate seamlessly through:
          </p>
          <div style={{ background: '#ffffff', padding: '1.1rem 1.5rem', borderRadius: '12px', color: '#dc2626', fontWeight: 900, fontSize: '0.92rem', letterSpacing: '0.04em', textAlign: 'center', border: '1px solid #fecaca' }}>
            EMERGENCY → ASSESSMENT → APPROPRIATE ACTION → NEARBY EMERGENCY CARE → STRUCTURED PATIENT SUMMARY → CARE COORDINATION
          </div>
        </div>

        {/* Market & Business Model */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#111827', marginBottom: '0.5rem' }}>
            Market Potential & Business Model
          </h2>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            CareBridge serves as a bridge between consumers in emergency distress and institutional health infrastructure.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {marketSegments.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card card-hover" style={{ padding: '1.5rem', background: '#ffffff', borderColor: '#e5e7eb' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', marginBottom: '1rem' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#4b5563', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Roadmap */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <Milestone size={16} /> Scalable Evolution
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#111827', marginBottom: '1.5rem' }}>
            Future Product Roadmap
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {roadmapPhases.map((r, idx) => (
              <div key={idx} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderColor: '#e5e7eb' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: r.status === 'COMPLETED' ? '#16a34a' : '#dc2626' }}>
                      {r.phase}
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', background: r.status === 'COMPLETED' ? '#f0fdf4' : '#f8fafc', color: r.status === 'COMPLETED' ? '#16a34a' : '#6b7280', fontWeight: 700, border: `1px solid ${r.status === 'COMPLETED' ? '#bbf7d0' : '#e5e7eb'}` }}>
                      {r.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                    {r.title}
                  </h3>
                  <p style={{ color: '#4b5563', fontSize: '0.85rem', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card card-elevated" style={{ padding: '2rem', background: '#f8fafc', borderColor: '#e5e7eb' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827', marginBottom: '1rem' }}>
            Architecture & Technology Stack
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <strong style={{ color: '#dc2626' }}>Core Framework:</strong>
              <div style={{ color: '#374151' }}>Next.js 14 App Router, TypeScript, React</div>
            </div>
            <div>
              <strong style={{ color: '#dc2626' }}>Design System:</strong>
              <div style={{ color: '#374151' }}>White + Emergency Red CSS tokens</div>
            </div>
            <div>
              <strong style={{ color: '#dc2626' }}>Safety Engine:</strong>
              <div style={{ color: '#374151' }}>Deterministic rule-based clinical triage</div>
            </div>
            <div>
              <strong style={{ color: '#dc2626' }}>AI Layer:</strong>
              <div style={{ color: '#374151' }}>NLP symptom extraction with 100% offline fallback</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
