"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, MapPin, CheckCircle, Fingerprint, AlertCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function AlternativeAuthPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState("09:41")
  const [serverTime, setServerTime] = useState("08:59")
  const [location, setLocation] = useState("Kantor Pusat Jakarta")
  const [pin, setPin] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [locationVerified, setLocationVerified] = useState(true) // Set to true for demo
  const [fingerprintAvailable, setFingerprintAvailable] = useState(true) // Set to true for demo
  const [fingerprintVerified, setFingerprintVerified] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setServerTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }))
    }, 1000)

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
    }, 1500)
  }

  const handleFingerprintAuth = () => {
    setLoading(true)
    setError("")

    // Simulate fingerprint verification
    setTimeout(() => {
      setFingerprintVerified(true)
      setLoading(false)

      // Proceed to processing after successful verification
      setTimeout(() => {
        router.push("/processing")
      }, 1000)
    }, 2000)
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
          <h1 className="text-lg font-semibold text-center flex-1 mr-8">Verifikasi Alternatif</h1>
        </header>

        <main className="flex-1 p-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <XCircle className="h-10 w-10 text-red-500" />
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
          onClick={() => router.push("/clock-in")}
          className="mr-2 text-gray-700 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-center flex-1 mr-8">Verifikasi Alternatif</h1>
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

          {/* Authentication Methods */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-2xl shadow-md mb-6 border border-gray-100"
          >
            <h3 className="font-semibold text-gray-900 mb-4 text-center">Pilih Metode Verifikasi</h3>

            {fingerprintAvailable && (
              <div className="mb-5">
                <Button
                  onClick={handleFingerprintAuth}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center"
                  disabled={loading || fingerprintVerified}
                >
                  <Fingerprint className="h-6 w-6 mr-2" />
                  <span>
                    {loading
                      ? "Memverifikasi..."
                      : fingerprintVerified
                        ? "Sidik Jari Terverifikasi"
                        : "Gunakan Sidik Jari"}
                  </span>
                </Button>

                {fingerprintVerified && (
                  <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-sm text-green-600">Sidik jari berhasil diverifikasi</p>
                  </div>
                )}
              </div>
            )}

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-3 text-xs text-gray-500 absolute">atau</span>
            </div>

            <form onSubmit={handlePinSubmit}>
              <div className="mb-4">
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
                  Masukkan PIN Keamanan
                </label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Masukkan 6-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-lg h-12 bg-gray-50 border-gray-200"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl"
                disabled={loading || fingerprintVerified}
              >
                {loading ? "Memverifikasi..." : "Verifikasi PIN"}
              </Button>
            </form>
          </motion.div>

          {/* Location Requirement Notice */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700"
          >
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Penting:</p>
                <p>
                  Verifikasi lokasi adalah syarat utama untuk Clock In. Anda harus berada di lokasi kantor untuk
                  melakukan Clock In dengan metode apapun.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
