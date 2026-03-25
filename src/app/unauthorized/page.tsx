"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, Home, LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-10 w-10 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
          <CardDescription>
            You don't have permission to view this page
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">
              The page you're trying to access requires specific permissions that your account doesn't have.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">What you can do:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                Go back to the previous page
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                Login with a different account
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                Contact your administrator for access
              </li>
            </ul>
          </div>

          <p className="text-sm text-center text-gray-500">
            Redirecting to login in 10 seconds...
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={() => router.push("/login")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          <Link href="/" className="w-full">
            <Button variant="link" className="w-full text-gray-500">
              <Home className="h-4 w-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}