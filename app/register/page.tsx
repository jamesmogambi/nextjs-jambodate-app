"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  Calendar,
  MapPin,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Select } from "@/components/ui/FormField";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { calculateAge, isAdult } from "@/lib/utils";
import { Gender } from "@/types";
import { KENYAN_ALL_COUNTIES } from "@/lib/data/kenyanProfiles";

export default function RegisterPage() {
  const router = useRouter();
  const { registerWithEmail } = useAuth();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [birthDate, setBirthDate] = useState("2000-05-15");
  const [gender, setGender] = useState<Gender>("Woman");
  const [county, setCounty] = useState("Nairobi");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Age calculations
  const calculatedAge = birthDate ? calculateAge(birthDate) : 0;
  const userIsAdult = birthDate ? isAdult(birthDate) : false;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      toast("First name is required", "error");
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage("Email and password are required.");
      toast("Please fill in email and password", "error");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      toast("Password must be at least 8 characters", "error");
      return;
    }

    if (!birthDate) {
      setErrorMessage("Please provide your date of birth.");
      toast("Date of birth is required", "error");
      return;
    }

    if (!userIsAdult) {
      const msg =
        "You must be at least 18 years old to join JamboDate. Dating profiles are strictly prohibited for minors under Kenyan law and JamboDate safety policy.";
      setErrorMessage(msg);
      toast("Must be 18 or older to join", "error");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage(
        "You must agree to the Terms of Service and Community Safety Guidelines.",
      );
      toast("Please accept Terms & Guidelines", "error");
      return;
    }

    setIsLoading(true);
    try {
      await registerWithEmail({
        firstName: firstName.trim(),
        email: email.trim(),
        password,
        birthDate,
        gender,
        county,
      });

      toast(
        "Karibu JamboDate! Account created successfully. Let us build your profile.",
        "success",
      );
      router.push("/onboarding");
    } catch (err: unknown) {
      const errText =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setErrorMessage(errText);
      toast(errText, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1110] text-[#F5F3EF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand */}
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D85B7A] to-[#D99A52] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0D1110] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-xl text-[#F5F3EF]">J</span>
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#F5F3EF] flex items-center gap-1">
            jambodate
            <span className="w-1.5 h-1.5 rounded-full bg-[#3FAF72]" />
          </span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F3EF]">
          Create Your Profile
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#A8AAA5]">
          A modern dating community for Kenyan singles seeking authentic
          connection.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-[#151A18] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-[#272D2A]">
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* 1. First Name */}
            <FormField
              label="First Name"
              id="reg-firstName"
              required
              helperText="Visible to other singles on your profile"
            >
              <div className="relative">
                <Input
                  id="reg-firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Wangari, Kevin, or Amina"
                  className="pl-9"
                  required
                />
                <User className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
              </div>
            </FormField>

            {/* 2. Email */}
            <FormField
              label="Email Address"
              id="reg-email"
              required
              helperText="Used privately for secure sign-in and recovery"
            >
              <div className="relative">
                <Input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.co.ke"
                  className="pl-9"
                  required
                />
                <Mail className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
              </div>
            </FormField>

            {/* 3. Password */}
            <FormField
              label="Password"
              id="reg-password"
              required
              helperText="Minimum 8 characters"
            >
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="pl-9 pr-10"
                  minLength={8}
                  required
                />
                <Lock className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#A8AAA5] hover:text-[#F5F3EF] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </FormField>

            {/* 4. Date of Birth & 18+ Guard */}
            <div className="space-y-1.5">
              <FormField
                label="Date of Birth (Must be 18+)"
                id="reg-birthDate"
                required
                helperText="We use this to calculate your age. Your exact birth date remains private."
              >
                <div className="relative">
                  <Input
                    id="reg-birthDate"
                    type="date"
                    value={birthDate}
                    max={
                      new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="pl-9 text-sm"
                    required
                  />
                  <Calendar className="w-4 h-4 text-[#A8AAA5] absolute left-3 top-3.5" />
                </div>
              </FormField>

              {/* Real-time Age feedback */}
              {birthDate && (
                <div className="flex items-center gap-2 pt-1 text-xs">
                  {userIsAdult ? (
                    <span className="text-[#3FAF72] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Age: {calculatedAge} years old (Verified 18+)
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Age: {calculatedAge} years old — Must be 18 or older
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* 5. Gender & County/City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Gender" id="reg-gender" required>
                <Select
                  id="reg-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  options={[
                    { value: "Woman", label: "Woman" },
                    { value: "Man", label: "Man" },
                    { value: "Non-binary", label: "Non-binary" },
                    { value: "Prefer not to say", label: "Prefer not to say" },
                  ]}
                />
              </FormField>

              <FormField label="County / City" id="reg-county" required>
                <div className="relative">
                   <Select
                     id="reg-county"
                     value={county}
                     onChange={(e) => setCounty(e.target.value)}
                     options={KENYAN_ALL_COUNTIES.map((c) => ({
                       value: c,
                       label: c,
                     }))}
                   />
                </div>
              </FormField>
            </div>

            {/* Underage Warning Banner */}
            {!userIsAdult && birthDate && (
              <div className="p-3 rounded-xl bg-red-900/30 border border-red-700/50 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Age restriction:</strong> JamboDate requires members
                  to be at least 18 years of age. You cannot register if you are
                  under 18.
                </p>
              </div>
            )}

            {/* Terms and Age Certification */}
            <div className="pt-2 space-y-2.5">
              <label className="flex items-start gap-2.5 text-xs text-[#A8AAA5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded bg-[#0D1110] border-[#272D2A] text-[#D85B7A] focus:ring-0"
                  required
                />
                <span>
                  I certify that I am at least 18 years old and agree to the{" "}
                  <Link
                    href="/safety"
                    className="text-[#D85B7A] hover:underline"
                  >
                    JamboDate Community Safety Guidelines
                  </Link>{" "}
                  and Privacy Policy.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4"
              disabled={!userIsAdult}
              isLoading={isLoading}
            >
              Continue to 7-Step Onboarding{" "}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 pt-6 border-t border-[#272D2A] text-center">
            <p className="text-xs text-[#A8AAA5]">
              Already have a JamboDate account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#D85B7A] hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#A8AAA5]/80">
          <ShieldCheck className="w-4 h-4 text-[#3FAF72]" />
          <span>
            Private contact data is never exposed publicly on profiles
          </span>
        </div>
      </div>
    </div>
  );
}
