import { DemoScenario } from '../ai/types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'scenario-chest-emergency',
    title: 'Scenario 1: Acute Chest Emergency',
    category: 'Cardiovascular',
    badgeUrgency: 'CRITICAL',
    description: 'Crushing chest pressure radiating to left shoulder, shortness of breath, cold sweat.',
    answers: {
      primaryDescription: 'I am experiencing crushing heavy pressure in the center of my chest that feels like an elephant sitting on it. Started suddenly about 20 minutes ago. I am feeling short of breath, lightheaded, and breaking out in a cold sweat.',
      selectedSymptoms: ['chest_discomfort', 'difficulty_breathing', 'sweating'],
      severity: 'severe',
      onset: 'under_30m',
      conscious: 'yes',
      breathingDifficulty: 'yes',
      severeBleeding: 'no',
      suddenWeaknessOrNumbness: 'no',
      chestPainOrPressure: 'yes',
      additionalNotes: 'Patient has history of hypertension. Cold clammy skin.',
      patientAge: 54
    }
  },
  {
    id: 'scenario-trauma-fall',
    title: 'Scenario 2: Fall & Severe Orthopedic Trauma',
    category: 'Trauma / Injury',
    badgeUrgency: 'HIGH',
    description: 'Fall from ladder with acute lower leg deformity, excruciating pain, and inability to bear weight.',
    answers: {
      primaryDescription: 'Fell off an 8-foot ladder onto concrete patio. Severe excruciating pain in right lower leg, visible angle deformity, swelling, cannot bear any weight or move foot.',
      selectedSymptoms: ['injury', 'sudden_weakness'],
      severity: 'severe',
      onset: 'under_30m',
      conscious: 'yes',
      breathingDifficulty: 'no',
      severeBleeding: 'no',
      suddenWeaknessOrNumbness: 'yes',
      chestPainOrPressure: 'no',
      additionalNotes: 'Right lower extremity deformity, no open wound visible.',
      patientAge: 42
    }
  },
  {
    id: 'scenario-fever-dehydration',
    title: 'Scenario 3: High Persistent Fever & Dehydration',
    category: 'Infection / Internal',
    badgeUrgency: 'MODERATE',
    description: 'Fever of 103°F lasting 36 hours, severe chills, unable to keep fluids down.',
    answers: {
      primaryDescription: 'High fever spiking to 103.2°F for over 36 hours with continuous body chills, severe fatigue, dry mouth, unable to hold down water or fluids for 12 hours.',
      selectedSymptoms: ['fever', 'abdominal_pain'],
      severity: 'moderate',
      onset: 'over_1d',
      conscious: 'yes',
      breathingDifficulty: 'no',
      severeBleeding: 'no',
      suddenWeaknessOrNumbness: 'no',
      chestPainOrPressure: 'no',
      additionalNotes: 'Oral rehydration failing, lightheaded when standing up.',
      patientAge: 29
    }
  },
  {
    id: 'scenario-mild-rash',
    title: 'Scenario 4: Mild Localized Dermatitis',
    category: 'General / Non-Emergency',
    badgeUrgency: 'LOW',
    description: 'Mild itchy skin rash on forearm after gardening, no facial swelling or breathing issues.',
    answers: {
      primaryDescription: 'Noticed an itchy red patch on left forearm after working in garden this morning. Mild itching, no pain, no swelling of lips or face, breathing is completely normal.',
      selectedSymptoms: ['other'],
      severity: 'mild',
      onset: 'over_1h',
      conscious: 'yes',
      breathingDifficulty: 'no',
      severeBleeding: 'no',
      suddenWeaknessOrNumbness: 'no',
      chestPainOrPressure: 'no',
      additionalNotes: 'Took over-the-counter antihistamine 1 hour ago.',
      patientAge: 35
    }
  }
];
