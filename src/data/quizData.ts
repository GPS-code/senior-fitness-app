import { MedicalCondition, FoodItem, FruitItem, VegetableItem } from '@/types/assessment';

export const medicalConditions: MedicalCondition[] = [
  { id: 'diabetes', label: 'मधुमेह / हाई ब्लड शुगर (Diabetes)' },
  { id: 'hypertension', label: 'उच्च रक्तचाप / हाई बीपी (Hypertension)' },
  { id: 'ckd', label: 'किडनी की बीमारी (CKD)' },
  { id: 'uric_acid', label: 'यूरिक एसिड / गाउट (Uric Acid)' },
  { id: 'osteoporosis', label: 'ऑस्टियोपोरोसिस / हड्डियों का कमजोरी (Osteoporosis)' },
  { id: 'anemia', label: 'खून की कमी / एनीमिया (Anemia)' },
  { id: 'arthritis', label: 'गठिया / जोड़ों का दर्द (Arthritis)' },
  { id: 'thyroid', label: 'थायरॉयड की समस्या (Thyroid)' },
];

export const foodItems: FoodItem[] = [
  { id: 'roti', name: 'रोटी / फुल्का', category: 'Staples', unit: 'पीस', fiber: 3, protein: 4 },
  { id: 'rice', name: 'चावल / पोहा', category: 'Staples', unit: 'कटोरी', fiber: 1, protein: 2 },
  { id: 'idli', name: 'इडली / डोसा', category: 'Staples', unit: 'पीस', fiber: 2, protein: 3 },
  { id: 'dal', name: 'दाल / सांभर / कढ़ी', category: 'Proteins', unit: 'कटोरी', protein: 12, fiber: 7, iron: 3 },
  { id: 'paneer', name: 'पनीर / टोफू', category: 'Proteins', unit: 'टुकड़े', protein: 25, calcium: 300 },
  { id: 'dairy', name: 'दूध / छाछ / दही', category: 'Proteins', unit: 'ग्लास', protein: 8, calcium: 300 },
  { id: 'egg', name: 'अंडा', category: 'Proteins', unit: 'पीस', protein: 13, iron: 2 },
  { id: 'sabzi', name: 'सलाद / हरी सब्जी', category: 'Extras', unit: 'कटोरी', fiber: 4, calcium: 50 },
  { id: 'legumes', name: 'राजमा / छोले', category: 'Proteins', unit: 'कटोरी', protein: 15, fiber: 9, iron: 4 },
  { id: 'fish', name: 'मछली / झींगा', category: 'Proteins', unit: 'टुकड़े', protein: 25, iron: 1.5 },
];

export const fruits: FruitItem[] = [
  { id: 'apple', name: 'सेब (Apple)', season: 'winter', unit: 'टुकड़े', fiber: 3, vitaminC: 5 },
  { id: 'banana', name: 'केला (Banana)', season: 'year_round', unit: 'पीस', fiber: 2.5, vitaminC: 10 },
  { id: 'mango', name: 'आम (Mango)', season: 'summer', unit: 'कप', fiber: 2, vitaminC: 45 },
  { id: 'papaya', name: 'पपीता (Papaya)', season: 'year_round', unit: 'कप', fiber: 2.5, vitaminC: 60 },
  { id: 'orange', name: 'संतरा (Orange)', season: 'winter', unit: 'पीस', fiber: 2, vitaminC: 53 },
  { id: 'guava', name: 'अमरूद (Guava)', season: 'monsoon', unit: 'पीस', fiber: 5.5, vitaminC: 228 },
  { id: 'pomegranate', name: 'अनार (Pomegranate)', season: 'winter', unit: 'कटोरी', fiber: 3.5, vitaminC: 11 },
  { id: 'grapes', name: 'अंगूर (Grapes)', season: 'summer', unit: 'कटोरी', fiber: 0.9, vitaminC: 16 },
  { id: 'watermelon', name: 'तरबूज (Watermelon)', season: 'summer', unit: 'कप', fiber: 0.6, vitaminC: 8 },
  { id: 'coconut', name: 'नारियल (Coconut)', season: 'year_round', unit: 'कप', fiber: 9, vitaminC: 4 },
];

export const vegetables: VegetableItem[] = [
  { id: 'spinach', name: 'पालक (Spinach)', season: 'winter', unit: 'कटोरी', fiber: 2.2, calcium: 99, iron: 2.7 },
  { id: 'carrot', name: 'गाजर (Carrot)', season: 'winter', unit: 'कटोरी', fiber: 2.8, calcium: 33, iron: 0.3 },
  { id: 'tomato', name: 'टमाटर (Tomato)', season: 'year_round', unit: 'पीस', fiber: 1.5, calcium: 12, iron: 0.3 },
  { id: 'onion', name: 'प्याज (Onion)', season: 'winter', unit: 'पीस', fiber: 1.7, calcium: 23, iron: 0.2 },
  { id: 'cauliflower', name: 'फूलगोभी (Cauliflower)', season: 'winter', unit: 'कटोरी', fiber: 2.4, calcium: 22, iron: 0.4 },
  { id: 'broccoli', name: 'ब्रोकली (Broccoli)', season: 'winter', unit: 'कटोरी', fiber: 2.4, calcium: 47, iron: 0.7 },
  { id: 'bottle_gourd', name: 'लौकी (Bottle Gourd)', season: 'summer', unit: 'कटोरी', fiber: 0.6, calcium: 26, iron: 0.2 },
  { id: 'bitter_gourd', name: 'करेला (Bitter Gourd)', season: 'summer', unit: 'कटोरी', fiber: 2.4, calcium: 19, iron: 0.4 },
  { id: 'ladyfinger', name: 'भिंडी (Ladyfinger)', season: 'summer', unit: 'कटोरी', fiber: 3.3, calcium: 66, iron: 0.2 },
  { id: 'pumpkin', name: 'कद्दू (Pumpkin)', season: 'autumn', unit: 'कटोरी', fiber: 0.5, calcium: 21, iron: 0.8 },
  { id: 'bell_pepper', name: 'शिमला मिर्च (Bell Pepper)', season: 'year_round', unit: 'पीस', fiber: 2, calcium: 11, iron: 0.4 },
  { id: 'cucumber', name: 'खीरा (Cucumber)', season: 'summer', unit: 'पीस', fiber: 0.5, calcium: 16, iron: 0.3 },
  { id: 'beetroot', name: 'चुकंदर (Beetroot)', season: 'winter', unit: 'कटोरी', fiber: 2.8, calcium: 16, iron: 0.8 },
  { id: 'mushroom', name: 'मशरूम (Mushroom)', season: 'monsoon', unit: 'कटोरी', fiber: 0.7, calcium: 3, iron: 0.5 },
];

export const icmrTargets = {
  protein: { min: 50, target: 55, unit: 'g/day', reason: 'मांसपेशी संरक्षण (Muscle preservation)' },
  calcium: { min: 1200, target: 1300, unit: 'mg/day', reason: 'हड्डियों का स्वास्थ्य (Bone health)' },
  fiber: { min: 25, target: 30, unit: 'g/day', reason: 'पाचन स्वास्थ्य (Digestive health)' },
  iron: { min: 8, target: 12, unit: 'mg/day', reason: 'रक्त निर्माण (Blood formation)' },
  water: { min: 2.0, target: 2.5, unit: 'L/day', reason: 'जलयोजन (Hydration)' },
  fruits_vegetables: { min: 300, target: 400, unit: 'g/day', reason: 'विटामिन और खनिज (Vitamins & minerals)' },
  aerobic: { min: 75, target: 150, unit: 'min/week', reason: 'हृदय स्वास्थ्य (Cardiovascular health)' },
  resistance: { min: 1, target: 2, unit: 'days/week', reason: 'शक्ति प्रशिक्षण (Strength training)' },
  sleep: { min: 7, target: 8, unit: 'hours/night', reason: 'पुनर्जनन (Regeneration)' },
};
