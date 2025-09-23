# Firebase Leaderboard Setup Guide

## Overview
This implementation adds a leaderboard feature to the quiz application using Firebase Realtime Database. After completing a quiz, users can enter their name to save their score to the leaderboard.

## Features Added

### 1. Quiz Completion Flow
- After finishing the quiz, users are prompted to enter their name
- Option to skip name entry if they don't want to save their score
- Score is saved with timestamp and percentage calculation

### 2. Leaderboard Display
- Shows top scores with ranking
- Search functionality to find specific players
- Statistics summary (total participants, average score, excellent scores)
- Responsive design for mobile and desktop
- Real-time updates when new scores are added

### 3. Data Structure
Each leaderboard entry contains:
- `playerName`: The user's name
- `score`: Number of correct answers
- `totalQuestions`: Total number of questions
- `percentage`: Calculated percentage score
- `timestamp`: When the quiz was completed
- `date`: ISO date string

## Firebase Setup Instructions

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### Step 2: Enable Realtime Database
1. In your Firebase project, go to "Realtime Database"
2. Click "Create Database"
3. Choose your location
4. Start in **test mode** for development (you can secure it later)

### Step 3: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a name
5. Copy the configuration object

### Step 4: Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com/
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 5: Set Database Rules (Development)
In the Firebase Console, go to Realtime Database > Rules and set:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Note**: These rules allow anyone to read/write. For production, see `FIREBASE_RULES.md` for secure rules.

**Important**: The leaderboard service has been optimized to avoid the "Index not defined" error by fetching all data and sorting client-side, eliminating the need for database indexing.

### Step 6: Test the Implementation
1. Run your development server: `npm run dev`
2. Complete a quiz
3. Enter your name when prompted
4. Check the leaderboard page to see your score
5. Verify in Firebase Console that data was saved

## Production Security Considerations

For production deployment, update your database rules to be more secure:

```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": "newData.exists() && newData.child('playerName').isString() && newData.child('score').isNumber() && newData.child('totalQuestions').isNumber() && newData.child('percentage').isNumber() && newData.child('timestamp').isNumber()"
    }
  }
}
```

## File Structure

```
src/
├── firebase/
│   ├── config.js              # Firebase configuration
│   └── leaderboardService.js  # Service for leaderboard operations
├── pages/
│   ├── Quiz/
│   │   ├── Quiz.jsx           # Updated with name input
│   │   └── Quiz.css           # Updated with name input styles
│   ├── BangXepHang.jsx        # Leaderboard component
│   └── BangXepHang.css        # Leaderboard styles
└── .env.example               # Environment variables template
```

## Troubleshooting

### Common Issues

1. **"Firebase not configured" error**
   - Make sure `.env.local` exists with correct values
   - Restart your development server after adding environment variables

2. **Permission denied error**
   - Check your Firebase database rules
   - Ensure the database URL is correct

3. **Network request failed**
   - Verify your internet connection
   - Check if Firebase services are accessible

4. **Data not appearing**
   - Check browser console for errors
   - Verify data exists in Firebase Console
   - Check if environment variables are loaded correctly

### Testing Without Firebase

If you want to test the UI without setting up Firebase, you can temporarily modify the leaderboard service to use mock data:

```javascript
// In leaderboardService.js, replace the functions with:
export const leaderboardService = {
  async addScore(playerName, score, totalQuestions) {
    console.log('Mock: Adding score', { playerName, score, totalQuestions });
    return { success: true, data: { playerName, score, totalQuestions } };
  },
  
  async getTopScores(limit = 10) {
    // Return mock data
    return { 
      success: true, 
      data: [
        { id: '1', playerName: 'Test User', score: 10, totalQuestions: 12, percentage: 83, timestamp: Date.now() }
      ]
    };
  }
};
```

## Next Steps

1. Set up your Firebase project
2. Configure environment variables
3. Test the leaderboard functionality
4. Customize the styling if needed
5. Implement proper security rules for production