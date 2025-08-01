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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, User, Briefcase, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreboardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    department: "",
    startDate: "",
    emergencyContact: "",
    emergencyPhone: "",
    ssn: "",
    dateOfBirth: "",
    agreed: false,
  });

  useEffect(() => {
    // Check if user is authenticated as employee
    const isAuthenticated = localStorage.getItem("employeeAuth");
    if (!isAuthenticated) {
      router.push("/employee-login");
      return;
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate temporary ID
    const tempId = `TEMP-${Date.now().toString().slice(-6)}`;

    // Store data in localStorage (in a real app, this would be sent to a server)
    const employeeData = {
      ...formData,
      tempId,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("employeeData", JSON.stringify(employeeData));

    // Redirect to status page
    router.push(`/status?id=${tempId}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Employee Preboarding
              </h1>
              <p className="text-sm text-gray-500">Complete your application</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Your basic personal details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirth"
                  className="text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="ssn"
                  className="text-sm font-medium text-gray-700"
                >
                  Social Security Number
                </Label>
                <Input
                  id="ssn"
                  type="password"
                  placeholder="XXX-XX-XXXX"
                  required
                  value={formData.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Home Address
                </Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-lg transition-all duration-200"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Employment Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Position and department details
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="position"
                  className="text-sm font-medium text-gray-700"
                >
                  Position
                </Label>
                <Input
                  id="position"
                  required
                  value={formData.position}
                  onChange={(e) =>
                    handleInputChange("position", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="department"
                  className="text-sm font-medium text-gray-700"
                >
                  Department
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Expected Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Emergency Contact
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Emergency contact information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="emergencyContact"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Name
                </Label>
                <Input
                  id="emergencyContact"
                  required
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="emergencyPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Phone
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  required
                  value={formData.emergencyPhone}
                  onChange={(e) =>
                    handleInputChange("emergencyPhone", e.target.value)
                  }
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-lg transition-all duration-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl flex items-center justify-center">
                  <Upload className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Required Documents
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Upload required documentation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-300 cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4 group-hover:text-gray-500 transition-colors duration-200" />
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Driver's License or ID
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PNG, JPG or PDF up to 10MB
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent rounded-lg"
                  >
                    Choose File
                  </Button>
                </div>
                <div className="group border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-300 cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4 group-hover:text-gray-500 transition-colors duration-200" />
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    I-9 Documentation
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PNG, JPG or PDF up to 10MB
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent rounded-lg"
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-8">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id="agreement"
                  checked={formData.agreed}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreed", checked.toString())
                  }
                  className="border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 mt-1"
                />
                <div className="space-y-2">
                  <Label
                    htmlFor="agreement"
                    className="text-sm font-medium text-gray-700 leading-relaxed cursor-pointer"
                  >
                    I agree to the terms and conditions
                  </Label>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By checking this box, I confirm that all information
                    provided is accurate and I agree to MRAC's employment terms
                    and privacy policy. I understand that providing false
                    information may result in termination of employment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="px-16 py-6 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!formData.agreed}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
