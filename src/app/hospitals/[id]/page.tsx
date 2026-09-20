'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Clock, 
  PhoneCall, 
  Navigation, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';
import { CareBridgeStorage } from '@/lib/data/store';
import { Hospital } from '@/lib/ai/types';

export default function HospitalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hospitalId = params.id as string;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [directionsModal, setDirectionsModal] = useState(false);

  useEffect(() => {
    const target = DEMO_HOSPITALS.find(h => h.id === hospitalId) || DEMO_HOSPITALS[0];
    setHospital(target);
    CareBridgeStorage.setSelectedHospital(target);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDirectionsModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hospitalId]);

  if (!hospital) {
    return (
      <div style={{ padding: '5rem 0', textAlign: 'center', background: '#ffffff' }}>
        <p style={{ color: '#4b5563' }}>Loading emergency facility details...</p>
      </div>
    );
  }

  const handleCreateSummary = () => {
    CareBridgeStorage.setSelectedHospital(hospital);
    router.push('/emergency-summary');
  };

  return (
    <div style={{ padding: '3rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <Link href="/hospitals" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Hospital List
        </Link>

        {/* Facility Card */}
        <div className="card card-elevated" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#dc2626' }}>
                {hospital.type}
              </span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginTop: '0.25rem' }}>
                {hospital.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                <MapPin size={16} color="#dc2626" />
                <span>{hospital.address}, {hospital.city}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#111827' }}>
                {hospital.distanceKm} km
              </div>
              <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <Clock size={14} /> ~{hospital.travelMinutes} mins travel
              </div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
                {hospital.openStatus}
              </div>
            </div>
          </div>

          {/* Emergency Department Badge */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }} />
              Emergency Department
            </span>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>
              {hospital.traumaLevel}
            </span>
          </div>

          {/* Quick CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              type="button" 
              onClick={() => setDirectionsModal(true)}
              className="btn btn-primary btn-lg"
              id="cta-get-directions"
            >
              <Navigation size={18} />
              <span>📍 GET DIRECTIONS</span>
            </button>

            <button 
              type="button" 
              onClick={handleCreateSummary}
              className="btn btn-secondary btn-lg"
              id="cta-send-summary"
            >
              <FileText size={18} color="#dc2626" />
              <span>📋 SEND EMERGENCY SUMMARY</span>
            </button>

            <a 
              href={`tel:${hospital.phone}`} 
              className="btn btn-secondary btn-lg"
              id="cta-call-facility"
            >
              <PhoneCall size={18} />
              <span>📞 CALL FACILITY ({hospital.phone})</span>
            </a>
          </div>

          {/* Grid of Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>
                Emergency Department
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginTop: '0.35rem' }}>
                {hospital.emergencyDepartment ? '24/7 Full Emergency Dept' : 'Urgent Care Center'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 600, marginTop: '4px' }}>
                {hospital.traumaLevel}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>
                Average Triage Wait
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginTop: '0.35rem' }}>
                ~{hospital.estimatedWaitMinutes || 15} Minutes
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>
                Priority triage applies for critical emergency cases
              </div>
            </div>
          </div>

          {/* Clinical Specialties */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              Specialized Emergency Receiving Services
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {hospital.specialties.map((spec, i) => (
                <div 
                  key={i} 
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.4rem 0.85rem', borderRadius: '8px', color: '#111827', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}
                >
                  <CheckCircle2 size={14} color="#16a34a" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo disclaimer notice */}
          <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#6b7280' }}>
            <strong style={{ color: '#111827' }}>Demo Facility Record:</strong> Wait times and telemetry simulated for prototype demonstration.
          </div>
        </div>
      </div>

      {/* Directions Modal */}
      {directionsModal && (
        <div className="modal-overlay" onClick={() => setDirectionsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626', marginBottom: '1rem' }}>
              <Navigation size={26} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827' }}>
                Emergency Transit Navigation
              </h3>
            </div>

            <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Fastest route to <strong>{hospital.name}</strong> ({hospital.distanceKm} km via Healthcare Blvd).
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <span>Estimated Drive:</span>
                <strong style={{ color: '#111827' }}>~{hospital.travelMinutes} mins</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <span>Target Coordinates:</span>
                <span style={{ color: '#dc2626', fontWeight: 600 }}>{hospital.coordinates.lat.toFixed(4)}, {hospital.coordinates.lng.toFixed(4)}</span>
              </div>
              <div style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>
                ⚠️ If experiencing loss of consciousness, chest pressure, or severe breathing distress, do NOT drive yourself. Contact 911 / 112 immediately.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={() => setDirectionsModal(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <a 
                href={`https://maps.google.com/?q=${hospital.coordinates.lat},${hospital.coordinates.lng}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={() => setDirectionsModal(false)}
              >
                <span>Launch in Google Maps</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
