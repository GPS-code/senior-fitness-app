import { MedicalCondition, FoodItem, FruitItem, VegetableItem } from '@/types/assessment';

export const medicalConditions: MedicalCondition[] = [
  { id: 'diabetes', labelHi: 'मधुमेह / हाई ब्लड शुगर', labelEn: 'Diabetes' },
  { id: 'hypertension', labelHi: 'उच्च रक्तचाप / हाई बीपी', labelEn: 'Hypertension' },
  { id: 'ckd', labelHi: 'किडनी की बीमारी', labelEn: 'Chronic Kidney Disease' },
  { id: 'uric_acid', labelHi: 'यूरिक एसिड / गाउट', labelEn: 'High Uric Acid' },
  { id: 'osteoporosis', labelHi: 'ऑस्टियोपोरोसिस / हड्डियों का कमजोरी', labelEn: 'Osteoporosis' },
  { id: 'anemia', labelHi: 'खून की कमी / एनीमिया', labelEn: 'Anemia' },
  { id: 'arthritis', labelHi: 'गठिया / जोड़ों का दर्द', labelEn: 'Arthritis' },
  { id: 'thyroid', labelHi: 'थायरॉयड की समस्या', labelEn: 'Thyroid Disorder' },
];

export const foodItems: FoodItem[] = [
  { id: 'roti', nameHi: 'रोटी / फुल्का', nameEn: 'Chapati', category: 'Staples', unit: 'pieces', fiber: 3, protein: 4 },
  { id: 'rice', nameHi: 'चावल / पोहा', nameEn: 'Rice', category: 'Staples', unit: 'bowl', fiber: 1, protein: 2 },
  { id: 'idli', nameHi: 'इडली / डोसा', nameEn: 'Idli/Dosa', category: 'Staples', unit: 'piece', fiber: 2, protein: 3 },
  { id: 'dal', nameHi: 'दाल / सांभर / कढ़ी', nameEn: 'Lentils', category: 'Proteins', unit: 'bowl', protein: 12, fiber: 7, iron: 3 },
  { id: 'paneer', nameHi: 'पनीर / टोफू', nameEn: 'Paneer/Tofu', category: 'Proteins', unit: 'pieces', protein: 25, calcium: 300 },
  { id: 'dairy', nameHi: 'दूध / छाछ / दही', nameEn: 'Milk/Yogurt', category: 'Proteins', unit: 'glass', protein: 8, calcium: 300 },
  { id: 'egg', nameHi: 'अंडा', nameEn: 'Egg', category: 'Proteins', unit: 'piece', protein: 13, iron: 2 },
  { id: 'sabzi', nameHi: 'सलाद / हरी सब्जी', nameEn: 'Salad', category: 'Extras', unit: 'bowl', fiber: 4, calcium: 50 },
  { id: 'legumes', nameHi: 'राजमा / छोले', nameEn: 'Beans', category: 'Proteins', unit: 'bowl', protein: 15, fiber: 9, iron: 4 },
  { id: 'fish', nameHi: 'मछली / झींगा', nameEn: 'Fish/Shrimp', category: 'Proteins', unit: 'pieces', protein: 25, iron: 1.5 },
];

export const fruits: FruitItem[] = [
  { id: 'apple', nameHi: 'सेब', nameEn: 'Apple', season: 'winter', unit: 'pieces', fiber: 3, vitaminC: 5 },
  { id: 'banana', nameHi: 'केला', nameEn: 'Banana', season: 'year_round', unit: 'piece', fiber: 2.5, vitaminC: 10 },
  { id: 'mango', nameHi: 'आम', nameEn: 'Mango', season: 'summer', unit: 'cup', fiber: 2, vitaminC: 45 },
  { id: 'papaya', nameHi: 'पपीता', nameEn: 'Papaya', season: 'year_round', unit: 'cup', fiber: 2.5, vitaminC: 60 },
  { id: 'orange', nameHi: 'संतरा', nameEn: 'Orange', season: 'winter', unit: 'piece', fiber: 2, vitaminC: 53 },
  { id: 'guava', nameHi: 'अमरूद', nameEn: 'Guava', season: 'monsoon', unit: 'piece', fiber: 5.5, vitaminC: 228 },
  { id: 'pomegranate', nameHi: 'अनार', nameEn: 'Pomegranate', season: 'winter', unit: 'bowl', fiber: 3.5, vitaminC: 11 },
  { id: 'grapes', nameHi: 'अंगूर', nameEn: 'Grapes', season: 'summer', unit: 'bowl', fiber: 0.9, vitaminC: 16 },
  { id: 'watermelon', nameHi: 'तरबूज', nameEn: 'Watermelon', season: 'summer', unit: 'cup', fiber: 0.6, vitaminC: 8 },
  { id: 'coconut', nameHi: 'नारियल', nameEn: 'Coconut', season: 'year_round', unit: 'cup', fiber: 9, vitaminC: 4 },
];

export const vegetables: VegetableItem[] = [
  { id: 'spinach', nameHi: 'पालक', nameEn: 'Spinach', season: 'winter', unit: 'bowl', fiber: 2.2, calcium: 99, iron: 2.7 },
  { id: 'carrot', nameHi: 'गाजर', nameEn: 'Carrot', season: 'winter', unit: 'bowl', fiber: 2.8, calcium: 33, iron: 0.3 },
  { id: 'tomato', nameHi: 'टमाटर', nameEn: 'Tomato', season: 'year_round', unit: 'piece', fiber: 1.5, calcium: 12, iron: 0.3 },
  { id: 'onion', nameHi: 'प्याज', nameEn: 'Onion', season: 'winter', unit: 'piece', fiber: 1.7, calcium: 23, iron: 0.2 },
  { id: 'cauliflower', nameHi: 'फूलगोभी', nameEn: 'Cauliflower', season: 'winter', unit: 'bowl', fiber: 2.4, calcium: 22, iron: 0.4 },
  { id: 'broccoli', nameHi: 'ब्रोकली', nameEn: 'Broccoli', season: 'winter', unit: 'bowl', fiber: 2.4, calcium: 47, iron: 0.7 },
  { id: 'bottle_gourd', nameHi: 'लौकी', nameEn: 'Bottle Gourd', season: 'summer', unit: 'bowl', fiber: 0.6, calcium: 26, iron: 0.2 },
  { id: 'bitter_gourd', nameHi: 'करेला', nameEn: 'Bitter Gourd', season: 'summer', unit: 'bowl', fiber: 2.4, calcium: 19, iron: 0.4 },
  { id: 'ladyfinger', nameHi: 'भिंडी', nameEn: 'Ladyfinger', season: 'summer', unit: 'bowl', fiber: 3.3, calcium: 66, iron: 0.2 },
  { id: 'pumpkin', nameHi: 'कद्दू', nameEn: 'Pumpkin', season: 'autumn', unit: 'bowl', fiber: 0.5, calcium: 21, iron: 0.8 },
  { id: 'bell_pepper', nameHi: 'शिमला मिर्च', nameEn: 'Bell Pepper', season: 'year_round', unit: 'piece', fiber: 2, calcium: 11, iron: 0.4 },
  { id: 'cucumber', nameHi: 'खीरा', nameEn: 'Cucumber', season: 'summer', unit: 'piece', fiber: 0.5, calcium: 16, iron: 0.3 },
  { id: 'beetroot', nameHi: 'चुकंदर', nameEn: 'Beetroot', season: 'winter', unit: 'bowl', fiber: 2.8, calcium: 16, iron: 0.8 },
  { id: 'mushroom', nameHi: 'मशरूम', nameEn: 'Mushroom', season: 'monsoon', unit: 'bowl', fiber: 0.7, calcium: 3, iron: 0.5 },
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
