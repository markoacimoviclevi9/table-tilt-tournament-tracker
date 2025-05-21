
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const leagueData = {
  id: 1,
  name: "Office Champions League",
  teams: 8,
  status: "In Progress",
  startDate: "April 12, 2025",
  endDate: "June 20, 2025",
  description: "The ultimate foosball competition for office environments. Weekly matches with final playoffs.",
};

const standings = [
  { id: 1, team: "Lightning Strikers", played: 8, won: 6, lost: 2, points: 18, goalsFor: 41, goalsAgainst: 25 },
  { id: 2, team: "Spin Masters", played: 8, won: 5, lost: 3, points: 15, goalsFor: 37, goalsAgainst: 30 },
  { id: 3, team: "Table Titans", played: 8, won: 5, lost: 3, points: 15, goalsFor: 35, goalsAgainst: 31 },
  { id: 4, team: "Goal Getters", played: 8, won: 3, lost: 5, points: 9, goalsFor: 28, goalsAgainst: 34 },
];

const fixtures = [
  { id: 1, team1: "Lightning Strikers", team2: "Spin Masters", date: "May 25, 2025", time: "18:00", status: "Scheduled" },
  { id: 2, team1: "Table Titans", team2: "Goal Getters", date: "May 26, 2025", time: "19:30", status: "Scheduled" },
  { id: 3, team1: "Lightning Strikers", team2: "Goal Getters", score1: 10, score2: 5, date: "May 18, 2025", status: "Completed" },
  { id: 4, team1: "Spin Masters", team2: "Table Titans", score1: 8, score2: 9, date: "May 17, 2025", status: "Completed" },
];

const players = [
  { id: 1, name: "Alex Johnson", team: "Lightning Strikers", goals: 18, assists: 7, avatar: "AJ" },
  { id: 2, name: "Sam Rodriguez", team: "Spin Masters", goals: 15, assists: 9, avatar: "SR" },
  { id: 3, name: "Taylor Kim", team: "Table Titans", goals: 14, assists: 5, avatar: "TK" },
];

const LeagueDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{leagueData.name}</h1>
          <p className="text-muted-foreground">{leagueData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/matches/new">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Match
            </Link>
          </Button>
          <Button asChild>
            <Link to="/leagues/1/edit">Edit League</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="font-medium text-lg">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                {leagueData.status}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Teams</span>
              <span className="font-medium text-lg">{leagueData.teams}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Start Date</span>
              <span className="font-medium text-lg">{leagueData.startDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">End Date</span>
              <span className="font-medium text-lg">{leagueData.endDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="standings">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
          <TabsTrigger value="stats">Player Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="standings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>League Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pos</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">P</TableHead>
                    <TableHead className="text-center">W</TableHead>
                    <TableHead className="text-center">L</TableHead>
                    <TableHead className="text-center">GF</TableHead>
                    <TableHead className="text-center">GA</TableHead>
                    <TableHead className="text-center">Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings.map((team, index) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{team.team}</TableCell>
                      <TableCell className="text-center">{team.played}</TableCell>
                      <TableCell className="text-center">{team.won}</TableCell>
                      <TableCell className="text-center">{team.lost}</TableCell>
                      <TableCell className="text-center">{team.goalsFor}</TableCell>
                      <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                      <TableCell className="text-center font-bold">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fixtures" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fixtures.map((match) => (
                  <div
                    key={match.id}
                    className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row items-center md:gap-8 w-full md:w-auto">
                      <div className="text-center md:text-right mb-2 md:mb-0">
                        <p className="font-semibold">{match.team1}</p>
                        {match.status === "Completed" && <p className="text-2xl font-bold">{match.score1}</p>}
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600 mb-1">
                          {match.status === "Completed" ? "Final Score" : `${match.date} at ${match.time}`}
                        </div>
                        <span className="text-sm font-medium text-gray-500">VS</span>
                      </div>
                      <div className="text-center md:text-left mt-2 md:mt-0">
                        <p className="font-semibold">{match.team2}</p>
                        {match.status === "Completed" && <p className="text-2xl font-bold">{match.score2}</p>}
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/matches/${match.id}`}>
                          {match.status === "Completed" ? "View Details" : "Match Info"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-gray-500">{player.team}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500">Goals</p>
                        <p className="font-bold text-lg">{player.goals}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Assists</p>
                        <p className="font-bold text-lg">{player.assists}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/players/${player.id}`}>Profile</Link>
                    </Button>
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

export default LeagueDetails;
