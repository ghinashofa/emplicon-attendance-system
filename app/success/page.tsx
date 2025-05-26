"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Home, Calendar, Clock, MapPin, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function SuccessPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [serverTime, setServerTime] = useState("")
  const [location, setLocation] = useState("Kantor Pusat Jakarta")
  const [countdown, setCountdown] = useState(5)

  // Update time and date in real-time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))
      setServerTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB")
      setCurrentDate(now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }))
    }

    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Countdown timer and auto-redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Set clock-in status before redirecting
      localStorage.setItem("clockInStatus", "clocked-in")
      localStorage.setItem("clockInTime", new Date().toISOString())
      router.push("/")
    }
  }, [countdown, router])

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleGoHome = () => {
    // Set clock-in status before redirecting
    localStorage.setItem("clockInStatus", "clocked-in")
    localStorage.setItem("clockInTime", new Date().toISOString())
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Status Bar */}
      <div className="bg-white px-4 py-2 flex justify-between items-center text-sm border-b border-gray-100">
        <div className="font-medium text-gray-900">{currentTime}</div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-gray-400 rounded-sm">
              <div className="w-full h-full bg-green-500 rounded-sm"></div>
            </div>
            <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-medium">42</span>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-md">
          {/* Success Card */}
          <motion.div
            variants={item}
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 border border-slate-100"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-tl-full"></div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10"
              >
                <CheckCircle className="h-12 w-12 text-emerald-500" />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
              >
                <h2 className="text-3xl font-bold text-white mb-1">Clock In Berhasil!</h2>
                <p className="text-emerald-100">Kehadiran Anda telah tercatat</p>
              </motion.div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <motion.div variants={item} className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-emerald-500 mr-2" />
                  <p className="text-emerald-800 font-medium">Status kehadiran Anda telah diperbarui menjadi "Hadir"</p>
                </div>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  variants={item}
                  className="flex items-center p-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mr-4 shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="text-sm text-slate-500">Tanggal</p>
                    <p className="font-bold text-slate-900">{currentDate}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="flex items-center p-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center mr-4 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="text-sm text-slate-500">Waktu Server</p>
                    <p className="font-bold text-slate-900">{serverTime}</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="flex items-center p-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-4 shadow-md">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="text-sm text-slate-500">Lokasi</p>
                    <p className="font-bold text-slate-900">{location}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="p-6 border-t border-slate-100">
              <motion.button
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoHome}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white font-medium rounded-xl py-4 flex items-center justify-center relative transition-colors overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-black/10 rounded-tl-full"></div>

                <Home className="mr-2 h-5 w-5" />
                <span className="relative z-10">Kembali ke Beranda</span>
                <motion.div
                  className="absolute right-4 bg-white text-violet-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {countdown}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div variants={item} className="text-center text-xs text-slate-400">
            <p>Emplicon v2.5.3</p>
            <p>© 2025 PT Emplicon Indonesia</p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
