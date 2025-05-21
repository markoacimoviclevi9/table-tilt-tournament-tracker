
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const tournaments = [
  {
    id: 1,
    name: "Spring Championship",
    teams: 8,
    format: "Knockout",
    status: "In Progress",
    startDate: "May 15, 2025",
    endDate: "May 22, 2025",
  },
  {
    id: 2,
    name: "Monthly Cup",
    teams: 12,
    format: "Group + Knockout",
    status: "Upcoming",
    startDate: "Jun 5, 2025",
    endDate: "Jun 12, 2025",
  },
  {
    id: 3,
    name: "Winter Tournament",
    teams: 16,
    format: "Double Elimination",
    status: "Completed",
    startDate: "Feb 10, 2025",
    endDate: "Feb 25, 2025",
  },
];

const Tournaments = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="text-muted-foreground">Browse active and upcoming foosball tournaments.</p>
        </div>
        <Button asChild>
          <Link to="/tournaments/new">
            <Trophy className="mr-2 h-4 w-4" />
            Create Tournament
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500" />
            <CardHeader className="pb-3">
              <CardTitle>{tournament.name}</CardTitle>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    tournament.status === "In Progress"
                      ? "bg-green-100 text-green-800"
                      : tournament.status === "Upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tournament.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Teams</span>
                  <span className="font-medium flex items-center mt-1">
                    <Users className="h-4 w-4 mr-1 text-amber-500" />
                    {tournament.teams}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium">{tournament.format}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium">{tournament.startDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium">{tournament.endDate}</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link to={`/tournaments/${tournament.id}`}>View Tournament</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
