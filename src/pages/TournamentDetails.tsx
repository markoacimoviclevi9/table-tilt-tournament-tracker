
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const tournamentData = {
  id: 1,
  name: "Spring Championship",
  teams: 8,
  format: "Knockout",
  status: "In Progress",
  startDate: "May 15, 2025",
  endDate: "May 22, 2025",
  description: "An exciting knockout tournament to crown the spring champion of foosball.",
  rounds: 3,
  currentRound: 2,
};

const matches = [
  // Quarterfinals
  { id: 1, round: "Quarter Final", team1: "Lightning Strikers", team2: "Rod Warriors", score1: 10, score2: 5, date: "May 15, 2025", status: "Completed" },
  { id: 2, round: "Quarter Final", team1: "Spin Masters", team2: "Table Titans", score1: 8, score2: 9, date: "May 15, 2025", status: "Completed" },
  { id: 3, round: "Quarter Final", team1: "Goal Getters", team2: "Foosball Fury", score1: 7, score2: 6, date: "May 16, 2025", status: "Completed" },
  { id: 4, round: "Quarter Final", team1: "Control Kings", team2: "Spin Doctors", score1: 10, score2: 8, date: "May 16, 2025", status: "Completed" },
  
  // Semifinals
  { id: 5, round: "Semi Final", team1: "Lightning Strikers", team2: "Table Titans", score1: 10, score2: 8, date: "May 19, 2025", status: "Completed" },
  { id: 6, round: "Semi Final", team1: "Goal Getters", team2: "Control Kings", date: "May 20, 2025", time: "18:00", status: "Scheduled" },
  
  // Final
  { id: 7, round: "Final", team1: "Lightning Strikers", team2: "TBD", date: "May 22, 2025", time: "19:00", status: "Scheduled" },
];

const teams = [
  { id: 1, name: "Lightning Strikers", played: 2, wins: 2, losses: 0 },
  { id: 2, name: "Table Titans", played: 2, wins: 1, losses: 1 },
  { id: 3, name: "Goal Getters", played: 1, wins: 1, losses: 0 },
  { id: 4, name: "Control Kings", played: 1, wins: 1, losses: 0 },
  { id: 5, name: "Rod Warriors", played: 1, wins: 0, losses: 1 },
  { id: 6, name: "Spin Masters", played: 1, wins: 0, losses: 1 },
  { id: 7, name: "Foosball Fury", played: 1, wins: 0, losses: 1 },
  { id: 8, name: "Spin Doctors", played: 1, wins: 0, losses: 1 },
];

const TournamentDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{tournamentData.name}</h1>
          <p className="text-muted-foreground">{tournamentData.description}</p>
        </div>
        <Button asChild>
          <Link to="/tournaments/1/edit">Edit Tournament</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="font-medium text-lg">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                {tournamentData.status}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Format</span>
              <span className="font-medium text-lg">{tournamentData.format}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Teams</span>
              <span className="font-medium text-lg">{tournamentData.teams}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Start Date</span>
              <span className="font-medium text-lg">{tournamentData.startDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">End Date</span>
              <span className="font-medium text-lg">{tournamentData.endDate}</span>
            </div>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="font-medium">Tournament Progress</span>
              </div>
              <span className="text-amber-600 font-medium">
                Round {tournamentData.currentRound}/{tournamentData.rounds}
              </span>
            </div>
            <div className="mt-2 w-full bg-amber-100 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full" 
                style={{ width: `${(tournamentData.currentRound / tournamentData.rounds) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="matches">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="matches">Tournament Matches</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="matches" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Match Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Quarter Final", "Semi Final", "Final"].map((round) => (
                  <div key={round}>
                    <h3 className="font-semibold text-lg mb-3">{round}</h3>
                    <div className="space-y-3">
                      {matches
                        .filter(match => match.round === round)
                        .map((match) => (
                          <div
                            key={match.id}
                            className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                          >
                            <div className="flex flex-col md:flex-row items-center md:gap-8 w-full md:w-auto mb-3 md:mb-0">
                              <div className="text-center md:text-right mb-2 md:mb-0">
                                <p className="font-semibold">{match.team1}</p>
                                {match.status === "Completed" && <p className="text-2xl font-bold">{match.score1}</p>}
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600 mb-1">
                                  {match.status === "Completed" ? "Final Score" : `${match.date} ${match.time ? `at ${match.time}` : ''}`}
                                </div>
                                <span className="text-sm font-medium text-gray-500">VS</span>
                              </div>
                              <div className="text-center md:text-left mt-2 md:mt-0">
                                <p className="font-semibold">{match.team2}</p>
                                {match.status === "Completed" && <p className="text-2xl font-bold">{match.score2}</p>}
                              </div>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/matches/${match.id}`}>
                                  {match.status === "Completed" ? "View Details" : "Match Info"}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teams" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Participating Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Played</TableHead>
                    <TableHead className="text-center">Wins</TableHead>
                    <TableHead className="text-center">Losses</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell className="text-center">{team.played}</TableCell>
                      <TableCell className="text-center font-medium text-green-600">{team.wins}</TableCell>
                      <TableCell className="text-center text-red-600">{team.losses}</TableCell>
                      <TableCell className="text-center">
                        {team.losses === 0 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Eliminated
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TournamentDetails;
