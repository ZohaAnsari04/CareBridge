import { AssessmentAnswers, EmergencyContact, EmergencySummary, Hospital, TriageResult, UserProfile } from '../ai/types';
import { DEMO_HOSPITALS } from './hospitals';

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'assessment' | 'hospital_selected' | 'summary_generated' | 'contact_notified';
  details: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Alex Reynolds',
  age: 54,
  gender: 'Male',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  medications: ['Lisinopril 10mg daily', 'Atorvastatin 20mg daily'],
  conditions: ['Hypertension (Stage 1)', 'Mild Asthma'],
  preferredHospitalId: 'hosp-1',
  emergencyNotes: 'Carries rescue albuterol inhaler in bag.',
  contacts: [
    {
      id: 'c-1',
      name: 'Sarah Reynolds',
      relationship: 'Spouse',
      phone: '+1 (555) 234-8891',
      isPrimary: true,
      notifyOnEmergency: true
    },
    {
      id: 'c-2',
      name: 'Marcus Reynolds',
      relationship: 'Adult Child',
      phone: '+1 (555) 890-1244',
      isPrimary: false,
      notifyOnEmergency: true
    }
  ]
};

export function calculateProfileCompleteness(profile: UserProfile): number {
  let score = 0;
  if (profile.fullName) score += 15;
  if (profile.age > 0) score += 10;
  if (profile.bloodGroup) score += 15;
  if (profile.allergies && profile.allergies.length > 0) score += 15;
  if (profile.medications && profile.medications.length > 0) score += 15;
  if (profile.conditions && profile.conditions.length > 0) score += 15;
  if (profile.contacts && profile.contacts.length > 0) score += 15;
  return Math.min(score, 100);
}

// LocalStorage Helper Keys
const STORAGE_KEYS = {
  ANSWERS: 'carebridge_assessment_answers',
  RESULT: 'carebridge_triage_result',
  SELECTED_HOSPITAL: 'carebridge_selected_hospital',
  SUMMARY: 'carebridge_emergency_summary',
  PROFILE: 'carebridge_user_profile',
  CONTACTS: 'carebridge_contacts',
  ACTIVITIES: 'carebridge_activities',
  NOTIFIED_CONTACTS: 'carebridge_notified_contacts'
};

export const CareBridgeStorage = {
  getAnswers: (): AssessmentAnswers | null => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    return item ? JSON.parse(item) : null;
  },
  setAnswers: (answers: AssessmentAnswers) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  },
  getResult: (): TriageResult | null => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(STORAGE_KEYS.RESULT);
    return item ? JSON.parse(item) : null;
  },
  setResult: (result: TriageResult) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
    CareBridgeStorage.addActivity({
      id: 'act-' + Date.now(),
      title: `Emergency assessment evaluated (${result.urgency})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'assessment',
      details: result.headline
    });
  },
  getSelectedHospital: (): Hospital | null => {
    if (typeof window === 'undefined') return DEMO_HOSPITALS[0];
    const item = localStorage.getItem(STORAGE_KEYS.SELECTED_HOSPITAL);
    return item ? JSON.parse(item) : DEMO_HOSPITALS[0];
  },
  setSelectedHospital: (hospital: Hospital) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SELECTED_HOSPITAL, JSON.stringify(hospital));
    CareBridgeStorage.addActivity({
      id: 'act-' + Date.now(),
      title: `Facility targeted: ${hospital.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'hospital_selected',
      details: `${hospital.distanceKm} km away • ${hospital.travelMinutes} mins approx travel`
    });
  },
  getSummary: (): EmergencySummary | null => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(STORAGE_KEYS.SUMMARY);
    return item ? JSON.parse(item) : null;
  },
  setSummary: (summary: EmergencySummary) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SUMMARY, JSON.stringify(summary));
    CareBridgeStorage.addActivity({
      id: 'act-' + Date.now(),
      title: 'Emergency Clinical Summary prepared',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'summary_generated',
      details: `Generated for ${summary.patientName} (${summary.urgency})`
    });
  },
  getProfile: (): UserProfile => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    const item = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return item ? JSON.parse(item) : DEFAULT_PROFILE;
  },
  setProfile: (profile: UserProfile) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
  getContacts: (): EmergencyContact[] => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE.contacts;
    const item = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return item ? JSON.parse(item) : DEFAULT_PROFILE.contacts;
  },
  setContacts: (contacts: EmergencyContact[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  },
  getActivities: (): ActivityItem[] => {
    if (typeof window === 'undefined') return [
      {
        id: 'act-init-1',
        title: 'Emergency Profile Verified',
        timestamp: 'Today • 08:30 AM',
        type: 'assessment',
        details: 'Medical profile 85% ready for emergency intake'
      }
    ];
    const item = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return item ? JSON.parse(item) : [
      {
        id: 'act-init-1',
        title: 'Emergency Profile Verified',
        timestamp: 'Today • 08:30 AM',
        type: 'assessment',
        details: 'Medical profile 85% ready for emergency intake'
      }
    ];
  },
  addActivity: (act: ActivityItem) => {
    if (typeof window === 'undefined') return;
    const list = CareBridgeStorage.getActivities();
    list.unshift(act);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(list.slice(0, 15)));
  }
};
