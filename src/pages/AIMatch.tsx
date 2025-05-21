
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Player {
  id: number;
  name: string;
  avatar: string;
  played: number;
  wins: number;
  goals: number;
  assists: number;
  team: string;
  skillLevel?: number;
}

interface BalancedTeams {
  team1: {
    id: number;
    name: string;
    skillLevel: number;
  }[];
  team2: {
    id: number;
    name: string;
    skillLevel: number;
  }[];
  skillDifference: number;
  team1AverageSkill: number;
  team2AverageSkill: number;
}

const AIMatch = () => {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [balancedTeams, setBalancedTeams] = useState<BalancedTeams | null>(null);
  
  // Fetch all players
  const { data: players, isLoading: playersLoading } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/api/players');
      return response.data;
    }
  });
  
  // Fetch suggested match times
  const { data: timeData } = useQuery({
    queryKey: ['suggested-times'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/api/ai/suggest-match-times');
      return response.data;
    }
  });
  
  // Fetch insights for selected player
  const { data: insightsData, refetch: refetchInsights } = useQuery({
    queryKey: ['player-insights', selectedPlayer],
    queryFn: async () => {
      if (!selectedPlayer) return null;
      const response = await axios.get(`http://localhost:5000/api/ai/player-insights/${selectedPlayer}`);
      return response.data;
    },
    enabled: !!selectedPlayer
  });
  
  // Fetch compatibility data for selected player
  const { data: compatibilityData, refetch: refetchCompatibility } = useQuery({
    queryKey: ['player-compatibility', selectedPlayer],
    queryFn: async () => {
      if (!selectedPlayer) return null;
      const response = await axios.get(`http://localhost:5000/api/ai/player-compatibility/${selectedPlayer}`);
      return response.data;
    },
    enabled: !!selectedPlayer
  });
  
  // Handle player selection
  const togglePlayerSelection = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      if (selectedPlayers.length < 6) {
        setSelectedPlayers([...selectedPlayers, playerId]);
      } else {
        toast({
          title: "Maximum players reached",
          description: "You can select up to 6 players for team generation",
          variant: "destructive",
        });
      }
    }
  };
  
  // Generate balanced teams
  const handleGenerateTeams = async () => {
    if (selectedPlayers.length < 4) {
      toast({
        title: "Not enough players",
        description: "Please select at least 4 players to generate balanced teams",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/ai/generate-teams', {
        playerIds: selectedPlayers
      });
      
      setBalancedTeams(response.data);
      toast({
        title: "Teams generated",
        description: "AI has created balanced teams based on player skills",
      });
    } catch (error) {
      toast({
        title: "Error generating teams",
        description: "Failed to create balanced teams",
        variant: "destructive",
      });
    }
  };
  
  // Create match with generated teams
  const handleCreateMatch = () => {
    if (!balancedTeams) return;
    
    const team1Name = "Team A";
    const team2Name = "Team B";
    
    toast({
      title: "Match setup initiated",
      description: "Redirecting to new match form with balanced teams",
    });
    
    // In a real app, you might want to store these teams in context or localStorage
    // and then retrieve them on the NewMatch page
    navigate('/matches/new');
  };
  
  useEffect(() => {
    if (selectedPlayer) {
      refetchInsights();
      refetchCompatibility();
    }
  }, [selectedPlayer, refetchInsights, refetchCompatibility]);

  const suggestedTimes = timeData?.suggestedTimes || ["18:00", "19:00", "20:00"];
  
  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Match Assistant</h1>
        <p className="text-muted-foreground">Let AI help you create balanced teams and optimize your foosball experience</p>
      </div>
      
      <Tabs defaultValue="team-builder" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="team-builder">Smart Team Builder</TabsTrigger>
          <TabsTrigger value="player-insights">Player Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team-builder" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Player Selection</CardTitle>
                <CardDescription>
                  Select 4-6 players to generate balanced teams based on skill levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {playersLoading ? (
                  <p>Loading players...</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {players?.map((player: Player) => (
                      <div key={player.id} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`player-${player.id}`} 
                          checked={selectedPlayers.includes(player.id)}
                          onCheckedChange={() => togglePlayerSelection(player.id)}
                        />
                        <Label htmlFor={`player-${player.id}`} className="flex items-center cursor-pointer">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm">
                              {player.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span>{player.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                <Button 
                  className="w-full mt-4" 
                  onClick={handleGenerateTeams}
                  disabled={selectedPlayers.length < 4}
                >
                  Generate Balanced Teams
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Smart Teams</CardTitle>
                <CardDescription>
                  AI-generated teams optimized for fair and exciting matches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {balancedTeams ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Team A</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Avg Skill: {balancedTeams.team1AverageSkill}
                        </p>
                        <div className="space-y-2">
                          {balancedTeams.team1.map(player => (
                            <div key={player.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                              <span>{player.name}</span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                Skill: {player.skillLevel}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Team B</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Avg Skill: {balancedTeams.team2AverageSkill}
                        </p>
                        <div className="space-y-2">
                          {balancedTeams.team2.map(player => (
                            <div key={player.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                              <span>{player.name}</span>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                Skill: {player.skillLevel}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Skill Difference: {balancedTeams.skillDifference.toFixed(1)}
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Recommended Time Slots:</p>
                        <div className="flex justify-center gap-2">
                          {suggestedTimes.map((time, idx) => (
                            <span key={idx} className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={handleCreateMatch}>
                      Schedule Match with These Teams
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-52 text-center space-y-4">
                    <p className="text-muted-foreground">
                      Select players on the left and click "Generate Balanced Teams" to create fair and competitive matchups
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="player-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Player Performance Analysis</CardTitle>
              <CardDescription>
                Get AI-powered insights about player strengths, weaknesses, and compatible teammates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="player-select" className="block mb-2">Select a player</Label>
                  <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                    <SelectTrigger className="w-full md:w-[250px]">
                      <SelectValue placeholder="Select a player" />
                    </SelectTrigger>
                    <SelectContent>
                      {players?.map((player: Player) => (
                        <SelectItem key={player.id} value={player.id.toString()}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedPlayer && insightsData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Performance Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {insightsData.insights.length > 0 ? (
                              insightsData.insights.map((insight: any, idx: number) => (
                                <div 
                                  key={idx} 
                                  className={`p-3 rounded-md ${
                                    insight.importance === 'high' 
                                      ? 'bg-amber-50 text-amber-800 border-l-4 border-amber-500' 
                                      : 'bg-blue-50 text-blue-800 border-l-4 border-blue-500'
                                  }`}>
                                  <p>{insight.text}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-muted-foreground">
                                Not enough match data to generate insights yet. Play more matches!
                              </p>
                            )}
                            
                            <div className="mt-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Player Skill Rating:</span>
                                <span className="text-lg font-bold">{insightsData.skillLevel}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div 
                                  className="bg-indigo-600 h-2.5 rounded-full" 
                                  style={{ width: `${Math.min(100, (insightsData.skillLevel / 100) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Teammate Compatibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {compatibilityData?.length > 0 ? (
                            <div className="space-y-3">
                              {compatibilityData.map((compatibility: any) => (
                                <div key={compatibility.teammateId} className="flex items-center justify-between">
                                  <span>{compatibility.teammateName}</span>
                                  <div className="flex items-center">
                                    <span 
                                      className={`text-sm px-2 py-1 rounded-full ${
                                        compatibility.winPercentage >= 70 
                                          ? 'bg-green-100 text-green-800' 
                                          : compatibility.winPercentage >= 50 
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      {compatibility.winPercentage}% win rate
                                    </span>
                                    <span className="text-xs text-gray-500 ml-2">
                                      ({compatibility.gamesPlayed} games)
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              No teammate data available yet. Play more team matches!
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">
                      Select a player to view their performance insights
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIMatch;
