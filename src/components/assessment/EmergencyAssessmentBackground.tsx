'use client';

import React from 'react';

export default function EmergencyAssessmentBackground() {
  return (
    <div
      className="emergency-assessment-bg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* 1. Soft Emergency Alert Beacon Radial Glow at Top */}
      <div 
        className="emergency-beacon-glow"
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.02) 55%, transparent 75%)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}
      />

      {/* 2. Subtle Clinical Triage Dot / Plus Grid */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4
        }}
      >
        <defs>
          <pattern id="emergency-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
            {/* Subtle gray plus marks */}
            <path d="M25,22 L25,28 M22,25 L28,25" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" />
            {/* Soft faint red dots on alternate intersections */}
            <circle cx="25" cy="25" r="0.8" fill="#fca5a5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#emergency-grid-pattern)" />
      </svg>

      {/* 3. Left Side: Emergency Siren / Triage Shield Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '2%',
          width: '260px',
          height: '260px',
          opacity: 0.045,
          color: '#dc2626'
        }}
      >
        {/* Emergency Medical Star of Life & Cross */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" strokeWidth="2.5" />
          <path d="M7.75 7.75l8.5 8.5M16.25 7.75l-8.5 8.5" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 4. Right Side: Emergency Caduceus / Heart Telemetry Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '2%',
          width: '280px',
          height: '280px',
          opacity: 0.04,
          color: '#dc2626'
        }}
      >
        {/* Emergency Pulse Heart */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          <path d="M3 13h4l2 -3l3 6l2 -4l2 1h3" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 5. Ambient Vertical Hospital Trauma Telemetry Rails */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          left: '4%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          opacity: 0.35,
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.1em',
          fontFamily: 'monospace'
        }}
      >
        <span style={{ color: '#dc2626' }}>● TRIAGE READY</span>
        <span>SYS: ACTIVE</span>
        <span>LAT: METRO_ED</span>
        <span>SEC: DETERMINISTIC</span>
      </div>

      <div 
        style={{
          position: 'absolute',
          top: '15%',
          right: '4%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          opacity: 0.35,
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.1em',
          fontFamily: 'monospace'
        }}
      >
        <span style={{ color: '#dc2626' }}>EMERGENCY INTAKE</span>
        <span>PRIORITY: REALTIME</span>
        <span>PROTOCOL: 911/112</span>
        <span>OVERRIDE: ENGAGED</span>
      </div>

      {/* 6. Animated Subtle Emergency Telemetry Wave at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          opacity: 0.18,
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <svg
          viewBox="0 0 1600 90"
          fill="none"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Faint gray ECG background wave */}
          <path
            d="M0,45 L250,45 L265,38 L275,52 L285,45 L320,45 L335,25 L345,70 L355,5 L370,80 L380,45 L410,45 L425,35 L440,45 L700,45 L715,38 L725,52 L735,45 L770,45 L785,25 L795,70 L805,5 L820,80 L830,45 L860,45 L875,35 L890,45 L1150,45 L1165,38 L1175,52 L1185,45 L1220,45 L1235,25 L1245,70 L1255,5 L1270,80 L1280,45 L1310,45 L1325,35 L1340,45 L1600,45"
            stroke="#e2e8f0"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pulsing emergency red heartbeat trace */}
          <path
            className="emergency-ecg-pulse"
            d="M0,45 L250,45 L265,38 L275,52 L285,45 L320,45 L335,25 L345,70 L355,5 L370,80 L380,45 L410,45 L425,35 L440,45 L700,45 L715,38 L725,52 L735,45 L770,45 L785,25 L795,70 L805,5 L820,80 L830,45 L860,45 L875,35 L890,45 L1150,45 L1165,38 L1175,52 L1185,45 L1220,45 L1235,25 L1245,70 L1255,5 L1270,80 L1280,45 L1310,45 L1325,35 L1340,45 L1600,45"
            stroke="#dc2626"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 4px rgba(220, 38, 38, 0.4))"
          />
        </svg>
      </div>

      <style jsx>{`
        .emergency-beacon-glow {
          animation: beaconPulse 4s ease-in-out infinite alternate;
        }

        .emergency-ecg-pulse {
          stroke-dasharray: 180 1420;
          animation: ecgFlow 4.5s linear infinite;
        }

        @keyframes beaconPulse {
          0% {
            opacity: 0.5;
            transform: translateX(-50%) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1.08);
          }
        }

        @keyframes ecgFlow {
          0% {
            stroke-dashoffset: 1600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @media (max-width: 900px) {
          .emergency-assessment-bg > div:nth-child(4),
          .emergency-assessment-bg > div:nth-child(5) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
