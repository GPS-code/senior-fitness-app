export const translations = {
  hi: {
    // Headers
    personalInfo: '👤 व्यक्तिगत जानकारी',
    nutrition: '🍽️ पोषण और जलयोजन',
    activity: '🏃 व्यायाम और गतिविधि',
    sleepLifestyle: '😴 नींद और जीवनशैली',
    review: '📋 समीक्षा',
    results: '🎯 आपके परिणाम',
    
    // Step 1
    age: 'आपकी उम्र',
    years: 'साल',
    gender: 'लिंग',
    dietType: 'खान-पान की आदत',
    healthIssues: '🏥 स्वास्थ्य समस्याएं (कोई भी चुनें)',
    medicationAdherence: '🏥 दवाई लेने में नियमितता',
    
    // Step 2
    waterIntake: 'दिन में कितना पानी पीते हैं?',
    waterTarget: 'लक्ष्य: 8-10 गिलास (2-2.5 लीटर)',
    food: '🍽️ भोजन (सप्ताह में कुल कितना)',
    foodDesc: 'पूरे हफ़्ते में कुल कितना खाते हैं? (उदा: 14 रोटी = हफ़्ते में 2 रोटी प्रतिदिन)',
    fruits: '🍎 फल (सप्ताह में कुल कितनी बार)',
    vegetables: '🥬 सब्जियां (सप्ताह में कुल कितनी बार)',
    
    // Step 3
    walking: 'रोज़ कितना समय तेज़ चलते हैं?',
    walkingIntensity: 'व्यायाम की तीव्रता',
    yoga: 'योग करते हैं?',
    yogaIntensity: 'योग की कठिनाई',
    strengthTraining: '🏋️ ताकत बढ़ाने का व्यायाम करते हैं?',
    flexibility: '🧘 शरीर को मुलायम और लचीला बनाने का व्यायाम',
    balance: '⚖️ संतुलन प्रशिक्षण करते हैं?',
    stairs: '🪜 सीढ़ियां कितनी चढ़ते हैं?',
    
    // Step 4
    sleepHours: 'रात को कितने घंटे सोते हैं?',
    sleepQuality: 'नींद की गुणवत्ता',
    sleepDisturbances: 'नींद में बाधा',
    restDays: 'सप्ताह में कितने दिन आराम करते हैं?',
    stressLevel: 'तनाव का स्तर',
    mentalHealth: 'मानसिक स्वास्थ्य',
    socialEngagement: 'सामाजिक गतिविधि',
    alcohol: 'शराब का सेवन',
    tobacco: 'तंबाकू का सेवन',
    
    // Common
    male: '🧑 पुरुष',
    female: '👩 महिला',
    preferNotToSay: '❓ कहना नहीं चाहता',
    yes: '✓ हाँ',
    no: '✗ नहीं',
    back: '← पीछे',
    next: 'आगे →',
    seeResults: 'परिणाम देखें 🎯',
    print: '🖨️ प्रिंट करें',
    restart: '🔄 फिर से शरू करें',
  },
  en: {
    // Headers
    personalInfo: '👤 Personal Information',
    nutrition: '🍽️ Nutrition & Hydration',
    activity: '🏃 Physical Activity',
    sleepLifestyle: '😴 Sleep & Lifestyle',
    review: '📋 Review',
    results: '🎯 Your Results',
    
    // Step 1
    age: 'Your Age',
    years: 'years',
    gender: 'Gender',
    dietType: 'Diet Type',
    healthIssues: '🏥 Health Issues (Select any)',
    medicationAdherence: '🏥 Medication Adherence',
    
    // Step 2
    waterIntake: 'How much water do you drink daily?',
    waterTarget: 'Target: 8-10 glasses (2-2.5 liters)',
    food: '🍽️ Food (Total Per Week)',
    foodDesc: 'Total amount per week? (e.g., 14 chapatis = 2 per day)',
    fruits: '🍎 Fruits (Times Per Week)',
    vegetables: '🥬 Vegetables (Times Per Week)',
    
    // Step 3
    walking: 'How much do you walk daily?',
    walkingIntensity: 'Exercise Intensity',
    yoga: 'Do you practice yoga?',
    yogaIntensity: 'Yoga Difficulty',
    strengthTraining: '🏋️ Do you do strength training?',
    flexibility: '🧘 Stretching & Flexibility Exercise',
    balance: '⚖️ Do you do balance training?',
    stairs: '🪜 How often do you climb stairs?',
    
    // Step 4
    sleepHours: 'How many hours do you sleep?',
    sleepQuality: 'Sleep Quality',
    sleepDisturbances: 'Sleep Disturbances',
    restDays: 'Rest Days Per Week',
    stressLevel: 'Stress Level',
    mentalHealth: 'Mental Wellbeing',
    socialEngagement: 'Social Engagement',
    alcohol: 'Alcohol Consumption',
    tobacco: 'Tobacco Use',
    
    // Common
    male: '🧑 Male',
    female: '👩 Female',
    preferNotToSay: '❓ Prefer not to say',
    yes: '✓ Yes',
    no: '✗ No',
    back: '← Back',
    next: 'Next →',
    seeResults: 'See Results 🎯',
    print: '🖨️ Print',
    restart: '🔄 Restart',
  },
};

export const t = (key: keyof typeof translations.hi, lang: 'hi' | 'en'): string => {
  return translations[lang][key] || translations.en[key] || key;
};
