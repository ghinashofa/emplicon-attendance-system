"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, RotateCcw, MapPin, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"

export default function ConfirmationPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [clockInTime, setClockInTime] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [address, setAddress] = useState<string>("Mengambil lokasi...")


  // Get captured image from localStorage or sessionStorage
  useEffect(() => {
    const storedImage = localStorage.getItem("capturedPhoto") || sessionStorage.getItem("capturedPhoto")
    if (storedImage) {
      setCapturedImage(storedImage)
    }
  }, [])

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))
      setClockInTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB",
      )

      // Format date as "DD Month YYYY"
      const options = { year: "numeric", month: "long", day: "numeric" }
      setCurrentDate(now.toLocaleDateString("id-ID", options))
    }

    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        fetchAddress(lat, lon)
      },
      (err) => {
        console.error("Geolocation error:", err)
        setAddress("Gagal mendapatkan lokasi")
      }
    )
  } else {
    setAddress("Geolocation tidak didukung")
  }
}, [])

const fetchAddress = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    setAddress(res.data.display_name || "Alamat tidak ditemukan")
  } catch (error) {
    console.error("Error fetching address:", error)
    setAddress("Alamat tidak ditemukan")
  }
}

  const handleRetakePhoto = () => {
    router.push("/ambil-foto")
  }

  const handleClockIn = () => {
    setLoading(true)
    // Store notes if any
    if (notes.trim()) {
      localStorage.setItem("clockInNotes", notes.trim())
    }
    // Simulate processing
    setTimeout(() => {
      router.push("/processing")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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

      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm border-b border-gray-100">
        <button
          onClick={() => router.push("/ambil-foto")}
          className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Clock In</h1>
      </header>

      <main className="flex-1 p-4">
        {/* Date and Time Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between mb-6"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">Tanggal</p>
            <p className="text-lg font-semibold text-gray-900">{currentDate}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Waktu Clock In</p>
            <p className="text-lg font-semibold text-gray-900">{clockInTime}</p>
          </div>
        </motion.div>

        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-sm text-gray-500 mb-3">Foto</p>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {capturedImage ? (
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured selfie"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetakePhoto}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Ulangi Foto
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-sm text-gray-500 mb-3">Lokasi</p>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-900 font-medium mb-3">{address}</p>

            {/* Map placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
              </div>
              {/* Map controls */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <button className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-gray-600 text-sm font-bold">
                  +
                </button>
                <button className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-gray-600 text-sm font-bold">
                  −
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-sm text-gray-500 mb-3">Catatan (opsional)</p>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="relative">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis Catatan..."
                className="w-full h-20 resize-none border-none outline-none text-gray-900 placeholder-gray-400 text-sm"
                maxLength={200}
              />
              <MessageSquare className="absolute top-2 right-2 h-4 w-4 text-gray-300" />
            </div>
          </div>
        </motion.div>

        {/* Clock In Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="pb-6"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleClockIn}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-4 rounded-2xl transition-colors shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Memproses...
              </div>
            ) : (
              "Clock In"
            )}
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}
