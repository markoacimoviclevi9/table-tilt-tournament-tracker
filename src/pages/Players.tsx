
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const players = [
  { id: 1, name: "Alex Johnson", avatar: "AJ", played: 28, wins: 24, goals: 87, assists: 32, team: "Lightning Strikers" },
  { id: 2, name: "Sam Rodriguez", avatar: "SR", played: 26, wins: 22, goals: 76, assists: 41, team: "Spin Masters" },
  { id: 3, name: "Taylor Kim", avatar: "TK", played: 30, wins: 19, goals: 64, assists: 27, team: "Table Titans" },
  { id: 4, name: "Jordan Patel", avatar: "JP", played: 24, wins: 17, goals: 58, assists: 35, team: "Goal Getters" },
  { id: 5, name: "Casey Morgan", avatar: "CM", played: 22, wins: 15, goals: 52, assists: 29, team: "Foosball Fury" },
  { id: 6, name: "Morgan Lee", avatar: "ML", played: 20, wins: 13, goals: 45, assists: 22, team: "Lightning Strikers" },
  { id: 7, name: "Jamie Taylor", avatar: "JT", played: 18, wins: 11, goals: 40, assists: 18, team: "Rod Warriors" },
  { id: 8, name: "Riley Nguyen", avatar: "RN", played: 16, wins: 9, goals: 35, assists: 15, team: "Spin Masters" },
];

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">Browse all registered foosball players.</p>
        </div>
        <Button asChild>
          <Link to="/players/new">
            <Users className="mr-2 h-4 w-4" />
            Register Player
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-sm">
        <Input
          placeholder="Search players or teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl">
                    {player.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{player.name}</h3>
                  <p className="text-sm text-gray-500">{player.team}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4 text-center text-sm">
                <div className="bg-gray-50 p-2 rounded-md">
                  <p className="text-gray-500">Matches</p>
                  <p className="font-semibold text-gray-700">{player.played}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-md">
                  <p className="text-green-700">Wins</p>
                  <p className="font-semibold text-green-700">{player.wins}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-md">
                  <p className="text-blue-700">Goals</p>
                  <p className="font-semibold text-blue-700">{player.goals}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-md">
                  <p className="text-purple-700">Assists</p>
                  <p className="font-semibold text-purple-700">{player.assists}</p>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link to={`/players/${player.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Players;
