"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Users, CheckCircle, Clock, XCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Employee {
  tempId: string
  firstName: string
  lastName: string
  email: string
  position: string
  department: string
  status: string
  submittedAt: string
}

export default function AdminPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
  }, [])

  useEffect(() => {
    // Mock data for demonstration
    const mockEmployees: Employee[] = [
      {
        tempId: "TEMP-123456",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        position: "Software Engineer",
        department: "Engineering",
        status: "pending",
        submittedAt: "2024-01-15T10:30:00Z",
      },
      {
        tempId: "TEMP-789012",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@email.com",
        position: "Product Manager",
        department: "Marketing",
        status: "approved",
        submittedAt: "2024-01-14T14:20:00Z",
      },
      {
        tempId: "TEMP-345678",
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@email.com",
        position: "Sales Representative",
        department: "Sales",
        status: "pending",
        submittedAt: "2024-01-16T09:15:00Z",
      },
    ]

    // Add any stored employee data
    const storedData = localStorage.getItem("employeeData")
    if (storedData) {
      const employee = JSON.parse(storedData)
      mockEmployees.unshift(employee)
    }

    setEmployees(mockEmployees)
  }, [])

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.tempId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200"
      case "pending":
        return "bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border-yellow-200"
      case "rejected":
        return "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200"
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const updateStatus = (tempId: string, newStatus: string) => {
    setEmployees((prev) => prev.map((emp) => (emp.tempId === tempId ? { ...emp, status: newStatus } : emp)))
  }

  const stats = {
    total: employees.length,
    pending: employees.filter((e) => e.status === "pending").length,
    approved: employees.filter((e) => e.status === "approved").length,
    rejected: employees.filter((e) => e.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
                <p className="text-sm text-gray-500">Manage employee applications</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              onClick={() => {
                localStorage.removeItem("adminAuth")
                localStorage.removeItem("adminEmail")
                router.push("/login")
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Total Applications</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">Total submissions</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Review</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Approved</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
              <p className="text-xs text-gray-500 mt-1">Successfully approved</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Rejected</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-red-50 to-pink-50 border border-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
              <p className="text-xs text-gray-500 mt-1">Applications rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Management */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-gray-900">Employee Applications</CardTitle>
            <CardDescription className="text-gray-600">
              Manage preboarding applications and temporary employee IDs
            </CardDescription>
            <div className="flex items-center space-x-2 pt-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 rounded-xl transition-all duration-200"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 bg-gray-50/50">
                    <TableHead className="text-gray-700 font-semibold">Temp ID</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Name</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Position</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Department</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Submitted</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow
                      key={employee.tempId}
                      className="border-gray-200 hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-mono text-sm text-gray-900 font-medium">{employee.tempId}</TableCell>
                      <TableCell className="text-gray-900 font-medium">
                        {employee.firstName} {employee.lastName}
                      </TableCell>
                      <TableCell className="text-gray-700">{employee.email}</TableCell>
                      <TableCell className="text-gray-700">{employee.position}</TableCell>
                      <TableCell className="text-gray-700">{employee.department}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(employee.status)} border px-3 py-1 rounded-lg font-medium`}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(employee.status)}
                            <span>{employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}</span>
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {new Date(employee.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {employee.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(employee.tempId, "approved")}
                                className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50 rounded-lg transition-all duration-200"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(employee.tempId, "rejected")}
                                className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 rounded-lg transition-all duration-200"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {employee.status !== "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(employee.tempId, "pending")}
                              className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            >
                              Reset
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
