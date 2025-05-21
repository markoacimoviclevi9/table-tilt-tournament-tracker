
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, MapPin, Star, Trophy } from "lucide-react";

// Mock match data
const matchData = {
  id: 1,
  team1: "Lightning Strikers",
  team2: "Spin Masters",
  score1: 10,
  score2: 5,
  status: "Completed", // or "Scheduled"
  date: "May 18, 2025",
  time: "18:00",
  location: "Office Break Room",
  league: "Office Champions League",
  playerOfMatch: "Alex Johnson",
  events: [
    { time: "3:12", team: "team1", player: "Alex Johnson", type: "goal", assist: "Morgan Lee" },
    { time: "8:45", team: "team2", player: "Sam Rodriguez", type: "goal", assist: null },
    { time: "12:33", team: "team1", player: "Alex Johnson", type: "goal", assist: "Jamie Taylor" },
    { time: "15:07", team: "team2", player: "Jordan Patel", type: "goal", assist: "Sam Rodriguez" },
    { time: "22:51", team: "team1", player: "Morgan Lee", type: "goal", assist: "Alex Johnson" },
    { time: "26:39", team: "team1", player: "Alex Johnson", type: "goal", assist: null },
    { time: "32:18", team: "team2", player: "Sam Rodriguez", type: "goal", assist: null },
  ]
};

const playerStats = [
  { id: 1, name: "Alex Johnson", avatar: "AJ", team: "Lightning Strikers", goals: 3, assists: 1 },
  { id: 2, name: "Morgan Lee", avatar: "ML", team: "Lightning Strikers", goals: 1, assists: 1 },
  { id: 3, name: "Jamie Taylor", avatar: "JT", team: "Lightning Strikers", goals: 0, assists: 1 },
  { id: 4, name: "Sam Rodriguez", avatar: "SR", team: "Spin Masters", goals: 2, assists: 0 },
  { id: 5, name: "Jordan Patel", avatar: "JP", team: "Spin Masters", goals: 1, assists: 1 },
];

const MatchDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Match Details</h1>
          <p className="text-muted-foreground">{matchData.league}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Match</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Match status banner */}
            <div className="w-full bg-gradient-to-r from-indigo-100 to-purple-100 rounded-md p-2 text-center">
              <span className="text-sm font-medium text-indigo-700">
                {matchData.status === "Completed" ? "Final Result" : "Upcoming Match"}
              </span>
            </div>
            
            {/* Teams and score */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 py-6">
              <div className="text-center">
                <div className="font-bold text-xl mb-2">{matchData.team1}</div>
                {matchData.status === "Completed" && (
                  <div className="text-4xl font-bold text-indigo-600">{matchData.score1}</div>
                )}
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full px-4 py-2 text-sm mb-2">
                  {matchData.date} {matchData.time && `at ${matchData.time}`}
                </div>
                <div className="text-xs flex items-center gap-1 text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {matchData.location}
                </div>
              </div>
              
              <div className="text-center">
                <div className="font-bold text-xl mb-2">{matchData.team2}</div>
                {matchData.status === "Completed" && (
                  <div className="text-4xl font-bold text-indigo-600">{matchData.score2}</div>
                )}
              </div>
            </div>
            
            {/* Player of the match */}
            {matchData.status === "Completed" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-full p-2">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-amber-700">Player of the Match</div>
                  <div className="font-bold text-amber-900">{matchData.playerOfMatch}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {matchData.status === "Completed" && (
        <>
          {/* Match events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Match Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -ml-px"></div>
                
                {matchData.events.map((event, index) => (
                  <div key={index} className="relative mb-6">
                    <div className="flex items-center">
                      <div className={`w-1/2 ${event.team === "team1" ? "pr-4" : "invisible"}`}>
                        {event.team === "team1" && (
                          <div className="flex justify-end">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="font-medium">{event.player}</div>
                                  {event.type === "goal" && (
                                    <div className="text-sm text-gray-500">
                                      {event.assist ? `Assist: ${event.assist}` : "Unassisted goal"}
                                    </div>
                                  )}
                                </div>
                                <div className="bg-indigo-500 rounded-full p-1">
                                  {event.type === "goal" ? (
                                    <Trophy className="h-4 w-4 text-white" />
                                  ) : (
                                    <Calendar className="h-4 w-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow text-xs font-medium">
                        {event.time}
                      </div>
                      <div className={`w-1/2 ${event.team === "team2" ? "pl-4" : "invisible"}`}>
                        {event.team === "team2" && (
                          <div className="flex justify-start">
                            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div className="bg-purple-500 rounded-full p-1">
                                  {event.type === "goal" ? (
                                    <Trophy className="h-4 w-4 text-white" />
                                  ) : (
                                    <Calendar className="h-4 w-4 text-white" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{event.player}</div>
                                  {event.type === "goal" && (
                                    <div className="text-sm text-gray-500">
                                      {event.assist ? `Assist: ${event.assist}` : "Unassisted goal"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Player statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
                    <TableHead className="text-center">Assists</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerStats.map((player) => (
                    <TableRow key={player.id}>
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
                      <TableCell>{player.team}</TableCell>
                      <TableCell className="text-center font-medium">{player.goals}</TableCell>
                      <TableCell className="text-center">{player.assists}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MatchDetails;
