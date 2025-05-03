
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ProgressEntry } from "@/types";

interface ProgressFormProps {
  initialData?: ProgressEntry;
  mode: "create" | "edit";
}

export default function ProgressForm({ initialData, mode }: ProgressFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: initialData?.date.toISOString().split("T")[0] || today,
    weight: initialData?.weight || undefined,
    bodyFatPercentage: initialData?.bodyFatPercentage || undefined,
    measurements: {
      chest: initialData?.measurements?.chest || undefined,
      waist: initialData?.measurements?.waist || undefined,
      hips: initialData?.measurements?.hips || undefined,
      arms: initialData?.measurements?.arms || undefined,
      legs: initialData?.measurements?.legs || undefined,
    },
    notes: initialData?.notes || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "measurements") {
        setFormData({
          ...formData,
          measurements: {
            ...formData.measurements,
            [child]: value === "" ? undefined : Number(value),
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value === "" ? undefined : 
          (name === "notes" ? value : Number(value)),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight && !formData.bodyFatPercentage && !Object.values(formData.measurements).some(val => val !== undefined)) {
      toast({
        title: "Incomplete data",
        description: "Please provide at least one measurement (weight, body fat, or body measurements).",
        variant: "destructive",
      });
      return;
    }

    // This would normally be where we send data to the backend
    // For now, we'll just simulate success
    
    toast({
      title: mode === "create" ? "Progress entry added!" : "Progress entry updated!",
      description: mode === "create"
        ? "Your progress has been recorded successfully."
        : "Your progress entry has been updated successfully.",
    });

    // Navigate back to progress list
    navigate("/progress");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {mode === "create" ? "Add Progress Entry" : "Edit Progress Entry"}
        </h1>
        <p className="text-gray-500">
          Track your fitness journey by recording your measurements.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                max={today}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  min="30"
                  max="300"
                  step="0.1"
                  placeholder="e.g. 75.5"
                  value={formData.weight || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFatPercentage">Body Fat Percentage (%)</Label>
                <Input
                  id="bodyFatPercentage"
                  name="bodyFatPercentage"
                  type="number"
                  min="1"
                  max="50"
                  step="0.1"
                  placeholder="e.g. 15.2"
                  value={formData.bodyFatPercentage || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-3">Body Measurements (cm)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest</Label>
                  <Input
                    id="chest"
                    name="measurements.chest"
                    type="number"
                    min="30"
                    max="200"
                    step="0.5"
                    placeholder="e.g. 100"
                    value={formData.measurements.chest || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist</Label>
                  <Input
                    id="waist"
                    name="measurements.waist"
                    type="number"
                    min="30"
                    max="200"
                    step="0.5"
                    placeholder="e.g. 80"
                    value={formData.measurements.waist || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Hips</Label>
                  <Input
                    id="hips"
                    name="measurements.hips"
                    type="number"
                    min="30"
                    max="200"
                    step="0.5"
                    placeholder="e.g. 90"
                    value={formData.measurements.hips || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arms">Arms</Label>
                  <Input
                    id="arms"
                    name="measurements.arms"
                    type="number"
                    min="10"
                    max="100"
                    step="0.5"
                    placeholder="e.g. 35"
                    value={formData.measurements.arms || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legs">Legs</Label>
                  <Input
                    id="legs"
                    name="measurements.legs"
                    type="number"
                    min="20"
                    max="100"
                    step="0.5"
                    placeholder="e.g. 55"
                    value={formData.measurements.legs || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Add any additional notes about your progress..."
                value={formData.notes}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate("/progress")}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create" ? "Save Entry" : "Update Entry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
