'use client';

import React from 'react';

export default function MedicalBackground() {
  return (
    <div 
      className="medical-bg-container" 
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* 1. Subtle Clinical Cross Grid Pattern */}
      <svg 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.45
        }}
      >
        <defs>
          <pattern id="medical-cross-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Soft Gray/Red Medical Plus Sign */}
            <path
              d="M30,24 L30,36 M24,30 L36,30"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Faint focal red plus accents at intervals */}
            <circle cx="30" cy="30" r="1" fill="#fecaca" opacity="0.6" />
          </pattern>
          {/* Radial mask so the pattern stays soft and fades out in the center */}
          <radialGradient id="fade-mask" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#medical-cross-pattern)" />
      </svg>

      {/* 2. Ambient Medical Watermarks (Shield, Heart, Cross) */}
      <div 
        style={{
          position: 'absolute',
          top: '8%',
          left: '3%',
          width: '240px',
          height: '240px',
          opacity: 0.04,
          color: '#dc2626'
        }}
      >
        {/* Medical Cross in Shield Watermark */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>

      <div 
        style={{
          position: 'absolute',
          top: '18%',
          right: '4%',
          width: '280px',
          height: '280px',
          opacity: 0.045,
          color: '#dc2626'
        }}
      >
        {/* Stethoscope & Pulse Heart Watermark */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M19 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3z" />
          <path d="M5 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S2 3.34 2 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M2 11v3a7 7 0 0 0 14 0v-3" />
          <path d="M9 18v2a3 3 0 0 0 6 0v-2" />
        </svg>
      </div>

      {/* 3. Continuous Animated Cardiac ECG Heartbeat Wave */}
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          left: 0,
          right: 0,
          height: '120px',
          opacity: 0.22,
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <svg 
          viewBox="0 0 1600 120" 
          fill="none" 
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Subtle baseline track */}
          <path 
            d="M0,60 L200,60 L215,55 L225,65 L235,60 L280,60 L295,40 L305,85 L320,10 L335,100 L345,60 L370,60 L385,50 L400,60 L600,60 L615,55 L625,65 L635,60 L680,60 L695,40 L705,85 L720,10 L735,100 L745,60 L770,60 L785,50 L800,60 L1000,60 L1015,55 L1025,65 L1035,60 L1080,60 L1095,40 L1105,85 L1120,10 L1135,100 L1145,60 L1170,60 L1185,50 L1200,60 L1400,60 L1415,55 L1425,65 L1435,60 L1480,60 L1495,40 L1505,85 L1520,10 L1535,100 L1545,60 L1570,60 L1585,50 L1600,60" 
            stroke="#e2e8f0" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Glowing Red Emergency Pulse Tracer */}
          <path 
            className="ecg-pulse-animated"
            d="M0,60 L200,60 L215,55 L225,65 L235,60 L280,60 L295,40 L305,85 L320,10 L335,100 L345,60 L370,60 L385,50 L400,60 L600,60 L615,55 L625,65 L635,60 L680,60 L695,40 L705,85 L720,10 L735,100 L745,60 L770,60 L785,50 L800,60 L1000,60 L1015,55 L1025,65 L1035,60 L1080,60 L1095,40 L1105,85 L1120,10 L1135,100 L1145,60 L1170,60 L1185,50 L1200,60 L1400,60 L1415,55 L1425,65 L1435,60 L1480,60 L1495,40 L1505,85 L1520,10 L1535,100 L1545,60 L1570,60 L1585,50 L1600,60" 
            stroke="#dc2626" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="drop-shadow(0 0 6px rgba(220, 38, 38, 0.4))"
          />
        </svg>
      </div>

      <style jsx>{`
        .ecg-pulse-animated {
          stroke-dasharray: 200 1400;
          animation: ecgFlow 5s linear infinite;
        }

        @keyframes ecgFlow {
          0% {
            stroke-dashoffset: 1600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
