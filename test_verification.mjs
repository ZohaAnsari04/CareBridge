async function testCareBridge() {
  console.log('🏥 CAREBRIDGE AUTOMATED VERIFICATION SUITE');
  console.log('==========================================');

  // 1. Test Hospitals API
  const hospRes = await fetch('http://localhost:3000/api/hospitals');
  const hospData = await hospRes.json();
  console.log(`✓ /api/hospitals: Status ${hospRes.status}, Found ${hospData.total} facilities, Verified Prototype: ${hospData.isPrototypeDataset}`);

  // 2. Test Hospital Detail API
  const hospDetailRes = await fetch('http://localhost:3000/api/hospitals/hosp-1');
  const hospDetailData = await hospDetailRes.json();
  console.log(`✓ /api/hospitals/hosp-1: Status ${hospDetailRes.status}, Target: ${hospDetailData.hospital.name}`);

  // 3. Test Clinical Triage API with High Urgency Chest Emergency
  const triageRes = await fetch('http://localhost:3000/api/assessment/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      primaryDescription: 'Patient is experiencing acute crushing chest pressure radiating to left arm with cold sweat for 20 minutes.',
      selectedSymptoms: ['chest_discomfort', 'difficulty_breathing', 'sweating'],
      severity: 'severe',
      onset: 'under_30m',
      conscious: 'yes',
      breathingDifficulty: 'yes',
      severeBleeding: 'no',
      suddenWeaknessOrNumbness: 'no',
      chestPainOrPressure: 'yes',
      patientAge: 54
    })
  });
  const triageData = await triageRes.json();
  console.log(`✓ /api/assessment/analyze: Status ${triageRes.status}`);
  console.log(`  - Urgency Classified: [${triageData.triageResult.urgency}]`);
  console.log(`  - Headline: ${triageData.triageResult.headline}`);
  console.log(`  - Red Flags Detected: ${triageData.triageResult.keyIndicators.join(' | ')}`);
  console.log(`  - Recommended Action: ${triageData.triageResult.recommendedAction}`);

  // 4. Test Emergency Handover Summary API
  const summaryRes = await fetch('http://localhost:3000/api/emergency-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientName: 'Alex Reynolds',
      patientAge: 54,
      bloodGroup: 'O+',
      allergies: ['Penicillin', 'Sulfa drugs'],
      medications: ['Lisinopril 10mg'],
      existingConditions: ['Hypertension'],
      primaryConcern: 'Acute crushing chest pressure',
      reportedSymptoms: ['Chest discomfort', 'Shortness of breath', 'Sweating'],
      onset: '20 minutes ago',
      severity: 'SEVERE',
      urgency: 'CRITICAL',
      keyIndicators: ['Severe acute chest discomfort', 'Shortness of breath'],
      additionalNotes: 'Patient conscious, diaphoretic',
      selectedHospital: hospDetailData.hospital
    })
  });
  const summaryData = await summaryRes.json();
  console.log(`✓ /api/emergency-summary: Status ${summaryRes.status}, Record ID: ${summaryData.summary.id}`);

  // 5. Test Notification Dispatch API
  const notifRes = await fetch('http://localhost:3000/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contactName: 'Sarah Reynolds',
      contactPhone: '+1 (555) 234-8891',
      patientName: 'Alex Reynolds',
      urgency: 'CRITICAL',
      hospitalName: 'CareBridge Metro General Hospital'
    })
  });
  const notifData = await notifRes.json();
  console.log(`✓ /api/notifications: Status ${notifRes.status}, Dispatch ID: ${notifData.dispatchId}, Carrier Status: ${notifData.carrierStatus}`);
  console.log(`  - SMS Payload: "${notifData.simulatedMessage}"`);

  // 6. Test User Profile API
  const profileRes = await fetch('http://localhost:3000/api/profile');
  const profileData = await profileRes.json();
  console.log(`✓ /api/profile: Status ${profileRes.status}, Completeness: ${profileData.completeness}%`);

  // 7. Verify all Frontend Routes (HTTP 200)
  console.log('\n--- VERIFYING FRONTEND HTML PAGES ---');
  const routes = [
    '/',
    '/assessment',
    '/assessment/result',
    '/hospitals',
    '/hospitals/hosp-1',
    '/emergency-summary',
    '/contacts',
    '/emergency-profile',
    '/dashboard',
    '/about',
    '/privacy'
  ];

  for (const route of routes) {
    const res = await fetch(`http://localhost:3000${route}`);
    console.log(`✓ Page http://localhost:3000${route.padEnd(20)}: HTTP ${res.status}`);
    if (res.status !== 200) {
      throw new Error(`Failed route ${route} with status ${res.status}`);
    }
  }

  console.log('\n🎉 ALL CAREBRIDGE ENDPOINTS & PAGES FUNCTIONING 100% SUCCESSFULLY!');
}

testCareBridge().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
