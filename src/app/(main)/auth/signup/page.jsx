"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Label,
  Input,
  InputGroup,
  Button,
  Card,
  CardHeader,
  Link,
  Description
} from "@heroui/react";
import {
  Eye,
  EyeOff,
  Mail,
  KeyRound,
  User,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { districts, upazilasOfDistrict } from "@/lib/bdLocations";
import { usersAvatar } from "@/lib/usersAvatar";
import { toast } from "react-toastify";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SignupPage() {
  const router = useRouter();

  // Core Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [address, setAddress] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [photo, setPhoto] = useState(null);

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  // Computed local state for available upazilas
  const availableUpazilas = upazilasOfDistrict[selectedDistrict] || [];

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!photo) {
      setError("Please select a profile photo.");
      return;
    }

    const imageUrl = await usersAvatar(photo);


    setIsLoading(true);
    setError("");
    setSuccess("");

    // Password Match Validation Block
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const { data: user, error: authError } = await authClient.signUp.email(
        {
          email,
          password,
          name,
          image: imageUrl,
          bloodGroup,
          district: selectedDistrict,
          upazila,
        },
        (authError) => {
          if (authError) {
            setError(authError.message || "Something went wrong. Please try again.");
          }
        }
      );

      if (authError) {
        toast.error(authError.message || "Something went wrong. Please try again.");
        setIsLoading(false);
        return;
      }

      const donor = {
        name,
        email,
        phone,
        bloodGroup,
        district: selectedDistrict,
        upazila,
        address,
        lastDonationDate,
        image: imageUrl,
        role: "donor",
        status: "active",
        createdAt: new Date(),
      };


      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donor),
      });

      toast.success("Account created successfully! Redirecting...");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setBloodGroup("");
      setSelectedDistrict("");
      setUpazila("");
      setAddress("");
      setLastDonationDate("");

      router.push("/auth/signin");

    } catch (err) {
      toast.error("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 py-12">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center justify-center text-center pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-red-600">Join as a Blood Donor</h1>
          <p className="text-small text-default-500">Register today and help save lives.</p>
        </CardHeader>

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Full Name */}
          <TextField isRequired className="w-full">
            <Label>Full Name</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <User className="text-default-400 size-5 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none py-2 text-sm"
              />
            </InputGroup>
          </TextField>

          {/* Email */}
          <TextField isRequired className="w-full">
            <Label>Email</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <Mail className="text-default-400 size-5 flex-shrink-0" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none py-2 text-sm"
              />
            </InputGroup>
          </TextField>

          {/* Phone */}
          <TextField isRequired className="w-full">
            <Label>Phone</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <Phone className="text-default-400 size-5 flex-shrink-0" />
              <Input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent outline-none py-2 text-sm"
              />
            </InputGroup>
          </TextField>

          {/* Blood Group */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">Blood Group</Label>
            <select
              name="bloodGroup"
              required
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full rounded-xl border border-border p-[10px] text-sm bg-default-50 focus:border-primary focus:outline-none transition-colors"
            >
              <option value="" disabled>Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">District</Label>
            <select
              required
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setUpazila("");
              }}
              className="w-full rounded-xl border border-border p-[10px] text-sm bg-default-50 focus:border-primary focus:outline-none transition-colors"
            >
              <option value="" disabled>Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Upazila Selector */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-sm font-medium">Upazila</Label>
            <select
              required
              disabled={!selectedDistrict}
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full rounded-xl border border-border p-[10px] text-sm bg-default-50 focus:border-primary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled>
                {selectedDistrict ? "Select Upazila" : "Choose a district first"}
              </option>
              {availableUpazilas.map((upz) => (
                <option key={upz} value={upz}>{upz}</option>
              ))}
            </select>
          </div>

          {/* Last Donation Date */}
          <TextField className="w-full">
            <Label>Last Donation Date</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <Calendar className="text-default-400 size-5 flex-shrink-0" />
              <Input
                type="date"
                value={lastDonationDate}
                onChange={(e) => setLastDonationDate(e.target.value)}
                className="w-full bg-transparent outline-none py-2 text-sm"
              />
            </InputGroup>
          </TextField>

          {/* Profile Photo */}
          <TextField className="w-full">
            <Label>Profile Photo</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                className="w-full bg-transparent outline-none py-[6px] text-sm"
              />
            </InputGroup>
          </TextField>

          {/* Password Field */}
          <TextField isRequired className="w-full">
            <Label>Password</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <KeyRound className="text-default-400 size-5 flex-shrink-0" />
              <Input
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isVisible ? "text" : "password"}
                className="w-full bg-transparent outline-none py-2 text-sm"
              />
              <button
                className="focus:outline-none flex items-center justify-center cursor-pointer text-default-400 hover:text-default-600"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </InputGroup>
            <Description className="text-xs text-default-400 mt-1">
              Must be at least 8 characters long
            </Description>
          </TextField>

          {/* Confirm Password Field */}
          <TextField isRequired className="w-full">
            <Label>Confirm Password</Label>
            <InputGroup className="flex items-center gap-2 border border-border rounded-xl px-3 bg-default-50 focus-within:border-primary transition-colors">
              <KeyRound className="text-default-400 size-5 flex-shrink-0" />
              <Input
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={isConfirmVisible ? "text" : "password"}
                className="w-full bg-transparent outline-none py-2 text-sm"
              />
              <button
                className="focus:outline-none flex items-center justify-center cursor-pointer text-default-400 hover:text-default-600"
                type="button"
                onClick={toggleConfirmVisibility}
              >
                {isConfirmVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </InputGroup>
          </TextField>

          {/* Global Banners */}
          <div className="md:col-span-2 flex flex-col gap-2">
            {error && (
              <div className="p-3 text-sm text-danger bg-danger-50 border border-danger-200 rounded-xl font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm text-success bg-success-50 border border-success-200 rounded-xl font-medium">
                {success}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-2">
            <Button
              type="submit"
              color="danger"
              className="w-full font-semibold bg-red-600 hover:bg-red-700 text-white"
              isLoading={isLoading}
            >
              Sign Up As Donor
            </Button>
          </div>
        </form>

        <div className="text-center mt-6 text-small md:col-span-2">
          <span className="text-default-500">Already have an account? </span>
          <Link href={`/auth/signin`} size="sm" className="font-semibold text-red-600 hover:text-red-700 pointer-events-auto">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}