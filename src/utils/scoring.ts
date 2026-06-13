import { AssessmentData, FitnessScore, NutritionData } from '@/types/assessment';
import { calculateNutritionData } from './nutritionCalc';

export function calculateFitnessScore(data: AssessmentData): FitnessScore {
  const nutritionScore = calculateNutritionScore(data);
  const activityScore = calculateActivityScore(data);
  const sleepScore = calculateSleepScore(data);
  const healthScore = calculateHealthScore(data);

  const total = nutritionScore + activityScore + sleepScore + healthScore;

  return {
    total: Math.round(total),
    nutritionScore: Math.round(nutritionScore),
    activityScore: Math.round(activityScore),
    sleepScore: Math.round(sleepScore),
    healthScore: Math.round(healthScore),
    category: getScoreCategory(total),
  };
}

function calculateNutritionScore(data: AssessmentData): number {
  const nutrition = calculateNutritionData(data);
  let score = 0;

  // Protein adequacy (0-7)
  if (nutrition.protein >= 60) score += 7;
  else if (nutrition.protein >= 50) score += 6;
  else if (nutrition.protein >= 40) score += 4;
  else if (nutrition.protein >= 30) score += 2;

  // Fiber adequacy (0-6)
  if (nutrition.fiber >= 20) score += 6;
  else if (nutrition.fiber >= 15) score += 3;

  // Calcium intake (0-6)
  if (nutrition.calcium >= 1000) score += 6;
  else if (nutrition.calcium >= 800) score += 3;

  // Hydration (0-4)
  if (nutrition.waterLiters >= 2.0) score += 4;
  else if (nutrition.waterLiters >= 1.5) score += 2;

  // Fruits & vegetables (0-2)
  if (nutrition.fruitVegGrams >= 400) score += 2;
  else if (nutrition.fruitVegGrams >= 300) score += 1;

  // Iron intake (bonus 2 pts for certain conditions)
  if (nutrition.iron >= 8) score += 2;

  return Math.min(score, 25);
}

function calculateActivityScore(data: AssessmentData): number {
  let score = 0;

  // Aerobic activity (0-12)
  const weeklyAerobic = data.walkingMinutes * 7; // assuming daily
  if (weeklyAerobic >= 150) score += 12;
  else if (weeklyAerobic >= 75) score += 6;
  else if (weeklyAerobic >= 30) score += 3;

  // Resistance training (0-8)
  if (data.strengthTraining) {
    const weeklyStrength = (data.strengthMinutes || 0) * (data.strengthTraining ? 2 : 0); // assuming 2x/week
    if (weeklyStrength >= 60) score += 8;
    else if (weeklyStrength >= 30) score += 4;
  }

  // Flexibility & balance (0-5)
  let flexibilityActivities = 0;
  if (data.flexibilityActivity !== 'none') flexibilityActivities++;
  if (data.balanceTraining) flexibilityActivities++;
  if (data.stairsDaily === 'daily') flexibilityActivities++;

  if (flexibilityActivities >= 3) score += 5;
  else if (flexibilityActivities >= 2) score += 3;
  else if (flexibilityActivities >= 1) score += 2;

  // Yoga (bonus for intensity)
  if (data.yogaMinutes >= 30 && data.yogaIntensity === 'intense') score += 2;

  return Math.min(score, 25);
}

function calculateSleepScore(data: AssessmentData): number {
  let score = 0;

  // Sleep duration (0-10)
  if (data.sleepHours >= 7 && data.sleepHours <= 8) score += 10;
  else if ((data.sleepHours >= 6 && data.sleepHours < 7) || (data.sleepHours > 8 && data.sleepHours <= 9)) score += 6;
  else if (data.sleepHours >= 5 || data.sleepHours <= 9) score += 2;

  // Sleep quality (0-6)
  if (data.sleepQuality === 'excellent') score += 6;
  else if (data.sleepQuality === 'good') score += 4;
  else if (data.sleepQuality === 'fair') score += 2;

  // Sleep disturbances (0-4)
  if (data.sleepDisturbances.includes('none') || data.sleepDisturbances.length === 0) {
    score += 4;
  } else if (data.sleepDisturbances.length === 1) {
    score += 2;
  }

  // Rest days (0-4)
  if (data.restDaysPerWeek >= 3) score += 4;
  else if (data.restDaysPerWeek >= 1) score += 2;

  return Math.min(score, 20);
}

function calculateHealthScore(data: AssessmentData): number {
  let score = 30; // Start with full points

  // Number of medical conditions
  const conditionCount = data.medicalConditions.length;

  if (conditionCount === 0) {
    score = 30; // No adjustments for no conditions
  } else if (conditionCount === 1) {
    if (data.medicationAdherence === 'excellent') score = 25;
    else if (data.medicationAdherence === 'good') score = 22;
    else if (data.medicationAdherence === 'fair') score = 15;
    else score = 10;
  } else if (conditionCount === 2) {
    if (data.medicationAdherence === 'good') score = 22;
    else if (data.medicationAdherence === 'fair') score = 15;
    else score = 10;
  } else {
    if (data.medicationAdherence === 'good') score = 18;
    else if (data.medicationAdherence === 'fair') score = 12;
    else score = 5;
  }

  // Stress level adjustment
  if (data.stressLevel === 'high') score -= 5;
  else if (data.stressLevel === 'moderate') score -= 2;

  // Mental wellbeing adjustment
  if (data.mentalWellbeing === 'poor') score -= 5;
  else if (data.mentalWellbeing === 'fair') score -= 2;

  // Social engagement adjustment
  if (data.socialEngagement === 'isolated') score -= 3;
  else if (data.socialEngagement === 'minimal') score -= 1;

  // Tobacco & alcohol adjustment
  if (data.tobaccoUse === 'current') score -= 5;
  else if (data.tobaccoUse === 'quit_less_5yrs') score -= 2;

  if (data.alcoholConsumption === 'daily' || data.alcoholConsumption === 'regular') score -= 5;
  else if (data.alcoholConsumption === 'occasional') score -= 1;

  return Math.max(Math.min(score, 30), 0);
}

function getScoreCategory(score: number): 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor' {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'fair';
  if (score >= 45) return 'poor';
  return 'very_poor';
}

export function getScoreCategoryLabel(category: string): { hi: string; en: string; color: string } {
  const categories: Record<string, { hi: string; en: string; color: string }> = {
    excellent: { hi: 'शानदार फिटनेस प्रोफाइल', en: 'Excellent fitness profile', color: '#059669' },
    good: { hi: 'अच्छी फिटनेस प्रोफाइल', en: 'Good fitness profile', color: '#10B981' },
    fair: { hi: 'औसत फिटनेस प्रोफाइल', en: 'Fair fitness profile', color: '#F59E0B' },
    poor: { hi: 'कमजोर फिटनेस प्रोफाइल', en: 'Poor fitness profile', color: '#EA8C55' },
    very_poor: { hi: 'बहुत कमजोर फिटनेस प्रोफाइल', en: 'Very poor fitness profile', color: '#DC2626' },
  };
  return categories[category] || categories.fair;
}
