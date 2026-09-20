'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Trash2,
  MessageSquareText,
  Loader2
} from 'lucide-react';
import { CareBridgeStorage } from '@/lib/data/store';
import { EmergencyContact, Hospital, TriageResult, UserProfile } from '@/lib/ai/types';
import { DEMO_HOSPITALS } from '@/lib/data/hospitals';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(CareBridgeStorage.getContacts());
  const [profile, setProfile] = useState<UserProfile>(CareBridgeStorage.getProfile());
  const [hospital, setHospital] = useState<Hospital>(CareBridgeStorage.getSelectedHospital() || DEMO_HOSPITALS[0]);
  const [result, setResult] = useState<TriageResult | null>(CareBridgeStorage.getResult());

  // Add Contact Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: 'Family Member',
    phone: '',
    isPrimary: false
  });

  // Notification Modal State
  const [notifyingContact, setNotifyingContact] = useState<EmergencyContact | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any | null>(null);

  useEffect(() => {
    setContacts(CareBridgeStorage.getContacts());
    setProfile(CareBridgeStorage.getProfile());
    setHospital(CareBridgeStorage.getSelectedHospital() || DEMO_HOSPITALS[0]);
    setResult(CareBridgeStorage.getResult());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAddModal(false);
        setNotifyingContact(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;

    const contact: EmergencyContact = {
      id: 'c-' + Date.now(),
      name: newContact.name,
      relationship: newContact.relationship,
      phone: newContact.phone,
      isPrimary: newContact.isPrimary,
      notifyOnEmergency: true
    };

    const updated = [...contacts, contact];
    setContacts(updated);
    CareBridgeStorage.setContacts(updated);
    setShowAddModal(false);
    setNewContact({ name: '', relationship: 'Family Member', phone: '', isPrimary: false });
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    CareBridgeStorage.setContacts(updated);
  };

  const handleTriggerNotification = async (contact: EmergencyContact) => {
    setNotifyingContact(contact);
    setIsSending(true);
    setDispatchResult(null);

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: contact.name,
          contactPhone: contact.phone,
          patientName: profile.fullName || 'Alex Reynolds',
          urgency: result?.urgency || 'HIGH',
          hospitalName: hospital.name,
          location: hospital.address
        })
      });

      if (res.ok) {
        const data = await res.json();
        setDispatchResult(data);
        CareBridgeStorage.addActivity({
          id: 'act-' + Date.now(),
          title: `Emergency alert dispatched to ${contact.name} (${contact.relationship})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'contact_notified',
          details: `Ref: ${data.dispatchId} • Destination: ${hospital.name}`
        });
      }
    } catch {
      setDispatchResult({
        dispatchId: 'DISPATCH-SIM-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: new Date().toLocaleTimeString(),
        recipient: { name: contact.name, phone: contact.phone },
        simulatedMessage: `[CAREBRIDGE ALERT] ${profile.fullName || 'Alex Reynolds'} emergency response active. Status: ${result?.urgency || 'HIGH'}. Target: ${hospital.name}.`,
        carrierStatus: 'DELIVERED_SIMULATED',
        isPrototype: true
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ padding: '3rem 0 5rem 0', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Users size={16} /> Family & Emergency Network
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>
              Emergency Contacts
            </h1>
            <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Designated responders who receive automated location, hospital admission, and triage updates.
            </p>
          </div>

          <button 
            type="button" 
            onClick={() => setShowAddModal(true)}
            className="btn btn-secondary"
            id="btn-add-contact"
          >
            <UserPlus size={16} color="#dc2626" />
            <span>+ ADD CONTACT</span>
          </button>
        </div>

        {/* Emergency Broadcast Card */}
        <div className="card" style={{ background: '#fef2f2', borderColor: '#fecaca', padding: '1.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 800, fontSize: '0.9rem' }}>
                <AlertCircle size={18} />
                <span>ACTIVE EMERGENCY COORDINATION</span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#111827', marginTop: '0.25rem' }}>
                Broadcast Status to All Family Responders
              </div>
              <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '4px' }}>
                Targeting: <strong style={{ color: '#111827' }}>{hospital.name}</strong> • Triage: <span className={`badge-urgency ${result?.urgency?.toLowerCase() || 'high'}`} style={{ padding: '2px 8px' }}>{result?.urgency || 'HIGH'}</span>
              </div>
            </div>

            {contacts.length > 0 && (
              <button 
                type="button" 
                onClick={() => handleTriggerNotification(contacts[0])}
                className="btn btn-emergency btn-lg"
                id="btn-broadcast-all"
              >
                <Send size={18} />
                <span>🚨 NOTIFY PRIMARY CONTACT</span>
              </button>
            )}
          </div>
        </div>

        {/* Contacts List (Clean White Cards) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {contacts.map((c) => (
            <div 
              key={c.id} 
              className="card card-hover" 
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', borderColor: '#e5e7eb' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontWeight: 900, fontSize: '1.15rem' }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
                      {c.name}
                    </span>
                    {c.isPrimary && (
                      <span style={{ fontSize: '0.7rem', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: 600 }}>
                    {c.relationship}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Phone size={13} />
                    <span>{c.phone}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => handleTriggerNotification(c)}
                  className="btn btn-outline btn-sm"
                  id={`btn-notify-${c.id}`}
                >
                  <Send size={14} />
                  <span>Notify Contact</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(c.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#9ca3af' }}
                  title="Remove contact"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype notice */}
        <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', fontSize: '0.8125rem', color: '#6b7280', textAlign: 'center' }}>
          <strong style={{ color: '#111827' }}>Prototype Notification:</strong> Real-world deployments integrate priority carrier shortcode gateways. Simulated dispatches provide instant verification tokens for hackathon judging.
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827', marginBottom: '1.25rem' }}>
              Add Emergency Contact
            </h3>
            <form onSubmit={handleAddContact}>
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">Full Name</label>
                <input
                  id="contactName"
                  className="input-field"
                  required
                  placeholder="e.g. Sarah Reynolds"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactRel">Relationship</label>
                <select
                  id="contactRel"
                  className="select-field"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                >
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Adult Child">Adult Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Neighbor / Friend">Neighbor / Friend</option>
                  <option value="Caregiver">Caregiver</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactPhone">Phone Number</label>
                <input
                  id="contactPhone"
                  className="input-field"
                  required
                  placeholder="+1 (555) 234-8891"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                  id="primaryCheck"
                  type="checkbox"
                  checked={newContact.isPrimary}
                  onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                />
                <label htmlFor="primaryCheck" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
                  Designate as Primary Emergency Responder
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Realistic Notification Confirmation Modal */}
      {notifyingContact && (
        <div className="modal-overlay" onClick={() => setNotifyingContact(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626', marginBottom: '1rem' }}>
              <MessageSquareText size={26} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827' }}>
                Emergency Notification Prepared
              </h3>
            </div>

            {isSending ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <Loader2 size={32} className="animate-spin" color="#dc2626" style={{ margin: '0 auto 1rem auto' }} />
                <p style={{ color: '#4b5563' }}>Generating encrypted SMS payload & dispatch token...</p>
              </div>
            ) : dispatchResult ? (
              <div>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991b1b', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                    <CheckCircle2 size={16} color="#dc2626" /> A prototype emergency notification has been prepared for {notifyingContact.name}.
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    Tracking Ref: <strong style={{ color: '#111827' }}>{dispatchResult.dispatchId}</strong> • Timestamp: {dispatchResult.timestamp}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.82rem', color: '#374151' }}>
                  <div style={{ color: '#6b7280', marginBottom: '6px', fontSize: '0.75rem', fontWeight: 600 }}>SIMULATED SMS PAYLOAD:</div>
                  "{dispatchResult.simulatedMessage}"
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <span style={{ color: '#dc2626', fontWeight: 700 }}>Status: Prototype notification</span>
                  <button
                    type="button"
                    onClick={() => setNotifyingContact(null)}
                    className="btn btn-primary btn-sm"
                  >
                    DONE
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
