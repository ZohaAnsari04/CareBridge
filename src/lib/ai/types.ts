export type TriageUrgency = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export interface SymptomItem {
  id: string;
  name: string;
  category: 'cardio' | 'respiratory' | 'neurological' | 'trauma' | 'general' | 'other';
  isRedFlag?: boolean;
}

export interface AssessmentAnswers {
  primaryDescription: string;
  selectedSymptoms: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'unbearable';
  onset: 'just_now' | 'under_30m' | '30_to_60m' | 'over_1h' | 'over_1d';
  conscious: 'yes' | 'no' | 'unsure';
  breathingDifficulty: 'yes' | 'no' | 'unsure';
  severeBleeding: 'yes' | 'no' | 'unsure';
  suddenWeaknessOrNumbness: 'yes' | 'no' | 'unsure';
  chestPainOrPressure: 'yes' | 'no' | 'unsure';
  additionalNotes?: string;
  patientAge?: number;
}

export interface StructuredExtraction {
  extractedSymptoms: string[];
  severity: string;
  onset: string;
  criticalIndicators: string[];
  missingInformation: string[];
  confidence: 'high' | 'medium' | 'low';
  summarySentence: string;
}

export interface TriageResult {
  urgency: TriageUrgency;
  headline: string;
  explanation: string;
  keyIndicators: string[];
  recommendedAction: string;
  actionPathway: 'CALL_EMERGENCY' | 'VISIT_EMERGENCY_DEPT' | 'URGENT_CARE' | 'MONITOR_CONSULT';
  timestamp: string;
  aiProcessed: boolean;
  modelUsed: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'Trauma Center' | 'General Hospital' | 'Specialty Emergency' | 'Urgent Care Center';
  address: string;
  city: string;
  distanceKm: number;
  travelMinutes: number;
  phone: string;
  emergencyDepartment: boolean;
  traumaLevel?: string;
  specialties: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  openStatus: string;
  isDemoData: boolean;
  estimatedWaitMinutes?: number;
}

export interface EmergencySummary {
  id: string;
  patientName: string;
  patientAge: number;
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  existingConditions: string[];
  primaryConcern: string;
  reportedSymptoms: string[];
  onset: string;
  severity: string;
  urgency: TriageUrgency;
  keyIndicators: string[];
  additionalNotes: string;
  selectedHospital?: Hospital | null;
  generatedAt: string;
  verifiedByAi: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
  notifyOnEmergency: boolean;
}

export interface UserProfile {
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  preferredHospitalId?: string;
  emergencyNotes: string;
  contacts: EmergencyContact[];
}

export interface DemoScenario {
  id: string;
  title: string;
  category: string;
  badgeUrgency: TriageUrgency;
  description: string;
  answers: AssessmentAnswers;
}
