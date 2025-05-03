
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { DietPlan } from "@/types";

// Mock data for diet plans
const mockDietPlans: DietPlan[] = [
  {
    id: "1",
    userId: "user1",
    name: "Low Carb Diet",
    description: "High protein, low carbohydrate diet for fat loss",
    meals: [
      {
        id: "m1",
        name: "Breakfast",
        calories: 450,
        protein: 35,
        carbs: 15,
        fat: 25,
        time: "08:00",
        notes: "Eggs, avocado, leafy greens",
      },
      {
        id: "m2",
        name: "Lunch",
        calories: 550,
        protein: 40,
        carbs: 20,
        fat: 30,
        time: "13:00",
        notes: "Grilled chicken salad with olive oil",
      },
      {
        id: "m3",
        name: "Dinner",
        calories: 500,
        protein: 35,
        carbs: 20,
        fat: 25,
        time: "19:00",
        notes: "Salmon with roasted vegetables",
      },
    ],
    targetCalories: 1800,
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    id: "2",
    userId: "user1",
    name: "Bulking Diet",
    description: "High calorie diet for muscle gain",
    meals: [
      {
        id: "m4",
        name: "Breakfast",
        calories: 650,
        protein: 40,
        carbs: 60,
        fat: 25,
        time: "07:00",
        notes: "Oatmeal with protein powder and fruit",
      },
      {
        id: "m5",
        name: "Mid-Morning Snack",
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        time: "10:00",
        notes: "Protein shake with banana",
      },
      {
        id: "m6",
        name: "Lunch",
        calories: 700,
        protein: 50,
        carbs: 70,
        fat: 25,
        time: "13:00",
        notes: "Rice with chicken and vegetables",
      },
      {
        id: "m7",
        name: "Dinner",
        calories: 800,
        protein: 50,
        carbs: 70,
        fat: 35,
        time: "19:00",
        notes: "Steak with potatoes and vegetables",
      },
    ],
    targetCalories: 3000,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-25"),
  },
  {
    id: "3",
    userId: "user1",
    name: "Intermittent Fasting",
    description: "16/8 fasting protocol",
    meals: [
      {
        id: "m8",
        name: "Late Breakfast",
        calories: 600,
        protein: 40,
        carbs: 50,
        fat: 25,
        time: "12:00",
        notes: "First meal after fasting window",
      },
      {
        id: "m9",
        name: "Lunch",
        calories: 700,
        protein: 45,
        carbs: 60,
        fat: 30,
        time: "15:00",
        notes: "Large meal with mix of macros",
      },
      {
        id: "m10",
        name: "Early Dinner",
        calories: 600,
        protein: 40,
        carbs: 40,
        fat: 25,
        time: "19:00",
        notes: "Last meal before fasting window",
      },
    ],
    targetCalories: 2000,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-03-30"),
  },
];

export default function DietList() {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>(mockDietPlans);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredDietPlans = dietPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteDietPlan = (id: string) => {
    setDietPlans(dietPlans.filter((plan) => plan.id !== id));
    toast({
      title: "Diet plan deleted",
      description: "The diet plan has been deleted successfully.",
    });
  };

  // Calculate total calories for a diet plan
  const calculateTotalCalories = (plan: DietPlan): number => {
    return plan.meals.reduce((sum, meal) => sum + meal.calories, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Diet Plans</h1>
        <Button asChild>
          <Link to="/diet-plans/create">
            <Plus className="mr-2 h-4 w-4" />
            New Diet Plan
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search diet plans..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Target Calories</TableHead>
                  <TableHead>Actual Calories</TableHead>
                  <TableHead>Meals</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDietPlans.length > 0 ? (
                  filteredDietPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">
                        <Link to={`/diet-plans/${plan.id}`} className="hover:underline text-fitness-primary">
                          {plan.name}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">{plan.description}</div>
                      </TableCell>
                      <TableCell>{plan.targetCalories} kcal</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{calculateTotalCalories(plan)} kcal</span>
                          {calculateTotalCalories(plan) !== plan.targetCalories && (
                            <Badge 
                              variant={calculateTotalCalories(plan) < plan.targetCalories ? "destructive" : "default"}
                              className="mt-1 w-fit text-xs"
                            >
                              {calculateTotalCalories(plan) < plan.targetCalories ? "Deficit" : "Surplus"}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{plan.meals.length} meals</TableCell>
                      <TableCell>
                        {plan.updatedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link to={`/diet-plans/${plan.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => deleteDietPlan(plan.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No diet plans found. Create your first one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
