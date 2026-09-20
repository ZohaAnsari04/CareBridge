'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Heart, 
  Save, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { CareBridgeStorage, calculateProfileCompleteness } from '@/lib/data/store';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';
import { UserProfile } from '@/lib/ai/types';

export default function EmergencyProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(CareBridgeStorage.getProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [completeness, setCompleteness] = useState(85);

  const [allergiesText, setAllergiesText] = useState(profile.allergies.join(', '));
  const [medicationsText, setMedicationsText] = useState(profile.medications.join(', '));
  const [conditionsText, setConditionsText] = useState(profile.conditions.join(', '));

  useEffect(() => {
    const loaded = CareBridgeStorage.getProfile();
    setProfile(loaded);
    setAllergiesText(loaded.allergies.join(', '));
    setMedicationsText(loaded.medications.join(', '));
    setConditionsText(loaded.conditions.join(', '));
    setCompleteness(calculateProfileCompleteness(loaded));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: UserProfile = {
      ...profile,
      allergies: allergiesText.split(',').map(s => s.trim()).filter(Boolean),
      medications: medicationsText.split(',').map(s => s.trim()).filter(Boolean),
      conditions: conditionsText.split(',').map(s => s.trim()).filter(Boolean)
    };

    setProfile(updatedProfile);
    CareBridgeStorage.setProfile(updatedProfile);
    setCompleteness(calculateProfileCompleteness(updatedProfile));
    setSavedSuccess(true);

    CareBridgeStorage.addActivity({
      id: 'act-' + Date.now(),
      title: 'Emergency Medical Profile updated',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'assessment',
      details: `Readiness score: ${calculateProfileCompleteness(updatedProfile)}%`
    });

    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ padding: '3rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <User size={16} /> Pre-Hospital Readiness ID
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>
              Emergency Medical Profile
            </h1>
            <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Essential baseline medical factors used by emergency doctors during acute distress or unconsciousness.
            </p>
          </div>

          <Link href="/assessment" className="btn btn-emergency btn-sm">
            <span>🚨 Start Assessment</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Profile Completeness Card */}
        <div className="card" style={{ background: '#ffffff', borderColor: '#e5e7eb', padding: '1.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Emergency Readiness
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827', marginTop: '2px' }}>
                Complete Your Emergency Profile
              </h3>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#dc2626' }}>
              {completeness}%
            </div>
          </div>

          {/* Red Progress Bar */}
          <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${completeness}%`, 
                background: '#dc2626',
                borderRadius: '9999px',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>

          <div style={{ fontSize: '0.8125rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontWeight: 500 }}>
            <span>Blood Group, Allergies & Current Prescriptions loaded.</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>Triage Handover Enabled</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="card card-elevated" style={{ padding: '2.25rem' }}>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Legal Name</label>
                <input
                  id="fullName"
                  className="input-field"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="age">Age</label>
                <input
                  id="age"
                  type="number"
                  className="input-field"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  className="select-field"
                  value={profile.bloodGroup}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="preferredHosp">Preferred Hospital</label>
                <select
                  id="preferredHosp"
                  className="select-field"
                  value={profile.preferredHospitalId}
                  onChange={(e) => setProfile({ ...profile, preferredHospitalId: e.target.value })}
                >
                  {DEMO_HOSPITALS.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Drug Allergies */}
            <div className="form-group" style={{ marginTop: '0.75rem' }}>
              <label className="form-label" htmlFor="allergies">
                Known Drug / Environmental Allergies (comma-separated)
              </label>
              <input
                id="allergies"
                className="input-field"
                placeholder="e.g. Penicillin, Sulfa drugs, Latex"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
              />
              <div className="form-subtext">Paramedics check this first before administering emergency IV medications.</div>
            </div>

            {/* Current Medications */}
            <div className="form-group">
              <label className="form-label" htmlFor="medications">
                Current Medications & Dosages (comma-separated)
              </label>
              <input
                id="medications"
                className="input-field"
                placeholder="e.g. Lisinopril 10mg, Metformin 500mg, Blood thinners"
                value={medicationsText}
                onChange={(e) => setMedicationsText(e.target.value)}
              />
            </div>

            {/* Pre-existing conditions */}
            <div className="form-group">
              <label className="form-label" htmlFor="conditions">
                Chronic Health Conditions (comma-separated)
              </label>
              <input
                id="conditions"
                className="input-field"
                placeholder="e.g. Hypertension, Type 2 Diabetes, Coronary Artery Disease"
                value={conditionsText}
                onChange={(e) => setConditionsText(e.target.value)}
              />
            </div>

            {/* Emergency Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="emergencyNotes">
                Bystander / Paramedic Special Notes
              </label>
              <textarea
                id="emergencyNotes"
                className="textarea-field"
                rows={2}
                placeholder="e.g. Pacemaker implanted in 2023, carries rescue inhaler in backpack, hearing aid on left ear."
                value={profile.emergencyNotes}
                onChange={(e) => setProfile({ ...profile, emergencyNotes: e.target.value })}
              />
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem' }}>
              {savedSuccess ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 700, fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} />
                  <span>Profile saved & synced</span>
                </div>
              ) : (
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                  Changes automatically reflect on generated summaries.
                </div>
              )}

              <button type="submit" className="btn btn-primary" id="btn-save-profile">
                <Save size={16} />
                <span>Save Emergency Profile</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
