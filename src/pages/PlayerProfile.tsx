
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const playerData = {
  id: 1,
  name: "Alex Johnson",
  avatar: "AJ",
  team: "Lightning Strikers",
  position: "Offense",
  joinDate: "January 15, 2025",
  bio: "Foosball enthusiast with a passion for quick reflexes and strategic gameplay. Office champion three years running.",
  stats: {
    played: 28,
    wins: 24,
    losses: 4,
    winRate: 85.7,
    goals: 87,
    assists: 32,
    mvps: 8
  }
};

const recentMatches = [
  { id: 1, team1: "Lightning Strikers", team2: "Goal Getters", score1: 10, score2: 5, date: "May 18, 2025", goals: 3, assists: 1 },
  { id: 2, team1: "Spin Masters", team2: "Lightning Strikers", score1: 6, score2: 8, date: "May 10, 2025", goals: 4, assists: 0 },
  { id: 3, team1: "Lightning Strikers", team2: "Table Titans", score1: 7, score2: 9, date: "May 3, 2025", goals: 2, assists: 2 },
];

const achievements = [
  { id: 1, title: "Hat-Trick Hero", description: "Score three or more goals in a single match", date: "May 18, 2025" },
  { id: 2, title: "MVP", description: "Named Most Valuable Player", date: "May 10, 2025" },
  { id: 3, title: "League Champion", description: "Won the Office Champions League", date: "April 5, 2025" },
  { id: 4, title: "Playmaker", description: "Recorded 5+ assists in a tournament", date: "March 15, 2025" },
];

const PlayerProfile = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{playerData.name}</h1>
          <p className="text-muted-foreground">{playerData.team} · {playerData.position}</p>
        </div>
        <Button asChild>
          <Link to="/players/1/edit">Edit Profile</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl">
                  {playerData.avatar}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{playerData.name}</h2>
              <p className="text-muted-foreground">{playerData.team}</p>
              <div className="mt-2 text-sm text-gray-500">Member since {playerData.joinDate}</div>
              
              <div className="mt-6 text-sm text-left w-full">
                <p>{playerData.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Player Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-indigo-50 rounded-lg p-3 text-center">
                <p className="text-indigo-600 text-xs uppercase font-semibold">Matches</p>
                <p className="text-2xl font-bold">{playerData.stats.played}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-green-600 text-xs uppercase font-semibold">Wins</p>
                <p className="text-2xl font-bold">{playerData.stats.wins}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-blue-600 text-xs uppercase font-semibold">Win Rate</p>
                <p className="text-2xl font-bold">{playerData.stats.winRate}%</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <p className="text-amber-600 text-xs uppercase font-semibold">MVPs</p>
                <p className="text-2xl font-bold">{playerData.stats.mvps}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <Trophy className="h-4 w-4 text-indigo-500 mr-2" />
                  <h3 className="font-semibold">Scoring</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Goals</span>
                    <span className="font-medium">{playerData.stats.goals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Goals per Game</span>
                    <span className="font-medium">{(playerData.stats.goals / playerData.stats.played).toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-indigo-500 mr-2" />
                  <h3 className="font-semibold">Playmaking</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Assists</span>
                    <span className="font-medium">{playerData.stats.assists}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Assists per Game</span>
                    <span className="font-medium">{(playerData.stats.assists / playerData.stats.played).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matches">
        <TabsList>
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="matches" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Match History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
                    <TableHead className="text-center">Assists</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentMatches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell className="font-medium">{match.date}</TableCell>
                      <TableCell>
                        {match.team1} vs {match.team2}
                      </TableCell>
                      <TableCell>
                        <span className={
                          (match.team1 === playerData.team && match.score1 > match.score2) || 
                          (match.team2 === playerData.team && match.score2 > match.score1)
                            ? "text-green-600"
                            : "text-red-600"
                        }>
                          {match.score1} - {match.score2}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{match.goals}</TableCell>
                      <TableCell className="text-center">{match.assists}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/matches/${match.id}`}>Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Player Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
                  >
                    <div className="rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-2 flex-shrink-0">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      <p className="text-xs text-indigo-600 mt-1">Earned on {achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerProfile;
