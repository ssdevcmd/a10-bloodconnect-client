"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  TextField,
  Button,
  Label,
  Input,
  FieldError
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, Heart } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error: authError } = await authClient.signIn.email(
        {
          email,
          password,
        }
      );

      if (authError) {
        setError(authError.message || "Invalid email or password.");
      } else {
        setSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Heart className="text-red-600" size={32} fill="currentColor" />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to your BloodConnect account
          </p>
        </div>

        {/* HeroUI Form */}
        <Form onSubmit={handleSubmit} className="space-y-5 w-full">

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="mb-2 block font-medium text-gray-700">
              Email Address
            </Label>
            <div className="flex items-center rounded-xl border px-4 w-full bg-transparent focus-within:border-red-500 transition">
              <Mail className="text-gray-400" size={18} />
              <Input
                name="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
            <FieldError className="text-sm text-red-500 mt-1" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <Label className="mb-2 block font-medium text-gray-700">
              Password
            </Label>
            <div className="flex items-center rounded-xl border px-4 w-full bg-transparent focus-within:border-red-500 transition">
              <Lock className="text-gray-400" size={18} />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <FieldError className="text-sm text-red-500 mt-1" />
          </TextField>

          {/* Login Button */}
          {error && (
            <div className="w-full rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full rounded-lg bg-green-100 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}
          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
        </Form>

        {/* Register Redirect */}
        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-red-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}