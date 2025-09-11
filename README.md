# React Native + Expo + NativeWind Project

A modern React Native application built with Expo Go and styled with NativeWind (Tailwind CSS for React Native).

## 🚀 Features

- **React Native**: Cross-platform mobile development
- **Expo Go**: Easy development and testing on real devices
- **NativeWind**: Tailwind CSS utilities for React Native
- **TypeScript**: Full type safety
- **Expo Router**: File-based routing for navigation
- **Dark Mode**: Built-in dark/light theme support

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd my-expo-nativewind-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the App

### Development Server
Start the Expo development server:
```bash
npm start
# or
npx expo start
```

### Platform-specific Commands
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

### Using Expo Go
1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

## 🎨 NativeWind Usage

This project is configured with NativeWind, allowing you to use Tailwind CSS utility classes in your React Native components:

```tsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <Text className="text-white text-xl font-bold">
        Hello NativeWind! 🎉
      </Text>
    </View>
  );
}
```

### Key Features:
- **Responsive Design**: Use responsive prefixes like `sm:`, `md:`, `lg:`
- **Dark Mode**: Use `dark:` prefix for dark mode variants
- **Hover & Active**: Use `active:` for press states
- **All Tailwind Classes**: Most Tailwind utilities work out of the box

## 📁 Project Structure

```
my-expo-nativewind-app/
├── app/                    # App Router pages
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen with NativeWind examples
│   │   └── explore.tsx    # Explore screen
│   ├── _layout.tsx        # Root layout
│   └── nativewind-demo.tsx # NativeWind demo screen
├── components/            # Reusable components
│   ├── sample-card.tsx    # Sample component with NativeWind
│   └── ...               # Other components
├── assets/               # Images and static files
├── global.css           # Tailwind CSS imports
├── tailwind.config.js   # Tailwind configuration
├── metro.config.js      # Metro bundler config with NativeWind
└── nativewind-env.d.ts  # TypeScript declarations
```

## 🛠️ Configuration Files

### Tailwind Config (`tailwind.config.js`)
```js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Metro Config (`metro.config.js`)
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: './global.css',
});
```

## 🎯 Demo Screens

- **Home Screen**: Basic introduction with NativeWind examples
- **NativeWind Demo**: Comprehensive showcase of NativeWind capabilities including:
  - Color palette
  - Interactive buttons
  - Layout utilities
  - Dark mode examples
  - Responsive design

## 📱 Development Tips

1. **Hot Reload**: Changes will automatically reload in Expo Go
2. **Debug Menu**: Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
3. **Web Development**: Test quickly in browser with `npm run web`
4. **TypeScript**: Full IntelliSense support for Tailwind classes

## 🔧 Troubleshooting

If you encounter issues:

1. **Clear cache:**
   ```bash
   npx expo start --clear
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Reset Expo cache:**
   ```bash
   npx expo install --fix
   ```

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Native Documentation](https://reactnative.dev/)

## 🎉 Ready to Build!

Your React Native + Expo + NativeWind project is ready! Start building amazing cross-platform apps with the power of Tailwind CSS styling.

Happy coding! 🚀