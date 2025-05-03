import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Dumbbell,
  Utensils,
  ChartPie,
  Users,
  Settings,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => (
  <Link to={href}>
    <Button
      variant={active ? "default" : "ghost"}
      className={`w-full justify-start ${
        active 
          ? "bg-fitness-primary text-white hover:bg-fitness-dark" 
          : "text-gray-600 hover:text-fitness-primary hover:bg-fitness-light"
      }`}
    >
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </Button>
  </Link>
);

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { toast } = useToast();
  
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Dumbbell, label: "Workouts", href: "/workouts" },
    { icon: Utensils, label: "Diet Plans", href: "/diet-plans" },
    { icon: ChartPie, label: "Progress", href: "/progress" },
    { icon: Users, label: "Admin Panel", href: "/admin" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobile && (
        <Button
          variant="ghost"
          className="fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </Button>
      )}

      <aside className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isMobile ? "fixed inset-y-0 left-0 z-40" : ""} 
        w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-fitness-primary">FitTrack Pro</h1>
          <p className="text-sm text-gray-500">Fitness Management System</p>
        </div>

        <Separator />

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
            />
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-600 hover:text-fitness-primary"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <h2 className="text-xl font-semibold text-gray-800">
            {location.pathname === "/dashboard" && "Dashboard"}
            {location.pathname === "/workouts" && "Workout Plans"}
            {location.pathname === "/diet-plans" && "Diet Plans"}
            {location.pathname === "/progress" && "Progress Tracking"}
            {location.pathname === "/admin" && "Admin Panel"}
            {location.pathname === "/settings" && "Settings"}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-fitness-primary text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
