
// AI Service for the FoosBuddy app
// This service handles AI-powered features like smart scheduling, skill-based matchmaking, and player analytics

const players = require('../data/players');
const { allMatches } = require('../data/matches');

// Calculate player skill level based on their stats
const calculateSkillLevel = (player) => {
  if (!player) return 0;
  
  // A simple algorithm considering wins ratio, goals per game, and assists per game
  const winRatio = player.played > 0 ? player.wins / player.played : 0;
  const goalsPerGame = player.played > 0 ? player.goals / player.played : 0;
  const assistsPerGame = player.played > 0 ? player.assists / player.played : 0;
  
  return (winRatio * 50) + (goalsPerGame * 30) + (assistsPerGame * 20);
};

// Find compatible teammate pairs based on history
const findCompatibleTeammates = (playerId) => {
  const player = players.find(p => p.id === playerId);
  if (!player) return [];
  
  // Calculate win rate with each teammate
  const teammateStats = {};
  
  allMatches.forEach(match => {
    if (!match.playerStats) return;
    
    // Check if this player participated in this match
    const playerStat = match.playerStats.find(stat => stat.playerId === playerId);
    if (!playerStat) return;
    
    // Find teammates in this match
    const teammates = match.playerStats
      .filter(stat => stat.playerId !== playerId)
      .map(stat => {
        const teammate = players.find(p => p.id === stat.playerId);
        return teammate ? teammate.id : null;
      })
      .filter(id => id !== null);
    
    // Record win or loss with these teammates
    const isTeam1 = player.team === match.team1;
    const team1Won = match.score1 > match.score2;
    const team2Won = match.score2 > match.score1;
    const won = (isTeam1 && team1Won) || (!isTeam1 && team2Won);
    
    teammates.forEach(teammateId => {
      if (!teammateStats[teammateId]) {
        teammateStats[teammateId] = { played: 0, wins: 0 };
      }
      
      teammateStats[teammateId].played += 1;
      if (won) teammateStats[teammateId].wins += 1;
    });
  });
  
  // Calculate compatibility scores (win percentage with teammate)
  const compatibilityScores = Object.keys(teammateStats).map(teammateId => {
    const stats = teammateStats[teammateId];
    const winPercentage = stats.played > 0 ? (stats.wins / stats.played) * 100 : 0;
    const teammate = players.find(p => p.id === parseInt(teammateId));
    
    return {
      teammateId: parseInt(teammateId),
      teammateName: teammate ? teammate.name : 'Unknown',
      winPercentage: Math.round(winPercentage),
      gamesPlayed: stats.played
    };
  });
  
  // Sort by win percentage (highest first)
  return compatibilityScores.sort((a, b) => b.winPercentage - a.winPercentage);
};

// Generate balanced teams from a set of players
const generateBalancedTeams = (playerIds) => {
  if (!playerIds || playerIds.length < 4) {
    return { team1: [], team2: [] };
  }
  
  // Get player objects with skill levels
  const playersWithSkills = playerIds
    .map(id => {
      const player = players.find(p => p.id === id);
      if (!player) return null;
      
      return {
        ...player,
        skillLevel: calculateSkillLevel(player)
      };
    })
    .filter(player => player !== null)
    .sort((a, b) => b.skillLevel - a.skillLevel);
  
  // Create balanced teams using alternating selection
  const team1 = [];
  const team2 = [];
  
  playersWithSkills.forEach((player, index) => {
    if (index % 4 === 0 || index % 4 === 3) {
      team1.push({ id: player.id, name: player.name, skillLevel: player.skillLevel });
    } else {
      team2.push({ id: player.id, name: player.name, skillLevel: player.skillLevel });
    }
  });
  
  // Calculate average skill for each team
  const team1Skill = team1.reduce((sum, p) => sum + p.skillLevel, 0) / team1.length;
  const team2Skill = team2.reduce((sum, p) => sum + p.skillLevel, 0) / team2.length;
  
  return {
    team1,
    team2,
    skillDifference: Math.abs(team1Skill - team2Skill),
    team1AverageSkill: Math.round(team1Skill),
    team2AverageSkill: Math.round(team2Skill)
  };
};

// Analyze player performance and generate insights
const generatePlayerInsights = (playerId) => {
  const player = players.find(p => p.id === playerId);
  if (!player) return { insights: [] };
  
  const insights = [];
  
  // Get compatibility with teammates
  const compatibleTeammates = findCompatibleTeammates(playerId);
  
  // Add insights about best teammates
  if (compatibleTeammates.length > 0) {
    const bestTeammate = compatibleTeammates[0];
    if (bestTeammate.gamesPlayed >= 3 && bestTeammate.winPercentage > 60) {
      insights.push({
        type: 'teammate',
        importance: 'high',
        text: `You have a ${bestTeammate.winPercentage}% win rate when playing with ${bestTeammate.teammateName}`
      });
    }
  }
  
  // Add insights about scoring trends
  const recentMatches = allMatches
    .filter(match => match.playerStats && match.playerStats.some(stat => stat.playerId === playerId))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  if (recentMatches.length >= 3) {
    const recentGoals = recentMatches.reduce((sum, match) => {
      const stat = match.playerStats.find(stat => stat.playerId === playerId);
      return sum + (stat?.goals || 0);
    }, 0);
    
    const goalsPerGame = recentGoals / recentMatches.length;
    const careerGoalsPerGame = player.played > 0 ? player.goals / player.played : 0;
    
    if (goalsPerGame > careerGoalsPerGame * 1.2) {
      insights.push({
        type: 'improvement',
        importance: 'medium',
        text: `You're scoring ${Math.round((goalsPerGame/careerGoalsPerGame - 1) * 100)}% more goals per game in recent matches`
      });
    }
  }
  
  // Calculate overall skill level
  const skillLevel = calculateSkillLevel(player);
  
  return {
    skillLevel: Math.round(skillLevel),
    insights
  };
};

// Find optimal time slots for scheduling matches based on player history
const suggestMatchTimes = () => {
  // Analyze past matches to find common play times
  const matchTimeFrequency = {};
  
  allMatches.forEach(match => {
    if (!match.time) return;
    
    const timeSlot = match.time.split(':')[0]; // Just take the hour
    if (!matchTimeFrequency[timeSlot]) {
      matchTimeFrequency[timeSlot] = 0;
    }
    matchTimeFrequency[timeSlot] += 1;
  });
  
  // Sort time slots by frequency
  const sortedTimeSlots = Object.keys(matchTimeFrequency)
    .sort((a, b) => matchTimeFrequency[b] - matchTimeFrequency[a])
    .slice(0, 3);
  
  // Format suggested times
  return sortedTimeSlots.map(hour => {
    return `${hour}:00`;
  });
};

module.exports = {
  calculateSkillLevel,
  findCompatibleTeammates,
  generateBalancedTeams,
  generatePlayerInsights,
  suggestMatchTimes
};
