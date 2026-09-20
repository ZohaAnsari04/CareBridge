'use client';

import React from 'react';

export default function NearbyCareBackground() {
  return (
    <div
      className="nearby-care-bg"
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
      {/* 1. Radar Geolocation Sonar Beacon at Top Right */}
      <div 
        style={{
          position: 'absolute',
          top: '-160px',
          right: '-100px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, rgba(220, 38, 38, 0.02) 45%, transparent 70%)',
          filter: 'blur(25px)'
        }}
      />

      {/* Radar Concentric Rings */}
      <svg
        style={{
          position: 'absolute',
          top: '-50px',
          right: '5%',
          width: '400px',
          height: '400px',
          opacity: 0.25
        }}
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="60" stroke="#fca5a5" strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
        <circle cx="200" cy="200" r="120" stroke="#e2e8f0" strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="180" stroke="#fca5a5" strokeWidth="1.2" strokeDasharray="6 6" fill="none" className="radar-spin" />
        {/* Crosshairs */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="4" fill="#dc2626" />
      </svg>

      {/* 2. Subtle Medical Facilities Plus / Coordinate Grid */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.35
        }}
      >
        <defs>
          <pattern id="nearby-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Fine grid intersections */}
            <path d="M30,25 L30,35 M25,30 L35,30" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
            <circle cx="30" cy="30" r="0.8" fill="#94a3b8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nearby-grid-pattern)" />
      </svg>

      {/* 3. Left Side: Hospital Emergency Facility Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '2%',
          width: '240px',
          height: '240px',
          opacity: 0.04,
          color: '#dc2626'
        }}
      >
        {/* Hospital Building with Medical Cross */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
          <path d="M10 9h4" strokeWidth="2" />
          <path d="M12 7v4" strokeWidth="2" />
        </svg>
      </div>

      {/* 4. Right Side: Emergency Navigation Pin & Route Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '3%',
          width: '260px',
          height: '260px',
          opacity: 0.035,
          color: '#dc2626'
        }}
      >
        {/* Map Pin with Heart Pulse */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      {/* 5. Ambient Dispatch Geolocation Telemetry Badges */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '3.5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          opacity: 0.35,
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.08em',
          fontFamily: 'monospace'
        }}
      >
        <span style={{ color: '#dc2626' }}>● DISPATCH RADAR</span>
        <span>GEO: 37.7749° N</span>
        <span>RADIUS: 15.0 KM</span>
        <span>ED STATUS: 24/7 OPEN</span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '65%',
          right: '3.5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
          opacity: 0.35,
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.08em',
          fontFamily: 'monospace'
        }}
      >
        <span style={{ color: '#16a34a' }}>● LEVEL I/II TRAUMA</span>
        <span>TRANSIT: CALCULATED</span>
        <span>ROUTING: REALTIME</span>
        <span>HAVERSINE: CALIBRATED</span>
      </div>

      {/* 6. Subtle Continuous Emergency Transit Wave at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          opacity: 0.16,
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <svg
          viewBox="0 0 1600 80"
          fill="none"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path
            d="M0,40 L300,40 L315,32 L325,48 L335,40 L380,40 L395,20 L405,65 L415,10 L430,70 L440,40 L480,40 L495,30 L510,40 L800,40 L815,32 L825,48 L835,40 L880,40 L895,20 L905,65 L915,10 L930,70 L940,40 L980,40 L995,30 L1010,40 L1300,40 L1315,32 L1325,48 L1335,40 L1380,40 L1395,20 L1405,65 L1415,10 L1430,70 L1440,40 L1480,40 L1495,30 L1510,40 L1600,40"
            stroke="#e2e8f0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            className="transit-pulse"
            d="M0,40 L300,40 L315,32 L325,48 L335,40 L380,40 L395,20 L405,65 L415,10 L430,70 L440,40 L480,40 L495,30 L510,40 L800,40 L815,32 L825,48 L835,40 L880,40 L895,20 L905,65 L915,10 L930,70 L940,40 L980,40 L995,30 L1010,40 L1300,40 L1315,32 L1325,48 L1335,40 L1380,40 L1395,20 L1405,65 L1415,10 L1430,70 L1440,40 L1480,40 L1495,30 L1510,40 L1600,40"
            stroke="#dc2626"
            strokeWidth="2.2"
            strokeLinecap="round"
            filter="drop-shadow(0 0 4px rgba(220, 38, 38, 0.4))"
          />
        </svg>
      </div>

      <style jsx>{`
        .radar-spin {
          transform-origin: center;
          animation: radarRotate 25s linear infinite;
        }

        .transit-pulse {
          stroke-dasharray: 180 1420;
          animation: transitFlow 5s linear infinite;
        }

        @keyframes radarRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes transitFlow {
          0% {
            stroke-dashoffset: 1600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @media (max-width: 900px) {
          .nearby-care-bg > div:nth-child(5),
          .nearby-care-bg > div:nth-child(6) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
