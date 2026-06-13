import { AssessmentData, Recommendation } from '@/types/assessment';
import { calculateNutritionData } from './nutritionCalc';
import { calculateFitnessScore } from './scoring';

export function generateRecommendations(data: AssessmentData): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const nutrition = calculateNutritionData(data);
  const score = calculateFitnessScore(data);

  // CRITICAL: CKD overrides
  if (data.medicalConditions.includes('ckd')) {
    recommendations.push({
      priority: 'critical',
      category: 'health',
      titleHi: '⚠️ किडनी संबंधी विशेष सावधानी',
      titleEn: 'CKD Special Care',
      descriptionHi: 'आपको किडनी की समस्या है। कोई भी आहार परिवर्तन करने से पहले अपने डॉक्टर से परामर्श लें।',
      actionHi: 'नेफ्रोलॉजिस्ट से मिलें और नियमित जांच करवाएं।',
      emoji: '🏥',
    });
  }

  // NUTRITION RECOMMENDATIONS
  if (nutrition.protein < 40) {
    recommendations.push({
      priority: 'high',
      category: 'nutrition',
      titleHi: '💪 प्रोटीन की कमी',
      titleEn: 'Low Protein Intake',
      descriptionHi: `आप दिन में ${nutrition.protein}g प्रोटीन ले रहे हैं। आपको कम से कम 50g चाहिए।`,
      actionHi: 'दाल, दही, दूध, अंडे या मछली को अपने आहार में बढ़ाएं।',
      emoji: '🍚',
    });
  }

  if (nutrition.calcium < 800) {
    recommendations.push({
      priority: 'high',
      category: 'nutrition',
      titleHi: '🦴 कैल्शियम की कमी',
      titleEn: 'Low Calcium',
      descriptionHi: `आप ${nutrition.calcium}mg कैल्शियम ले रहे हैं। लक्ष्य 1200mg है।`,
      actionHi: 'दूध, दही, पनीर, और हरी पत्तेदार सब्जियां खाएं। धूप में भी बैठें।',
      emoji: '🥛',
    });
  }

  if (nutrition.fiber < 15) {
    recommendations.push({
      priority: 'high',
      category: 'nutrition',
      titleHi: '🥬 फाइबर की कमी',
      titleEn: 'Low Fiber',
      descriptionHi: `आप ${nutrition.fiber}g फाइबर ले रहे हैं। कम से कम 25g चाहिए।`,
      actionHi: 'साबुत अनाज, फल, सब्जियां और दालें खाएं।',
      emoji: '🥗',
    });
  }

  if (nutrition.waterLiters < 1.5) {
    recommendations.push({
      priority: 'high',
      category: 'nutrition',
      titleHi: '💧 कम पानी का सेवन',
      titleEn: 'Low Water Intake',
      descriptionHi: `आप ${nutrition.waterLiters}L पानी ले रहे हैं। दिन में 2-2.5L चाहिए।`,
      actionHi: 'रोज़ कम से कम 8-10 गिलास पानी पिएं।',
      emoji: '💦',
    });
  }

  if (nutrition.fruitVegGrams < 300) {
    recommendations.push({
      priority: 'medium',
      category: 'nutrition',
      titleHi: '🍎 फल और सब्जियां कम हैं',
      titleEn: 'Low Fruits & Vegetables',
      descriptionHi: `आप ${nutrition.fruitVegGrams}g फल-सब्जियां ले रहे हैं। कम से कम 400g चाहिए।`,
      actionHi: 'हर भोजन में रंगीन फल और सब्जियां शामिल करें।',
      emoji: '🥕',
    });
  }

  // ACTIVITY RECOMMENDATIONS
  const weeklyAerobic = data.walkingMinutes * 7;
  if (weeklyAerobic < 75) {
    recommendations.push({
      priority: 'high',
      category: 'activity',
      titleHi: '🚶 व्यायाम कम है',
      titleEn: 'Insufficient Physical Activity',
      descriptionHi: `आप सप्ताह में ${weeklyAerobic}मिनट एरोबिक व्यायाम कर रहे हैं।`,
      actionHi: 'रोज़ कम से कम 30 मिनट तेज़ चलें या योग करें।',
      emoji: '🏃',
    });
  }

  if (!data.strengthTraining) {
    recommendations.push({
      priority: 'medium',
      category: 'activity',
      titleHi: '💪 शक्ति प्रशिक्षण नहीं',
      titleEn: 'No Strength Training',
      descriptionHi: 'आप शक्ति प्रशिक्षण नहीं कर रहे हैं।',
      actionHi: 'हफ़्ते में 2 दिन हल्के वज़न या प्रतिरोध अभ्यास करें।',
      emoji: '⛹️',
    });
  }

  // SLEEP RECOMMENDATIONS
  if (data.sleepHours < 6 || data.sleepHours > 9) {
    recommendations.push({
      priority: 'high',
      category: 'sleep',
      titleHi: '😴 नींद की समस्या',
      titleEn: 'Sleep Duration Issue',
      descriptionHi: `आप ${data.sleepHours} घंटे सोते हैं। आदर्श 7-8 घंटे है।`,
      actionHi: 'हर रात एक ही समय पर सोएं। सोने से पहले स्क्रीन न देखें।',
      emoji: '🛏️',
    });
  }

  if (data.sleepQuality === 'poor' || data.sleepQuality === 'fair') {
    recommendations.push({
      priority: 'high',
      category: 'sleep',
      titleHi: '😔 नींद की गुणवत्ता कम',
      titleEn: 'Poor Sleep Quality',
      descriptionHi: 'आपकी नींद की गुणवत्ता अच्छी नहीं है।',
      actionHi: 'डॉक्टर से मिलें। शाम को कम चाय/कॉफी लें। व्यायाम बढ़ाएं।',
      emoji: '⏰',
    });
  }

  if (data.sleepDisturbances.length > 0 && !data.sleepDisturbances.includes('none')) {
    recommendations.push({
      priority: 'high',
      category: 'sleep',
      titleHi: '⚠️ नींद में व्यवधान',
      titleEn: 'Sleep Disturbances',
      descriptionHi: 'आपको नींद में बाधा आती है।',
      actionHi: 'डॉक्टर से परामर्श लें। शांत और अंधेरे कमरे में सोएं।',
      emoji: '🚫',
    });
  }

  // COMORBIDITY-SPECIFIC RECOMMENDATIONS
  if (data.medicalConditions.includes('diabetes')) {
    recommendations.push({
      priority: 'high',
      category: 'health',
      titleHi: '🍏 डायबिटीज़ प्रबंधन',
      titleEn: 'Diabetes Management',
      descriptionHi: 'आपको मधुमेह है।',
      actionHi: 'सफेद चावल और मैदा कम करें। साबुत अनाज खाएं। व्यायाम नियमित करें।',
      emoji: '💉',
    });
  }

  if (data.medicalConditions.includes('hypertension')) {
    recommendations.push({
      priority: 'high',
      category: 'health',
      titleHi: '🧂 उच्च रक्तचाप प्रबंधन',
      titleEn: 'Hypertension Management',
      descriptionHi: 'आपको उच्च रक्तचाप है।',
      actionHi: 'नमक कम करें। तनाव कम करें। नियमित व्यायाम करें। दवा ले रहे हैं तो नियमित लें।',
      emoji: '❤️',
    });
  }

  if (data.medicalConditions.includes('uric_acid')) {
    recommendations.push({
      priority: 'medium',
      category: 'health',
      titleHi: '💧 यूरिक एसिड प्रबंधन',
      titleEn: 'Uric Acid Management',
      descriptionHi: 'आपको यूरिक एसिड की समस्या है।',
      actionHi: 'बहुत पानी पिएं। राजमा और छोले कम खाएं। मेवे सीमित करें।',
      emoji: '🥤',
    });
  }

  if (data.medicalConditions.includes('anemia')) {
    recommendations.push({
      priority: 'high',
      category: 'health',
      titleHi: '🩸 खून की कमी',
      titleEn: 'Anemia Management',
      descriptionHi: 'आपको एनीमिया है।',
      actionHi: 'आयरन से भरपूर खाना खाएं (पालक, रेड मीट, दाल)। विटामिन C लें।',
      emoji: '🥦',
    });
  }

  // LIFESTYLE RECOMMENDATIONS
  if (data.stressLevel === 'high') {
    recommendations.push({
      priority: 'high',
      category: 'activity',
      titleHi: '😓 उच्च तनाव',
      titleEn: 'High Stress',
      descriptionHi: 'आप तनाव में हैं।',
      actionHi: 'योग, ध्यान या गहरी सांस लेने का अभ्यास करें।',
      emoji: '🧘',
    });
  }

  if (data.socialEngagement === 'isolated') {
    recommendations.push({
      priority: 'medium',
      category: 'health',
      titleHi: '👥 सामाजिक संपर्क',
      titleEn: 'Social Engagement',
      descriptionHi: 'आप सामाजिक रूप से अलग-थलग हैं।',
      actionHi: 'परिवार के साथ समय बिताएं। सामुदायिक कार्यक्रमों में भाग लें।',
      emoji: '❤️',
    });
  }

  if (data.tobaccoUse === 'current') {
    recommendations.push({
      priority: 'critical',
      category: 'health',
      titleHi: '🚭 तंबाकू बंद करें',
      titleEn: 'Quit Tobacco',
      descriptionHi: 'आप तंबाकू का सेवन कर रहे हैं।',
      actionHi: 'तंबाकू छोड़ने के लिए डॉक्टर से सलाह लें।',
      emoji: '🚫',
    });
  }

  // POSITIVE REINFORCEMENT
  if (score.total >= 75) {
    recommendations.unshift({
      priority: 'low',
      category: 'health',
      titleHi: '🎉 शानदार काम!',
      titleEn: 'Great Work!',
      descriptionHi: `आपका फिटनेस स्कोर ${score.total} है - यह बहुत अच्छा है!`,
      actionHi: 'इसी तरह अपनी आदतों को बनाए रखें।',
      emoji: '🌟',
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
