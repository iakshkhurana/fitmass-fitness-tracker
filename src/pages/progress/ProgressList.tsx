
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from "lucide-react";
import { ProgressEntry } from "@/types";

// Mock data for progress entries
const mockProgressEntries: ProgressEntry[] = [
  {
    id: "1",
    userId: "user1",
    date: new Date("2023-01-01"),
    weight: 85,
    bodyFatPercentage: 20,
    measurements: {
      chest: 100,
      waist: 90,
      hips: 100,
      arms: 35,
      legs: 60,
    },
    notes: "Starting measurements",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    userId: "user1",
    date: new Date("2023-01-08"),
    weight: 84,
    bodyFatPercentage: 19.5,
    measurements: {
      chest: 100,
      waist: 89,
      hips: 99,
      arms: 35,
      legs: 60,
    },
    notes: "One week progress",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
  {
    id: "3",
    userId: "user1",
    date: new Date("2023-01-15"),
    weight: 83.5,
    bodyFatPercentage: 19,
    measurements: {
      chest: 101,
      waist: 88,
      hips: 98.5,
      arms: 35.5,
      legs: 60.5,
    },
    notes: "Two weeks progress",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "4",
    userId: "user1",
    date: new Date("2023-01-22"),
    weight: 82.8,
    bodyFatPercentage: 18.6,
    measurements: {
      chest: 101.5,
      waist: 87,
      hips: 98,
      arms: 36,
      legs: 61,
    },
    notes: "Three weeks progress",
    createdAt: new Date("2023-01-22"),
    updatedAt: new Date("2023-01-22"),
  },
  {
    id: "5",
    userId: "user1",
    date: new Date("2023-01-29"),
    weight: 82,
    bodyFatPercentage: 18.2,
    measurements: {
      chest: 102,
      waist: 86,
      hips: 97.5,
      arms: 36.5,
      legs: 61.5,
    },
    notes: "One month progress",
    createdAt: new Date("2023-01-29"),
    updatedAt: new Date("2023-01-29"),
  },
  {
    id: "6",
    userId: "user1",
    date: new Date("2023-02-05"),
    weight: 81.5,
    bodyFatPercentage: 17.8,
    measurements: {
      chest: 102.5,
      waist: 85,
      hips: 97,
      arms: 37,
      legs: 62,
    },
    notes: "Five weeks progress",
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-02-05"),
  },
];

export default function ProgressList() {
  const [progressEntries] = useState<ProgressEntry[]>(mockProgressEntries);

  // Transform data for charts
  const weightData = progressEntries.map((entry) => ({
    date: entry.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value: entry.weight,
  }));

  const bodyFatData = progressEntries.map((entry) => ({
    date: entry.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value: entry.bodyFatPercentage,
  }));

  const waistData = progressEntries.map((entry) => ({
    date: entry.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value: entry.measurements?.waist,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
        <Button asChild>
          <Link to="/progress/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Progress Entry
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Weight Progress</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    label={{ 
                      value: "Weight (kg)", 
                      angle: -90, 
                      position: "insideLeft" 
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3182ce" // Blue
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Body Fat Percentage</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bodyFatData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    label={{ 
                      value: "Body Fat %", 
                      angle: -90, 
                      position: "insideLeft" 
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#805ad5" // Purple
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Waist Measurement</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={waistData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    label={{ 
                      value: "Waist (cm)", 
                      angle: -90, 
                      position: "insideLeft" 
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#38a169" // Green
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Progress History</h3>
            <div className="space-y-4">
              {progressEntries.slice().reverse().map((entry) => (
                <div key={entry.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {entry.date.toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h4>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        <div>Weight: {entry.weight} kg</div>
                        <div>Body Fat: {entry.bodyFatPercentage}%</div>
                        {entry.measurements && (
                          <div>
                            Measurements: 
                            {entry.measurements.chest && ` Chest: ${entry.measurements.chest}cm,`}
                            {entry.measurements.waist && ` Waist: ${entry.measurements.waist}cm,`}
                            {entry.measurements.hips && ` Hips: ${entry.measurements.hips}cm`}
                          </div>
                        )}
                      </div>
                      {entry.notes && <div className="mt-1 text-sm">{entry.notes}</div>}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/progress/${entry.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
