"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function RiwayatKehadiranPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState("08:22")
  const [selectedMonth, setSelectedMonth] = useState("Mei 2025")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Sample attendance data
  const attendanceData = [
    {
      date: "13 Mei 2025",
      day: "Selasa",
      clockIn: "08:22:05",
      clockOut: "-",
      status: "hadir",
      location: "Kantor Pusat Jakarta",
    },
    {
      date: "12 Mei 2025",
      day: "Senin",
      clockIn: "-",
      clockOut: "-",
      status: "libur",
      location: "-",
      note: "Hari Raya Waisak",
    },
    {
      date: "10 Mei 2025",
      day: "Sabtu",
      clockIn: "-",
      clockOut: "-",
      status: "weekend",
      location: "-",
    },
    {
      date: "9 Mei 2025",
      day: "Jumat",
      clockIn: "08:05:22",
      clockOut: "17:15:30",
      status: "hadir",
      location: "Kantor Pusat Jakarta",
    },
    {
      date: "8 Mei 2025",
      day: "Kamis",
      clockIn: "08:32:15",
      clockOut: "17:05:42",
      status: "terlambat",
      location: "Kantor Pusat Jakarta",
      note: "Terlambat 32 menit",
    },
    {
      date: "7 Mei 2025",
      day: "Rabu",
      clockIn: "08:01:05",
      clockOut: "17:10:22",
      status: "hadir",
      location: "Kantor Pusat Jakarta",
    },
    {
      date: "6 Mei 2025",
      day: "Selasa",
      clockIn: "07:55:30",
      clockOut: "17:05:12",
      status: "hadir",
      location: "Kantor Pusat Jakarta",
    },
  ]

  // Summary data
  const summary = {
    hadir: 6,
    terlambat: 1,
    absen: 0,
    libur: 2,
    weekend: 3,
  }

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "hadir":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          icon: <CheckCircle className="w-4 h-4" />,
          label: "Hadir",
        }
      case "terlambat":
        return {
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          icon: <AlertTriangle className="w-4 h-4" />,
          label: "Terlambat",
        }
      case "absen":
        return {
          color: "text-red-500",
          bgColor: "bg-red-50",
          icon: <XCircle className="w-4 h-4" />,
          label: "Absen",
        }
      case "libur":
        return {
          color: "text-indigo-500",
          bgColor: "bg-indigo-50",
          icon: <Calendar className="w-4 h-4" />,
          label: "Libur",
        }
      case "weekend":
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          icon: <Calendar className="w-4 h-4" />,
          label: "Weekend",
        }
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          icon: <Clock className="w-4 h-4" />,
          label: "Unknown",
        }
    }
  }

  const toggleExpand = (index) => {
    if (expandedRecord === index) {
      setExpandedRecord(null)
    } else {
      setExpandedRecord(index)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <p className="mt-4 text-blue-600 font-medium">Memuat data kehadiran...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Status Bar */}
      <div className="bg-white p-3 flex justify-between items-center text-sm shadow-sm">
        <div className="font-medium">{currentTime}</div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400">•••</span>
          <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">42</span>
        </div>
      </div>

      <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          className="mr-2 text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">Riwayat Kehadiran</h1>
      </header>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full">
        {/* Month and Search */}
        <div className="mb-5">\
