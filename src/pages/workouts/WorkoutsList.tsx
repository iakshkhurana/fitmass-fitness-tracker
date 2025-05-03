
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
import { useState } from "react";
import { useWorkoutStore } from "@/stores/workoutStore";
import { Badge } from "@/components/ui/badge";

export default function WorkoutsList() {
  const { workouts, deleteWorkout } = useWorkoutStore();
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.targetGoal?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteWorkout(id);
    toast({
      title: "Workout deleted",
      description: "The workout plan has been deleted successfully.",
    });
  };

  const getBadgeColorForGoal = (goal?: string) => {
    switch (goal) {
      case "Strength":
        return "bg-blue-500 hover:bg-blue-600";
      case "Muscle gain":
        return "bg-purple-500 hover:bg-purple-600";
      case "Fat loss":
        return "bg-red-500 hover:bg-red-600";
      case "Endurance":
        return "bg-green-500 hover:bg-green-600";
      case "Flexibility":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "General fitness":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Workout Plans</h1>
        <Button asChild>
          <Link to="/workouts/create">
            <Plus className="mr-2 h-4 w-4" />
            New Workout Plan
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
                placeholder="Search workout plans..."
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
                  <TableHead>Goal</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Exercises</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkouts.length > 0 ? (
                  filteredWorkouts.map((workout) => (
                    <TableRow key={workout.id}>
                      <TableCell className="font-medium">
                        <Link to={`/workouts/${workout.id}`} className="hover:underline text-fitness-primary">
                          {workout.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {workout.targetGoal && (
                          <Badge className={getBadgeColorForGoal(workout.targetGoal)}>
                            {workout.targetGoal}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{workout.duration} min</TableCell>
                      <TableCell>{workout.exercises.length} exercises</TableCell>
                      <TableCell>
                        {workout.updatedAt.toLocaleDateString()}
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
                            <Link to={`/workouts/${workout.id}/edit`}>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => handleDelete(workout.id)}>
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
                      No workout plans found. Create your first one!
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
