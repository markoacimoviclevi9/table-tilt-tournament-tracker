
const upcomingMatches = [
  { 
    id: 1, 
    team1: "Lightning Strikers", 
    team2: "Spin Masters", 
    date: "2025-05-25", 
    time: "18:00", 
    league: "Office Champions League",
    location: "Office Break Room"
  },
  { 
    id: 2, 
    team1: "Table Titans", 
    team2: "Goal Getters", 
    date: "2025-05-26", 
    time: "19:30", 
    league: "Office Champions League",
    location: "Office Break Room"
  },
  { 
    id: 3, 
    team1: "Foosball Fury", 
    team2: "Rod Warriors", 
    date: "2025-05-28", 
    time: "17:00", 
    league: "Downtown Foosball Masters",
    location: "The Rec Room"
  },
];

const recentMatches = [
  { 
    id: 4, 
    team1: "Lightning Strikers", 
    team2: "Goal Getters", 
    score1: 10, 
    score2: 5, 
    date: "2025-05-18", 
    league: "Office Champions League",
    playerOfMatch: "Alex Johnson",
    location: "Office Break Room",
    playerStats: [
      { playerId: 1, goals: 7, assists: 3 },
      { playerId: 6, goals: 3, assists: 2 },
      { playerId: 4, goals: 5, assists: 0 }
    ]
  },
  { 
    id: 5, 
    team1: "Spin Masters", 
    team2: "Table Titans", 
    score1: 8, 
    score2: 9, 
    date: "2025-05-17", 
    league: "Office Champions League",
    playerOfMatch: "Taylor Kim",
    location: "Office Break Room",
    playerStats: [
      { playerId: 2, goals: 5, assists: 3 },
      { playerId: 8, goals: 3, assists: 1 },
      { playerId: 3, goals: 9, assists: 0 }
    ]
  },
  { 
    id: 6, 
    team1: "Foosball Fury", 
    team2: "Rod Warriors", 
    score1: 7, 
    score2: 7, 
    date: "2025-05-15", 
    league: "Downtown Foosball Masters",
    playerOfMatch: "Jordan Patel",
    location: "The Rec Room",
    playerStats: [
      { playerId: 5, goals: 7, assists: 0 },
      { playerId: 7, goals: 7, assists: 0 }
    ]
  },
];

module.exports = {
  upcomingMatches,
  recentMatches,
  allMatches: [...upcomingMatches, ...recentMatches]
};
