
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const upcomingMatches = [
  { id: 1, team1: "Lightning Strikers", team2: "Spin Masters", date: "May 25, 2025", time: "18:00" },
  { id: 2, team1: "Table Titans", team2: "Goal Getters", date: "May 26, 2025", time: "19:30" },
];

const recentResults = [
  { id: 1, team1: "Lightning Strikers", team2: "Goal Getters", score1: 10, score2: 5, date: "May 18, 2025" },
  { id: 2, team1: "Spin Masters", team2: "Table Titans", score1: 8, score2: 9, date: "May 17, 2025" },
];

const topPlayers = [
  { id: 1, name: "Alex Johnson", wins: 24, goals: 87, avatar: "A" },
  { id: 2, name: "Sam Rodriguez", wins: 22, goals: 76, avatar: "S" },
  { id: 3, name: "Taylor Kim", wins: 19, goals: 64, avatar: "T" },
];

const Index = () => {
  return (
    <div className="space-y-8 pb-20 md:pb-10">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-8 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">Welcome to FoosBuddy!</h1>
        <p className="text-indigo-700 max-w-2xl mx-auto">
          The ultimate app for table football enthusiasts. Create leagues, track scores, and dominate the leaderboards!
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <Link to="/matches/new">Schedule a Match</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/leagues">Browse Leagues</Link>
          </Button>
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Upcoming Matches</CardTitle>
              <CardDescription>Don't miss your next game!</CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div>
                    <p className="font-semibold">{match.team1} vs {match.team2}</p>
                    <p className="text-sm text-gray-500">{match.date} at {match.time}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/matches/${match.id}`}>Details</Link>
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-indigo-600" asChild>
                <Link to="/matches">View all matches</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent results */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Recent Results</CardTitle>
              <CardDescription>Latest match outcomes</CardDescription>
            </div>
            <Trophy className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((match) => (
                <div
                  key={match.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div>
                    <p className="font-semibold">{match.team1} vs {match.team2}</p>
                    <p className="text-sm text-gray-500">{match.date}</p>
                  </div>
                  <div className="text-lg font-bold">
                    {match.score1} - {match.score2}
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-indigo-600" asChild>
                <Link to="/matches">View all results</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Top Players</CardTitle>
              <CardDescription>This month's all-stars</CardDescription>
            </div>
            <Star className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-semibold">
                      {player.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.wins} wins · {player.goals} goals</p>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-indigo-600">#{index + 1}</div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-indigo-600" asChild>
                <Link to="/leaderboard">View full leaderboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Get started with FoosBuddy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link to="/matches/new">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Match
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/leagues/new">
                <Trophy className="mr-2 h-4 w-4" />
                Create a League
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/players/new">
                <Users className="mr-2 h-4 w-4" />
                Register Player
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
