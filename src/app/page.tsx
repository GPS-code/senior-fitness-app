'use client';
import { useState, useEffect } from 'react';
import { AssessmentData, FitnessScore } from '@/types/assessment';
import { calculateFitnessScore, getScoreCategoryLabel } from '@/utils/scoring';
import { generateRecommendations } from '@/utils/recommendations';
import { calculateNutritionData } from '@/utils/nutritionCalc';
import { medicalConditions, foodItems, fruits, vegetables } from '@/data/quizData';
import VisitorCounter from '@/components/VisitorCounter';

const initialState: AssessmentData = {
  age: 50,
  gender: 'male',
  diet: 'vegetarian',
  foodIntake: {},
  waterIntake: 0,
  fruitIntake: {},
  vegetableIntake: {},
  walkingMinutes: 0,
  walkingIntensity: 'low',
  yogaMinutes: 0,
  yogaIntensity: 'light',
  strengthTraining: false,
  stairsDaily: 'rarely',
  flexibilityActivity: 'none',
  balanceTraining: false,
  sleepHours: 7,
  sleepQuality: 'good',
  sleepDisturbances: ['none'],
  restDaysPerWeek: 1,
  medicalConditions: [],
  medicationAdherence: 'fair',
  stressLevel: 'moderate',
  mentalWellbeing: 'good',
  teaTiming: 'between_meals',
  chewing: 'no',
  alcoholConsumption: 'none',
  tobaccoUse: 'none',
  socialEngagement: 'moderate',
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState<'hi' | 'en'>('hi'); // NEW: Language toggle
  const [data, setData] = useState<AssessmentData>(initialState);
  const [fitnessScore, setFitnessScore] = useState<FitnessScore | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Load saved state
    const saved = localStorage.getItem('fitnessAssessment');
    if (saved) {
      setData(JSON.parse(saved));
    }
    // Fetch visitor count
    fetchVisitorCount();
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('fitnessAssessment', JSON.stringify(data));
  }, [data]);

  async function fetchVisitorCount() {
    try {
      const res = await fetch('/api/visitors');
      const json = await res.json();
      setVisitorCount(json.count);
    } catch (err) {
      console.error('Failed to fetch visitor count:', err);
    }
  }

  async function incrementVisitorCount() {
    try {
      const res = await fetch('/api/visitors', { method: 'POST' });
      const json = await res.json();
      setVisitorCount(json.count);
    } catch (err) {
      console.error('Failed to increment visitor count:', err);
    }
  }

  function handleSubmit() {
    const score = calculateFitnessScore(data);
    const recs = generateRecommendations(data);
    setFitnessScore(score);
    setRecommendations(recs);
    setShowResults(true);
    incrementVisitorCount();
  }

  function handleReset() {
    setData(initialState);
    setStep(1);
    setShowResults(false);
    localStorage.removeItem('fitnessAssessment');
  }

  function updateData(updates: Partial<AssessmentData>) {
    setData(prev => ({ ...prev, ...updates }));
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 text-slate-800 px-2 py-4 sm:px-4 md:p-8 overflow-x-hidden">
      <header className="w-full max-w-4xl mx-auto text-center mb-8">
        {/* Language Toggle */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setLang('hi')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              lang === 'hi'
                ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg'
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-primary-300'
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              lang === 'en'
                ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg'
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-primary-300'
            }`}
          >
            English
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {lang === 'hi' ? 'FitnessScore' : 'FitnessScore'}
        </h1>
        <p className="text-lg text-slate-600">
          {lang === 'hi' ? 'आपके स्वास्थ्य का आकलन करें | Check Your Fitness' : 'Assess Your Health & Fitness'}
        </p>
      </header>

      {!showResults ? (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 border border-blue-100">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110 shadow-lg'
                      : s < step
                      ? 'bg-success-200 text-success-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s}
                </div>
                {s < 5 && (
                  <div
                    className={`h-1 w-12 md:w-20 transition-all ${
                      s < step ? 'bg-success-300' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1: Demographics & Health */}
          {step === 1 && (
            <Step1Demographics data={data} updateData={updateData} lang={lang} />
          )}

          {/* STEP 2: Nutrition */}
          {step === 2 && (
            <Step2Nutrition data={data} updateData={updateData} lang={lang} />
          )}

          {/* STEP 3: Physical Activity */}
          {step === 3 && (
            <Step3Activity data={data} updateData={updateData} lang={lang} />
          )}

          {/* STEP 4: Sleep & Lifestyle */}
          {step === 4 && (
            <Step4SleepLifestyle data={data} updateData={updateData} lang={lang} />
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <Step5Review data={data} lang={lang} />
          )}

          {/* Navigation */}
          <div className="mt-10 flex justify-between gap-4 border-t pt-6">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-3 text-lg font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {lang === 'hi' ? '← पीछे' : '← Back'}
            </button>
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto px-6 py-3 text-lg font-semibold bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white rounded-xl transition-all shadow-lg"
              >
                {lang === 'hi' ? 'आगे →' : 'Next →'}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-8 py-3 text-xl font-bold bg-gradient-to-r from-success-500 to-primary-500 hover:from-success-600 hover:to-primary-600 text-white rounded-xl transition-all shadow-lg transform hover:scale-105"
              >
                {lang === 'hi' ? 'परिणाम देखें 🎯' : 'See Results 🎯'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <ResultsScreen
          score={fitnessScore!}
          recommendations={recommendations}
          visitorCount={visitorCount}
          onReset={handleReset}
        />
      )}
    </main>
  );
}

// ============== STEP COMPONENTS ==============

function Step1Demographics({ data, updateData, lang }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">{lang === 'hi' ? '👤 व्यक्तिगत जानकारी' : '👤 Personal Information'}</h2>

      {/* Age */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' ? `आपकी उम्र: ${data.age} साल` : `Your Age: ${data.age} years`}
        </label>
        <input
          type="range"
          min="50"
          max="100"
          value={data.age}
          onChange={e => updateData({ age: parseInt(e.target.value) })}
          className="w-full h-3 bg-gradient-to-r from-primary-200 to-purple-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-sm text-slate-500 mt-2">
          <span>50</span>
          <span>100+</span>
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'लिंग' : 'Gender'}</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'male', label: '🧑 पुरुष' },
            { id: 'female', label: '👩 महिला' },
            { id: 'prefer_not_to_say', labelHi: '❓ कहना नहीं चाहता', labelEn: '❓ Prefer not to say' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => updateData({ gender: opt.id })}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all ${
                data.gender === opt.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diet */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'खान-पान की आदत' : 'Diet Type'}</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'vegetarian', labelHi: '🥗 शाकाहारी', labelEn: '🥗 Vegetarian' },
            { id: 'vegan', labelHi: '🌱 वीगन', labelEn: '🌱 Vegan' },
            { id: 'eggetarian', labelHi: '🥚 अंडा-शाकाहारी', labelEn: '🥚 Eggetarian' },
            { id: 'nonvegetarian', labelHi: '🍗 मांसाहारी', labelEn: '🍗 Non-Vegetarian' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => updateData({ diet: opt.id })}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all ${
                data.diet === opt.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {lang === 'hi' ? opt.labelHi : opt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' ? 'स्वास्थ्य समस्याएं (कोई भी चुनें)' : 'Health Issues (Select any)'}
        </label>
        <div className="grid grid-cols-1 gap-2">
          {medicalConditions.map(cond => (
            <label
              key={cond.id}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                data.medicalConditions.includes(cond.id)
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={data.medicalConditions.includes(cond.id)}
                onChange={() => {
                  updateData({
                    medicalConditions: data.medicalConditions.includes(cond.id)
                      ? data.medicalConditions.filter((c: string) => c !== cond.id)
                      : [...data.medicalConditions, cond.id],
                  });
                }}
                className="w-6 h-6 accent-emerald-600 cursor-pointer"
              />
              <span className="ml-3 text-lg">{lang === 'hi' ? cond.labelHi : cond.labelEn}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Medication Adherence */}
      {data.medicalConditions.length > 0 && (
        <div>
          <label className="block text-xl font-semibold text-slate-700 mb-3">
            🏥 {lang === 'hi' ? 'दवाई लेने में नियमितता' : 'Medication Adherence'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { 
                id: 'poor', 
                labelHi: '❌ खराब', 
                descHi: data.gender === 'female' ? 'कभी-कभी भूल जाती हूँ' : 'कभी-कभी भूल जाता हूँ',
                labelEn: '❌ Poor',
                descEn: 'Sometimes forget'
              },
              { 
                id: 'fair', 
                labelHi: '⚠️ औसत', 
                descHi: data.gender === 'female' ? 'कुछ बार भूल जाती हूँ' : 'कुछ बार भूल जाता हूँ',
                labelEn: '⚠️ Fair',
                descEn: 'Often forget'
              },
              { 
                id: 'good', 
                labelHi: '✓ अच्छी', 
                descHi: data.gender === 'female' ? 'लगभग हमेशा लेती हूँ' : 'लगभग हमेशा लेता हूँ',
                labelEn: '✓ Good',
                descEn: 'Usually remember'
              },
              { 
                id: 'excellent', 
                labelHi: '⭐ शानदार', 
                descHi: data.gender === 'female' ? 'हर दिन समय पर लेती हूँ' : 'हर दिन समय पर लेता हूँ',
                labelEn: '⭐ Excellent',
                descEn: 'Always on time'
              },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateData({ medicationAdherence: opt.id })}
                className={`p-4 text-base font-semibold rounded-xl border-2 transition-all ${
                  data.medicationAdherence === opt.id
                    ? 'border-primary-600 bg-gradient-to-br from-primary-50 to-purple-50 shadow-md'
                    : 'border-slate-200 hover:border-primary-300'
                }`}
              >
                <div className="font-bold text-lg">{lang === 'hi' ? opt.labelHi : opt.labelEn}</div>
                <div className="text-xs text-slate-600 mt-1">{lang === 'hi' ? opt.descHi : opt.descEn}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step2Nutrition({ data, updateData, lang }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">
        {lang === 'hi' ? '🍽️ पोषण और जलयोजन' : '🍽️ Nutrition & Hydration'}
      </h2>

      {/* Water Intake */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' 
            ? `💧 दिन में कितना पानी पीते हैं? ${data.waterIntake} गिलास`
            : `💧 How much water do you drink daily? ${data.waterIntake} glasses`
          }
        </label>
        <div className="flex justify-between items-center gap-3 mb-4">
          <button
            onClick={() => updateData({ waterIntake: Math.max(0, data.waterIntake - 1) })}
            className="w-12 h-12 rounded-full bg-white border-2 border-blue-300 text-2xl font-bold hover:bg-blue-50 transition-all shadow-md"
          >
            −
          </button>
          <div className="flex gap-2 flex-wrap justify-center flex-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative">
                {/* Glass outline */}
                <svg width="28" height="40" viewBox="0 0 28 40" className="relative">
                  <path
                    d="M6 2H22V8H24V38C24 39.1 23.1 40 22 40H6C4.9 40 4 39.1 4 38V8H6V2Z"
                    fill="none"
                    stroke={i < data.waterIntake ? '#0ea5e9' : '#cbd5e1'}
                    strokeWidth="1.5"
                  />
                  {/* Water fill */}
                  {i < data.waterIntake && (
                    <rect
                      x="6"
                      y={28 - (i < data.waterIntake ? 20 : 0)}
                      width="16"
                      height="12"
                      fill="#0ea5e9"
                      opacity="0.7"
                    />
                  )}
                </svg>
              </div>
            ))}
          </div>
          <button
            onClick={() => updateData({ waterIntake: Math.min(15, data.waterIntake + 1) })}
            className="w-12 h-12 rounded-full bg-white border-2 border-blue-300 text-2xl font-bold hover:bg-blue-50 transition-all shadow-md"
          >
            +
          </button>
        </div>
        <p className="text-sm text-slate-600 text-center">
          {lang === 'hi' ? 'लक्ष्य: 8-10 गिलास (2-2.5 लीटर)' : 'Target: 8-10 glasses (2-2.5 liters)'}
        </p>
      </div>

      {/* Food Items */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">🍽️ {lang === 'hi' ? 'भोजन (सप्ताह में कुल कितना)' : 'Food (Total Per Week)'}</h3>
        <p className="text-sm text-slate-600 mb-3">
          {lang === 'hi' 
            ? 'पूरे हफ़्ते में कुल कितना खाते हैं? (उदा: 14 रोटी = हफ़्ते में 2 रोटी प्रतिदिन)' 
            : 'Total amount per week? (e.g., 14 chapatis = 2 per day)'}
        </p>
        <div className="space-y-4">
          {foodItems.map(food => (
            <div key={food.id} className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border-2 border-orange-200">
              <span className="text-lg font-semibold text-slate-700">{lang === 'hi' ? food.nameHi : food.nameEn}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateData({
                    foodIntake: { ...data.foodIntake, [food.id]: Math.max(0, (data.foodIntake[food.id] || 0) - 1) }
                  })}
                  className="w-10 h-10 rounded-full bg-white border-2 border-orange-300 font-bold hover:bg-orange-100 transition-all"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-lg text-slate-800">{data.foodIntake[food.id] || 0}</span>
                <button
                  onClick={() => updateData({
                    foodIntake: { ...data.foodIntake, [food.id]: (data.foodIntake[food.id] || 0) + 1 }
                  })}
                  className="w-10 h-10 rounded-full bg-white border-2 border-orange-300 font-bold hover:bg-orange-100 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fruits */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-3">🍎 {lang === 'hi' ? 'फल (सप्ताह में कुल कितनी बार)' : 'Fruits (Times Per Week)'}</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {fruits.map(fruit => (
            <div key={fruit.id} className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-red-50 p-3 rounded-lg border-2 border-pink-200">
              <span className="text-lg text-slate-700 font-medium">{lang === 'hi' ? fruit.nameHi : fruit.nameEn}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateData({
                    fruitIntake: { ...data.fruitIntake, [fruit.id]: Math.max(0, (data.fruitIntake[fruit.id] || 0) - 1) }
                  })}
                  className="w-8 h-8 rounded-full bg-white border-2 border-pink-300 font-bold text-sm hover:bg-pink-100 transition-all"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-slate-800">{data.fruitIntake[fruit.id] || 0}</span>
                <button
                  onClick={() => updateData({
                    fruitIntake: { ...data.fruitIntake, [fruit.id]: (data.fruitIntake[fruit.id] || 0) + 1 }
                  })}
                  className="w-8 h-8 rounded-full bg-white border-2 border-pink-300 font-bold text-sm hover:bg-pink-100 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vegetables */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-3">🥬 {lang === 'hi' ? 'सब्जियां (सप्ताह में कुल कितनी बार)' : 'Vegetables (Times Per Week)'}</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {vegetables.map(veg => (
            <div key={veg.id} className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border-2 border-emerald-200">
              <span className="text-lg text-slate-700 font-medium">{lang === 'hi' ? veg.nameHi : veg.nameEn}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateData({
                    vegetableIntake: { ...data.vegetableIntake, [veg.id]: Math.max(0, (data.vegetableIntake[veg.id] || 0) - 1) }
                  })}
                  className="w-8 h-8 rounded-full bg-white border-2 border-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-all"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-slate-800">{data.vegetableIntake[veg.id] || 0}</span>
                <button
                  onClick={() => updateData({
                    vegetableIntake: { ...data.vegetableIntake, [veg.id]: (data.vegetableIntake[veg.id] || 0) + 1 }
                  })}
                  className="w-8 h-8 rounded-full bg-white border-2 border-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3Activity({ data, updateData, lang }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">{lang === 'hi' ? '🏃 व्यायाम और गतिविधि' : '🏃 Physical Activity'}</h2>

      {/* Walking */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' ? 'रोज़ कितना समय तेज़ चलते हैं?' : 'How much do you walk daily?'} {data.walkingMinutes} मिनट
        </label>
        <input
          type="range"
          min="0"
          max="120"
          value={data.walkingMinutes}
          onChange={e => updateData({ walkingMinutes: parseInt(e.target.value) })}
          className="w-full h-3 bg-slate-200 rounded-lg accent-emerald-600"
        />
        <div className="flex justify-between text-sm text-slate-600 mt-2">
          <span>0 मिनट</span>
          <span>120 मिनट</span>
        </div>
        <div className="mt-3">
          <label className="text-lg font-semibold text-slate-700 mb-2 block">{lang === 'hi' ? 'व्यायाम की तीव्रता' : 'Exercise Intensity'}</label>
          <select
            value={data.walkingIntensity}
            onChange={e => updateData({ walkingIntensity: e.target.value })}
            className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg"
          >
            <option value="low">🐢 धीमा (हल्के पैदल चलना)</option>
            <option value="moderate">🚴 मध्यम (तेज़ चलना)</option>
            <option value="vigorous">🏃 तीव्र (दौड़ना)</option>
          </select>
        </div>
      </div>

      {/* Yoga */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' ? 'योग करते हैं?' : 'Do you practice yoga?'} {data.yogaMinutes} मिनट
        </label>
        <input
          type="range"
          min="0"
          max="120"
          value={data.yogaMinutes}
          onChange={e => updateData({ yogaMinutes: parseInt(e.target.value) })}
          className="w-full h-3 bg-slate-200 rounded-lg accent-purple-600"
        />
        <div className="mt-3">
          <label className="text-lg font-semibold text-slate-700 mb-2 block">योग की कठिनाई</label>
          <select
            value={data.yogaIntensity}
            onChange={e => updateData({ yogaIntensity: e.target.value })}
            className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg"
          >
            <option value="light">🧘 हल्का (रिलैक्सिंग)</option>
            <option value="moderate">🧘‍♂️ मध्यम (नियमित योग)</option>
            <option value="intense">💪 तीव्र (कठिन आसन)</option>
          </select>
        </div>
      </div>

      {/* Strength Training */}
      <div>
        <label className="text-xl font-semibold text-slate-700 mb-3 block">{lang === 'hi' ? '🏋️ ताकत बढ़ाने का व्यायाम करते हैं?' : '🏋️ Do you do strength training?'}</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { id: true, label: '✓ हाँ' },
            { id: false, labelHi: '✗ नहीं', labelEn: '✗ No' },
          ].map(opt => (
            <button
              key={String(opt.id)}
              onClick={() => updateData({ strengthTraining: opt.id })}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all ${
                data.strengthTraining === opt.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {data.strengthTraining && (
          <div>
            <label className="text-lg font-semibold text-slate-700 mb-2 block">
              सप्ताह में कितने दिन? ({Math.round(data.strengthMinutes || 0)} मिनट / दिन)
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={data.strengthMinutes || 0}
              onChange={e => updateData({ strengthMinutes: parseInt(e.target.value) })}
              className="w-full h-3 bg-slate-200 rounded-lg accent-emerald-600"
            />
          </div>
        )}
      </div>

      {/* Flexibility */}
      <div>
        <label className="text-xl font-semibold text-slate-700 mb-3 block">{lang === 'hi' ? '🧘 शरीर को मुलायम और लचीला बनाने का व्यायाम' : '🧘 Stretching & Flexibility'}</label>
        <select
          value={data.flexibilityActivity}
          onChange={e => updateData({ flexibilityActivity: e.target.value })}
          className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg mb-3"
        >
          <option value="none">कोई नहीं</option>
          <option value="stretching">स्ट्रेचिंग (खिंचाव)</option>
          <option value="tai_chi">ताई ची</option>
          <option value="other">अन्य</option>
        </select>
        {data.flexibilityActivity !== 'none' && (
          <input
            type="range"
            min="0"
            max="60"
            value={data.flexibilityMinutes || 0}
            onChange={e => updateData({ flexibilityMinutes: parseInt(e.target.value) })}
            className="w-full h-3 bg-slate-200 rounded-lg accent-emerald-600"
          />
        )}
      </div>

      {/* Balance Training */}
      <div>
        <label className="text-xl font-semibold text-slate-700 mb-3 block">{lang === 'hi' ? '⚖️ संतुलन प्रशिक्षण करते हैं?' : '⚖️ Do you do balance training?'}</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { id: true, label: '✓ हाँ' },
            { id: false, labelHi: '✗ नहीं', labelEn: '✗ No' },
          ].map(opt => (
            <button
              key={String(opt.id)}
              onClick={() => updateData({ balanceTraining: opt.id })}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all ${
                data.balanceTraining === opt.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {data.balanceTraining && (
          <input
            type="range"
            min="0"
            max="60"
            value={data.balanceMinutes || 0}
            onChange={e => updateData({ balanceMinutes: parseInt(e.target.value) })}
            className="w-full h-3 bg-slate-200 rounded-lg accent-emerald-600"
          />
        )}
      </div>

      {/* Stairs */}
      <div>
        <label className="text-xl font-semibold text-slate-700 mb-3 block">🪜 सीढ़ियां कितनी चढ़ते हैं?</label>
        <select
          value={data.stairsDaily}
          onChange={e => updateData({ stairsDaily: e.target.value })}
          className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg"
        >
          <option value="rarely">कभी-कभी</option>
          <option value="sometimes">कभी-कभी</option>
          <option value="daily">रोज़</option>
        </select>
      </div>
    </div>
  );
}

function Step4SleepLifestyle({ data, updateData, lang }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">{lang === 'hi' ? '😴 नींद और जीवनशैली' : '😴 Sleep & Lifestyle'}</h2>

      {/* Sleep Hours */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' ? 'रात को कितने घंटे सोते हैं?' : 'How many hours do you sleep?'} {data.sleepHours} घंटे
        </label>
        <input
          type="range"
          min="4"
          max="12"
          value={data.sleepHours}
          onChange={e => updateData({ sleepHours: parseInt(e.target.value) })}
          className="w-full h-3 bg-slate-200 rounded-lg accent-indigo-600"
        />
        <p className="text-sm text-slate-600 mt-2">{lang === 'hi' ? 'लक्ष्य: 7-8 घंटे' : 'Target: 7-8 hours'}</p>
      </div>

      {/* Sleep Quality */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'नींद की गुणवत्ता' : 'Sleep Quality'}</label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: 'poor', emoji: '😞', label: 'खराब' },
            { id: 'fair', emoji: '😐', label: 'औसत' },
            { id: 'good', emoji: '🙂', label: 'अच्छी' },
            { id: 'excellent', emoji: '😴', label: 'शानदार' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => updateData({ sleepQuality: opt.id })}
              className={`p-4 rounded-xl border-2 font-semibold transition-all text-center ${
                data.sleepQuality === opt.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="text-3xl mb-1">{opt.emoji}</div>
              <div className="text-sm">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sleep Disturbances */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'नींद में बाधा' : 'Sleep Disturbances'}</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'none', labelHi: 'कोई नहीं', labelEn: 'None' },
            { id: 'insomnia', label: 'अनिद्रा' },
            { id: 'apnea', label: 'स्लीप एपनिया' },
            { id: 'frequent_waking', label: 'बार-बार जागना' },
          ].map(opt => (
            <label
              key={opt.id}
              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                data.sleepDisturbances.includes(opt.id)
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200'
              }`}
            >
              <input
                type="checkbox"
                checked={data.sleepDisturbances.includes(opt.id)}
                onChange={() => {
                  updateData({
                    sleepDisturbances: data.sleepDisturbances.includes(opt.id)
                      ? data.sleepDisturbances.filter((d: string) => d !== opt.id)
                      : [...data.sleepDisturbances, opt.id],
                  });
                }}
                className="w-5 h-5 accent-indigo-600"
              />
              <span className="ml-2 text-lg">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rest Days */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          {lang === 'hi' ? 'सप्ताह में कितने दिन आराम करते हैं?' : 'Rest Days Per Week'} {data.restDaysPerWeek} दिन
        </label>
        <input
          type="range"
          min="0"
          max="7"
          value={data.restDaysPerWeek}
          onChange={e => updateData({ restDaysPerWeek: parseInt(e.target.value) })}
          className="w-full h-3 bg-slate-200 rounded-lg accent-emerald-600"
        />
      </div>

      {/* Stress Level */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'तनाव का स्तर' : 'Stress Level'}</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'low', label: '😌 कम' },
            { id: 'moderate', label: '😐 मध्यम' },
            { id: 'high', label: '😟 अधिक' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => updateData({ stressLevel: opt.id })}
              className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all ${
                data.stressLevel === opt.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mental Wellbeing */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">मानसिक स्वास्थ्य</label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: 'poor', emoji: '😞', label: 'खराब' },
            { id: 'fair', emoji: '😐', label: 'औसत' },
            { id: 'good', emoji: '🙂', label: 'अच्छा' },
            { id: 'excellent', emoji: '😄', label: 'शानदार' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => updateData({ mentalWellbeing: opt.id })}
              className={`p-3 rounded-xl border-2 font-semibold transition-all text-center ${
                data.mentalWellbeing === opt.id
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="text-3xl mb-1">{opt.emoji}</div>
              <div className="text-xs">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Social Engagement */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'सामाजिक गतिविधि' : 'Social Engagement'}</label>
        <select
          value={data.socialEngagement}
          onChange={e => updateData({ socialEngagement: e.target.value })}
          className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg"
        >
          <option value="isolated">अकेले (सामाजिक संपर्क नहीं)</option>
          <option value="minimal">न्यूनतम (कम संपर्क)</option>
          <option value="moderate">मध्यम (कभी-कभी)</option>
          <option value="active">सक्रिय (बहुत संपर्क)</option>
        </select>
      </div>

      {/* Alcohol */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'शराब का सेवन' : 'Alcohol Consumption'}</label>
        <select
          value={data.alcoholConsumption}
          onChange={e => updateData({ alcoholConsumption: e.target.value })}
          className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg"
        >
          <option value="none">कोई नहीं</option>
          <option value="occasional">कभी-कभी</option>
          <option value="regular">नियमित</option>
          <option value="daily">रोज़</option>
        </select>
      </div>

      {/* Tobacco */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">{lang === 'hi' ? 'तंबाकू का सेवन' : 'Tobacco Use'}</label>
        <select
          value={data.tobaccoUse}
          onChange={e => updateData({ tobaccoUse: e.target.value })}
          className="w-full p-3 border-2 border-slate-200 rounded-lg font-semibold text-lg"
        >
          <option value="none">कोई नहीं</option>
          <option value="quit_more_5yrs">5 साल से अधिक पहले छोड़ा</option>
          <option value="quit_less_5yrs">5 साल से कम पहले छोड़ा</option>
          <option value="current">वर्तमान में</option>
        </select>
      </div>
    </div>
  );
}

function Step5Review({ data, lang }: any) {
  const nutrition = calculateNutritionData(data);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">📋 समीक्षा</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-slate-600">उम्र</p>
          <p className="text-2xl font-bold text-slate-800">{data.age} साल</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-xl border-2 border-pink-200">
          <p className="text-sm text-slate-600">{lang === 'hi' ? 'लिंग' : 'Gender'}</p>
          <p className="text-2xl font-bold text-slate-800">
            {data.gender === 'male' ? 'पुरुष' : data.gender === 'female' ? 'महिला' : 'अन्य'}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
          <p className="text-sm text-slate-600">प्रोटीन</p>
          <p className="text-2xl font-bold text-slate-800">{nutrition.protein}g / दिन</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
          <p className="text-sm text-slate-600">पानी</p>
          <p className="text-2xl font-bold text-slate-800">{nutrition.waterLiters}L / दिन</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
          <p className="text-sm text-slate-600">नींद</p>
          <p className="text-2xl font-bold text-slate-800">{data.sleepHours} घंटे</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border-2 border-emerald-200">
          <p className="text-sm text-slate-600">चलना</p>
          <p className="text-2xl font-bold text-slate-800">{data.walkingMinutes} मिनट/दिन</p>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
        <p className="text-center text-lg font-semibold text-amber-900">
          ✓ सभी जानकारी भर दी गई है। परिणाम देखने के लिए आगे बढ़ें।
        </p>
      </div>
    </div>
  );
}

function ResultsScreen({ score, recommendations, visitorCount, onReset }: any) {
  const category = getScoreCategoryLabel(score.category);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 border-2 border-primary-200">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🎯 आपके परिणाम
        </h2>

        {/* Score Circle with vibrant gradient */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="3"
              strokeDasharray={`${(score.total / 100) * 282.7} 282.7`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">{score.total}</div>
            <div className="text-sm text-slate-600">/100</div>
          </div>
        </div>

        <h3 style={{ color: category.color }} className="text-3xl font-bold mb-2">
          {category.hi}
        </h3>
        <p className="text-lg text-slate-600 mb-6">
          {score.category === 'excellent'
            ? 'आप एक स्वस्थ जीवनशैली बनाए रखे हुए हैं!'
            : score.category === 'good'
            ? 'आपकी फिटनेस अच्छी है, कुछ सुधार की गुंजाइश है।'
            : score.category === 'fair'
            ? 'आपको कई क्षेत्रों में सुधार की जरूरत है।'
            : 'आपके स्वास्थ्य में सुधार के लिए तत्काल कदम चाहिए।'}
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'पोषण', value: score.nutritionScore, max: 25, color: '#10B981' },
          { label: 'व्यायाम', value: score.activityScore, max: 25, color: '#0EA5E9' },
          { label: 'नींद', value: score.sleepScore, max: 20, color: '#8B5CF6' },
          { label: 'स्वास्थ्य', value: score.healthScore, max: 30, color: '#F59E0B' },
        ].map(item => (
          <div key={item.label} className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
            <p className="text-sm text-slate-600 mb-2">{item.label}</p>
            <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden mb-2">
              <div
                style={{
                  width: `${(item.value / item.max) * 100}%`,
                  backgroundColor: item.color,
                }}
                className="h-full transition-all duration-500"
              />
            </div>
            <p className="text-lg font-bold text-slate-800 text-center">
              {item.value}/{item.max}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-slate-700 mb-4">💡 व्यक्तिगत सुझाव</h3>
        <div className="space-y-4">
          {recommendations.slice(0, 5).map((rec: any, idx: number) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border-2 ${
                rec.priority === 'critical'
                  ? 'border-red-300 bg-red-50'
                  : rec.priority === 'high'
                  ? 'border-orange-300 bg-orange-50'
                  : rec.priority === 'medium'
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-emerald-300 bg-emerald-50'
              }`}
            >
              <p className="text-lg font-bold text-slate-800 mb-2">{rec.titleHi}</p>
              <p className="text-slate-700 mb-3">{rec.descriptionHi}</p>
              <p className="text-sm font-semibold text-slate-600">✓ {rec.actionHi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Counter */}
      {visitorCount && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-300 rounded-xl p-6 text-center mb-8">
          <p className="text-slate-600 text-lg mb-2">यह टेस्ट लिया है</p>
          <p className="text-5xl font-bold text-emerald-700">{visitorCount.toLocaleString('hi-IN')}</p>
          <p className="text-slate-600 mt-2">लोगों ने 👥</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-8">
        <p className="text-amber-900 font-semibold">
          ⚠️ <strong>महत्वपूर्ण:</strong> यह ऐप केवल सामान्य जानकारी के लिए है। किसी भी स्वास्थ्य निर्णय के लिए कृपया अपने डॉक्टर से परामर्श लें।
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => window.print()}
          className="flex-1 px-6 py-3 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
        >
          🖨️ प्रिंट करें
        </button>
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all"
        >
          🔄 फिर से शरू करें
        </button>
      </div>
    </div>
  );
}
