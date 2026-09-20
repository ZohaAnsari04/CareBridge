'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Filter, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import InteractiveHospitalMap from '@/components/hospitals/InteractiveHospitalMap';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';
import { CareBridgeStorage } from '@/lib/data/store';
import { Hospital, TriageResult } from '@/lib/ai/types';

export default function HospitalDiscoveryPage() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState<Hospital[]>(DEMO_HOSPITALS);
  const [selectedHospital, setSelectedHospital] = useState<Hospital>(DEMO_HOSPITALS[0]);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);

  useEffect(() => {
    const savedResult = CareBridgeStorage.getResult();
    if (savedResult) setTriageResult(savedResult);

    const savedHosp = CareBridgeStorage.getSelectedHospital();
    if (savedHosp) setSelectedHospital(savedHosp);
  }, []);

  const handleSelectHospital = (hosp: Hospital) => {
    setSelectedHospital(hosp);
    CareBridgeStorage.setSelectedHospital(hosp);
  };

  const handleProceedWithHospital = (hosp: Hospital) => {
    handleSelectHospital(hosp);
    router.push('/emergency-summary');
  };

  const filteredHospitals = hospitals.filter(h => {
    if (filterType === 'ALL') return true;
    if (filterType === 'TRAUMA') return h.type === 'Trauma Center';
    if (filterType === 'SPECIALTY') return h.type === 'Specialty Emergency';
    if (filterType === 'URGENT') return h.type === 'Urgent Care Center';
    return true;
  });

  return (
    <div style={{ padding: '2.5rem 0 4rem 0', background: '#ffffff' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
              <MapPin size={16} /> Verified Emergency Facility Network
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
              Nearby Emergency Care
            </h1>
            <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Select an emergency department equipped to manage your triage needs. Real-time routing from your location.
            </p>
          </div>

          {/* Prototype dataset badge */}
          <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.5rem 0.85rem', fontSize: '0.8rem', color: '#4b5563' }}>
            <span style={{ fontWeight: 800, color: '#dc2626' }}>PROTOTYPE DATASET:</span> Verified hospital records for demonstration.
          </div>
        </div>

        {/* Triage Urgency Notice (if coming from assessment) */}
        {triageResult && (
          <div style={{ 
            background: triageResult.urgency === 'CRITICAL' ? '#fef2f2' : '#fff7ed', 
            border: `1px solid ${triageResult.urgency === 'CRITICAL' ? '#fecaca' : '#fed7aa'}`, 
            borderRadius: '12px', 
            padding: '0.85rem 1.25rem', 
            marginBottom: '1.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '0.75rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className={`badge-urgency ${triageResult.urgency.toLowerCase()}`}>{triageResult.urgency}</span>
              <span style={{ color: '#111827', fontSize: '0.9rem', fontWeight: 700 }}>
                {triageResult.headline}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 600 }}>
              Prioritize Level I or Level II Emergency Departments
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 800, textTransform: 'uppercase', marginRight: '4px' }}>
            <Filter size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Filter:
          </span>
          {[
            { id: 'ALL', label: 'All Facilities' },
            { id: 'TRAUMA', label: 'Trauma Centers' },
            { id: 'SPECIALTY', label: 'Cardiac / Stroke ER' },
            { id: 'URGENT', label: 'Urgent Care Centers' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`chip ${filterType === f.id ? 'selected' : ''}`}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Map & Hospital List */}
        <div className="hospitals-layout">
          {/* Left / Top: Interactive Map */}
          <div className="map-column">
            <InteractiveHospitalMap
              hospitals={filteredHospitals}
              selectedHospitalId={selectedHospital?.id || null}
              onSelectHospital={handleSelectHospital}
            />
          </div>

          {/* Right / Bottom: Hospital List */}
          <div className="list-column">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '720px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredHospitals.map((hosp) => {
                const isSelected = hosp.id === selectedHospital?.id;
                return (
                  <div
                    key={hosp.id}
                    onClick={() => handleSelectHospital(hosp)}
                    className="card card-hover"
                    style={{
                      borderColor: isSelected ? '#dc2626' : '#e5e7eb',
                      background: '#ffffff',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      borderLeft: isSelected ? '4px solid #dc2626' : undefined
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                            {hosp.name}
                          </h3>
                          {isSelected && (
                            <span style={{ fontSize: '0.7rem', background: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                              SELECTED
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 700, marginTop: '2px' }}>
                          {hosp.traumaLevel || hosp.type}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#111827' }}>
                          {hosp.distanceKm} km
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end', fontWeight: 600 }}>
                          <Clock size={12} /> ~{hosp.travelMinutes} mins
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#4b5563', marginBottom: '0.75rem' }}>
                      {hosp.address}, {hosp.city}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {hosp.specialties.map((spec, i) => (
                        <span 
                          key={i} 
                          style={{ fontSize: '0.72rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2px 7px', borderRadius: '6px', color: '#4b5563', fontWeight: 500 }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                      <div style={{ fontSize: '0.78rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <CheckCircle2 size={14} /> {hosp.openStatus}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          href={`/hospitals/${hosp.id}`} 
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProceedWithHospital(hosp);
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          <span>Target Facility</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hospitals-layout {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 960px) {
          .hospitals-layout {
            grid-template-columns: 1fr;
          }
          .map-column {
            order: 1;
          }
          .list-column {
            order: 2;
          }
        }
      `}</style>
    </div>
  );
}
