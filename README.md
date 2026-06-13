# वरिष्ठ नागरिक फिटनेस जांच (Senior Citizen Fitness Assessment)

## 📋 Overview

A comprehensive, accessible fitness assessment app for Indian senior citizens (60+) built on **ICMR Guidelines 2020**. The app evaluates nutrition, physical activity, sleep, and lifestyle to provide a fitness score (0-100) and personalized health recommendations in Hindi.

**Live Demo**: [Add Vercel URL after deployment]

---

## 🎯 Features

### ✅ Core Assessments
- **Demographics**: Age (continuous), gender, diet type, medical conditions
- **Nutrition**: Food intake, water consumption, fruits & vegetables tracking
- **Physical Activity**: Walking, yoga, strength training, flexibility, balance exercises
- **Sleep & Rest**: Sleep duration, quality, disturbances, rest days
- **Lifestyle**: Stress, mental wellbeing, social engagement, alcohol, tobacco use

### ✅ Advanced Features
- **ICMR-Aligned Fitness Score** (0-100) with 4 component breakdown:
  - Nutrition Score (0-25): Protein, calcium, fiber, hydration
  - Activity Score (0-25): Aerobic, resistance, flexibility
  - Sleep Score (0-20): Duration, quality, disturbances
  - Health Management Score (0-30): Comorbidity control, lifestyle factors

- **Personalized Recommendations**: 20-30 contextual health tips based on:
  - Current intake levels vs. ICMR targets
  - Medical conditions (diabetes, hypertension, CKD, anemia, arthritis, thyroid)
  - Activity levels and sleep patterns
  - Lifestyle risk factors

- **Visitor Counter**: Track total users who've completed the assessment

- **Senior-Friendly UX**:
  - Large text (18px+ baseline)
  - No text input required (all multiple-choice, sliders, counters)
  - 5-step wizard to prevent cognitive overload
  - Clear visual feedback and progress indication

### ✅ Technology Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom color palette
- **Deployment**: Vercel (automatic CI/CD from GitHub)
- **Storage**: localStorage (MVP) + optional PostgreSQL/MongoDB for production
- **Language**: Hindi UI with English codebase

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account (for deployment)
- Vercel account (for hosting)

### Local Development

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/yourusername/senior-fitness-app.git
   cd senior-fitness-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Test the App**
   - Complete all 5 steps
   - View fitness score and recommendations
   - Check visitor counter increments
   - Refresh and verify localStorage persists form state

---

## 📁 Project Structure

```
senior-fitness-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Global layout
│   │   ├── page.tsx                   # Main app (5-step wizard + results)
│   │   ├── api/
│   │   │   └── visitors/
│   │   │       └── route.ts           # GET/POST visitor counter
│   │   └── globals.css                # Tailwind + custom styles
│   ├── components/
│   │   └── VisitorCounter.tsx         # Display visitor count
│   ├── data/
│   │   └── quizData.ts                # Medical conditions, foods, fruits, veggies
│   ├── types/
│   │   └── assessment.ts              # TypeScript interfaces
│   └── utils/
│       ├── scoring.ts                 # ICMR fitness score algorithm
│       ├── nutritionCalc.ts           # Macro/micronutrient calculation
│       └── recommendations.ts         # Rule engine for health tips
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

---

## 🏥 ICMR Guidelines Mapping

### Nutrition Targets (RDA 2020 for 60+)
| Nutrient | Target | Implemented |
|----------|--------|-------------|
| Protein | 50-55g/day | ✓ Calculated from food intake |
| Calcium | 1200-1300mg/day | ✓ Tracked via dairy, leafy greens |
| Fiber | 25-30g/day | ✓ Vegetables, fruits, whole grains |
| Iron | 8mg/day (both M/F) | ✓ Red meat, legumes, fortified foods |
| Water | 2-2.5L/day | ✓ Direct intake counter |
| Fruits/Vegetables | ≥400g/day | ✓ Separate tracking |

### Activity Recommendations
- 150 min/week moderate aerobic activity (75 min vigorous)
- 2+ days/week resistance training
- Flexibility & balance 3+ days/week

### Sleep Standards
- 7-8 hours/night
- Good sleep quality and minimal disturbances

### Comorbidity Management
Specific guidance for:
- **Diabetes**: Limit refined carbs, regular exercise
- **Hypertension**: Reduce salt, manage stress
- **CKD**: Protein restriction (medical referral)
- **Uric Acid**: Increase fluids, limit purines
- **Anemia**: Iron-rich foods, vitamin C absorption
- **Arthritis**: Regular exercise, flexibility work
- **Thyroid**: Regular monitoring, medication adherence

---

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green `#10B981` — health & vitality
- **Secondary**: Warm Amber `#F59E0B` — energy & encouragement
- **Accent**: Ocean Blue `#0EA5E9` — trust & calm
- **Status**: Green (good), Amber (fair), Red (poor)

### Typography
- Headings: Inter Bold (18-32px)
- Body: Inter Regular (16-18px+)
- Line height: 1.6+ for senior readability

### Component Library
- Large touch targets (44px minimum)
- High contrast ratios (WCAG AA compliant)
- Smooth transitions and focus states
- Mobile-first responsive grid

---

## 📊 Fitness Score Calculation

### Example Score Breakdown
```
Nutrition Score: 18/25
- Protein: 52g ✓ (6 pts)
- Calcium: 950mg ⚠️ (3 pts)
- Fiber: 22g ✓ (6 pts)
- Water: 1.8L ✓ (2 pts)
- F&V: 380g ✓ (1 pt)

Activity Score: 20/25
- Aerobic: 120 min/week ✓ (12 pts)
- Resistance: 2x/week ✓ (8 pts)
- Flexibility: Daily ✓ (5 pts)
- Yoga: 30 min, intense (+2 pts, capped)

Sleep Score: 16/20
- Duration: 7.5 hours ✓ (10 pts)
- Quality: Good (4 pts)
- Disturbances: None (4 pts)
- Rest days: 2/week (2 pts, capped)

Health Score: 24/30
- No conditions: +30 baseline
- Stress: Moderate (−2 pts)
- Wellbeing: Good (0 pts)
- Social: Moderate (0 pts)
- Tobacco: None (0 pts)

TOTAL: 78/100 → "Good Fitness Profile"
```

---

## 🔄 User Flow

1. **Step 1: Demographics** (Age, Gender, Diet, Medical Conditions)
2. **Step 2: Nutrition** (Food intake, Water, Fruits, Vegetables)
3. **Step 3: Activity** (Walking, Yoga, Strength, Flexibility, Stairs)
4. **Step 4: Sleep & Lifestyle** (Sleep, Stress, Mental Health, Social, Alcohol, Tobacco)
5. **Step 5: Review** (Summary of inputs before submission)
6. **Results Screen**
   - Fitness Score (0-100) with radial progress
   - Component breakdown (4 bars)
   - Top 5 personalized recommendations
   - Visitor counter display
   - Print & Reset options

---

## 🌐 Deployment Guide

### Step 1: Push to GitHub

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: Complete Senior Fitness Assessment V2"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/senior-fitness-app.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Select your GitHub repo (`senior-fitness-app`)
4. Click "Import"
5. Framework: **Next.js** (auto-detected)
6. Environment: Leave as default (no secrets needed for MVP)
7. Click "Deploy"
8. **Done!** Your app is live at `senior-fitness-app.vercel.app`

**Option B: Via Vercel CLI**
```bash
npm install -g vercel

# Deploy
vercel

# Link to existing project (if re-deploying)
vercel --prod
```

### Step 3: Set Production Environment (Optional)

```bash
# In Vercel Dashboard:
# Project Settings → Environment Variables

NEXT_PUBLIC_API_URL=https://senior-fitness-app.vercel.app
```

### Step 4: Enable Analytics (Optional)

In Vercel Dashboard:
- Settings → Analytics → Enable
- Tracks page views, Core Web Vitals, real user metrics

---

## 🔧 Customization Guide

### Add More Medical Conditions
Edit `src/data/quizData.ts`:
```typescript
export const medicalConditions: MedicalCondition[] = [
  // ... existing
  { id: 'hypertension_stage2', label: 'Stage 2 उच्च रक्तचाप' },
];
```

### Adjust Scoring Weights
Edit `src/utils/scoring.ts`:
```typescript
// Increase protein importance from 7 to 10 pts
if (nutrition.protein >= 60) score += 10; // was 7
```

### Add New Foods/Fruits/Vegetables
Edit `src/data/quizData.ts`:
```typescript
export const foodItems: FoodItem[] = [
  // ... existing
  { id: 'chicken', name: 'मुर्गी का मांस', category: 'Proteins', unit: 'टुकड़े', protein: 31, iron: 1.3 },
];
```

### Change Color Palette
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'primary': '#YOUR_COLOR',
      'secondary': '#YOUR_COLOR',
    },
  },
},
```

---

## 🐛 Troubleshooting

### Issue: Visitor Counter Not Incrementing
- **Solution**: In-memory storage resets on server restart. For persistence, upgrade to database.
- **Temporary fix**: Use localStorage fallback (already implemented)

### Issue: App Not Rendering on Mobile
- **Solution**: Ensure viewport meta tag in `layout.tsx`
- **Check**: `viewport: 'width=device-width, initial-scale=1, maximum-scale=1'`

### Issue: Tailwind Styles Not Applying
- **Solution**: Rebuild CSS
  ```bash
  npm run build
  ```
- **Check**: `globals.css` is imported in `layout.tsx`

### Issue: TypeScript Errors
- **Solution**: Run type check
  ```bash
  npm run type-check
  ```

---

## 📈 Analytics & Monitoring

### Vercel Analytics Dashboard
- **Page Views**: Track user adoption
- **Core Web Vitals**: LCP, FID, CLS performance
- **Usage**: Time on page, bounce rate
- **Geography**: User distribution

### Local Testing
```bash
# Build for production
npm run build

# Start production server
npm run start

# Test on http://localhost:3000
```

---

## 🔐 Security & Privacy

### Data Storage
- Form data stored in `localStorage` (client-side only)
- No sensitive data transmitted to server
- Assessment results not logged server-side

### For Production
- Add HTTPS (automatic on Vercel)
- Consider terms & privacy policy
- Implement GDPR compliance if targeting EU users
- Add content security headers

---

## 📞 Support & Feedback

### Issues & Suggestions
- GitHub Issues: [Add link after repo creation]
- Email: [Your contact]

### Known Limitations (MVP)
- Visitor counter resets on server restart (upgrade to database for persistence)
- No PDF export (planned for V2.1)
- Hindi only UI (add English toggle in V2.2)
- No offline mode (PWA planned for V3)

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

## 🙏 Credits

- **ICMR Guidelines**: Indian Council of Medical Research (RDA 2020)
- **Senior Health Expertise**: Input from geriatricians & nutritionists
- **Hindi Localization**: Cultural adaptation for Indian seniors
- **Built with**: Next.js, React, Tailwind CSS

---

## 🚀 Roadmap

### V2.1 (June 2026)
- [ ] PDF report download
- [ ] Email report sharing
- [ ] Persistent database (PostgreSQL)

### V2.2 (July 2026)
- [ ] English language toggle
- [ ] Regional language support (Hindi, Tamil, Telugu, Kannada)
- [ ] Family health tracking

### V3.0 (September 2026)
- [ ] Progressive Web App (offline access)
- [ ] Wearable integration (fitness trackers)
- [ ] Doctor referral system
- [ ] Follow-up assessment reminders

---

**Last Updated**: June 2026  
**Version**: 2.0.0  
**Status**: Production Ready ✅
