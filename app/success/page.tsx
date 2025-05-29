"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    CheckCircle,
    Home,
    Calendar,
    Clock,
    MapPin,
    Shield,
    Notebook 
} from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [serverTime, setServerTime] = useState("");
    const [countdown, setCountdown] = useState(5);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [clockInTime, setClockInTime] = useState("");
    const [address, setAddress] = useState<string>("Mengambil lokasi...");
    const [notes, setNotes] = useState<string>("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
            setCurrentDate(
                now.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })
            );
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const storedImage =
            localStorage.getItem("capturedPhoto") ||
            sessionStorage.getItem("capturedPhoto");
        if (storedImage) {
            setCapturedImage(storedImage);
        }

        const storedTime = localStorage.getItem("clockInTime");
        if (storedTime) {
            const clockInDate = new Date(storedTime);
            const formattedTime = clockInDate.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }) + " WIB";
            setClockInTime(formattedTime);
            setServerTime(formattedTime);
        }

        // Get stored notes
        const storedNotes = localStorage.getItem("clockInNotes");
        if (storedNotes) {
            setNotes(storedNotes);
        }
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            localStorage.setItem("clockInStatus", "clocked-in");
            router.push("/");
        }
    }, [countdown, router]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const handleGoHome = () => {
        localStorage.setItem("clockInStatus", "clocked-in");
        router.push("/");
    };

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

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <main className="flex-1 p-4 flex flex-col items-center justify-center">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="w-full max-w-md"
                >
                    {/* Success Card */}
                    <motion.div
                        variants={item}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 border border-slate-100"
                    >
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-[#0BA5EC] to-[#1D8CBF] p-4 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-br-full"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-tl-full"></div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-3 shadow-lg relative z-10"
                            >
                                <CheckCircle className="h-10 w-10 text-[#0BA5EC]" />
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="relative z-10"
                            >
                                <h2 className="text-xl font-bold text-white mb-1">
                                    Clock In Berhasil!
                                </h2>
                                <p className="text-white text-sm">
                                    Kehadiran Anda telah tercatat
                                </p>
                            </motion.div>
                        </div>

                        {/* Details Section */}
                        <div className="px-4 max-w-md mx-auto">
                            <div className="py-6 flex flex-col gap-4 items-center justify-center w-full">
                                {/* Image */}
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                    {capturedImage ? (
                                        <img
                                            src={
                                                capturedImage ||
                                                "/placeholder.svg"
                                            }
                                            alt="Captured selfie"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-400 text-xs">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-base font-semibold text-[#0D4264] -mt-2">
                                    Erika Wijayanti
                                </p>

                                {/* Card List */}
                                <div className="space-y-4 w-full">
                                    {/* Tanggal */}
                                    <motion.div
                                        variants={item}
                                        className="w-full flex items-center py-2 px-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center mr-4 shadow-md">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 relative z-10">
                                            <p className="text-sm text-slate-500 mb-1">
                                                Tanggal
                                            </p>
                                            <p className="font-medium text-base text-black">
                                                {currentDate}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Waktu */}
                                    <motion.div
                                        variants={item}
                                        className="w-full flex items-center py-2 px-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mr-4 shadow-md">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 relative z-10">
                                            <p className="text-sm text-slate-500 mb-1">
                                                Waktu Clock In
                                            </p>
                                            <p className="font-medium text-base text-black">
                                                {serverTime}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Lokasi */}
                                    <motion.div
                                        variants={item}
                                        className="w-full flex items-center p-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mr-4 shadow-md">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 relative z-10">
                                            <p className="text-sm text-slate-500">
                                                Lokasi
                                            </p>
                                            <p className="font-medium text-base text-black">
                                            {address}
                                            </p>
                                        </div>
                                    </motion.div>
                                    {/* Catatan */}
                                    <motion.div
                                        variants={item}
                                        className="w-full flex items-center p-4 bg-white rounded-xl shadow-md border border-slate-100 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-bl-full opacity-50 -mr-5 -mt-5"></div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-4 shadow-md">
                                            <Notebook className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1 relative z-10">
                                            <p className="text-sm text-slate-500">
                                                Catatan
                                            </p>
                                            <p className="font-medium text-base text-black">
                                                {notes || "Tidak ada catatan"}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="p-4 border-t border-slate-100">
                            <motion.button
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoHome}
                                className="w-full bg-[#0BA5EC] hover:bg-[#6A41C6] text-white font-medium rounded-xl py-3 relative transition-colors overflow-hidden"
                            >
                                <div className="flex items-center justify-center w-full">
                                    <div className="w-8 h-8" />
                                    <div className="flex items-center space-x-2 mr-3">
                                        <Home className="h-5 w-5" />
                                        <span>Kembali ke Beranda</span>
                                    </div>

                                    <motion.div
                                        className="bg-white text-violet-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-6"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{
                                            duration: 1,
                                            repeat: Number.POSITIVE_INFINITY,
                                        }}
                                    >
                                        {countdown}
                                    </motion.div>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        variants={item}
                        className="text-center text-xs text-slate-400"
                    >
                        <p>Emplicon v2.5.3</p>
                        <p>© 2025 PT Emplicon Indonesia</p>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
