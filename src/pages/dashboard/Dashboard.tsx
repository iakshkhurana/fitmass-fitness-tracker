
import { Dumbbell, Utensils, Weight, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";

// Mock data for the dashboard
const weightData = [
  { date: "Jan 01", value: 85 },
  { date: "Jan 08", value: 84 },
  { date: "Jan 15", value: 83.5 },
  { date: "Jan 22", value: 82.8 },
  { date: "Jan 29", value: 82 },
  { date: "Feb 05", value: 81.5 },
  { date: "Feb 12", value: 80.9 },
];

const calorieData = [
  { date: "Jan 01", value: 2200 },
  { date: "Jan 08", value: 2100 },
  { date: "Jan 15", value: 2050 },
  { date: "Jan 22", value: 2150 },
  { date: "Jan 29", value: 2000 },
  { date: "Feb 05", value: 2100 },
  { date: "Feb 12", value: 2050 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Dashboard
        </h2>
        <p className="text-gray-500 mb-6">
          Welcome back! Here's an overview of your fitness journey.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Workouts"
          value="24"
          description="This month"
          icon={<Dumbbell className="h-5 w-5" />}
          trend="up"
          trendValue="12% from last month"
        />
        <StatCard
          title="Avg. Daily Calories"
          value="2,100"
          description="Last 7 days"
          icon={<Utensils className="h-5 w-5" />}
          trend="down"
          trendValue="5% from previous week"
        />
        <StatCard
          title="Current Weight"
          value="80.9 kg"
          description="As of yesterday"
          icon={<Weight className="h-5 w-5" />}
          trend="down"
          trendValue="4.1 kg total loss"
        />
        <StatCard
          title="Workout Streak"
          value="8 days"
          description="Keep it going!"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendValue="Best streak: 12 days"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <ProgressChart
          title="Weight Progress (kg)"
          data={weightData}
          yAxisLabel="kg"
          color="#38a169" // Green color
        />
        <ProgressChart
          title="Calorie Intake (kcal)"
          data={calorieData}
          yAxisLabel="kcal"
          color="#3182ce" // Blue color
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold">Upcoming Workouts</h3>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium">Upper Body Strength</h4>
              <p className="text-sm text-gray-500">Today, 6:00 PM • 45 minutes</p>
            </div>
            <div>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Strength
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Bench Press</span>
              <span className="text-sm text-gray-500">3 sets × 8 reps</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pull-ups</span>
              <span className="text-sm text-gray-500">3 sets × 10 reps</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Shoulder Press</span>
              <span className="text-sm text-gray-500">3 sets × 12 reps</span>
            </div>
            {/* More exercises... */}
          </div>
        </div>
      </section>
    </div>
  );
}
