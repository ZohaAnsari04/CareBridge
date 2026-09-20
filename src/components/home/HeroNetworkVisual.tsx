'use client';

import React from 'react';
import { Heart, Cpu, Building2, Users, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export default function HeroNetworkVisual() {
  const nodes = [
    {
      id: 'patient',
      label: 'Patient in Distress',
      sub: 'Emergency Detected',
      icon: Heart,
      color: '#dc2626',
      bg: '#fef2f2',
      borderColor: '#fecaca',
      telemetry: 'Crushing chest pressure • 20m'
    },
    {
      id: 'ai',
      label: 'CareBridge AI',
      sub: 'Deterministic Triage',
      icon: Cpu,
      color: '#b91c1c',
      bg: '#fff1f2',
      borderColor: '#fecdd3',
      telemetry: 'High Urgency • Rule Safety Lock'
    },
    {
      id: 'hospital',
      label: 'Hospital Trauma ER',
      sub: 'Facility Targeted',
      icon: Building2,
      color: '#16a34a',
      bg: '#f0fdf4',
      borderColor: '#bbf7d0',
      telemetry: 'Metro General • 1.8km • Level 1 ED'
    },
    {
      id: 'family',
      label: 'Family Contacts',
      sub: 'Instant Alert',
      icon: Users,
      color: '#d97706',
      bg: '#fffbeb',
      borderColor: '#fde68a',
      telemetry: 'Sarah R. (Spouse) • SMS Ready'
    }
  ];

  return (
    <div className="network-container">
      {/* Header bar within visualization */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="pulse-dot critical" />
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827', fontWeight: 800 }}>
            Live Emergency Coordination Network
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>
          <ShieldCheck size={15} /> Zero Diagnosis • Safety First
        </div>
      </div>

      {/* 4 Connected Nodes in Pipeline */}
      <div className="nodes-grid">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <React.Fragment key={node.id}>
              <div 
                className="network-node-card"
                style={{ borderColor: node.borderColor }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                  <div 
                    style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      borderRadius: '10px', 
                      background: node.bg, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: node.color,
                      border: `1px solid ${node.borderColor}`
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827' }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: node.color, fontWeight: 700, textTransform: 'uppercase' }}>
                      {node.sub}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#4b5563', background: '#f8fafc', padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 500 }}>
                  {node.telemetry}
                </div>
              </div>

              {index < nodes.length - 1 && (
                <div className="pipeline-arrow" aria-hidden="true">
                  <ArrowRight size={18} color="#dc2626" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Telemetry Footer */}
      <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.78rem', color: '#6b7280', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
        <span>Handover Latency: &lt; 1.2s</span>
        <span style={{ color: '#dc2626', fontWeight: 600 }}>Deterministic Safety Override: ACTIVE</span>
        <span>Simulated Encrypted Channel: 256-bit</span>
      </div>

      <style jsx>{`
        .network-container {
          position: relative;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          overflow: hidden;
        }
        .nodes-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          position: relative;
          z-index: 2;
        }
        .network-node-card {
          flex: 1;
          background: #ffffff;
          border: 1px solid;
          border-radius: 14px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .network-node-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
        }
        .pipeline-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
        }
        @media (max-width: 900px) {
          .nodes-grid {
            flex-direction: column;
            align-items: stretch;
          }
          .pipeline-arrow {
            transform: rotate(90deg);
            margin: 0.25rem 0;
          }
        }
      `}</style>
    </div>
  );
}
