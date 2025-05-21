
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Star, Users } from "lucide-react";

// Mock data
const playerStats = [
  { id: 1, name: "Alex Johnson", avatar: "AJ", played: 28, wins: 24, losses: 4, goals: 87, assists: 32, team: "Lightning Strikers" },
  { id: 2, name: "Sam Rodriguez", avatar: "SR", played: 26, wins: 22, losses: 4, goals: 76, assists: 41, team: "Spin Masters" },
  { id: 3, name: "Taylor Kim", avatar: "TK", played: 30, wins: 19, losses: 11, goals: 64, assists: 27, team: "Table Titans" },
  { id: 4, name: "Jordan Patel", avatar: "JP", played: 24, wins: 17, losses: 7, goals: 58, assists: 35, team: "Goal Getters" },
  { id: 5, name: "Casey Morgan", avatar: "CM", played: 22, wins: 15, losses: 7, goals: 52, assists: 29, team: "Foosball Fury" },
];

const teamStats = [
  { id: 1, name: "Lightning Strikers", played: 16, wins: 14, losses: 2, goalsFor: 93, goalsAgainst: 47 },
  { id: 2, name: "Spin Masters", played: 16, wins: 12, losses: 4, goalsFor: 84, goalsAgainst: 55 },
  { id: 3, name: "Table Titans", played: 16, wins: 10, losses: 6, goalsFor: 78, goalsAgainst: 64 },
  { id: 4, name: "Goal Getters", played: 16, wins: 8, losses: 8, goalsFor: 72, goalsAgainst: 69 },
  { id: 5, name: "Foosball Fury", played: 16, wins: 6, losses: 10, goalsFor: 65, goalsAgainst: 74 },
];

const Leaderboard = () => {
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  
  const filteredPlayers = playerStats.filter(player => 
    player.name.toLowerCase().includes(playerSearchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(playerSearchTerm.toLowerCase())
  );
  
  const filteredTeams = teamStats.filter(team => 
    team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Check out the rankings and statistics for players and teams.</p>
      </div>

      <Tabs defaultValue="players">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="players" className="mt-4 space-y-4">
          <div className="flex items-center">
            <Input
              placeholder="Search players..."
              value={playerSearchTerm}
              onChange={(e) => setPlayerSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Player Rankings
                </CardTitle>
              </div>
              <CardDescription>Ranked by total wins</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-center">Team</TableHead>
                    <TableHead className="text-center">Played</TableHead>
                    <TableHead className="text-center">Wins</TableHead>
                    <TableHead className="text-center">Losses</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
                    <TableHead className="text-center">Assists</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                              {player.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>{player.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{player.team}</TableCell>
                      <TableCell className="text-center">{player.played}</TableCell>
                      <TableCell className="text-center font-bold text-green-600">{player.wins}</TableCell>
                      <TableCell className="text-center text-red-600">{player.losses}</TableCell>
                      <TableCell className="text-center">{player.goals}</TableCell>
                      <TableCell className="text-center">{player.assists}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="mt-4 space-y-4">
          <div className="flex items-center">
            <Input
              placeholder="Search teams..."
              value={teamSearchTerm}
              onChange={(e) => setTeamSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  Team Rankings
                </CardTitle>
              </div>
              <CardDescription>Ranked by total wins</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Played</TableHead>
                    <TableHead className="text-center">Wins</TableHead>
                    <TableHead className="text-center">Losses</TableHead>
                    <TableHead className="text-center">GF</TableHead>
                    <TableHead className="text-center">GA</TableHead>
                    <TableHead className="text-center">Diff</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team, index) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell className="text-center">{team.played}</TableCell>
                      <TableCell className="text-center font-bold text-green-600">{team.wins}</TableCell>
                      <TableCell className="text-center text-red-600">{team.losses}</TableCell>
                      <TableCell className="text-center">{team.goalsFor}</TableCell>
                      <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                      <TableCell className="text-center font-medium">
                        <span className={team.goalsFor - team.goalsAgainst > 0 ? "text-green-600" : "text-red-600"}>
                          {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
                          {team.goalsFor - team.goalsAgainst}
                        </span>
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

export default Leaderboard;
