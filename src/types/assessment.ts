export interface AssessmentData {
  // Demographics
  age: number;
  gender: 'male' | 'female' | 'prefer_not_to_say';
  diet: 'vegetarian' | 'vegan' | 'eggetarian' | 'nonvegetarian';

  // Nutrition Intake
  foodIntake: Record<string, number>; // food id -> servings per day
  waterIntake: number; // glasses per day
  fruitIntake: Record<string, number>; // fruit id -> servings per day
  vegetableIntake: Record<string, number>; // veg id -> servings per day

  // Physical Activity
  walkingMinutes: number;
  walkingIntensity: 'low' | 'moderate' | 'vigorous';
  yogaMinutes: number;
  yogaIntensity: 'light' | 'moderate' | 'intense';
  strengthTraining: boolean;
  strengthMinutes?: number;
  stairsDaily: 'rarely' | 'sometimes' | 'daily';
  flexibilityActivity: 'none' | 'stretching' | 'tai_chi' | 'other';
  flexibilityMinutes?: number;
  balanceTraining: boolean;
  balanceMinutes?: number;

  // Sleep & Rest
  sleepHours: number;
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  sleepDisturbances: ('none' | 'insomnia' | 'apnea' | 'frequent_waking')[];
  restDaysPerWeek: number;

  // Health Management
  medicalConditions: string[];
  medicationAdherence: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'moderate' | 'high';
  mentalWellbeing: 'poor' | 'fair' | 'good' | 'excellent';

  // Lifestyle
  teaTiming: 'with_meals' | 'between_meals' | 'no_tea';
  chewing: 'yes' | 'no';
  alcoholConsumption: 'none' | 'occasional' | 'regular' | 'daily';
  tobaccoUse: 'none' | 'quit_less_5yrs' | 'quit_more_5yrs' | 'current';
  socialEngagement: 'isolated' | 'minimal' | 'moderate' | 'active';
}

export interface FitnessScore {
  total: number; // 0-100
  nutritionScore: number; // 0-25
  activityScore: number; // 0-25
  sleepScore: number; // 0-20
  healthScore: number; // 0-30
  category: 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
}

export interface NutritionData {
  protein: number; // grams
  fiber: number; // grams
  calcium: number; // mg
  iron: number; // mg
  waterLiters: number;
  fruitVegGrams: number;
  totalCalories: number;
}

export interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'nutrition' | 'activity' | 'sleep' | 'health' | 'lifestyle';
  titleHi: string; // Hindi title
  titleEn: string; // English for reference
  descriptionHi: string;
  actionHi: string;
  emoji: string;
}

export interface MedicalCondition {
  id: string;
  labelHi: string;
  labelEn: string;
}

export interface FoodItem {
  id: string;
  nameHi: string;
  nameEn: string;
  category: 'Staples' | 'Proteins' | 'Extras';
  unit: string;
  protein?: number;
  fiber?: number;
  calcium?: number;
  iron?: number;
}

export interface FruitItem {
  id: string;
  nameHi: string;
  nameEn: string;
  season: string;
  unit: string;
  fiber?: number;
  vitaminC?: number;
}

export interface VegetableItem {
  id: string;
  nameHi: string;
  nameEn: string;
  season: string;
  unit: string;
  fiber?: number;
  calcium?: number;
  iron?: number;
}
