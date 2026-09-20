'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { AssessmentAnswers } from '@/lib/ai/types';
import { CareBridgeStorage } from '@/lib/data/store';

export default function AssessmentQuestionsPage() {
  const router = useRouter();
  const [subStep, setSubStep] = useState<number>(2); // 2: Severity & Onset, 3: Vitals & Safety, 4: Review
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State initialized from store or defaults
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    primaryDescription: '',
    selectedSymptoms: [],
    severity: 'severe',
    onset: 'under_30m',
    conscious: 'yes',
    breathingDifficulty: 'yes',
    severeBleeding: 'no',
    suddenWeaknessOrNumbness: 'no',
    chestPainOrPressure: 'yes',
    additionalNotes: '',
    patientAge: 54
  });

  useEffect(() => {
    const existing = CareBridgeStorage.getAnswers();
    if (existing) {
      setAnswers(existing);
    }
  }, []);

  const handleBack = () => {
    CareBridgeStorage.setAnswers(answers);
    if (subStep > 2) {
      setSubStep(subStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/assessment');
    }
  };

  const handleNextSubStep = () => {
    CareBridgeStorage.setAnswers(answers);
    if (subStep < 4) {
      setSubStep(subStep + 1);
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

  const progressPercent = subStep === 2 ? 50 : subStep === 3 ? 75 : 100;

  return (
    <div style={{ padding: '3.5rem 0', minHeight: '80vh', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
            <Heart size={16} fill="#dc2626" stroke="#dc2626" /> Follow-up Triage Questions
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
            Structured Assessment
          </h1>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Step {subStep} of 4 • Precision safety questions to establish triage urgency.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="wizard-progress" role="progressbar" aria-valuenow={subStep} aria-valuemin={1} aria-valuemax={4}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`step-node ${s === subStep ? 'active' : s < subStep ? 'completed' : ''}`}
            >
              {s < subStep ? <CheckCircle2 size={16} /> : s}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#6b7280', marginTop: '-1.25rem', marginBottom: '2rem', fontWeight: 600 }}>
          <span style={{ color: '#16a34a' }}>✓ 1. Symptoms</span>
          <span style={{ color: subStep >= 2 ? '#dc2626' : undefined }}>2. Severity & Onset</span>
          <span style={{ color: subStep >= 3 ? '#dc2626' : undefined }}>3. Vitals & Safety</span>
          <span style={{ color: subStep >= 4 ? '#dc2626' : undefined }}>4. Review</span>
        </div>

        {/* Card Container */}
        <div className="card card-elevated" style={{ padding: '2.5rem' }}>
          {/* SUB-STEP 2: Severity & Onset */}
          {subStep === 2 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem' }}>
                Severity and Timing
              </h2>

              <div className="form-group">
                <label className="form-label">
                  How severe is the main symptom?
                </label>
                <div className="option-grid" role="radiogroup" aria-label="Symptom severity">
                  {[
                    { id: 'mild', label: 'Mild', desc: 'Noticeable but manageable' },
                    { id: 'moderate', label: 'Moderate', desc: 'Disrupting normal activity' },
                    { id: 'severe', label: 'Severe', desc: 'Intense, incapacitating' },
                    { id: 'unbearable', label: 'Unbearable', desc: 'Worst pain of life' }
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.id}
                      onClick={() => setAnswers({ ...answers, severity: lvl.id as any })}
                      className={`option-card ${answers.severity === lvl.id ? 'selected' : ''}`}
                      role="radio"
                      aria-checked={answers.severity === lvl.id}
                    >
                      <div style={{ fontWeight: 800, color: answers.severity === lvl.id ? '#b91c1c' : '#111827' }}>{lvl.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '2rem' }}>
                <label className="form-label">
                  When did the symptoms begin?
                </label>
                <div className="option-grid" role="radiogroup" aria-label="Symptom onset">
                  {[
                    { id: 'just_now', label: 'Just now (< 5m)' },
                    { id: 'under_30m', label: 'Less than 30 min ago' },
                    { id: '30_to_60m', label: '30 to 60 min ago' },
                    { id: 'over_1h', label: 'More than 1 hour ago' },
                    { id: 'over_1d', label: 'More than 1 day ago' }
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setAnswers({ ...answers, onset: t.id as any })}
                      className={`option-card ${answers.onset === t.id ? 'selected' : ''}`}
                      role="radio"
                      aria-checked={answers.onset === t.id}
                    >
                      <div style={{ fontWeight: 700, color: answers.onset === t.id ? '#b91c1c' : '#111827' }}>{t.label}</div>
                    </button>
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

          {/* SUB-STEP 3: Critical Safety Checklist */}
          {subStep === 3 && (
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
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} role="radiogroup">
                  {['yes', 'no', 'unsure'].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setAnswers({ ...answers, conscious: val as any })}
                      className={`option-card ${answers.conscious === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                      role="radio"
                      aria-checked={answers.conscious === val}
                    >
                      {val === 'no' ? '⚠️ No (Unconscious)' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Breathing */}
              <div className="form-group" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
                <label className="form-label">
                  Is the person having serious difficulty breathing?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} role="radiogroup">
                  {['yes', 'no', 'unsure'].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setAnswers({ ...answers, breathingDifficulty: val as any })}
                      className={`option-card ${answers.breathingDifficulty === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                      role="radio"
                      aria-checked={answers.breathingDifficulty === val}
                    >
                      {val === 'yes' ? '⚠️ Yes (Severe struggle)' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severe Bleeding */}
              <div className="form-group" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
                <label className="form-label">
                  Is there severe or uncontrolled bleeding?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} role="radiogroup">
                  {['yes', 'no', 'unsure'].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setAnswers({ ...answers, severeBleeding: val as any })}
                      className={`option-card ${answers.severeBleeding === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                      role="radio"
                      aria-checked={answers.severeBleeding === val}
                    >
                      {val === 'yes' ? '⚠️ Yes (Uncontrolled)' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sudden Weakness or Neurological */}
              <div className="form-group">
                <label className="form-label">
                  Any sudden facial droop, arm weakness, or slurred speech?
                </label>
                <div className="option-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }} role="radiogroup">
                  {['yes', 'no', 'unsure'].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setAnswers({ ...answers, suddenWeaknessOrNumbness: val as any })}
                      className={`option-card ${answers.suddenWeaknessOrNumbness === val ? 'selected' : ''}`}
                      style={{ textTransform: 'capitalize' }}
                      role="radio"
                      aria-checked={answers.suddenWeaknessOrNumbness === val}
                    >
                      {val === 'yes' ? '⚠️ Yes (Focal deficit)' : val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-STEP 4: Review & Final Submission */}
          {subStep === 4 && (
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
                        : 'Custom description only'}
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
            <button 
              type="button"
              onClick={handleBack}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            {subStep < 4 ? (
              <button
                type="button"
                onClick={handleNextSubStep}
                className="btn btn-primary"
                id="btn-questions-next"
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
                id="btn-questions-submit"
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
