'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2, Play } from 'lucide-react';
import { DEMO_SCENARIOS } from '@/lib/data/demoScenarios';
import { CareBridgeStorage } from '@/lib/data/store';
import { evaluateTriage } from '@/lib/ai/triage';

export default function DemoScenarioBar() {
  const router = useRouter();
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const handleSelectScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenarioId(scenarioId);

    // Save answers
    CareBridgeStorage.setAnswers(scenario.answers);

    // Evaluate triage
    const triage = evaluateTriage(scenario.answers, {
      extractedSymptoms: scenario.answers.selectedSymptoms,
      severity: scenario.answers.severity,
      onset: scenario.answers.onset,
      criticalIndicators: scenario.answers.chestPainOrPressure === 'yes' ? ['Crushing central chest pressure', 'Cold diaphoresis'] : [],
      missingInformation: [],
      confidence: 'high',
      summarySentence: scenario.answers.primaryDescription.slice(0, 100)
    });

    CareBridgeStorage.setResult(triage);

    setTimeout(() => {
      router.push('/assessment/result');
    }, 200);
  };

  return (
    <div className="demo-bar">
      <div className="demo-bar-title">
        <Sparkles size={15} style={{ color: '#dc2626' }} />
        <span>JUDGE DEMO MODE:</span>
        <span style={{ fontWeight: 400, color: '#6b7280', fontSize: '0.78rem' }}>1-Click Presets</span>
      </div>

      <div className="demo-presets">
        {DEMO_SCENARIOS.map((s) => {
          const isActive = activeScenarioId === s.id;
          const isCritical = s.badgeUrgency === 'CRITICAL';
          const isHigh = s.badgeUrgency === 'HIGH';

          return (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(s.id)}
              className={`btn-demo-preset ${isActive ? 'active' : ''}`}
              title={s.description}
            >
              {isActive ? <CheckCircle2 size={13} style={{ marginRight: '4px' }} /> : <Play size={11} style={{ marginRight: '4px' }} />}
              <span>{s.title.split(':')[1] || s.title}</span>
              <span style={{ 
                marginLeft: '6px', 
                fontSize: '0.7rem', 
                padding: '1px 5px', 
                borderRadius: '4px',
                fontWeight: 700,
                background: isActive ? 'rgba(255,255,255,0.25)' : isCritical ? '#fee2e2' : isHigh ? '#ffedd5' : '#f1f5f9',
                color: isActive ? '#ffffff' : isCritical ? '#b91c1c' : isHigh ? '#c2410c' : '#475569'
              }}>
                {s.badgeUrgency}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
