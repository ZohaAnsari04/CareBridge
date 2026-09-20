import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function EmergencyDisclaimer() {
  return (
    <div className="emergency-banner" role="complementary" aria-label="Clinical safety notice">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span className="badge">
          <ShieldCheck size={14} /> CareBridge Safety Protocol
        </span>
        <span style={{ color: '#374151' }}>
          CareBridge provides AI-assisted emergency guidance and does not replace professional medical advice, diagnosis, or emergency dispatch.
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#b91c1c' }}>
        <AlertCircle size={15} /> Immediate Threat to Life? Call 911 / 112 Directly
      </div>
    </div>
  );
}
