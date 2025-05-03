
import { create } from 'zustand';
import { WorkoutPlan } from '@/types';

// Initial mock data
const initialWorkouts: WorkoutPlan[] = [
  {
    id: "1",
    userId: "user1",
    name: "Upper Body Strength",
    description: "Focus on chest, shoulders and triceps",
    duration: 45,
    exercises: [
      { id: "e1", name: "Bench Press", sets: 3, reps: 8 },
      { id: "e2", name: "Shoulder Press", sets: 3, reps: 12 },
      { id: "e3", name: "Tricep Dips", sets: 3, reps: 15 },
    ],
    targetGoal: "Strength",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    userId: "user1",
    name: "Leg Day",
    description: "Full leg workout with focus on quads",
    duration: 60,
    exercises: [
      { id: "e4", name: "Squats", sets: 4, reps: 10 },
      { id: "e5", name: "Leg Press", sets: 3, reps: 12 },
      { id: "e6", name: "Lunges", sets: 3, reps: 10 },
    ],
    targetGoal: "Muscle gain",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    id: "3",
    userId: "user1",
    name: "HIIT Cardio",
    description: "High intensity interval training",
    duration: 30,
    exercises: [
      { id: "e7", name: "Burpees", sets: 3, reps: 15 },
      { id: "e8", name: "Mountain Climbers", sets: 3, reps: 20 },
      { id: "e9", name: "Jump Squats", sets: 3, reps: 15 },
    ],
    targetGoal: "Fat loss",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-25"),
  },
];

interface WorkoutStore {
  workouts: WorkoutPlan[];
  addWorkout: (workout: WorkoutPlan) => void;
  updateWorkout: (workout: WorkoutPlan) => void;
  deleteWorkout: (id: string) => void;
  getWorkout: (id: string) => WorkoutPlan | undefined;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: initialWorkouts,
  addWorkout: (workout) => {
    set((state) => ({
      workouts: [...state.workouts, workout]
    }));
  },
  updateWorkout: (workout) => {
    set((state) => ({
      workouts: state.workouts.map((w) => 
        w.id === workout.id ? workout : w
      )
    }));
  },
  deleteWorkout: (id) => {
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id)
    }));
  },
  getWorkout: (id) => {
    return get().workouts.find((w) => w.id === id);
  }
}));
