"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, MapPin, Camera, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function ClockInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [location, setLocation] = useState("Kantor Pusat Jakarta")

  // Update time and date in real-time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))

      // Format date as "Hari, DD Bulan YYYY"
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      setCurrentDate(now.toLocaleDateString("id-ID", options))
    }

    // Update immediately
    updateDateTime()

    // Then update every second
    const timer = setInterval(updateDateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleClockIn = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      router.push("/ambil-foto")
    }, 500)
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

      {/* Top Bar */}
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Kembali</span>
        </button>
      </div>

      <main className="flex-1 px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Clock In</h1>
          <p className="text-slate-500">{currentDate}</p>
        </motion.div>

        {/* Time Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-blue-100 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

            <div className="flex items-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Waktu Server</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-slate-900 mr-2">{currentTime}</p>
                  <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">WIB</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

            <div className="flex items-center mb-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Lokasi Terverifikasi</h2>
                <p className="text-slate-500">{location}</p>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 relative z-10">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-emerald-500 mr-2" />
                <p className="text-emerald-700">Anda berada di lokasi kantor dan dapat melakukan Clock In</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            onClick={handleClockIn}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white font-medium rounded-2xl shadow-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-black/10 rounded-tl-full"></div>

            {loading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="text-lg">Memproses...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg">Clock In dengan Foto Wajah</span>
              </div>
            )}
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}
