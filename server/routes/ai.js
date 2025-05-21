
const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const players = require('../data/players');

// Get AI-generated insights for a player
router.get('/player-insights/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const insights = aiService.generatePlayerInsights(playerId);
  
  res.json(insights);
});

// Get smart teammate recommendations for a player
router.get('/player-compatibility/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const compatibleTeammates = aiService.findCompatibleTeammates(playerId);
  
  res.json(compatibleTeammates);
});

// Generate balanced teams from a set of players
router.post('/generate-teams', (req, res) => {
  const playerIds = req.body.playerIds || [];
  const balancedTeams = aiService.generateBalancedTeams(playerIds.map(id => parseInt(id)));
  
  res.json(balancedTeams);
});

// Get suggested match times based on historical data
router.get('/suggest-match-times', (req, res) => {
  const suggestedTimes = aiService.suggestMatchTimes();
  
  res.json({ suggestedTimes });
});

module.exports = router;
