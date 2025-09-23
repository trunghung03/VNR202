import { database } from './config';
import { ref, push, get } from 'firebase/database';

export const leaderboardService = {
  // Add a new score to the leaderboard
  async addScore(playerName, score, totalQuestions) {
    try {
      const percentage = Math.round((score / totalQuestions) * 100);
      const scoreData = {
        playerName: playerName.trim(),
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        timestamp: Date.now(),
        date: new Date().toISOString()
      };

      const leaderboardRef = ref(database, 'leaderboard');
      await push(leaderboardRef, scoreData);
      return { success: true, data: scoreData };
    } catch (error) {
      console.error('Error adding score to leaderboard:', error);
      return { success: false, error: error.message };
    }
  },

  // Get top scores from the leaderboard
  async getTopScores(limit = 10) {
    try {
      const leaderboardRef = ref(database, 'leaderboard');
      
      const snapshot = await get(leaderboardRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert object to array and sort by percentage (descending), then by timestamp (ascending for same percentage)
        const scores = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => {
          if (b.percentage === a.percentage) {
            return a.timestamp - b.timestamp; // Earlier submission wins for same percentage
          }
          return b.percentage - a.percentage; // Higher percentage first
        }).slice(0, limit); // Limit results after sorting
        
        return { success: true, data: scores };
      } else {
        return { success: true, data: [] };
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return { success: false, error: error.message };
    }
  },

  // Get player's best score
  async getPlayerBestScore(playerName) {
    try {
      const leaderboardRef = ref(database, 'leaderboard');
      const snapshot = await get(leaderboardRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const playerScores = Object.keys(data)
          .map(key => data[key])
          .filter(score => score.playerName.toLowerCase() === playerName.toLowerCase())
          .sort((a, b) => {
            if (b.percentage === a.percentage) {
              return a.timestamp - b.timestamp;
            }
            return b.percentage - a.percentage;
          });
        
        return { 
          success: true, 
          data: playerScores.length > 0 ? playerScores[0] : null 
        };
      } else {
        return { success: true, data: null };
      }
    } catch (error) {
      console.error('Error fetching player best score:', error);
      return { success: false, error: error.message };
    }
  }
};