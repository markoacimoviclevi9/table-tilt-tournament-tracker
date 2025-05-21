
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Leagues from "./pages/Leagues";
import LeagueDetails from "./pages/LeagueDetails";
import NewLeague from "./pages/NewLeague";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import NewTournament from "./pages/NewTournament";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import Matches from "./pages/Matches";
import MatchDetails from "./pages/MatchDetails";
import NewMatch from "./pages/NewMatch";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="leagues" element={<Leagues />} />
            <Route path="leagues/new" element={<NewLeague />} />
            <Route path="leagues/:id" element={<LeagueDetails />} />
            <Route path="tournaments" element={<Tournaments />} />
            <Route path="tournaments/new" element={<NewTournament />} />
            <Route path="tournaments/:id" element={<TournamentDetails />} />
            <Route path="players" element={<Players />} />
            <Route path="players/:id" element={<PlayerProfile />} />
            <Route path="matches" element={<Matches />} />
            <Route path="matches/new" element={<NewMatch />} />
            <Route path="matches/:id" element={<MatchDetails />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
