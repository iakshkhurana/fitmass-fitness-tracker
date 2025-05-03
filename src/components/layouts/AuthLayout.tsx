
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export function AuthLayout({ children, title, description, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fitness-light to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fitness-primary animate-fade-in">FitTrack Pro</h1>
          <p className="text-gray-600 mt-2">Your Ultimate Fitness Management System</p>
        </div>
        <Card className="border-fitness-primary/20 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="pt-2">{children}</CardContent>
          {footer && <CardFooter className="flex flex-col space-y-2">{footer}</CardFooter>}
        </Card>
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FitTrack Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
