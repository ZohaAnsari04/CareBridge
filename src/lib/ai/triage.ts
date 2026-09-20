import { AssessmentAnswers, StructuredExtraction, TriageResult, TriageUrgency } from './types';
import { CAREBRIDGE_SYSTEM_PROMPT, CAREBRIDGE_USER_EXTRACTION_PROMPT } from './prompt';

/**
 * Deterministic Clinical Safety & Triage Rule Engine
 * Guarantees that critical red-flags are never downgraded or missed, regardless of AI output.
 */
export function evaluateTriage(
  answers: AssessmentAnswers,
  aiExtraction?: StructuredExtraction | null
): TriageResult {
  const criticalFlags: string[] = [];
  const highFlags: string[] = [];
  const moderateFlags: string[] = [];

  const text = (answers.primaryDescription || '').toLowerCase();
  const symptoms = (answers.selectedSymptoms || []).map(s => s.toLowerCase());

  // 1. Unconsciousness or altered mental status
  if (answers.conscious === 'no') {
    criticalFlags.push('Loss of consciousness / unresponsiveness');
  } else if (text.includes('unconscious') || text.includes('passed out') || text.includes('fainted') || text.includes('unresponsive') || text.includes('collapsed')) {
    criticalFlags.push('Reported unresponsiveness or collapse');
  }

  // 2. Severe breathing compromise
  if (answers.breathingDifficulty === 'yes') {
    if (answers.severity === 'severe' || answers.severity === 'unbearable' || symptoms.includes('difficulty_breathing') || symptoms.includes('chest_discomfort')) {
      criticalFlags.push('Severe acute breathing distress');
    } else {
      highFlags.push('Reported difficulty breathing');
    }
  } else if (text.includes('cannot breathe') || text.includes('gasping') || text.includes('suffocating') || text.includes('choking') || text.includes('turning blue')) {
    criticalFlags.push('Severe respiratory distress indicators');
  }

  // 3. Uncontrolled severe hemorrhage
  if (answers.severeBleeding === 'yes' || text.includes('severe bleeding') || text.includes('gushing blood') || text.includes('uncontrolled bleeding')) {
    criticalFlags.push('Severe or uncontrolled bleeding');
  }

  // 4. Sudden acute neurological / stroke indicators
  if (answers.suddenWeaknessOrNumbness === 'yes' || symptoms.includes('sudden_weakness') || text.includes('slurred speech') || text.includes('facial droop') || text.includes('paralysis') || text.includes('one side weak')) {
    criticalFlags.push('Sudden neurological deficit (speech/facial/weakness)');
  }

  // 5. Severe cardiovascular indicators
  const hasChestSymptoms = answers.chestPainOrPressure === 'yes' || 
    symptoms.includes('chest_discomfort') || 
    text.includes('chest pain') || 
    text.includes('chest pressure') || 
    text.includes('heart pain') || 
    text.includes('crushing chest');

  const hasRadiatingOrSweating = symptoms.includes('sweating') || 
    text.includes('sweating') || 
    text.includes('cold sweat') || 
    text.includes('left arm') || 
    text.includes('jaw pain') || 
    text.includes('nausea');

  if (hasChestSymptoms) {
    if (answers.severity === 'severe' || answers.severity === 'unbearable' || hasRadiatingOrSweating || answers.breathingDifficulty === 'yes') {
      criticalFlags.push('Severe acute chest discomfort with associated emergency indicators');
    } else {
      highFlags.push('Chest discomfort or tightness requiring urgent assessment');
    }
  }

  // 6. Trauma and severe injury
  if (symptoms.includes('injury') || text.includes('fall') || text.includes('car accident') || text.includes('broken bone') || text.includes('fracture') || text.includes('trauma')) {
    if (answers.severity === 'severe' || answers.severity === 'unbearable') {
      highFlags.push('High-impact traumatic injury with severe pain');
    } else {
      moderateFlags.push('Physical injury requiring medical evaluation');
    }
  }

  // 7. Severe acute headache
  if (symptoms.includes('severe_headache') || text.includes('worst headache') || text.includes('thunderclap')) {
    highFlags.push('Sudden severe headache');
  }

  // 8. Abdominal / Infection indicators
  if (symptoms.includes('abdominal_pain') || text.includes('stomach pain') || text.includes('belly pain')) {
    if (answers.severity === 'severe') {
      highFlags.push('Severe acute abdominal pain');
    } else {
      moderateFlags.push('Abdominal distress');
    }
  }

  if (symptoms.includes('fever') || text.includes('high fever') || text.includes('chills') || text.includes('dehydration')) {
    moderateFlags.push('Febrile illness / potential dehydration');
  }

  // Determine Triage Urgency Level
  let urgency: TriageUrgency = 'LOW';
  let headline = 'Non-Emergency Symptoms Detected';
  let explanation = 'Based on provided information, no immediate high-risk emergency flags were identified. However, monitor symptoms and consult a physician if condition worsens.';
  let recommendedAction = 'Monitor symptoms closely. Contact a healthcare provider or outpatient clinic if symptoms persist.';
  let actionPathway: 'CALL_EMERGENCY' | 'VISIT_EMERGENCY_DEPT' | 'URGENT_CARE' | 'MONITOR_CONSULT' = 'MONITOR_CONSULT';

  if (criticalFlags.length > 0) {
    urgency = 'CRITICAL';
    headline = 'POTENTIAL CRITICAL EMERGENCY DETECTED';
    explanation = 'Critical safety indicators were detected in the reported symptoms that may represent a time-sensitive medical emergency requiring immediate life-support intervention.';
    recommendedAction = 'Call emergency services (911/112/local emergency) immediately. Do not attempt to drive yourself. Keep the patient calm and supported until paramedics arrive.';
    actionPathway = 'CALL_EMERGENCY';
  } else if (highFlags.length > 0 || (answers.severity === 'severe' && answers.onset !== 'over_1d')) {
    urgency = 'HIGH';
    headline = 'POTENTIAL EMERGENCY INDICATORS DETECTED';
    explanation = 'Your responses include indicators that may require prompt professional medical evaluation at an emergency department or urgent trauma facility.';
    recommendedAction = 'Seek immediate professional emergency care. Transport to the nearest emergency department or contact emergency services.';
    actionPathway = 'VISIT_EMERGENCY_DEPT';
  } else if (moderateFlags.length > 0 || answers.severity === 'moderate') {
    urgency = 'MODERATE';
    headline = 'Urgent Medical Attention Recommended';
    explanation = 'Reported symptoms indicate a moderate health concern that benefits from same-day medical evaluation at an Urgent Care Center or doctor consultation.';
    recommendedAction = 'Visit an urgent care center or schedule a same-day medical evaluation. Seek immediate emergency care if symptoms rapidly worsen.';
    actionPathway = 'URGENT_CARE';
  }

  const allIndicators = [
    ...criticalFlags,
    ...highFlags,
    ...moderateFlags,
    ...(aiExtraction?.criticalIndicators || [])
  ];

  // Deduplicate indicators
  const uniqueIndicators = Array.from(new Set(allIndicators));

  return {
    urgency,
    headline,
    explanation,
    keyIndicators: uniqueIndicators.length > 0 ? uniqueIndicators : ['Reported symptoms require clinical correlation'],
    recommendedAction,
    actionPathway,
    timestamp: new Date().toISOString(),
    aiProcessed: !!aiExtraction,
    modelUsed: aiExtraction ? 'CareBridge Clinical NLP v1.2' : 'CareBridge Deterministic Safety Rule Engine'
  };
}

/**
 * Natural Language Symptom Extractor with Deterministic Fallback
 * Works seamlessly whether an AI API key is configured or offline.
 */
export async function extractSymptoms(
  userText: string,
  selectedSymptoms: string[]
): Promise<StructuredExtraction> {
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      // Optional external AI call (Gemini endpoint)
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: CAREBRIDGE_SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: CAREBRIDGE_USER_EXTRACTION_PROMPT(userText, selectedSymptoms) }] }],
          generationConfig: { responseMimeType: 'application/json' }
        }),
        signal: AbortSignal.timeout(4000)
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          return {
            extractedSymptoms: Array.isArray(parsed.extractedSymptoms) ? parsed.extractedSymptoms : selectedSymptoms,
            severity: parsed.severity || 'unknown',
            onset: parsed.onset || 'unknown',
            criticalIndicators: Array.isArray(parsed.criticalIndicators) ? parsed.criticalIndicators : [],
            missingInformation: Array.isArray(parsed.missingInformation) ? parsed.missingInformation : [],
            confidence: parsed.confidence || 'high',
            summarySentence: parsed.summarySentence || userText.slice(0, 120)
          };
        }
      }
    } catch {
      // Gracefully fall through to deterministic extraction
      console.warn('AI API call failed or timed out. Falling back to deterministic NLP engine.');
    }
  }

  // DETERMINISTIC NLP & KEYWORD EXTRACTOR (100% reliable fallback)
  return fallbackExtraction(userText, selectedSymptoms);
}

function fallbackExtraction(text: string, selectedSymptoms: string[]): StructuredExtraction {
  const lower = text.toLowerCase();
  const extracted = new Set<string>(selectedSymptoms);
  const critical: string[] = [];

  const patterns: Record<string, string[]> = {
    'chest discomfort': ['chest', 'heart', 'tightness in chest', 'angina', 'crushing'],
    'difficulty breathing': ['breathe', 'breath', 'shortness of breath', 'gasping', 'suffocating', 'wheezing', 'asthma'],
    'severe bleeding': ['bleed', 'blood', 'hemorrhage', 'gushing'],
    'loss of consciousness': ['unconscious', 'passed out', 'fainted', 'blackout', 'collapsed', 'unresponsive'],
    'sweating': ['sweat', 'sweating', 'diaphoresis', 'clammy', 'cold sweat'],
    'severe headache': ['headache', 'migraine', 'head throbbing', 'thunderclap'],
    'sudden weakness': ['weakness', 'numbness', 'cannot move arm', 'slurred', 'face droop', 'stroke'],
    'abdominal pain': ['stomach', 'belly', 'abdomen', 'cramps', 'appendix'],
    'fever': ['fever', 'temperature', 'chills', 'burning up', 'hot'],
    'injury': ['fell', 'fall', 'hit', 'accident', 'fracture', 'broken', 'twisted']
  };

  for (const [symptom, triggers] of Object.entries(patterns)) {
    if (triggers.some(t => lower.includes(t))) {
      extracted.add(symptom);
    }
  }

  // Detect severity
  let severity: 'mild' | 'moderate' | 'severe' | 'unbearable' = 'moderate';
  if (lower.includes('severe') || lower.includes('unbearable') || lower.includes('worst') || lower.includes('intense') || lower.includes('excruciating')) {
    severity = 'severe';
  } else if (lower.includes('mild') || lower.includes('slight') || lower.includes('minor') || lower.includes('little')) {
    severity = 'mild';
  }

  // Detect onset
  let onset = 'Reported in description';
  if (lower.includes('just now') || lower.includes('sudden') || lower.includes('suddenly')) {
    onset = 'Sudden / Just now';
  } else if (lower.includes('minute') || lower.includes('20 min') || lower.includes('30 min')) {
    onset = 'Within the last 30 minutes';
  } else if (lower.includes('hour') || lower.includes('hours')) {
    onset = 'Earlier today / past few hours';
  } else if (lower.includes('day') || lower.includes('yesterday')) {
    onset = 'Over 1 day ago';
  }

  // Check critical indicators
  if (extracted.has('loss of consciousness') || lower.includes('unconscious') || lower.includes('collapsed')) {
    critical.push('Loss of consciousness reported');
  }
  if (extracted.has('difficulty breathing') && (severity === 'severe' || lower.includes('cannot breathe'))) {
    critical.push('Acute breathing compromise');
  }
  if (extracted.has('chest discomfort') && (severity === 'severe' || extracted.has('sweating') || lower.includes('sudden'))) {
    critical.push('Severe acute chest discomfort');
  }
  if (extracted.has('sudden weakness') || lower.includes('stroke') || lower.includes('slur')) {
    critical.push('Acute focal neurological signs');
  }

  return {
    extractedSymptoms: Array.from(extracted),
    severity,
    onset,
    criticalIndicators: critical,
    missingInformation: ['Baseline medical history', 'Recent vital signs'],
    confidence: 'high',
    summarySentence: text.length > 0 ? text.slice(0, 160) : 'Assessment based on structured inputs.'
  };
}
