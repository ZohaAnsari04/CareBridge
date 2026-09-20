'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  Heart
} from 'lucide-react';
import { AssessmentAnswers } from '@/lib/ai/types';
import { CareBridgeStorage } from '@/lib/data/store';
import EmergencyAssessmentBackground from '@/components/assessment/EmergencyAssessmentBackground';

const SYMPTOM_OPTIONS = [
  { id: 'chest_discomfort', label: 'Chest discomfort / tightness', redFlag: true },
  { id: 'difficulty_breathing', label: 'Difficulty breathing / gasping', redFlag: true },
  { id: 'loss_of_consciousness', label: 'Loss of consciousness / fainting', redFlag: true },
  { id: 'severe_bleeding', label: 'Severe or uncontrolled bleeding', redFlag: true },
  { id: 'sudden_weakness', label: 'Sudden weakness / facial droop', redFlag: true },
  { id: 'severe_headache', label: 'Sudden severe headache', redFlag: false },
  { id: 'sweating', label: 'Cold sweats / diaphoresis', redFlag: false },
  { id: 'injury', label: 'Physical trauma / fall / injury', redFlag: false },
  { id: 'abdominal_pain', label: 'Severe abdominal pain', redFlag: false },
  { id: 'fever', label: 'High fever / body chills', redFlag: false },
  { id: 'other', label: 'Other symptoms', redFlag: false }
];

export default function AssessmentStartPage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);

  // Form State
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    primaryDescription: '',
    selectedSymptoms: [],
    severity: 'moderate',
    onset: 'under_30m',
    conscious: 'yes',
    breathingDifficulty: 'no',
    severeBleeding: 'no',
    suddenWeaknessOrNumbness: 'no',
    chestPainOrPressure: 'no',
    additionalNotes: '',
    patientAge: 54
  });

  useEffect(() => {
    const existing = CareBridgeStorage.getAnswers();
    if (existing) {
      setAnswers(existing);
    }
  }, []);

  const toggleSymptom = (id: string) => {
    setAnswers(prev => {
      const exists = prev.selectedSymptoms.includes(id);
      const updated = exists 
        ? prev.selectedSymptoms.filter(s => s !== id) 
        : [...prev.selectedSymptoms, id];

      return {
        ...prev,
        selectedSymptoms: updated,
        breathingDifficulty: updated.includes('difficulty_breathing') ? 'yes' : prev.breathingDifficulty,
        chestPainOrPressure: updated.includes('chest_discomfort') ? 'yes' : prev.chestPainOrPressure,
        severeBleeding: updated.includes('severe_bleeding') ? 'yes' : prev.severeBleeding,
        conscious: updated.includes('loss_of_consciousness') ? 'no' : prev.conscious,
        suddenWeaknessOrNumbness: updated.includes('sudden_weakness') ? 'yes' : prev.suddenWeaknessOrNumbness
      };
    });
  };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setAnswers(prev => ({
            ...prev,
            primaryDescription: prev.primaryDescription ? `${prev.primaryDescription} ${transcript}` : transcript
          }));
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('Speech recognition start failed, using simulation.');
      }
    }

    const simulatedPhrase = "Patient has acute crushing pressure in the center of the chest and is having difficulty breathing with cold sweating.";
    setAnswers(prev => ({
      ...prev,
      primaryDescription: prev.primaryDescription ? `${prev.primaryDescription} ${simulatedPhrase}` : simulatedPhrase,
      selectedSymptoms: Array.from(new Set([...prev.selectedSymptoms, 'chest_discomfort', 'difficulty_breathing', 'sweating']))
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    CareBridgeStorage.setAnswers(answers);
    router.push('/assessment/questions');
  };

  const canContinue = answers.primaryDescription.trim().length > 0 || answers.selectedSymptoms.length > 0;

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Emergency Background */}
      <EmergencyAssessmentBackground />

      <div className="container" style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            <Heart size={16} fill="#dc2626" stroke="#dc2626" /> Emergency Triage Intake
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
            Emergency Assessment
          </h1>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Step 1 of 4 • In severe life-threatening distress, call 911 / 112 immediately.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="wizard-progress" role="progressbar" aria-valuenow={1} aria-valuemin={1} aria-valuemax={4}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '25%' }} />
          </div>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`step-node ${s === 1 ? 'active' : ''}`}
            >
              {s}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280', marginTop: '-1.25rem', marginBottom: '2rem', fontWeight: 600 }}>
          <span style={{ color: '#dc2626' }}>1. Symptoms</span>
          <span>2. Severity & Onset</span>
          <span>3. Vitals & Safety</span>
          <span>4. Review</span>
        </div>

        {/* Wizard Card */}
        <div className="card card-elevated" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleContinue}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827' }}>
                What is happening right now?
              </h2>
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`btn btn-sm ${isListening ? 'btn-emergency' : 'btn-secondary'}`}
                title="Speak or insert demo voice phrase"
                aria-label="Voice input assistant"
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} color="#dc2626" />}
                <span>{isListening ? 'Listening...' : 'Voice Assistant'}</span>
              </button>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="primaryDescription">
                Describe what you or the patient are experiencing:
              </label>
              <textarea
                id="primaryDescription"
                className="textarea-field"
                rows={4}
                placeholder="e.g. Sudden intense crushing pressure in the center of the chest, feeling dizzy, and breaking out in a cold sweat about 20 minutes ago..."
                value={answers.primaryDescription}
                onChange={(e) => setAnswers({ ...answers, primaryDescription: e.target.value })}
              />
              <div className="form-subtext">
                You can use everyday words. Our AI engine extracts clinical factors automatically.
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.75rem' }}>
              <label className="form-label">
                Select all symptoms that apply:
              </label>
              <div className="symptom-grid" role="group" aria-label="Symptom choices">
                {SYMPTOM_OPTIONS.map((item) => {
                  const isSelected = answers.selectedSymptoms.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleSymptom(item.id)}
                      className={`chip ${isSelected ? 'selected' : ''}`}
                      aria-pressed={isSelected}
                    >
                      {item.redFlag && <span style={{ color: '#dc2626', fontWeight: 900 }}>•</span>}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '2.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                id="btn-assessment-continue"
                disabled={!canContinue}
                style={{ opacity: canContinue ? 1 : 0.6 }}
              >
                <span>Continue to Follow-up Questions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
