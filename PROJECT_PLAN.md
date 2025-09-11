# 📱 AI Photo Transformer - Complete Development Plan

## 🎯 Project Overview
AI-powered photo transformation app using Gemini 2.5 Flash with glassmorphism UI, freemium model, and RevenueCat integration.

### Core Features
- **Photo to Ancient/Renaissance**: Transform photos into classical painting style
- **Photo to Plastic Action Figure**: Convert photos into toy figure style  
- **Photo to Lofi Image**: Apply lofi aesthetic filter
- **Glassmorphism UI**: Modern frosted glass design
- **Freemium Model**: 3 free transformations/month, premium plans
- **RevenueCat Integration**: Subscription management

## 🏗️ Technical Architecture

### Current Tech Stack
- **Framework**: React Native with Expo SDK 54
- **UI**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router v6 with typed routes
- **Animation**: React Native Reanimated v4
- **State**: React hooks + AsyncStorage
- **Build**: Expo Development Build

### New Dependencies Required
```bash
# Image Processing
npx expo install expo-image-picker
npx expo install expo-file-system  
npx expo install expo-media-library

# Storage & State
npx expo install @react-native-async-storage/async-storage

# UI & Animation  
npx expo install expo-linear-gradient
npx expo install react-native-svg
npx expo install expo-blur

# Payments
npm install react-native-purchases

# API & Networking
npm install axios
```

## 📁 Project Structure

```
app/
├── (onboarding)/
│   ├── _layout.tsx           # Onboarding layout
│   ├── welcome.tsx           # Logo + welcome message
│   ├── features-1.tsx        # Feature showcase page 1
│   ├── features-2.tsx        # Feature showcase page 2
│   └── get-started.tsx       # Try it now CTA
├── (tabs)/
│   ├── _layout.tsx           # Animated bottom tabs
│   ├── index.tsx             # Home feed
│   ├── models.tsx            # AI model selection
│   └── profile.tsx           # User profile
├── (modal)/
│   ├── image-picker.tsx      # Photo selection
│   ├── processing.tsx        # AI processing screen
│   ├── result.tsx            # Generated image result
│   └── paywall.tsx           # Subscription plans
├── auth/
│   ├── login.tsx
│   └── register.tsx
└── _layout.tsx               # Root layout

components/
├── ui/
│   ├── glass-card.tsx        # Glassmorphism card component
│   ├── glass-button.tsx      # Glassmorphism button
│   ├── animated-tab-bar.tsx  # Shrinking navigation
│   ├── gradient-background.tsx
│   └── loading-spinner.tsx
├── onboarding/
│   ├── logo-animation.tsx    # Animated logo
│   ├── feature-demo.tsx      # Feature showcase
│   └── progress-dots.tsx     # Page indicators
├── ai/
│   ├── model-card.tsx        # AI transformation option
│   ├── progress-bar.tsx      # Processing progress
│   └── watermark.tsx         # Free tier watermark
├── subscription/
│   ├── plan-card.tsx         # Subscription plan display
│   ├── usage-meter.tsx       # Monthly usage tracking
│   └── upgrade-prompt.tsx    # Premium upgrade CTA
└── shared/
    ├── image-viewer.tsx      # Zoomable image display
    ├── share-modal.tsx       # Social sharing
    └── themed-view.tsx       # Theme-aware containers

utils/
├── api/
│   ├── gemini.ts            # Gemini 2.5 Flash integration
│   ├── auth.ts              # User authentication
│   └── subscription.ts      # RevenueCat SDK
├── storage/
│   ├── user-preferences.ts  # Settings & theme
│   ├── usage-tracking.ts    # Free tier limits
│   └── image-cache.ts       # Generated image cache
├── image/
│   ├── picker.ts            # Gallery/camera selection
│   ├── processor.ts         # Image optimization
│   └── watermark.ts         # Logo overlay for free tier
└── theme/
    ├── colors.ts            # Color palette
    ├── glassmorphism.ts     # Glass effect styles
    └── animations.ts        # Reanimated configurations
```

## 🎨 Design System

### Color Palette
```typescript
// Light Mode
const lightColors = {
  background: '#f8f8f8',
  surface: '#ffffff',
  surfaceVariant: '#e8e8e8',
  primary: '#3b82f6',
  text: '#1a1a1a',
  textSecondary: '#6b7280',
}

// Dark Mode  
const darkColors = {
  background: '#1a1a1a', 
  surface: '#2a2a2a',
  surfaceVariant: '#3a3a3a',
  primary: '#60a5fa',
  text: '#f8f8f8',
  textSecondary: '#9ca3af',
}
```

### Glassmorphism Effects
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.glass-button {
  background: rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 24px;
}
```

### Typography & Spacing
- **Border Radius**: 16px (cards), 24px (buttons), 32px (modals)
- **Spacing Scale**: 4, 8, 12, 16, 24, 32, 48, 64px
- **Font Sizes**: 12, 14, 16, 18, 24, 32, 48px

## 🔄 User Flows

### 1. First-Time User Experience
```
Launch App → Onboarding (4 screens) → Try First Transformation → 
Register Account → Premium Upgrade Prompt
```

### 2. Transformation Flow
```
Select AI Model → Choose Photo → Processing Screen → 
View Result → Save/Share → Usage Update
```

### 3. Subscription Flow
```
Hit Free Limit → Paywall → Select Plan → 
RevenueCat Purchase → Premium Features Unlocked
```

## 🚀 Development Phases

### Phase 1: Foundation (Days 1-2)
**Setup & Core Architecture**
- [x] Review existing codebase
- [ ] Install required dependencies
- [ ] Setup glassmorphism design system
- [ ] Configure theme switching (light/dark)
- [ ] Create base component library

**Deliverables:**
- Design system components
- Theme configuration
- Base navigation structure

### Phase 2: Onboarding Experience (Days 3-4)
**4-Screen Onboarding Flow**
- [ ] Welcome screen with animated logo
- [ ] Feature showcase screens (2 pages)
- [ ] "Try it now" call-to-action
- [ ] First-time user detection
- [ ] Smooth transitions between screens

**Deliverables:**
- Complete onboarding flow
- Logo animation component
- Feature demonstration videos/images

### Phase 3: Core AI Features (Days 5-8)
**Image Transformation System**
- [ ] Image picker (gallery + camera)
- [ ] Gemini 2.5 Flash API integration
- [ ] Three AI transformation models:
  - Ancient/Renaissance style
  - Plastic action figure 
  - Lofi aesthetic
- [ ] Processing screen with progress animation
- [ ] Result display with save/share options

**Deliverables:**
- Working AI transformations
- Image picker component
- Processing UI with animations
- Result screen with actions

### Phase 4: Navigation & Screens (Days 9-10)
**Tab Navigation & Main Screens**
- [ ] Animated bottom tab bar (shrinks on scroll)
- [ ] Home screen with motivational content
- [ ] Models screen with AI option cards
- [ ] Profile screen with user stats
- [ ] Smooth transitions and micro-interactions

**Deliverables:**
- Complete navigation system
- Three main screens
- Glassmorphism card components

### Phase 5: Monetization (Days 11-13)
**RevenueCat Integration & Paywall**
- [ ] RevenueCat SDK setup
- [ ] Subscription products configuration
- [ ] Usage tracking system (3 free/month limit)
- [ ] Watermark system for free tier
- [ ] Paywall screen with plan cards
- [ ] Purchase flow integration

**Subscription Plans:**
- **Free**: 3 transformations/month, watermarked
- **Pro**: 50 transformations/month, no watermark ($4.99/month)
- **Pro+**: Coming soon placeholder

**Deliverables:**
- Working subscription system
- Usage limitation enforcement
- Watermark overlay for free users
- Paywall UI with plan selection

### Phase 6: Authentication & Profile (Days 14-15)
**User Management**
- [ ] User registration/login
- [ ] Profile management
- [ ] Usage statistics display
- [ ] Settings screen
- [ ] Data persistence

**Deliverables:**
- Authentication flow
- User profile features
- Settings management

### Phase 7: Polish & Testing (Days 16-17)
**Optimization & Quality Assurance**
- [ ] Performance optimization
- [ ] Animation refinements
- [ ] Error handling improvements
- [ ] Cross-platform testing (iOS/Android)
- [ ] Accessibility improvements
- [ ] Store assets preparation

**Deliverables:**
- Production-ready app
- Store listing assets
- Testing documentation

## 🔧 API Configurations

### Gemini 2.5 Flash Prompts
```typescript
const AI_PROMPTS = {
  ancient: `Transform this photo into a classical Renaissance painting style. 
           Apply oil painting textures, warm golden lighting, and the compositional 
           techniques of masters like Leonardo da Vinci or Raphael.`,
           
  actionFigure: `Convert this photo into a realistic plastic action figure or toy. 
                Apply glossy plastic textures, bright vivid colors, and the 
                characteristic look of collectible action figures.`,
                
  lofi: `Transform this image into a dreamy lofi aesthetic. Apply soft pastel colors, 
         slight grain/noise, vintage film look, and a nostalgic atmosphere with 
         muted tones and gentle lighting.`
}
```

### RevenueCat Products
```typescript
const SUBSCRIPTION_PRODUCTS = {
  pro_monthly: {
    identifier: 'pro_monthly_4_99',
    price: 4.99,
    period: 'monthly',
    features: ['50 transformations/month', 'No watermark', 'Priority processing']
  },
  pro_plus: {
    identifier: 'pro_plus_9_99', 
    price: 9.99,
    period: 'monthly',
    features: ['Unlimited transformations', 'No watermark', 'Coming soon'],
    comingSoon: true
  }
}
```

## 🎯 Success Metrics

### Technical KPIs
- App launch time: < 2 seconds
- Image processing time: < 30 seconds
- Crash rate: < 1%
- API success rate: > 95%

### Business KPIs  
- Free-to-paid conversion: Target 5%
- Monthly retention: Target 60%
- Average processing per user: Target 8/month
- User satisfaction: Target 4.5+ stars

## 📱 Deployment Strategy

### Development Environment
- Expo Development Build for testing
- Environment variables for API keys
- Separate RevenueCat projects for dev/prod

### Testing Phase
- Internal testing with TestFlight/Play Console Internal Testing
- User acceptance testing with 10-20 beta users
- Performance testing on various devices

### Production Release
- App Store Connect & Google Play Console submission
- RevenueCat production environment
- Analytics integration (Expo Analytics + RevenueCat)
- Gradual rollout strategy

## 🔐 Security & Privacy

### Data Protection
- Minimal data collection (only usage stats)
- No image storage on servers (client-side processing)
- Secure API key management
- GDPR/CCPA compliance ready

### API Security
- Rate limiting implementation
- Error handling without exposing internals
- Secure RevenueCat webhook handling

## 📋 Next Immediate Steps

1. **Install Dependencies** - Add all required packages
2. **Design System Setup** - Create glassmorphism components
3. **Navigation Structure** - Implement animated tab system
4. **Onboarding Flow** - Build 4-screen introduction
5. **Basic AI Integration** - Connect Gemini API for one model

---

*This plan serves as the complete roadmap for developing the AI Photo Transformer app with glassmorphism UI and freemium monetization model.*