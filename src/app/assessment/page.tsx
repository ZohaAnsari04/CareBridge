'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  Mic, 
  MicOff, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { AssessmentAnswers } from '@/lib/ai/types';
import { CareBridgeStorage } from '@/lib/data/store';

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

export default function AssessmentWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    CareBridgeStorage.setAnswers(answers);

    try {
      const res = await fetch('/api/assessment/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      });

      if (res.ok) {
        const data = await res.json();
        CareBridgeStorage.setResult(data.triageResult);
      } else {
        throw new Error('API request failed');
      }
    } catch {
      const { evaluateTriage } = await import('@/lib/ai/triage');
      const fallbackResult = evaluateTriage(answers, null);
      CareBridgeStorage.setResult(fallbackResult);
    } finally {
      setIsSubmitting(false);
      router.push('/assessment/result');
    }
  };

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            <Heart size={16} fill="#dc2626" stroke="#dc2626" /> Emergency Triage Intake
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
            Emergency Assessment
          </h1>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Step {step} of 4 • In severe life-threatening distress, call 911 / 112 immediately.
          </p>
        </div>

        {/* Progress Bar (Red Progress Fill) */}
        <div className="wizard-progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
          </div>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`step-node ${s === step ? 'active' : s < step ? 'completed' : ''}`}
            >
              {s < step ? <CheckCircle2 size={16} /> : s}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280', marginTop: '-1.25rem', marginBottom: '2rem', fontWeight: 600 }}>
          <span>1. Symptoms</span>
          <span>2. Severity & Onset</span>
          <span>3. Vitals & Safety</span>
          <span>4. Review</span>
        </div>

        {/* Wizard Card Container */}
        <div className="card card-elevated" style={{ padding: '2.5rem' }}>
          {/* STEP 1: What is happening? */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827' }}>
                  What is happening right now?
                </h2>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`btn btn-sm ${isListening ? 'btn-emergency' : 'btn-secondary'}`}
                  title="Speak or insert demo voice phrase"
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
                  placeholder="e.g. Sudden intense crushing pressure in the center of the chest, feeling dizzy, and breaking out in a sweat about 20 minutes ago..."
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
                <div className="symptom-grid">
                  {SYMPTOM_OPTIONS.map((item) => {
                    const isSelected = answers.selectedSymptoms.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleSymptom(item.id)}
                        className={`chip ${isSelected ? 'selected' : ''}`}
                      >
                        {item.redFlag && <span style={{ color: '#dc2626', fontWeight: 900 }}>•</span>}
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Severity & Onset */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem' }}>
                Severity and Timing
              </h2>

              <div className="form-group">
                <label className="form-label">
                  How severe is the main symptom?
                </label>
                <div className="option-grid">
                  {[
                    { id: 'mild', label: 'Mild', desc: 'Noticeable but manageable' },
                    { id: 'moderate', label: 'Moderate', desc: 'Disrupting normal activity' },
                    { id: 'severe', label: 'Severe', desc: 'Intense, incapacitating' },
                    { id: 'unbearable', label: 'Unbearable', desc: 'Worst pain of life' }
                  ].map((lvl) => (
                    <div
                      key={lvl.id}
                      onClick={() => setAnswers({ ...answers, severity: lvl.id as any })}
                      className={`option-card ${answers.severity === lvl.id ? 'selected' : ''}`}
                    >
                      <div style={{ fontWeight: 800, color: answers.severity === lvl.id ? '#b91c1c' : '#111827' }}>{lvl.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{lvl.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '2rem' }}>
                <label className="form-label">
                  When did the symptoms begin?
                </label>
                <div className="option-grid">
                  {[
                    { id: 'just_now', label: 'Just now (< 5m)' },
                    { id: 'under_30m', label: 'Less than 30 min ago' },
                    { id: '30_to_60m', label: '30 to 60 min ago' },
                    { id: 'over_1h', label: 'More than 1 hour ago' },
                    { id: 'over_1d', label: 'More than 1 day ago' }
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setAnswers({ ...answers, onset: t.id as any })}
                      className={`option-card ${answers.onset === t.id ? 'selected' : ''}`}
                    >
                      <div style={{ fontWeight: 700, color: answers.onset === t.id ? '#b91c1c' : '#111827' }}>{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label className="form-label" htmlFor="patientAge">
                  Approximate Patient Age:
                </label>
                <input
                  id="patientAge"
                  type="number"
                  className="input-field"
                  style={{ maxWidth: '200px' }}
                  value={answers.patientAge || 54}
                  onChange={(e) => setAnswers({ ...answers, patientAge: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Critical Safety Checklist */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: '#dc2626' }}>
                <AlertTriangle size={22} />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827' }}>
                  Critical Safety Checklist
                </h2>
              </div>

              {/* Consciousness */}
              <div className="form-group" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
                <label className="form-label">
                  Is the person currently conscious and alert?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {['yes', 'no', 'unsure'].map((val) => (
                    <div
                      key={val}
                      onClick={() => setAnswers({ ...answers, conscious: val as any })}
                      className={`option-card ${answers.conscious === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {val === 'no' ? '⚠️ No (Unconscious)' : val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Breathing */}
              <div className="form-group" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
                <label className="form-label">
                  Is the person having serious difficulty breathing?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {['yes', 'no', 'unsure'].map((val) => (
                    <div
                      key={val}
                      onClick={() => setAnswers({ ...answers, breathingDifficulty: val as any })}
                      className={`option-card ${answers.breathingDifficulty === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {val === 'yes' ? '⚠️ Yes (Severe struggle)' : val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Severe Bleeding */}
              <div className="form-group" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
                <label className="form-label">
                  Is there severe or uncontrolled bleeding?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {['yes', 'no', 'unsure'].map((val) => (
                    <div
                      key={val}
                      onClick={() => setAnswers({ ...answers, severeBleeding: val as any })}
                      className={`option-card ${answers.severeBleeding === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {val === 'yes' ? '⚠️ Yes (Uncontrolled)' : val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sudden Weakness or Neurological */}
              <div className="form-group">
                <label className="form-label">
                  Any sudden facial droop, arm weakness, or slurred speech?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {['yes', 'no', 'unsure'].map((val) => (
                    <div
                      key={val}
                      onClick={() => setAnswers({ ...answers, suddenWeaknessOrNumbness: val as any })}
                      className={`option-card ${answers.suddenWeaknessOrNumbness === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {val === 'yes' ? '⚠️ Yes (Focal deficit)' : val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>
                Review Reported Information
              </h2>

              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Reported Symptoms:</span>
                    <div style={{ color: '#111827', fontWeight: 700, marginTop: '2px' }}>
                      {answers.selectedSymptoms.length > 0 
                        ? answers.selectedSymptoms.map(s => s.replace(/_/g, ' ')).join(', ') 
                        : 'Free description only'}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Severity & Onset:</span>
                    <div style={{ color: '#111827', fontWeight: 700, marginTop: '2px' }}>
                      {answers.severity.toUpperCase()} • {answers.onset.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Consciousness:</span>
                    <div style={{ color: answers.conscious === 'no' ? '#dc2626' : '#111827', fontWeight: 700, marginTop: '2px' }}>
                      {answers.conscious === 'no' ? '⚠️ Unconscious' : 'Conscious'}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Breathing Difficulty:</span>
                    <div style={{ color: answers.breathingDifficulty === 'yes' ? '#dc2626' : '#111827', fontWeight: 700, marginTop: '2px' }}>
                      {answers.breathingDifficulty === 'yes' ? '⚠️ Severe struggle' : 'Normal'}
                    </div>
                  </div>
                </div>

                {answers.primaryDescription && (
                  <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Natural Language Description:</span>
                    <p style={{ color: '#374151', fontStyle: 'italic', marginTop: '2px' }}>
                      "{answers.primaryDescription}"
                    </p>
                  </div>
                )}
              </div>

              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} color="#dc2626" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.8125rem', color: '#b91c1c', fontWeight: 500 }}>
                  CareBridge deterministic safety protocol will classify urgency, isolate emergency indicators, and locate emergency facilities.
                </div>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            {step > 1 ? (
              <button 
                type="button"
                onClick={handleBack}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
                id="btn-assessment-next"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-emergency btn-lg"
                disabled={isSubmitting}
                id="btn-assessment-analyze"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Analyzing Safety Triage...</span>
                  </>
                ) : (
                  <>
                    <Heart size={18} fill="#ffffff" stroke="#ffffff" />
                    <span>Generate Emergency Assessment</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
