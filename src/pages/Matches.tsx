
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

// Mock data
const upcomingMatches = [
  { id: 1, team1: "Lightning Strikers", team2: "Spin Masters", date: "May 25, 2025", time: "18:00", league: "Office Champions League" },
  { id: 2, team1: "Table Titans", team2: "Goal Getters", date: "May 26, 2025", time: "19:30", league: "Office Champions League" },
  { id: 3, team1: "Foosball Fury", team2: "Rod Warriors", date: "May 28, 2025", time: "17:00", league: "Downtown Foosball Masters" },
];

const recentMatches = [
  { 
    id: 4, 
    team1: "Lightning Strikers", 
    team2: "Goal Getters", 
    score1: 10, 
    score2: 5, 
    date: "May 18, 2025", 
    league: "Office Champions League",
    playerOfMatch: "Alex Johnson"
  },
  { 
    id: 5, 
    team1: "Spin Masters", 
    team2: "Table Titans", 
    score1: 8, 
    score2: 9, 
    date: "May 17, 2025", 
    league: "Office Champions League",
    playerOfMatch: "Taylor Kim"
  },
  { 
    id: 6, 
    team1: "Foosball Fury", 
    team2: "Rod Warriors", 
    score1: 7, 
    score2: 7, 
    date: "May 15, 2025", 
    league: "Downtown Foosball Masters",
    playerOfMatch: "Jordan Patel"
  },
];

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUpcoming = upcomingMatches.filter(match => 
    match.team1.toLowerCase().includes(searchTerm.toLowerCase()) || 
    match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.league.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecent = recentMatches.filter(match => 
    match.team1.toLowerCase().includes(searchTerm.toLowerCase()) || 
    match.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">View and manage all foosball matches.</p>
        </div>
        <Button asChild>
          <Link to="/matches/new">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Match
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-sm">
        <Input
          placeholder="Search matches, teams or leagues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-4">
            {filteredUpcoming.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No upcoming matches found.</p>
            ) : (
              filteredUpcoming.map((match) => (
                <Card key={match.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="flex flex-col md:flex-row items-center md:gap-8 w-full md:w-auto mb-4 md:mb-0">
                        <div className="text-center md:text-right mb-2 md:mb-0">
                          <p className="font-semibold">{match.team1}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600 mb-1">
                            {match.date} at {match.time}
                          </div>
                          <span className="text-sm font-medium text-gray-500">VS</span>
                          <div className="text-xs text-indigo-600 mt-1">{match.league}</div>
                        </div>
                        <div className="text-center md:text-left mt-2 md:mt-0">
                          <p className="font-semibold">{match.team2}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/matches/${match.id}`}>Match Info</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <div className="space-y-4">
            {filteredRecent.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No recent matches found.</p>
            ) : (
              filteredRecent.map((match) => (
                <Card key={match.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="flex flex-col md:flex-row items-center md:gap-8 w-full md:w-auto mb-4 md:mb-0">
                        <div className="text-center md:text-right mb-2 md:mb-0">
                          <p className="font-semibold">{match.team1}</p>
                          <p className="text-2xl font-bold text-indigo-600">{match.score1}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600 mb-1">
                            {match.date}
                          </div>
                          <span className="text-sm font-medium text-gray-500">FINAL</span>
                          <div className="text-xs text-indigo-600 mt-1">{match.league}</div>
                        </div>
                        <div className="text-center md:text-left mt-2 md:mt-0">
                          <p className="font-semibold">{match.team2}</p>
                          <p className="text-2xl font-bold text-indigo-600">{match.score2}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="text-xs text-gray-500">Player of the Match</div>
                        <div className="text-sm font-medium">{match.playerOfMatch}</div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/matches/${match.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Matches;
