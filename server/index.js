
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const leaguesRoutes = require('./routes/leagues');
const tournamentsRoutes = require('./routes/tournaments');
const playersRoutes = require('./routes/players');
const matchesRoutes = require('./routes/matches');
const aiRoutes = require('./routes/ai');

// Use routes
app.use('/api/leagues', leaguesRoutes);
app.use('/api/tournaments', tournamentsRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/ai', aiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FoosBuddy AI API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
