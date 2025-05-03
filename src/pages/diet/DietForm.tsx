
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, X } from "lucide-react";
import { DietPlan, Meal } from "@/types";

interface DietFormProps {
  initialData?: DietPlan;
  mode: "create" | "edit";
}

export default function DietForm({ initialData, mode }: DietFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [targetCalories, setTargetCalories] = useState<number>(
    initialData?.targetCalories || 2000
  );
  const [meals, setMeals] = useState<Meal[]>(initialData?.meals || []);

  // New meal state
  const [newMeal, setNewMeal] = useState<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
    notes?: string;
  }>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    time: "12:00",
    notes: "",
  });

  // Calculate current total calories
  const currentTotalCalories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  // Calculate macronutrient totals
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const addMeal = () => {
    if (newMeal.name.trim() === "") {
      toast({
        title: "Missing meal name",
        description: "Please provide a name for the meal.",
        variant: "destructive",
      });
      return;
    }

    setMeals([
      ...meals,
      {
        id: `temp-${Date.now()}`,
        ...newMeal,
      },
    ]);

    // Reset form
    setNewMeal({
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      time: "12:00",
      notes: "",
    });
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast({
        title: "Missing diet plan name",
        description: "Please provide a name for this diet plan.",
        variant: "destructive",
      });
      return;
    }

    if (meals.length === 0) {
      toast({
        title: "No meals added",
        description: "Please add at least one meal to your diet plan.",
        variant: "destructive",
      });
      return;
    }

    // This would normally be where we send data to the backend
    // For now, we'll just simulate success
    
    toast({
      title: mode === "create" ? "Diet plan created!" : "Diet plan updated!",
      description: mode === "create"
        ? "Your new diet plan has been created successfully."
        : "Your diet plan has been updated successfully.",
    });

    // Navigate back to diet plans list
    navigate("/diet-plans");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {mode === "create" ? "Create New Diet Plan" : "Edit Diet Plan"}
        </h1>
        <p className="text-gray-500">
          {mode === "create"
            ? "Create a new meal plan with nutritional targets."
            : "Update your existing diet plan details."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Diet Plan Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Low Carb Diet"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your diet plan..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCalories">Target Daily Calories</Label>
                <Input
                  id="targetCalories"
                  type="number"
                  min="500"
                  max="10000"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-4 p-4 border rounded-md bg-gray-50">
                <div>
                  <div className="text-sm text-gray-500">Current Total</div>
                  <div className="font-medium">{currentTotalCalories} kcal</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Protein</div>
                  <div className="font-medium">{totalProtein}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Carbs</div>
                  <div className="font-medium">{totalCarbs}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fat</div>
                  <div className="font-medium">{totalFat}g</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Meals</h3>
              <div className="space-y-6 border-t pt-6">
                {meals.length > 0 && (
                  <div className="space-y-4">
                    {meals.map((meal, index) => (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{meal.name}</div>
                            <div className="text-xs text-gray-500 px-2 py-0.5 bg-gray-200 rounded">
                              {meal.time}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {meal.calories} kcal • {meal.protein}g protein • {meal.carbs}g carbs • {meal.fat}g fat
                          </div>
                          {meal.notes && (
                            <div className="text-sm text-gray-500 mt-1">
                              Notes: {meal.notes}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMeal(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium mb-4">Add New Meal</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mealName">Meal Name</Label>
                        <Input
                          id="mealName"
                          value={newMeal.name}
                          onChange={(e) =>
                            setNewMeal({ ...newMeal, name: e.target.value })
                          }
                          placeholder="e.g. Breakfast"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mealTime">Meal Time</Label>
                        <Input
                          id="mealTime"
                          type="time"
                          value={newMeal.time}
                          onChange={(e) =>
                            setNewMeal({ ...newMeal, time: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="calories">Calories</Label>
                        <Input
                          id="calories"
                          type="number"
                          min="0"
                          max="5000"
                          value={newMeal.calories}
                          onChange={(e) =>
                            setNewMeal({
                              ...newMeal,
                              calories: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="protein">Protein (g)</Label>
                        <Input
                          id="protein"
                          type="number"
                          min="0"
                          max="500"
                          value={newMeal.protein}
                          onChange={(e) =>
                            setNewMeal({
                              ...newMeal,
                              protein: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carbs">Carbs (g)</Label>
                        <Input
                          id="carbs"
                          type="number"
                          min="0"
                          max="500"
                          value={newMeal.carbs}
                          onChange={(e) =>
                            setNewMeal({
                              ...newMeal,
                              carbs: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fat">Fat (g)</Label>
                        <Input
                          id="fat"
                          type="number"
                          min="0"
                          max="500"
                          value={newMeal.fat}
                          onChange={(e) =>
                            setNewMeal({
                              ...newMeal,
                              fat: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (optional)</Label>
                      <Input
                        id="notes"
                        value={newMeal.notes || ""}
                        onChange={(e) =>
                          setNewMeal({
                            ...newMeal,
                            notes: e.target.value,
                          })
                        }
                        placeholder="e.g. Include 2 eggs and whole wheat toast"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMeal}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Meal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate("/diet-plans")}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create" ? "Create Diet Plan" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
