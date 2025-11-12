# Framez 📱

A mobile social application built with [React Native](https://reactnative.dev/) that allows users to share posts with text and images. Users can create posts, view a feed of all posts, and manage their profile with their own content.

Built with [BNA UI](https://bna-ui.vercel.app/) component library for a consistent and polished user interface and [Zustand](https://zustand-demo.pmnd.rs/) for lightweight state management.

## 🚀 Preview App

- [📱 Preview App](https://appetize.io/app/b_qnaougo6iruxpkswmbqdqzlp3y) - Try it on Appetize.io
- [📥 Download App](https://drive.google.com/drive/folders/11mvfRN4UsdvxpJO8FaaWLzbZHhZIbe-r?usp=drive_link) - Download APK/IPA
- [🎥 Watch Demo](https://drive.google.com/drive/folders/11mvfRN4UsdvxpJO8FaaWLzbZHhZIbe-r?usp=drive_link) - 2-3 minute walkthrough

## 🏗️ Backend Architecture

This project uses [**Convex**](https://www.convex.dev/) as the backend platform for several key reasons:

**Real-time by Default**: Convex provides real-time data synchronization out of the box, eliminating the need for complex WebSocket setup or polling mechanisms.

**Serverless Architecture**: No infrastructure management required. Convex handles scaling, hosting, and database operations automatically.

**Type-Safe**: Full TypeScript support across frontend and backend ensures type safety throughout the entire stack.

**Built-in Authentication**: [Convex Auth](https://docs.convex.dev/auth) provides secure user authentication without additional third-party services.

**Reactive Queries**: Automatically updates UI when data changes, providing a seamless user experience.

## ✨ Features Implemented

- **Authentication**: Secure sign-up, login, and logout with persistent sessions
- **Post Creation**: Create posts with text and/or images
- **Feed**: View all posts from users in chronological order
- **Profile Management**: View user profile with personal information and posts
- **Real-time Updates**: Posts and feed update automatically across devices

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Update the `.env` file with your Convex deployment URL

4. Start the development server
```bash
npx expo start
```

5. Set up Convex (in a new terminal)
```bash
npx convex dev
```

This will initialize your Convex deployment and provide your `EXPO_PUBLIC_CONVEX_URL` (add this to your `.env` file)

6. Configure Convex Auth

Set the SITE_URL environment variable (use placeholder for React Native):
```bash
npx convex env set SITE_URL http://localhost:3000
```

Generate authentication keys:
```bash
node generateKeys.mjs
```

Copy the output and paste it into your Convex dashboard's Environment Variables page.

7. Run on device/emulator
- Press `a` for Android
- Press `i` for iOS
- Scan QR code with Expo Go app
