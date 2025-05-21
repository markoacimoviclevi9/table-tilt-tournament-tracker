
const express = require('express');
const router = express.Router();
const tournaments = require('../data/tournaments');

// Get all tournaments
router.get('/', (req, res) => {
  res.json(tournaments);
});

// Get tournament by ID
router.get('/:id', (req, res) => {
  const tournament = tournaments.find(t => t.id === parseInt(req.params.id));
  
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  
  res.json(tournament);
});

// Create a new tournament
router.post('/', (req, res) => {
  const newTournament = {
    id: tournaments.length + 1,
    name: req.body.name,
    description: req.body.description,
    teams: 0,
    format: req.body.format,
    status: "Not Started",
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location
  };
  
  tournaments.push(newTournament);
  res.status(201).json(newTournament);
});

module.exports = router;
