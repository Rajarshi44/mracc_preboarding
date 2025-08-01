"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Building2,
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  Shield,
  UserPlus,
  Check,
  X,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
  label: string;
}

export default function EmployeeLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "verify">(
    "login"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    agreedToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    color: "bg-gray-200",
    label: "Enter a password",
  });

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    if (!password) {
      return {
        score: 0,
        feedback: [],
        color: "bg-gray-200",
        label: "Enter a password",
      };
    }

    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 8) {
      score += 25;
    } else {
      feedback.push("At least 8 characters");
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 25;
    } else {
      feedback.push("One uppercase letter");
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 25;
    } else {
      feedback.push("One lowercase letter");
    }

    // Number or special character check
    if (/[\d\W]/.test(password)) {
      score += 25;
    } else {
      feedback.push("One number or special character");
    }

    let color = "bg-red-500";
    let label = "Weak";

    if (score >= 75) {
      color = "bg-green-500";
      label = "Strong";
    } else if (score >= 50) {
      color = "bg-yellow-500";
      label = "Medium";
    } else if (score >= 25) {
      color = "bg-orange-500";
      label = "Fair";
    }

    return { score, feedback, color, label };
  };

  useEffect(() => {
    if (mode === "signup") {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }
  }, [formData.password, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === "signup") {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
      }
      if (passwordStrength.score < 50) {
        setError("Please choose a stronger password.");
        setIsLoading(false);
        return;
      }
      if (!formData.firstName || !formData.lastName) {
        setError("Please enter your first and last name.");
        setIsLoading(false);
        return;
      }
      if (!formData.agreedToTerms) {
        setError("Please agree to the terms and conditions.");
        setIsLoading(false);
        return;
      }

      // Simulate successful signup - send verification email
      setMode("verify");
      setSuccess(`Verification code sent to ${formData.email}`);
    } else if (mode === "verify") {
      // Email verification
      if (formData.verificationCode.length !== 6) {
        setError("Please enter the 6-digit verification code.");
        setIsLoading(false);
        return;
      }

      // Simulate successful verification
      localStorage.setItem("employeeAuth", "true");
      localStorage.setItem("employeeEmail", formData.email);
      localStorage.setItem(
        "employeeName",
        `${formData.firstName} ${formData.lastName}`
      );
      router.push("/preboard");
    } else if (mode === "forgot") {
      // Forgot password
      if (!formData.email) {
        setError("Please enter your email address.");
        setIsLoading(false);
        return;
      }

      setSuccess(`Password reset instructions sent to ${formData.email}`);
      setTimeout(() => {
        setMode("login");
        setSuccess("");
      }, 3000);
    } else {
      // Login validation
      if (formData.email && formData.password.length >= 6) {
        localStorage.setItem("employeeAuth", "true");
        localStorage.setItem("employeeEmail", formData.email);
        router.push("/preboard");
      } else {
        setError(
          "Please enter a valid email and password (minimum 6 characters)."
        );
      }
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
    if (success && mode !== "verify") setSuccess("");
  };

  const switchMode = (newMode: "login" | "signup" | "forgot") => {
    setMode(newMode);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      agreedToTerms: false,
    });
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(`New verification code sent to ${formData.email}`);
    setIsLoading(false);
  };

  const getTitle = () => {
    switch (mode) {
      case "signup":
        return "Create Account";
      case "forgot":
        return "Reset Password";
      case "verify":
        return "Verify Email";
      default:
        return "Employee Login";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "signup":
        return "Join MRAC and start your preboarding journey";
      case "forgot":
        return "Enter your email to receive reset instructions";
      case "verify":
        return "Enter the 6-digit code sent to your email";
      default:
        return "Sign in to start your preboarding journey";
    }
  };

  const getIcon = () => {
    switch (mode) {
      case "signup":
        return <UserPlus className="w-10 h-10 text-white" />;
      case "forgot":
        return <KeyRound className="w-10 h-10 text-white" />;
      case "verify":
        return <Mail className="w-10 h-10 text-white" />;
      default:
        return <User className="w-10 h-10 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/20 via-purple-200/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-green-200/10 via-blue-200/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-xl">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  MRAC
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Employee Portal
                </p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-white/70 transition-all duration-300 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="relative flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              {getIcon()}
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {getTitle()}
            </h2>
            <p className="text-xl text-gray-600 font-light">{getSubtitle()}</p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-100/20 to-blue-100/20 rounded-full blur-2xl"></div>

            <CardHeader className="relative pb-8">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {mode === "verify"
                  ? "Check Your Email"
                  : mode === "forgot"
                  ? "Forgot Password?"
                  : "Welcome"}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {mode === "verify"
                  ? `We sent a verification code to ${formData.email}`
                  : mode === "forgot"
                  ? "We'll send you instructions to reset your password"
                  : mode === "signup"
                  ? "Create your account to access the preboarding form"
                  : "Enter your credentials to access the preboarding form"}
              </CardDescription>
            </CardHeader>

            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Verification Mode */}
                {mode === "verify" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label
                        htmlFor="verificationCode"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Verification Code
                      </Label>
                      <Input
                        id="verificationCode"
                        type="text"
                        required
                        maxLength={6}
                        value={formData.verificationCode}
                        onChange={(e) =>
                          handleInputChange(
                            "verificationCode",
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                        className="text-center text-2xl font-mono tracking-widest border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-16 rounded-xl transition-all duration-200 bg-white/70"
                        placeholder="000000"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Didn't receive the code?
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={resendVerificationCode}
                        disabled={isLoading}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold"
                      >
                        Resend Code
                      </Button>
                    </div>
                  </div>
                )}

                {/* Forgot Password Mode */}
                {mode === "forgot" && (
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-14 rounded-xl text-lg transition-all duration-200 bg-white/70"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                )}

                {/* Login and Signup Modes */}
                {(mode === "login" || mode === "signup") && (
                  <>
                    {mode === "signup" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-semibold text-gray-700"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-12 rounded-xl transition-all duration-200 bg-white/70"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-12 rounded-xl transition-all duration-200 bg-white/70"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="pl-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-14 rounded-xl text-lg transition-all duration-200 bg-white/70"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="pl-12 pr-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-14 rounded-xl text-lg transition-all duration-200 bg-white/70"
                          placeholder={
                            mode === "signup"
                              ? "Create a strong password"
                              : "Enter your password"
                          }
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {mode === "signup" && formData.password && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">
                              Password Strength
                            </span>
                            <span
                              className={`text-xs font-semibold ${passwordStrength.color.replace(
                                "bg-",
                                "text-"
                              )}`}
                            >
                              {passwordStrength.label}
                            </span>
                          </div>
                          <Progress
                            value={passwordStrength.score}
                            className="h-2"
                          />
                          {passwordStrength.feedback.length > 0 && (
                            <div className="space-y-1">
                              {passwordStrength.feedback.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 text-xs text-gray-600"
                                >
                                  <X className="w-3 h-3 text-red-500" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {mode === "signup" && (
                      <div className="space-y-3">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            className="pl-12 pr-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-14 rounded-xl text-lg transition-all duration-200 bg-white/70"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {formData.confirmPassword &&
                          formData.password !== formData.confirmPassword && (
                            <div className="flex items-center space-x-2 text-xs text-red-600">
                              <X className="w-3 h-3" />
                              <span>Passwords do not match</span>
                            </div>
                          )}
                        {formData.confirmPassword &&
                          formData.password === formData.confirmPassword && (
                            <div className="flex items-center space-x-2 text-xs text-green-600">
                              <Check className="w-3 h-3" />
                              <span>Passwords match</span>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Terms and Conditions for Signup */}
                    {mode === "signup" && (
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={formData.agreedToTerms}
                            onCheckedChange={(checked) =>
                              handleInputChange("agreedToTerms", checked)
                            }
                            className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1"
                          />
                          <div className="space-y-1">
                            <Label
                              htmlFor="terms"
                              className="text-sm font-medium text-gray-700 leading-relaxed cursor-pointer"
                            >
                              I agree to the{" "}
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                Privacy Policy
                              </a>
                            </Label>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              By creating an account, you agree to our terms and
                              acknowledge that you have read our privacy policy.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Error and Success Messages */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <p className="text-red-700 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <p className="text-green-700 text-sm font-medium">
                        {success}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white h-14 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={
                    isLoading || (mode === "signup" && !formData.agreedToTerms)
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>
                        {mode === "verify"
                          ? "Verifying..."
                          : mode === "forgot"
                          ? "Sending..."
                          : mode === "signup"
                          ? "Creating Account..."
                          : "Signing in..."}
                      </span>
                    </div>
                  ) : (
                    <span>
                      {mode === "verify"
                        ? "Verify & Continue"
                        : mode === "forgot"
                        ? "Send Reset Instructions"
                        : mode === "signup"
                        ? "Create Account"
                        : "Continue to Application"}
                    </span>
                  )}
                </Button>
              </form>

              {/* Mode Switching */}
              {mode !== "verify" && (
                <div className="mt-8 pt-6 border-t border-gray-200 text-center space-y-4">
                  {mode === "login" && (
                    <>
                      <div>
                        <p className="text-gray-600 mb-2">
                          Don't have an account?
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => switchMode("signup")}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold px-6 py-2 rounded-xl transition-all duration-200"
                        >
                          Create New Account
                        </Button>
                      </div>
                      <div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => switchMode("forgot")}
                          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 font-medium text-sm px-4 py-1 rounded-lg transition-all duration-200"
                        >
                          Forgot your password?
                        </Button>
                      </div>
                    </>
                  )}

                  {mode === "signup" && (
                    <div>
                      <p className="text-gray-600 mb-2">
                        Already have an account?
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => switchMode("login")}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold px-6 py-2 rounded-xl transition-all duration-200"
                      >
                        Sign In Instead
                      </Button>
                    </div>
                  )}

                  {mode === "forgot" && (
                    <div>
                      <p className="text-gray-600 mb-2">
                        Remember your password?
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => switchMode("login")}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold px-6 py-2 rounded-xl transition-all duration-200"
                      >
                        Back to Sign In
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Demo Instructions */}
              {mode !== "verify" && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-6 h-6 text-blue-600" />
                      <p className="text-blue-800 font-semibold">Demo Access</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-blue-700 text-sm">
                        {mode === "signup"
                          ? "Use any valid email and create a password to continue"
                          : mode === "forgot"
                          ? "Enter any email to simulate password reset"
                          : "Use any email and password (6+ characters) to continue"}
                      </p>
                      <p className="text-blue-600 text-xs font-mono bg-blue-100 px-3 py-1 rounded">
                        Example: demo@company.com / password123
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Need help accessing your account?{" "}
              <a
                href="mailto:support@MRAC.com"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
              >
                Contact IT Support
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
