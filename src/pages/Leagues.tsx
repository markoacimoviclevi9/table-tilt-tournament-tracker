
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const leagues = [
  {
    id: 1,
    name: "Office Champions League",
    teams: 8,
    matches: 24,
    status: "In Progress",
    startDate: "Apr 12, 2025",
    endDate: "Jun 20, 2025",
  },
  {
    id: 2,
    name: "Downtown Foosball Masters",
    teams: 6,
    matches: 15,
    status: "In Progress",
    startDate: "May 5, 2025",
    endDate: "Jul 10, 2025",
  },
  {
    id: 3,
    name: "Weekend Warriors",
    teams: 4,
    matches: 6,
    status: "Completed",
    startDate: "Mar 1, 2025",
    endDate: "Mar 30, 2025",
  },
];

const Leagues = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
          <p className="text-muted-foreground">Browse active and upcoming foosball leagues.</p>
        </div>
        <Button asChild>
          <Link to="/leagues/new">
            <Trophy className="mr-2 h-4 w-4" />
            Create League
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <Card key={league.id} className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />
            <CardHeader className="pb-3">
              <CardTitle>{league.name}</CardTitle>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    league.status === "In Progress"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {league.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Teams</span>
                  <span className="font-medium flex items-center mt-1">
                    <Users className="h-4 w-4 mr-1 text-indigo-500" />
                    {league.teams}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Matches</span>
                  <span className="font-medium">{league.matches}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{league.startDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{league.endDate}</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link to={`/leagues/${league.id}`}>View League</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leagues;
