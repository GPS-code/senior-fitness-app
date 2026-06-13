import { AssessmentData, NutritionData } from '@/types/assessment';
import { foodItems, fruits, vegetables } from '@/data/quizData';

export function calculateNutritionData(data: AssessmentData): NutritionData {
  let protein = 0;
  let fiber = 0;
  let calcium = 0;
  let iron = 0;
  let fruitVegGrams = 0;

  // Calculate from food items
  for (const [foodId, servings] of Object.entries(data.foodIntake)) {
    const food = foodItems.find(f => f.id === foodId);
    if (food) {
      protein += (food.protein || 0) * servings;
      fiber += (food.fiber || 0) * servings;
      calcium += (food.calcium || 0) * servings;
      iron += (food.iron || 0) * servings;
    }
  }

  // Calculate from fruits
  for (const [fruitId, servings] of Object.entries(data.fruitIntake)) {
    const fruit = fruits.find(f => f.id === fruitId);
    if (fruit) {
      fiber += (fruit.fiber || 0) * servings;
      // Approximate 150g per serving for fruits
      fruitVegGrams += 150 * servings;
    }
  }

  // Calculate from vegetables
  for (const [vegId, servings] of Object.entries(data.vegetableIntake)) {
    const veg = vegetables.find(v => v.id === vegId);
    if (veg) {
      fiber += (veg.fiber || 0) * servings;
      calcium += (veg.calcium || 0) * servings;
      iron += (veg.iron || 0) * servings;
      // Approximate 100g per serving for vegetables
      fruitVegGrams += 100 * servings;
    }
  }

  // Water intake in liters
  const waterLiters = data.waterIntake * 0.24; // 1 glass ≈ 240ml

  return {
    protein: Math.round(protein),
    fiber: Math.round(fiber * 10) / 10,
    calcium: Math.round(calcium),
    iron: Math.round(iron * 10) / 10,
    waterLiters: Math.round(waterLiters * 10) / 10,
    fruitVegGrams: Math.round(fruitVegGrams),
    totalCalories: estimateCalories(protein, fiber),
  };
}

function estimateCalories(protein: number, fiber: number): number {
  // Rough estimate: protein 4 cal/g, carbs & fat ~5 cal/g
  return Math.round(protein * 4 + fiber * 3);
}

export function getNutritionStatus(nutrition: NutritionData): Record<string, 'good' | 'fair' | 'poor'> {
  return {
    protein: nutrition.protein >= 50 ? 'good' : nutrition.protein >= 40 ? 'fair' : 'poor',
    fiber: nutrition.fiber >= 25 ? 'good' : nutrition.fiber >= 15 ? 'fair' : 'poor',
    calcium: nutrition.calcium >= 1000 ? 'good' : nutrition.calcium >= 800 ? 'fair' : 'poor',
    iron: nutrition.iron >= 8 ? 'good' : nutrition.iron >= 5 ? 'fair' : 'poor',
    water: nutrition.waterLiters >= 2.0 ? 'good' : nutrition.waterLiters >= 1.5 ? 'fair' : 'poor',
    fruitVeg: nutrition.fruitVegGrams >= 400 ? 'good' : nutrition.fruitVegGrams >= 300 ? 'fair' : 'poor',
  };
}
