
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Plus, X } from "lucide-react";
import { Exercise, WorkoutPlan } from "@/types";
import { useWorkoutStore } from "@/stores/workoutStore";

interface WorkoutFormProps {
  initialData?: WorkoutPlan;
  mode: "create" | "edit";
}

export default function WorkoutForm({ initialData, mode }: WorkoutFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addWorkout, updateWorkout } = useWorkoutStore();

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [duration, setDuration] = useState<number>(initialData?.duration || 30);
  const [targetGoal, setTargetGoal] = useState(initialData?.targetGoal || "");
  const [exercises, setExercises] = useState<Exercise[]>(
    initialData?.exercises || []
  );

  // New exercise state
  const [newExercise, setNewExercise] = useState<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    notes?: string;
  }>({
    name: "",
    sets: 3,
    reps: 10,
    weight: undefined,
    notes: "",
  });

  const addExercise = () => {
    if (newExercise.name.trim() === "") {
      toast({
        title: "Missing exercise name",
        description: "Please provide a name for the exercise.",
        variant: "destructive",
      });
      return;
    }

    setExercises([
      ...exercises,
      {
        id: `temp-${Date.now()}`,
        ...newExercise,
      },
    ]);

    // Reset form
    setNewExercise({
      name: "",
      sets: 3,
      reps: 10,
      weight: undefined,
      notes: "",
    });
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast({
        title: "Missing workout name",
        description: "Please provide a name for this workout plan.",
        variant: "destructive",
      });
      return;
    }

    if (exercises.length === 0) {
      toast({
        title: "No exercises added",
        description: "Please add at least one exercise to your workout plan.",
        variant: "destructive",
      });
      return;
    }

    const workoutData: WorkoutPlan = {
      id: initialData?.id || `workout-${Date.now()}`,
      userId: "user1", // This would come from authentication context in a real app
      name,
      description,
      duration,
      exercises,
      targetGoal,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (mode === "create") {
      addWorkout(workoutData);
    } else {
      updateWorkout(workoutData);
    }
    
    toast({
      title: mode === "create" ? "Workout created!" : "Workout updated!",
      description: mode === "create"
        ? "Your new workout plan has been created successfully."
        : "Your workout plan has been updated successfully.",
    });

    // Navigate back to workouts list
    navigate("/workouts");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {mode === "create" ? "Create New Workout Plan" : "Edit Workout Plan"}
        </h1>
        <p className="text-gray-500">
          {mode === "create"
            ? "Set up a new workout routine with exercises and goals."
            : "Update your existing workout plan details."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Upper Body Strength"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your workout plan..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="5"
                    max="300"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Target Goal</Label>
                  <Select value={targetGoal} onValueChange={setTargetGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strength">Strength</SelectItem>
                      <SelectItem value="Muscle gain">Muscle gain</SelectItem>
                      <SelectItem value="Fat loss">Fat loss</SelectItem>
                      <SelectItem value="Endurance">Endurance</SelectItem>
                      <SelectItem value="Flexibility">Flexibility</SelectItem>
                      <SelectItem value="General fitness">General fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Exercises</h3>
              <div className="space-y-6 border-t pt-6">
                {exercises.length > 0 && (
                  <div className="space-y-4">
                    {exercises.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
                      >
                        <div>
                          <div className="font-medium">{exercise.name}</div>
                          <div className="text-sm text-gray-500">
                            {exercise.sets} sets × {exercise.reps} reps
                            {exercise.weight && ` • ${exercise.weight} kg`}
                          </div>
                          {exercise.notes && (
                            <div className="text-sm text-gray-500 mt-1">
                              Notes: {exercise.notes}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium mb-4">Add New Exercise</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="exerciseName">Exercise Name</Label>
                        <Input
                          id="exerciseName"
                          value={newExercise.name}
                          onChange={(e) =>
                            setNewExercise({ ...newExercise, name: e.target.value })
                          }
                          placeholder="e.g. Bench Press"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sets">Sets</Label>
                          <Input
                            id="sets"
                            type="number"
                            min="1"
                            max="20"
                            value={newExercise.sets}
                            onChange={(e) =>
                              setNewExercise({
                                ...newExercise,
                                sets: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reps">Reps</Label>
                          <Input
                            id="reps"
                            type="number"
                            min="1"
                            max="100"
                            value={newExercise.reps}
                            onChange={(e) =>
                              setNewExercise({
                                ...newExercise,
                                reps: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg, optional)</Label>
                        <Input
                          id="weight"
                          type="number"
                          min="0"
                          max="1000"
                          value={newExercise.weight || ""}
                          onChange={(e) =>
                            setNewExercise({
                              ...newExercise,
                              weight: e.target.value ? parseInt(e.target.value) : undefined,
                            })
                          }
                          placeholder="e.g. 50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Input
                          id="notes"
                          value={newExercise.notes || ""}
                          onChange={(e) =>
                            setNewExercise({
                              ...newExercise,
                              notes: e.target.value,
                            })
                          }
                          placeholder="e.g. Keep back straight"
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addExercise}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Exercise
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate("/workouts")}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create" ? "Create Workout Plan" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
