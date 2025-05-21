
const express = require('express');
const router = express.Router();
const players = require('../data/players');

// Get all players
router.get('/', (req, res) => {
  res.json(players);
});

// Get player by ID
router.get('/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  
  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }
  
  res.json(player);
});

// Create a new player
router.post('/', (req, res) => {
  const newPlayer = {
    id: players.length + 1,
    name: req.body.name,
    avatar: req.body.avatar || `${req.body.name.charAt(0)}${req.body.name.split(' ')[1]?.charAt(0) || ''}`,
    played: 0,
    wins: 0,
    goals: 0,
    assists: 0,
    team: req.body.team || "Unassigned"
  };
  
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

module.exports = router;
