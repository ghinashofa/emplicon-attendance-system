"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Camera, Shield } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ClockInPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [address, setAddress] = useState<string>("Mengambil lokasi...");

    // Update time and date in real-time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );

            // Format date as "Hari, DD Bulan YYYY"
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            setCurrentDate(now.toLocaleDateString("id-ID", options));
        };

        // Update immediately
        updateDateTime();

        // Then update every second
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchAddress(lat, lon);
                },
                (err) => {
                    console.error("Geolocation error:", err);
                    setAddress("Gagal mendapatkan lokasi");
                }
            );
        } else {
            setAddress("Geolocation tidak didukung");
        }
    }, []);
    

    const fetchAddress = async (lat: number, lon: number) => {
        try {
            const res = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            setAddress(res.data.display_name || "Alamat tidak ditemukan");
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Alamat tidak ditemukan");
        }
    };

    const handleClockIn = () => {
        setLoading(true);
        // Simulate loading
        setTimeout(() => {
            router.push("/ambil-foto");
        }, 500);
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg-main.svg')" }}
        >
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
                    Clock In
                </motion.h1>
            </div>

            <main className="flex flex-col min-h-screen px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow"
                >
                    <p className="text-slate-500 text-center mb-6">
                        {currentDate}
                    </p>
                    {/* Time Display */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="bg-white rounded-3xl shadow-lg p-4 border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="flex items-center relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                                    <Clock className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">
                                        Waktu Saat Ini
                                    </p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-bold text-slate-900 mr-2">
                                            {currentTime}
                                        </p>
                                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                            WIB
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {/* Lokasi Terverifikasi */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="bg-white rounded-3xl shadow-lg p-4 border border-slate-100 relative overflow-hidden">
                            {/* Background Hiasan */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="flex items-start relative z-10">
                                {/* Icon */}
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg flex-shrink-0">
                                    <MapPin className="h-7 w-7 text-white" />
                                </div>

                                {/* Text */}
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">
                                        Lokasi Terverifikasi
                                    </p>
                                    <p className="text-base font-semibold text-slate-900">
                                        {address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 relative z-10">
                        <div className="flex items-start space-x-2">
                            <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <p className="text-emerald-700 text-[15px] leading-snug">
                                Anda berada di lokasi kantor
                            </p>
                        </div>
                    </div>
                </motion.div>
                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-24"
                >
                    <motion.button
                        onClick={handleClockIn}
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#0BA5EC] hover:bg-[#6A41C6] text-white font-medium rounded-2xl shadow-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center p-2 relative overflow-hidden"
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                <span className="text-md">Memproses...</span>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-1">
                                    <Camera className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-md">
                                    Clock In dengan Foto Wajah
                                </span>
                            </div>
                        )}
                    </motion.button>
                </motion.div>
            </main>
        </div>
    );
}
