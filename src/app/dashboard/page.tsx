'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  AlertCircle, 
  MapPin, 
  User, 
  Users, 
  FileText, 
  Clock, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { CareBridgeStorage, calculateProfileCompleteness, ActivityItem } from '@/lib/data/store';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';
import { Hospital, TriageResult, UserProfile } from '@/lib/ai/types';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile>(CareBridgeStorage.getProfile());
  const [completeness, setCompleteness] = useState(85);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [hospital, setHospital] = useState<Hospital>(CareBridgeStorage.getSelectedHospital() || DEMO_HOSPITALS[0]);
  const [result, setResult] = useState<TriageResult | null>(null);

  useEffect(() => {
    const loadedProfile = CareBridgeStorage.getProfile();
    setProfile(loadedProfile);
    setCompleteness(calculateProfileCompleteness(loadedProfile));
    setActivities(CareBridgeStorage.getActivities());
    setHospital(CareBridgeStorage.getSelectedHospital() || DEMO_HOSPITALS[0]);
    setResult(CareBridgeStorage.getResult());
  }, []);

  return (
    <div style={{ padding: '3rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Heart size={16} fill="#dc2626" stroke="#dc2626" /> Emergency Readiness Console
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>
              Good to have you prepared.
            </h1>
            <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Real-time emergency readiness, rapid coordination launchpads, and activity logs.
            </p>
          </div>

          <Link href="/assessment" className="btn btn-emergency btn-lg" id="dash-start-assessment">
            <AlertCircle size={18} />
            <span>🚨 START EMERGENCY ASSESSMENT</span>
          </Link>
        </div>

        {/* Top 3 Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {/* Readiness Card */}
          <div className="card" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Emergency Readiness
              </span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#dc2626' }}>{completeness}%</span>
            </div>
            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div style={{ height: '100%', width: `${completeness}%`, background: '#dc2626', borderRadius: '9999px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#4b5563' }}>
              <span>{profile.fullName} (Blood: {profile.bloodGroup})</span>
              <Link href="/emergency-profile" style={{ color: '#dc2626', fontWeight: 700 }}>Edit Profile →</Link>
            </div>
          </div>

          {/* Targeted Facility */}
          <div className="card" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Preferred Emergency Facility
              </span>
              <MapPin size={16} color="#16a34a" />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '0.2rem' }}>
              {hospital.name}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#4b5563', marginBottom: '0.5rem' }}>
              {hospital.distanceKm} km away • {hospital.traumaLevel || '24/7 ER'}
            </div>
            <Link href="/hospitals" style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 700 }}>
              Browse all 8 nearby facilities →
            </Link>
          </div>

          {/* Active Coordination Status */}
          <div className="card" style={{ background: '#ffffff', borderColor: '#e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Designated Responders
              </span>
              <Users size={16} color="#d97706" />
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '0.2rem' }}>
              {profile.contacts.length} Trusted Contacts Linked
            </div>
            <div style={{ fontSize: '0.82rem', color: '#4b5563', marginBottom: '0.5rem' }}>
              Primary: {profile.contacts[0]?.name || 'Sarah Reynolds'} ({profile.contacts[0]?.relationship || 'Spouse'})
            </div>
            <Link href="/contacts" style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 700 }}>
              Manage contacts & notify →
            </Link>
          </div>
        </div>

        {/* Quick Actions Grid (Section 19: Emergency Assessment card tinted red, others white) */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827', marginBottom: '1rem' }}>
            Emergency Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <Link 
              href="/assessment" 
              className="card card-hover" 
              style={{ 
                background: '#fef2f2', 
                borderColor: '#fecaca', 
                borderLeft: '4px solid #dc2626', 
                padding: '1.25rem' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b91c1c', fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>
                <AlertCircle size={18} />
                <span>🚨 Emergency Assessment</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4b5563' }}>
                Start an assessment for acute clinical symptoms & red flags.
              </div>
            </Link>

            <Link href="/hospitals" className="card card-hover" style={{ borderLeft: '4px solid #16a34a', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>
                <MapPin size={18} />
                <span>🏥 Find Care</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4b5563' }}>
                Locate verified emergency facilities with Level I/II trauma.
              </div>
            </Link>

            <Link href="/emergency-summary" className="card card-hover" style={{ borderLeft: '4px solid #111827', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111827', fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>
                <FileText size={18} />
                <span>📋 Emergency Summary</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4b5563' }}>
                View recent clinical handover summaries & QR codes.
              </div>
            </Link>

            <Link href="/emergency-profile" className="card card-hover" style={{ borderLeft: '4px solid #dc2626', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>
                <User size={18} />
                <span>👤 Emergency Profile</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4b5563' }}>
                Manage important medical factors, allergies & blood group.
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="card" style={{ padding: '1.75rem', background: '#ffffff', borderColor: '#e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827' }}>
              Recent Activity & Emergency Timeline
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Synced with local browser session</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activities.map((act) => (
              <div 
                key={act.id}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}
              >
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', flexShrink: 0, marginTop: '2px' }}>
                  <Clock size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>
                      {act.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{act.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#4b5563', marginTop: '2px' }}>
                    {act.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
