
const express = require('express');
const router = express.Router();
const { upcomingMatches, recentMatches, allMatches } = require('../data/matches');
const players = require('../data/players');

// Get all matches
router.get('/', (req, res) => {
  res.json(allMatches);
});

// Get upcoming matches
router.get('/upcoming', (req, res) => {
  res.json(upcomingMatches);
});

// Get recent matches
router.get('/recent', (req, res) => {
  res.json(recentMatches);
});

// Get match by ID
router.get('/:id', (req, res) => {
  const match = allMatches.find(m => m.id === parseInt(req.params.id));
  
  if (!match) {
    return res.status(404).json({ message: 'Match not found' });
  }
  
  res.json(match);
});

// Create a new match
router.post('/', (req, res) => {
  const newMatch = {
    id: allMatches.length + 1,
    team1: req.body.team1,
    team2: req.body.team2,
    date: req.body.date,
    time: req.body.time,
    league: req.body.league,
    location: req.body.location
  };
  
  upcomingMatches.push(newMatch);
  allMatches.push(newMatch);
  res.status(201).json(newMatch);
});

// Record match result
router.put('/:id/result', (req, res) => {
  const match = upcomingMatches.find(m => m.id === parseInt(req.params.id));
  
  if (!match) {
    return res.status(404).json({ message: 'Match not found' });
  }
  
  // Remove from upcoming matches
  const matchIndex = upcomingMatches.findIndex(m => m.id === parseInt(req.params.id));
  upcomingMatches.splice(matchIndex, 1);
  
  // Add score and move to recent matches
  const completedMatch = {
    ...match,
    score1: req.body.score1,
    score2: req.body.score2,
    playerOfMatch: req.body.playerOfMatch,
    playerStats: req.body.playerStats || []
  };
  
  // Update player stats
  if (req.body.playerStats) {
    req.body.playerStats.forEach(stat => {
      const player = players.find(p => p.id === stat.playerId);
      if (player) {
        player.played += 1;
        player.goals += stat.goals || 0;
        player.assists += stat.assists || 0;
        
        // Determine if player's team won
        const isTeam1 = player.team === match.team1;
        const team1Won = req.body.score1 > req.body.score2;
        const team2Won = req.body.score2 > req.body.score1;
        
        if ((isTeam1 && team1Won) || (!isTeam1 && team2Won)) {
          player.wins += 1;
        }
      }
    });
  }
  
  recentMatches.push(completedMatch);
  
  // Update the match in allMatches
  const allMatchIndex = allMatches.findIndex(m => m.id === parseInt(req.params.id));
  allMatches[allMatchIndex] = completedMatch;
  
  res.json(completedMatch);
});

module.exports = router;
