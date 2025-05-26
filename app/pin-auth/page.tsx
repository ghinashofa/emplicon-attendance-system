"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, CheckCircle, AlertCircle, KeyRound } from "lucide-react"
import { motion } from "framer-motion"

export default function PinAuthPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState("")
  const [serverTime, setServerTime] = useState("")
  const [location, setLocation] = useState("Kantor Pusat Jakarta")
  const [pin, setPin] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [locationVerified, setLocationVerified] = useState(true) // Set to true for demo
  const [showHelp, setShowHelp] = useState(false)

  // Update time every second - real time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))
      setServerTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }))
    }

    // Update immediately
    updateTime()

    // Then update every second
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handlePinSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate PIN verification
    setTimeout(() => {
      // For demo purposes, accept any 6-digit PIN
      if (pin.length === 6) {
        router.push("/processing")
      } else {
        setError("PIN harus terdiri dari 6 digit")
        setLoading(false)
      }
    }, 1000)
  }

  // If location is not verified, show error
  if (!locationVerified) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="bg-white p-3 flex justify-between items-center text-sm shadow-sm">
          <div className="font-medium">{currentTime}</div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">•••</span>
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">42</span>
          </div>
        </div>

        <header className="bg-white p-4 flex items-center shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/clock-in")}
            className="mr-2 text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-center flex-1 mr-8">Verifikasi PIN</h1>
        </header>

        <main className="flex-1 p-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">Lokasi Tidak Terverifikasi</h2>
              <p className="text-gray-600 mb-6">
                Anda harus berada di lokasi kantor untuk melakukan Clock In. Sistem mendeteksi Anda berada di luar area
                kantor.
              </p>

              <Button
                onClick={() => router.push("/clock-in")}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                Kembali
              </Button>
            </div>
          </div>
        </main>
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

      <header className="bg-white p-4 flex items-center shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/ambil-foto")}
          className="mr-2 text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-center flex-1 mr-8">Verifikasi PIN</h1>
      </header>

      <main className="flex-1 p-5 flex flex-col items-center">
        <div className="w-full max-w-md">
          {/* Location Verification Banner - PROMINENT */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-green-100 border-l-4 border-green-500 p-4 rounded-xl mb-6 shadow-sm"
          >
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-800">Lokasi Terverifikasi</h3>
                <p className="text-green-700 text-sm">
                  Anda berada di <span className="font-medium">{location}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Time */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-xl font-bold text-gray-800">
                {serverTime} <span className="text-sm text-gray-500 font-normal">WIB</span>
              </p>
            </div>
          </div>

          {/* PIN Authentication */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-gray-100"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <KeyRound className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-4 text-center">Masukkan PIN Kehadiran</h3>

            <form onSubmit={handlePinSubmit}>
              <div className="mb-4">
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
                  PIN 6 Digit
                </label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Masukkan PIN 6 digit"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-lg h-14 bg-gray-50 border-gray-200"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1 text-center">PIN ini diberikan oleh departemen HR</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl" disabled={loading}>
                {loading ? "Memverifikasi..." : "Clock In dengan PIN"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={() => setShowHelp(!showHelp)} className="text-blue-600 text-sm hover:underline">
                Lupa PIN?
              </button>
            </div>

            {showHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <p className="text-sm text-blue-700">
                  Jika Anda lupa PIN, silakan hubungi departemen HR di ext. 123 atau kirim email ke hr@perusahaan.com
                  untuk mendapatkan PIN baru.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700"
          >
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Catatan:</p>
                <p>
                  Metode PIN digunakan sebagai alternatif ketika verifikasi wajah tidak berhasil. Metode ini berfungsi
                  di semua jenis perangkat.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
