"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Filter,
  MapPin,
  Clock,
  FileText,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type AttendanceStatus = "present" | "late" | "absent" | "cuti";

interface RiwayatKehadiran {
  id: string;
  date: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string | null;
  location: string;
  notes: string;
}

const attendanceData: RiwayatKehadiran[] = [
  {
    id: "3",
    date: "Kamis, 29 Mei 2025",
    status: "present",
    checkIn: "08.26 WIB",
    checkOut: null,
    location: "Jalan Sudirman Kav. 52 Jakarta Selatan",
    notes: "Kunjungan Ke Kantor Pusat",
  },
  {
    id: "2",
    date: "Rabu, 28 Mei 2025",
    status: "late",
    checkIn: "08.50 WIB",
    checkOut: "18.31 WIB",
    location: "Jalan Sudirman Kav. 52 Jakarta Selatan",
    notes: "-",
  },
  {
    id: "1",
    date: "Selasa, 7 Mei 2025",
    status: "absent",
    checkIn: "-",
    checkOut: "-",
    location: "-",
    notes: "-",
  },
];

const months = [
  "Januari 2025",
  "Februari 2025",
  "Maret 2025",
  "April 2025",
  "Mei 2025",
  "Juni 2025",
];

const statusFilters = [
  { key: "all", label: "Semua", icon: Filter },
  { key: "present", label: "Hadir", icon: Clock },
  { key: "late", label: "Terlambat", icon: Clock },
  { key: "absent", label: "Tidak Hadir", icon: Clock },
  { key: "cuti", label: "Cuti", icon: Clock },
];

export default function AttendanceHistory() {
  const [selectedMonth, setSelectedMonth] = useState("Mei 2025");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const router = useRouter();

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Badge className="bg-[#0A7669] text-white text-[13px] px-3 rounded-full">Hadir</Badge>;
      case "late":
        return <Badge className="bg-[#FC672C] text-white text-[13px] px-3 rounded-ful">Terlambat</Badge>;
      case "absent":
        return <Badge className="bg-[#F92814] text-white text-[13px] px-3 rounded-ful">Tidak Hadir</Badge>;
    }
  };

  const getStatusCounts = () => {
    const counts = { present: 0, late: 0, absent: 0, cuti: 0 };
    attendanceData.forEach((record) => {
      counts[record.status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();
  const filteredData =
    statusFilter === "all"
      ? attendanceData
      : attendanceData.filter((record) => record.status === statusFilter);

  return (
    <div
      className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-main.svg')" }}
    >
      {/* Header */}
      <div className="relative px-4 py-4 mt-4">
        {/* Tombol Back di kiri */}
        <button
          onClick={() => router.push("/")}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Judul Tengah */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-xl font-semibold text-slate-900"
        >
          Riwayat Kehadiran
        </motion.h1>
      </div>

      {/* ========== MAIN CONTENT ========== */}

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg-card-riwayat-hadir.svg')" }}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm text-[#059669] mb-1">Hadir</p>
              <p className="text-2xl font-bold text-[#047857]">
                {statusCounts.present}
              </p>
            </CardContent>
          </Card>
          <Card
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg-card-riwayat-terlambat.svg')" }}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm text-[#D97706] mb-1">Terlambat</p>
              <p className="text-2xl font-bold text-[#B45309]">
                {statusCounts.late}
              </p>
            </CardContent>
          </Card>
          <Card
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg-card-riwayat-tidakhadir.svg')" }}
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm text-[#DC2626] mb-1">Tidak Hadir</p>
              <p className="text-2xl font-bold text-[#B91C1C]">
                {statusCounts.absent}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          {/* Month Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex-1 bg-[#0BA5EC] hover:bg-[#6A41C6] font-medium text-white justify-between">
                {selectedMonth}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              {months.map((month) => (
                <DropdownMenuItem
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={selectedMonth === month ? "bg-blue-50" : ""}
                >
                  {month}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mt-3">
          {[
            { key: "all", label: "All" },
            { key: "present", label: "Hadir" },
            { key: "late", label: "Terlambat" },
            { key: "absent", label: "Tidak Hadir" },
            { key: "cuti", label: "Cuti" },
          ].map((filter) => (
            <Button
              key={filter.key}
              size="sm"
              variant={statusFilter === filter.key ? "default" : "outline"}
              className={`rounded-full px-4 font-medium ${
                statusFilter === filter.key
                  ? "bg-[#0BA5EC] text-white"
                  : "border-[#0BA5EC] text-[#0BA5EC]"
              }`}
              onClick={() => setStatusFilter(filter.key)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Attendance Records */}
        <div className="space-y-3">
          {filteredData.map((record) => (
            <Card
              key={record.id}
              className="bg-cover bg-no-repeat bg-center"
              style={{
                backgroundImage: `url('/images/bg-card-riwayat.svg')`,
                backgroundColor: "white",
              }}
            >
              <CardContent className="p-4">
                {/* Date and Status */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-medium text-black">{record.date}</h3>
                  <span
                    className={
                      record.status === "present"
                        ? "bg-[#0A7669] text-white text-[13px] px-3 py-1 rounded-full"
                        : record.status === "late"
                        ? "bg-[#FC672C] text-white text-[13px] px-3 py-1 rounded-full"
                        : record.status === "absent"
                        ? "bg-[#F92814] text-white text-[13px] px-3 py-1 rounded-full"
                        : "bg-gray-300 text-gray-700 text-[13px] px-3 py-1 rounded-full"
                    }
                  >
                    {record.status === "present"
                      ? "Hadir"
                      : record.status === "late"
                      ? "Terlambat"
                      : record.status === "absent"
                      ? "Tidak Hadir"
                      : "Cuti"}
                  </span>
                </div>
                <hr className="my-2 border-dashed border-gray-200" />

                {/* In/Out Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 bg-[#e6f1ff] p-1 px-3 rounded-full">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 text-[#3B82F6]" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      In: {record.checkIn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#fef3c7] p-1 px-3 rounded-full">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 text-[#F59E0B]" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Out: {record.checkOut || "-"}
                    </span>
                  </div>
                </div>
                <hr className="my-2 border-dashed border-gray-200" />

                {/* Lokasi */}
                <div className="mb-2">
                  <p className="text-xs text-gray-500 mb-0.5">Lokasi</p>
                  <p className="text-sm font-medium text-gray-800">{record.location}</p>
                </div>
                <hr className="my-2 border-dashed border-gray-200" />

                {/* Notes and Bukti Kehadiran */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Notes</p>
                    <p className="text-sm font-medium text-gray-800">{record.notes}</p>
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-500 mb-1.5">Bukti Kehadiran</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[#0BA5EC] p-2 hover:bg-[#0BA5EC] hover:text-white text-xs rounded-lg"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Lihat Bukti
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
