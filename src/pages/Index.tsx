
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Welcome to Our App</CardTitle>
          <CardDescription className="text-lg">
            Your secure application powered by Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-gray-600">
            Access your dashboard by logging in to your account
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleLogin} size="lg" className="w-full sm:w-auto">
            Log in to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
