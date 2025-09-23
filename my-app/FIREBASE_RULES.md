# Firebase Database Rules Configuration

## Current Issue Resolution

The error "Index not defined, add '.indexOn': 'percentage'" occurred because the previous implementation tried to use Firebase queries that require indexing. The updated implementation now fetches all data and sorts it client-side, which eliminates the need for database indexing.

## Recommended Database Rules

### For Development/Testing (Simple Rules)
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### For Production (Secure Rules)
```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": "newData.exists() && newData.hasChildren(['playerName', 'score', 'totalQuestions', 'percentage', 'timestamp']) && newData.child('playerName').isString() && newData.child('playerName').val().length > 0 && newData.child('playerName').val().length <= 50 && newData.child('score').isNumber() && newData.child('score').val() >= 0 && newData.child('totalQuestions').isNumber() && newData.child('totalQuestions').val() > 0 && newData.child('percentage').isNumber() && newData.child('percentage').val() >= 0 && newData.child('percentage').val() <= 100 && newData.child('timestamp').isNumber()"
    }
  }
}
```

### For Production with Indexing (If you want to use server-side queries later)
```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": "newData.exists() && newData.hasChildren(['playerName', 'score', 'totalQuestions', 'percentage', 'timestamp']) && newData.child('playerName').isString() && newData.child('playerName').val().length > 0 && newData.child('playerName').val().length <= 50 && newData.child('score').isNumber() && newData.child('score').val() >= 0 && newData.child('totalQuestions').isNumber() && newData.child('totalQuestions').val() > 0 && newData.child('percentage').isNumber() && newData.child('percentage').val() >= 0 && newData.child('percentage').val() <= 100 && newData.child('timestamp').isNumber()",
      ".indexOn": ["percentage", "timestamp"]
    }
  }
}
```

## How to Apply These Rules

### Method 1: Firebase Console (Recommended)
1. Go to your Firebase Console
2. Navigate to "Realtime Database"
3. Click on the "Rules" tab
4. Replace the existing rules with one of the rule sets above
5. Click "Publish"

### Method 2: Firebase CLI
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init database`
4. Edit `database.rules.json` with the rules above
5. Deploy: `firebase deploy --only database`

## Rule Explanations

### Development Rules
- **".read": true** - Anyone can read the leaderboard
- **".write": true** - Anyone can write to the database
- ⚠️ **Warning**: Only use for development/testing

### Production Rules
- **".read": true** - Anyone can read the leaderboard (public leaderboard)
- **Complex write validation** - Ensures data integrity:
  - `playerName` must be a string between 1-50 characters
  - `score` must be a non-negative number
  - `totalQuestions` must be a positive number
  - `percentage` must be between 0-100
  - `timestamp` must be a number
  - All required fields must be present

### Performance Considerations

The updated implementation:
- ✅ **Faster for small datasets** (< 1000 entries)
- ✅ **No indexing required**
- ✅ **Simpler database rules**
- ✅ **Better error handling**

For very large datasets (> 10,000 entries), consider:
- Implementing pagination
- Using server-side queries with proper indexing
- Adding data archiving for old scores

## Testing the Fix

1. Apply the development rules above
2. Test saving a score from the quiz
3. Check the leaderboard page - it should now load without errors
4. Verify in Firebase Console that data is being saved correctly

The error should now be resolved! 🎉