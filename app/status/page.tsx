"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  BadgeIcon as IdCard,
  Mail,
  Phone,
  User,
  ArrowLeft,
  Download,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  tempId: string;
  status: string;
  submittedAt: string;
}

export default function StatusPage() {
  const searchParams = useSearchParams();
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const tempId = searchParams.get("id");

  useEffect(() => {
    // In a real app, this would fetch from a server
    const storedData = localStorage.getItem("employeeData");
    if (storedData) {
      setEmployeeData(JSON.parse(storedData));
    }
  }, []);

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <Card className="max-w-md border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Application Not Found
            </CardTitle>
            <CardDescription className="text-gray-600">
              We couldn't find your preboarding information. Please submit the
              form again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/preboard">
              <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white rounded-xl py-3">
                Start Application
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200";
      case "pending":
        return "bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
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
                Application Status
              </h1>
              <p className="text-sm text-gray-500">
                Track your preboarding progress
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="space-y-8">
          {/* Temporary ID Card */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <IdCard className="w-7 h-7" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl font-semibold">
                      Temporary Employee ID
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Valid until official ID is issued
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-mono font-bold mb-3 tracking-wider">
                {employeeData.tempId}
              </div>
              <div className="text-xl font-semibold mb-1">
                {employeeData.firstName} {employeeData.lastName}
              </div>
              <div className="text-gray-300">
                {employeeData.position} • {employeeData.department}
              </div>
            </CardContent>
          </Card>

          {/* Status Overview */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3 text-xl font-semibold text-gray-900">
                {getStatusIcon(employeeData.status)}
                <span>Application Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-8">
                <Badge
                  className={`${getStatusColor(
                    employeeData.status
                  )} border px-4 py-2 text-sm font-medium rounded-xl`}
                >
                  {employeeData.status.charAt(0).toUpperCase() +
                    employeeData.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                  Submitted:{" "}
                  {new Date(employeeData.submittedAt).toLocaleDateString()}
                </span>
              </div>

              {employeeData.status === "pending" && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Under Review
                      </h4>
                      <p className="text-yellow-700 leading-relaxed">
                        Your application is currently being reviewed by our HR
                        team. You'll receive an email notification once the
                        review is complete. This process typically takes 1-2
                        business days.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {employeeData.status === "approved" && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">
                        Application Approved!
                      </h4>
                      <p className="text-green-700 leading-relaxed">
                        Congratulations! Your preboarding application has been
                        approved. Your official employee ID will be ready on
                        your start date. Welcome to the MRAC team!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Employee Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-lg font-semibold text-gray-900">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">
                    {employeeData.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">
                    {employeeData.phone}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Process Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700 font-medium">
                      Application submitted
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 p-3 bg-yellow-50/50 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-700 font-medium">
                      HR review in progress
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Official ID issuance
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      First day orientation
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Need Assistance?
              </CardTitle>
              <CardDescription className="text-gray-600">
                Our HR team is here to help with any questions about your
                application status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent rounded-xl py-3 transition-all duration-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email HR Team
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent rounded-xl py-3 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (555) 123-4567
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
