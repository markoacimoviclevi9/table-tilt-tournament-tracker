
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Trophy, Users, Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            <span>FoosBuddy</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/leagues" className="hover:text-indigo-200 transition">Leagues</Link>
            <Link to="/tournaments" className="hover:text-indigo-200 transition">Tournaments</Link>
            <Link to="/players" className="hover:text-indigo-200 transition">Players</Link>
          </div>
          <div className="flex gap-2">
            <Link to="/profile" className="bg-white/20 hover:bg-white/30 transition rounded-full p-2">
              <Users className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          <NavLink to="/" icon={<Home className="h-5 w-5" />} label="Home" />
          <NavLink to="/leagues" icon={<Trophy className="h-5 w-5" />} label="Leagues" />
          <NavLink to="/matches" icon={<Calendar className="h-5 w-5" />} label="Matches" />
          <NavLink to="/leaderboard" icon={<Star className="h-5 w-5" />} label="Rankings" />
        </div>
      </nav>
    </div>
  );
};

const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center py-2 px-4",
        isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Layout;
