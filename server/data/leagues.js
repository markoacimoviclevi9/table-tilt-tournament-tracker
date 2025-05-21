
const leagues = [
  {
    id: 1,
    name: "Office Champions League",
    description: "The premier foosball league for office warriors",
    teams: 8,
    matches: 24,
    status: "In Progress",
    startDate: "2025-04-12",
    endDate: "2025-06-20",
    location: "Office Break Room",
    teams: [
      { id: 1, name: "Lightning Strikers", players: [1, 6] },
      { id: 2, name: "Spin Masters", players: [2, 8] },
      { id: 3, name: "Table Titans", players: [3] },
      { id: 4, name: "Goal Getters", players: [4] }
    ]
  },
  {
    id: 2,
    name: "Downtown Foosball Masters",
    description: "Weekly matches for foosball enthusiasts downtown",
    teams: 6,
    matches: 15,
    status: "In Progress",
    startDate: "2025-05-05",
    endDate: "2025-07-10",
    location: "The Rec Room",
    teams: [
      { id: 5, name: "Foosball Fury", players: [5] },
      { id: 6, name: "Rod Warriors", players: [7] }
    ]
  },
  {
    id: 3,
    name: "Weekend Warriors",
    description: "Weekend tournament for casual players",
    teams: 4,
    matches: 6,
    status: "Completed",
    startDate: "2025-03-01",
    endDate: "2025-03-30",
    location: "Community Center",
    teams: []
  },
];

module.exports = leagues;
