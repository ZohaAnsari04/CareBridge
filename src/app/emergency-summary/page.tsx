'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  QrCode, 
  Building2, 
  Users, 
  Heart
} from 'lucide-react';
import { CareBridgeStorage } from '@/lib/data/store';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';
import { EmergencySummary, Hospital, UserProfile } from '@/lib/ai/types';

export default function EmergencySummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<EmergencySummary | null>(null);
  const [hospital, setHospital] = useState<Hospital>(DEMO_HOSPITALS[0]);
  const [profile, setProfile] = useState<UserProfile>(CareBridgeStorage.getProfile());
  const [shareSuccessModal, setShareSuccessModal] = useState<string | null>(null);

  useEffect(() => {
    const savedProfile = CareBridgeStorage.getProfile();
    setProfile(savedProfile);

    const savedHosp = CareBridgeStorage.getSelectedHospital() || DEMO_HOSPITALS[0];
    setHospital(savedHosp);

    const savedAnswers = CareBridgeStorage.getAnswers();
    const savedResult = CareBridgeStorage.getResult();

    const symptomsList = savedAnswers?.selectedSymptoms?.length 
      ? savedAnswers.selectedSymptoms.map(s => s.replace(/_/g, ' '))
      : ['Severe chest discomfort', 'Shortness of breath', 'Cold diaphoresis'];

    const newSummary: EmergencySummary = {
      id: 'CB-EMR-' + Math.floor(100000 + Math.random() * 900000),
      patientName: savedProfile.fullName || 'Alex Reynolds',
      patientAge: savedAnswers?.patientAge || savedProfile.age || 54,
      bloodGroup: savedProfile.bloodGroup || 'O+',
      allergies: savedProfile.allergies || ['Penicillin', 'Sulfa drugs'],
      medications: savedProfile.medications || ['Lisinopril 10mg daily', 'Atorvastatin 20mg'],
      existingConditions: savedProfile.conditions || ['Hypertension', 'Mild Asthma'],
      primaryConcern: savedAnswers?.primaryDescription || 'Acute crushing central chest pressure with radiation and shortness of breath.',
      reportedSymptoms: symptomsList,
      onset: savedAnswers?.onset ? savedAnswers.onset.replace(/_/g, ' ') : 'Approximately 20 minutes ago',
      severity: savedAnswers?.severity ? savedAnswers.severity.toUpperCase() : 'SEVERE',
      urgency: savedResult?.urgency || 'HIGH',
      keyIndicators: savedResult?.keyIndicators || [
        'Acute crushing chest pressure',
        'Dyspnea on exertion / rest',
        'Sudden onset under 30 minutes'
      ],
      additionalNotes: savedAnswers?.additionalNotes || 'Patient is conscious and coherent, skin is pale and clammy.',
      selectedHospital: savedHosp,
      generatedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verifiedByAi: true
    };

    setSummary(newSummary);
    CareBridgeStorage.setSummary(newSummary);
  }, []);

  const handleShareWithHospital = () => {
    setShareSuccessModal('hospital');
    CareBridgeStorage.addActivity({
      id: 'act-' + Date.now(),
      title: `Summary transmitted to ${hospital.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'summary_generated',
      details: `Targeted ER Intake: ${hospital.name} (Ref: ${summary?.id})`
    });
  };

  const handleShareWithFamily = () => {
    router.push('/contacts');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!summary) {
    return <div style={{ padding: '5rem 0', textAlign: 'center', background: '#ffffff' }}>Generating Clinical Summary...</div>;
  }

  return (
    <div style={{ padding: '3rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        {/* Actions Bar on Top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <FileText size={16} /> Clinical Handover Document
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>
              Emergency Patient Summary
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              title="Print clinical handover sheet"
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
            <button 
              type="button" 
              onClick={handleShareWithHospital}
              className="btn btn-secondary btn-sm"
              id="btn-share-hospital"
            >
              <Building2 size={15} color="#dc2626" />
              <span>Share with Hospital ER</span>
            </button>
            <button 
              type="button" 
              onClick={handleShareWithFamily}
              className="btn btn-emergency btn-sm"
              id="btn-share-family"
            >
              <Users size={15} />
              <span>Notify Emergency Contacts</span>
            </button>
          </div>
        </div>

        {/* MEDICAL SUMMARY SHEET (Paper Clinical Aesthetic with Red Top Line) */}
        <div className="medical-summary-sheet" id="printable-summary">
          {/* Header */}
          <div className="summary-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', marginBottom: '0.25rem' }}>
                <Heart size={20} fill="#dc2626" stroke="#dc2626" />
                <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.04em', color: '#111827' }}>CAREBRIDGE</span>
              </div>
              <div className="summary-title">EMERGENCY SUMMARY</div>
              <div className="summary-subtitle">Document ID: {summary.id} • Clinical Triage Protocol</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                display: 'inline-block',
                padding: '0.35rem 0.85rem', 
                borderRadius: '8px', 
                fontWeight: 900, 
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                background: summary.urgency === 'CRITICAL' || summary.urgency === 'HIGH' ? '#fef2f2' : '#f0fdf4',
                color: summary.urgency === 'CRITICAL' || summary.urgency === 'HIGH' ? '#b91c1c' : '#166534',
                border: `1px solid ${summary.urgency === 'CRITICAL' || summary.urgency === 'HIGH' ? '#fecaca' : '#bbf7d0'}`
              }}>
                🔴 {summary.urgency}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px', fontWeight: 500 }}>
                Generated: {summary.generatedAt}
              </div>
            </div>
          </div>

          {/* Section 1: Patient Demographics & Baseline */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
              1. Patient Demographics & Critical Medical History
            </div>

            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Patient Name</div>
                <div className="summary-value">{summary.patientName}</div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Age & Blood Group</div>
                <div className="summary-value">{summary.patientAge} Years Old • <span style={{ color: '#dc2626' }}>Blood Group: {summary.bloodGroup}</span></div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Known Drug Allergies</div>
                <div className="summary-value" style={{ color: '#b91c1c' }}>
                  {summary.allergies.join(', ') || 'No known drug allergies reported'}
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Current Medications</div>
                <div className="summary-value">
                  {summary.medications.join(', ') || 'None reported'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Chief Complaint & Symptoms */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
              2. Emergency Incident & Reported Symptoms
            </div>

            <div className="summary-grid">
              <div className="summary-item" style={{ gridColumn: 'span 2' }}>
                <div className="summary-label">Primary Concern (Patient / Bystander Statement)</div>
                <div className="summary-value" style={{ fontStyle: 'italic', color: '#111827' }}>
                  "{summary.primaryConcern}"
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Reported Symptoms</div>
                <div className="summary-value">
                  <ul style={{ paddingLeft: '1.2rem', margin: '4px 0' }}>
                    {summary.reportedSymptoms.map((sym, i) => (
                      <li key={i} style={{ textTransform: 'capitalize' }}>• {sym}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Onset & Reported Severity</div>
                <div className="summary-value">
                  <div>Onset: <strong>{summary.onset}</strong></div>
                  <div>Severity: <strong style={{ color: '#b91c1c' }}>{summary.severity}</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Safety Triage Indicators & Destination Facility */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
              3. Triage Safety Indicators & Receiving Facility
            </div>

            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Emergency Flags Detected</div>
                <div className="summary-value">
                  {summary.keyIndicators.map((flag, idx) => (
                    <div key={idx} style={{ color: '#991b1b', fontSize: '0.88rem', fontWeight: 700 }}>
                      • {flag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="summary-item">
                <div className="summary-label">Target Emergency Facility</div>
                <div className="summary-value">
                  <div style={{ fontWeight: 800, color: '#111827' }}>{hospital.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>{hospital.address}</div>
                  <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 700 }}>
                    {hospital.distanceKm} km • {hospital.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code & Paramedic Scanner Bar */}
          <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '68px', height: '68px', background: '#111827', borderRadius: '10px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={54} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111827' }}>
                  PARAMEDIC & ER INTAKE SCANNER
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6b7280', maxWidth: '360px', marginTop: '2px' }}>
                  Scan to import structured JSON handover payload into hospital triage queue (HL7 / FHIR simulated compatibility).
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={16} /> Encrypted Digital Handover
            </div>
          </div>

          {/* Mandatory Clinical Disclaimer */}
          <div className="summary-disclaimer">
            <strong>IMPORTANT:</strong> This summary is generated from user-provided information and is not a medical diagnosis. CareBridge provides AI-assisted emergency guidance and does not replace professional medical advice or emergency services.
          </div>
        </div>
      </div>

      {/* Share Confirmation Modal */}
      {shareSuccessModal && (
        <div className="modal-overlay" onClick={() => setShareSuccessModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#16a34a', marginBottom: '1rem' }}>
              <CheckCircle2 size={28} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827' }}>
                Emergency Summary Transmitted
              </h3>
            </div>

            <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Handover record <strong>{summary.id}</strong> has been prepared and queued for the emergency intake triage desk at <strong>{hospital.name}</strong>.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#374151' }}>
              <div style={{ fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
                Intake Preparation Payload:
              </div>
              <div>• Patient: {summary.patientName} (Age: {summary.patientAge}, Blood: {summary.bloodGroup})</div>
              <div>• Triage Urgency: {summary.urgency}</div>
              <div>• Key Red Flags: {summary.keyIndicators.join(', ')}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShareSuccessModal(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShareSuccessModal(null);
                  router.push('/contacts');
                }}
                className="btn btn-primary"
              >
                <span>Notify Emergency Contacts</span>
                <Users size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
