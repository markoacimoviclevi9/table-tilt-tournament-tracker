
const express = require('express');
const router = express.Router();
const leagues = require('../data/leagues');

// Get all leagues
router.get('/', (req, res) => {
  res.json(leagues);
});

// Get league by ID
router.get('/:id', (req, res) => {
  const league = leagues.find(l => l.id === parseInt(req.params.id));
  
  if (!league) {
    return res.status(404).json({ message: 'League not found' });
  }
  
  res.json(league);
});

// Create a new league
router.post('/', (req, res) => {
  const newLeague = {
    id: leagues.length + 1,
    name: req.body.name,
    description: req.body.description,
    teams: 0,
    matches: 0,
    status: "Not Started",
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    teams: []
  };
  
  leagues.push(newLeague);
  res.status(201).json(newLeague);
});

module.exports = router;
