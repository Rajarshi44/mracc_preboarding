import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  FileText,
  BadgeIcon as IdCard,
  Building2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-200/20 via-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/10 to-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="relative group">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 p-1">
                  <Image
                    src="/mrac-logo.svg"
                    alt="MRAC Logo"
                    width={76}
                    height={76}
                    className="w-full h-full object-contain"
                  />
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
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-white/70 transition-all duration-300 font-semibold px-6 py-3 rounded-xl"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/60 rounded-full text-sm font-semibold text-blue-700 mb-12 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-default">
              <Sparkles className="w-5 h-5 mr-3 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
              <span>Welcome to the Future of Onboarding</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-8 leading-[0.9] tracking-tight">
              Employee{" "}
              <span className="font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent animate-gradient">
                Preboarding
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-16 font-light">
              Complete your preboarding journey in minutes. Get your temporary
              credentials instantly and join our{" "}
              <span className="font-semibold text-gray-800">
                world-class team
              </span>{" "}
              with confidence.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/employee-login" className="group">
                <Button className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center">
                    Start Application
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Button>
              </Link>

              <Link href="/status" className="group">
                <Button
                  variant="outline"
                  className="relative overflow-hidden px-12 py-6 text-xl font-bold border-2 border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-900 rounded-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="relative z-10">Check Your Status</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-20">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  <span className="text-2xl font-bold text-gray-800">
                    2,847
                  </span>{" "}
                  employees onboarded
                </span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  <span className="text-2xl font-bold text-gray-800">
                    98.5%
                  </span>{" "}
                  satisfaction rate
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Process Steps */}
          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {[
              {
                icon: FileText,
                title: "Submit Information",
                description:
                  "Securely provide your personal details and required documentation through our encrypted platform",
                color: "blue",
                number: "01",
              },
              {
                icon: CheckCircle,
                title: "Instant Review",
                description:
                  "Our AI-powered system and HR team review your application within 2 hours, not days",
                color: "green",
                number: "02",
              },
              {
                icon: IdCard,
                title: "Get Credentials",
                description:
                  "Receive your temporary employee ID and access information immediately upon approval",
                color: "purple",
                number: "03",
              },
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-gray-50/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl"></div>
                <div className="relative text-center p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 bg-white/40 backdrop-blur-sm border border-white/50">
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-gray-600 font-bold text-lg">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-28 h-28 bg-gradient-to-br ${
                      step.color === "blue"
                        ? "from-blue-50 to-indigo-100 border-blue-200"
                        : step.color === "green"
                        ? "from-green-50 to-emerald-100 border-green-200"
                        : "from-purple-50 to-violet-100 border-purple-200"
                    } border-2 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl`}
                  >
                    <step.icon
                      className={`w-12 h-12 ${
                        step.color === "blue"
                          ? "text-blue-600"
                          : step.color === "green"
                          ? "text-green-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Features Section */}
          <div className="bg-gradient-to-br from-white/80 via-gray-50/80 to-white/80 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-100/30 to-blue-100/30 rounded-full blur-3xl"></div>

            <div className="relative text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Experience the most advanced onboarding platform designed for
                the modern workplace
              </p>
            </div>

            <div className="relative grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description:
                    "Military-grade encryption and SOC 2 compliance protect your data",
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "AI-powered processing delivers results in under 2 hours",
                  gradient: "from-green-500 to-green-600",
                },
                {
                  icon: Smartphone,
                  title: "Mobile First",
                  description:
                    "Seamless experience across all devices with offline support",
                  gradient: "from-purple-500 to-purple-600",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative bg-white/70 backdrop-blur-xl border-t border-gray-200/50 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-5 mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl p-1">
                <Image
                  src="/mrac-logo.svg"
                  alt="MRAC Logo"
                  width={76}
                  height={76}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-3xl font-bold text-gray-900">MRAC</span>
            </div>
            <p className="text-gray-500 mb-8 text-lg">
              &copy; 2024 MRAC. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-8 text-base">
              <a
                href="mailto:hr@MRAC.com"
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200 hover:underline"
              >
                hr@MRAC.com
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="tel:+15551234567"
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200 hover:underline"
              >
                (555) 123-4567
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-200 hover:underline"
              >
                24/7 Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
