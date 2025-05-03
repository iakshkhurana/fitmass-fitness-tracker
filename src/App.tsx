import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";

// Workout Pages
import WorkoutsList from "./pages/workouts/WorkoutsList";
import WorkoutForm from "./pages/workouts/WorkoutForm";

// Diet Pages
import DietList from "./pages/diet/DietList";
import DietForm from "./pages/diet/DietForm";

// Progress Pages
import ProgressList from "./pages/progress/ProgressList";
import ProgressForm from "./pages/progress/ProgressForm";

// Profile Pages
import ProfileSettings from "./pages/profile/ProfileSettings";

// Admin Pages
import AdminPanel from "./pages/admin/AdminPanel";

// Other Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Workout Routes */}
            <Route path="workouts" element={<WorkoutsList />} />
            <Route path="workouts/create" element={<WorkoutForm mode="create" />} />
            <Route path="workouts/:id/edit" element={<WorkoutForm mode="edit" />} />
            
            {/* Diet Routes */}
            <Route path="diet-plans" element={<DietList />} />
            <Route path="diet-plans/create" element={<DietForm mode="create" />} />
            <Route path="diet-plans/:id/edit" element={<DietForm mode="edit" />} />
            
            {/* Progress Routes */}
            <Route path="progress" element={<ProgressList />} />
            <Route path="progress/add" element={<ProgressForm mode="create" />} />
            <Route path="progress/:id/edit" element={<ProgressForm mode="edit" />} />
            
            {/* Profile Routes */}
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="settings" element={<ProfileSettings />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<AdminPanel />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
