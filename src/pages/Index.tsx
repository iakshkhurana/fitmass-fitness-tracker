
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dumbbell, ChartPie, Utensils } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard if already logged in
    // This would be replaced with actual auth logic when connected to Supabase
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fitness-light to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-fitness-primary">FitTrack Pro</h1>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Achieve Your Fitness Goals
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              The complete fitness management system to track your workouts, monitor your diet, 
              and visualize your progress all in one place.
            </p>
            <div className="mt-10 flex gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-fitness-primary hover:bg-fitness-dark">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-fitness-primary to-fitness-secondary rounded-lg blur-lg opacity-30"></div>
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
                  alt="Fitness Dashboard" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>

        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need For Your Fitness Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="text-fitness-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Workout Tracking</h3>
              <p className="text-gray-600">
                Create custom workout plans, track sets, reps, and weights. Monitor your progress
                to ensure you're continuously improving.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Utensils className="text-fitness-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diet Management</h3>
              <p className="text-gray-600">
                Plan your meals, track calories and macronutrients, and ensure you're fueling your
                body correctly to meet your fitness goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ChartPie className="text-fitness-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your weight, body measurements, and other metrics over time with 
                visual charts to see your transformation.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Start Your Fitness Journey Today</h2>
            <p className="text-lg text-gray-600 mb-10">
              Join thousands of users who have transformed their bodies and lives with FitTrack Pro.
              Take the first step towards a healthier you.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-fitness-primary hover:bg-fitness-dark">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} FitTrack Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
