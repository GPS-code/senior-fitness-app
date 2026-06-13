'use client';
import { useState, useEffect } from 'react';
import { AssessmentData, FitnessScore } from '@/types/assessment';
import { calculateFitnessScore, getScoreCategoryLabel } from '@/utils/scoring';
import { generateRecommendations } from '@/utils/recommendations';
import { calculateNutritionData } from '@/utils/nutritionCalc';
import { medicalConditions, foodItems, fruits, vegetables } from '@/data/quizData';
import VisitorCounter from '@/components/VisitorCounter';

const initialState: AssessmentData = {
  age: 65,
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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 p-4 md:p-8">
      <header className="w-full max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-2">
          वरिष्ठ नागरिक फिटनेस जांच
        </h1>
        <p className="text-lg text-slate-600">
          आइए जानते हैं कि आप कितने स्वस्थ हैं
        </p>
      </header>

      {!showResults ? (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-slate-100">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step
                      ? 'bg-emerald-600 text-white scale-110'
                      : s < step
                      ? 'bg-emerald-200 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s}
                </div>
                {s < 5 && (
                  <div
                    className={`h-1 w-12 md:w-20 ${
                      s < step ? 'bg-emerald-200' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1: Demographics & Health */}
          {step === 1 && (
            <Step1Demographics data={data} updateData={updateData} />
          )}

          {/* STEP 2: Nutrition */}
          {step === 2 && (
            <Step2Nutrition data={data} updateData={updateData} />
          )}

          {/* STEP 3: Physical Activity */}
          {step === 3 && (
            <Step3Activity data={data} updateData={updateData} />
          )}

          {/* STEP 4: Sleep & Lifestyle */}
          {step === 4 && (
            <Step4SleepLifestyle data={data} updateData={updateData} />
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <Step5Review data={data} />
          )}

          {/* Navigation */}
          <div className="mt-10 flex justify-between gap-4 border-t pt-6">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-3 text-lg font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← पीछे
            </button>
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="ml-auto px-6 py-3 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-lg"
              >
                आगे →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-8 py-3 text-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-lg transform hover:scale-105"
              >
                परिणाम देखें 🎯
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

function Step1Demographics({ data, updateData }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">👤 व्यक्तिगत जानकारी</h2>

      {/* Age */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          आपकी उम्र: {data.age} साल
        </label>
        <input
          type="range"
          min="60"
          max="100"
          value={data.age}
          onChange={e => updateData({ age: parseInt(e.target.value) })}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <div className="flex justify-between text-sm text-slate-500 mt-2">
          <span>60</span>
          <span>100+</span>
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">लिंग</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'male', label: '🧑 पुरुष' },
            { id: 'female', label: '👩 महिला' },
            { id: 'prefer_not_to_say', label: '❓ कहना नहीं चाहता' },
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
        <label className="block text-xl font-semibold text-slate-700 mb-3">खान-पान की आदत</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'vegetarian', label: '🥗 शाकाहारी' },
            { id: 'vegan', label: '🌱 वीगन' },
            { id: 'eggetarian', label: '🥚 अंडा-शाकाहारी' },
            { id: 'nonvegetarian', label: '🍗 मांसाहारी' },
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
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          स्वास्थ्य समस्याएं (कोई भी चुनें)
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
              <span className="ml-3 text-lg">{cond.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Medication Adherence */}
      {data.medicalConditions.length > 0 && (
        <div>
          <label className="block text-xl font-semibold text-slate-700 mb-3">
            दवाई लेने में नियमितता
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'poor', label: '❌ खराब' },
              { id: 'fair', label: '⚠️ औसत' },
              { id: 'good', label: '✓ अच्छी' },
              { id: 'excellent', label: '⭐ बहुत अच्छी' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => updateData({ medicationAdherence: opt.id })}
                className={`p-3 text-base font-semibold rounded-lg border-2 transition-all ${
                  data.medicationAdherence === opt.id
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step2Nutrition({ data, updateData }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">🍽️ पोषण और जलयोजन</h2>

      {/* Water Intake */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          दिन में कितना पानी पीते हैं? {data.waterIntake} गिलास
        </label>
        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => updateData({ waterIntake: Math.max(0, data.waterIntake - 1) })}
            className="w-12 h-12 rounded-full bg-white border-2 border-slate-300 text-2xl font-bold hover:bg-slate-100 transition-all"
          >
            −
          </button>
          <div className="flex gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-12 rounded-lg transition-all ${
                  i < data.waterIntake
                    ? 'bg-blue-500'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => updateData({ waterIntake: Math.min(15, data.waterIntake + 1) })}
            className="w-12 h-12 rounded-full bg-white border-2 border-slate-300 text-2xl font-bold hover:bg-slate-100 transition-all"
          >
            +
          </button>
        </div>
        <p className="text-sm text-slate-600 mt-2">लक्ष्य: 8-10 गिलास (2-2.5 लीटर)</p>
      </div>

      {/* Food Items */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-3">भोजन की मात्रा (दिन में कितनी बार)</h3>
        <div className="space-y-4">
          {foodItems.map(food => (
            <div key={food.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-lg font-semibold text-slate-700">{food.name}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateData({
                    foodIntake: { ...data.foodIntake, [food.id]: Math.max(0, (data.foodIntake[food.id] || 0) - 1) }
                  })}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 font-bold hover:bg-slate-100"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-lg">{data.foodIntake[food.id] || 0}</span>
                <button
                  onClick={() => updateData({
                    foodIntake: { ...data.foodIntake, [food.id]: (data.foodIntake[food.id] || 0) + 1 }
                  })}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 font-bold hover:bg-slate-100"
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
        <h3 className="text-xl font-semibold text-slate-700 mb-3">🍎 फल (दिन में कितनी बार)</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {fruits.map(fruit => (
            <div key={fruit.id} className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-200">
              <span className="text-lg text-slate-700">{fruit.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateData({
                    fruitIntake: { ...data.fruitIntake, [fruit.id]: Math.max(0, (data.fruitIntake[fruit.id] || 0) - 1) }
                  })}
                  className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-sm hover:bg-slate-100"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold">{data.fruitIntake[fruit.id] || 0}</span>
                <button
                  onClick={() => updateData({
                    fruitIntake: { ...data.fruitIntake, [fruit.id]: (data.fruitIntake[fruit.id] || 0) + 1 }
                  })}
                  className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-sm hover:bg-slate-100"
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
        <h3 className="text-xl font-semibold text-slate-700 mb-3">🥬 सब्जियां (दिन में कितनी बार)</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {vegetables.map(veg => (
            <div key={veg.id} className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
              <span className="text-lg text-slate-700">{veg.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateData({
                    vegetableIntake: { ...data.vegetableIntake, [veg.id]: Math.max(0, (data.vegetableIntake[veg.id] || 0) - 1) }
                  })}
                  className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-sm hover:bg-slate-100"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold">{data.vegetableIntake[veg.id] || 0}</span>
                <button
                  onClick={() => updateData({
                    vegetableIntake: { ...data.vegetableIntake, [veg.id]: (data.vegetableIntake[veg.id] || 0) + 1 }
                  })}
                  className="w-8 h-8 rounded-full bg-white border border-slate-300 font-bold text-sm hover:bg-slate-100"
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

function Step3Activity({ data, updateData }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">🏃 व्यायाम और गतिविधि</h2>

      {/* Walking */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          रोज़ कितना समय तेज़ चलते हैं? {data.walkingMinutes} मिनट
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
          <label className="text-lg font-semibold text-slate-700 mb-2 block">व्यायाम की तीव्रता</label>
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
          योग करते हैं? {data.yogaMinutes} मिनट
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
        <label className="text-xl font-semibold text-slate-700 mb-3 block">💪 शक्ति प्रशिक्षण करते हैं?</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { id: true, label: '✓ हाँ' },
            { id: false, label: '✗ नहीं' },
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
        <label className="text-xl font-semibold text-slate-700 mb-3 block">🤸 लचीलेपन की गतिविधि</label>
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
        <label className="text-xl font-semibold text-slate-700 mb-3 block">⚖️ संतुलन प्रशिक्षण करते हैं?</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { id: true, label: '✓ हाँ' },
            { id: false, label: '✗ नहीं' },
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

function Step4SleepLifestyle({ data, updateData }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">😴 नींद और जीवनशैली</h2>

      {/* Sleep Hours */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
        <label className="block text-xl font-semibold text-slate-700 mb-3">
          रात को कितने घंटे सोते हैं? {data.sleepHours} घंटे
        </label>
        <input
          type="range"
          min="4"
          max="12"
          value={data.sleepHours}
          onChange={e => updateData({ sleepHours: parseInt(e.target.value) })}
          className="w-full h-3 bg-slate-200 rounded-lg accent-indigo-600"
        />
        <p className="text-sm text-slate-600 mt-2">लक्ष्य: 7-8 घंटे</p>
      </div>

      {/* Sleep Quality */}
      <div>
        <label className="block text-xl font-semibold text-slate-700 mb-3">नींद की गुणवत्ता</label>
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
        <label className="block text-xl font-semibold text-slate-700 mb-3">नींद में बाधा</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'none', label: 'कोई नहीं' },
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
          सप्ताह में कितने दिन आराम करते हैं? {data.restDaysPerWeek} दिन
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
        <label className="block text-xl font-semibold text-slate-700 mb-3">तनाव का स्तर</label>
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
        <label className="block text-xl font-semibold text-slate-700 mb-3">सामाजिक गतिविधि</label>
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
        <label className="block text-xl font-semibold text-slate-700 mb-3">शराब का सेवन</label>
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
        <label className="block text-xl font-semibold text-slate-700 mb-3">तंबाकू का सेवन</label>
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

function Step5Review({ data }: any) {
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
          <p className="text-sm text-slate-600">लिंग</p>
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
    <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 border border-slate-100">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-emerald-700 mb-4">
          🎯 आपके परिणाम
        </h2>

        {/* Score Circle */}
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
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={category.color}
              strokeWidth="3"
              strokeDasharray={`${(score.total / 100) * 282.7} 282.7`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-slate-800">{score.total}</div>
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
