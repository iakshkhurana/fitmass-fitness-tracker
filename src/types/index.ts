
// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  height?: number; // in cm
  weight?: number; // in kg
  profileImageUrl?: string;
}

// Authentication related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Workout related types
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  duration: number; // in minutes
  exercises: Exercise[];
  targetGoal?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Diet related types
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  time: string; // format: "HH:MM"
  notes?: string;
}

export interface DietPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  meals: Meal[];
  targetCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

// Progress tracking types
export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFatPercentage?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard stats type
export interface DashboardStats {
  totalWorkouts: number;
  weeklyCalorieAvg: number;
  monthlyProgressRate: number; // percentage
  currentWeight?: number;
  weightChange?: number; // + for gain, - for loss
  nextScheduledWorkout?: WorkoutPlan;
}
