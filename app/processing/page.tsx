"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, MapPin, Shield, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function ProcessingPage() {
    const router = useRouter();
    const [status, setStatus] = useState<
        "processing" | "verifying" | "success"
    >("processing");
    const [currentTime, setCurrentTime] = useState("");
    const [progress, setProgress] = useState(0);
    const [processingText, setProcessingText] = useState(
        "Memproses data kehadiran..."
    );
    const [processingSteps, setProcessingSteps] = useState([
        {
            id: 1,
            text: "Memverifikasi wajah...",
            completed: false,
            icon: <Fingerprint className="h-4 w-4" />,
        },
        {
            id: 2,
            text: "Memeriksa lokasi...",
            completed: false,
            icon: <MapPin className="h-4 w-4" />,
        },
        {
            id: 3,
            text: "Mencatat waktu...",
            completed: false,
            icon: <Clock className="h-4 w-4" />,
        },
        {
            id: 4,
            text: "Memperbarui status...",
            completed: false,
            icon: <Shield className="h-4 w-4" />,
        },
    ]);

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Simulate the processing stages
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Update processing steps
        const stepTimers = [
            setTimeout(() => {
                setProcessingSteps((prev) =>
                    prev.map((step) =>
                        step.id === 1 ? { ...step, completed: true } : step
                    )
                );
            }, 800),
            setTimeout(() => {
                setProcessingSteps((prev) =>
                    prev.map((step) =>
                        step.id === 2 ? { ...step, completed: true } : step
                    )
                );
            }, 1600),
            setTimeout(() => {
                setProcessingSteps((prev) =>
                    prev.map((step) =>
                        step.id === 3 ? { ...step, completed: true } : step
                    )
                );
                setStatus("verifying");
                setProcessingText("Memverifikasi lokasi dan waktu...");
            }, 2400),
            setTimeout(() => {
                setProcessingSteps((prev) =>
                    prev.map((step) =>
                        step.id === 4 ? { ...step, completed: true } : step
                    )
                );
                setStatus("success");
                setProcessingText("Verifikasi berhasil!");

                // Auto-proceed to success page
                setTimeout(() => {
                    router.push("/success");
                }, 1000);
            }, 3200),
        ];

        return () => {
            clearInterval(interval);
            stepTimers.forEach((timer) => clearTimeout(timer));
        };
    }, [router]);

    return (
        <div
            className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg-main.svg')" }}
        >
            <main className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {status === "processing" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-[#DEECFE] to-[#C9E1FF] rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="relative z-10">
                                <div className="relative w-28 h-28 mx-auto mb-6">
                                    <svg
                                        className="w-full h-full"
                                        viewBox="0 0 100 100"
                                    >
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="#0BA5EC"
                                            strokeWidth="8"
                                        />
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="251.2"
                                            animate={{
                                                strokeDashoffset:
                                                    251.2 -
                                                    (251.2 * progress) / 100,
                                            }}
                                            transition={{
                                                duration: 0.1,
                                                ease: "linear",
                                            }}
                                        />
                                        <defs>
                                            <svg>
                                                <defs>
                                                    <linearGradient
                                                        id="gradient"
                                                        x1="0%"
                                                        y1="0%"
                                                        x2="100%"
                                                        y2="0%"
                                                    >
                                                        <stop
                                                            offset="0%"
                                                            stopColor="#0BA5EC"
                                                        />
                                                        <stop
                                                            offset="100%"
                                                            stopColor="#1D8CBF"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <rect
                                                    width="100%"
                                                    height="100%"
                                                    fill="url(#gradient)"
                                                />
                                            </svg>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-[#DEECFE] to-[#C9E1FF] flex items-center justify-center shadow-inner">
                                            <Clock className="h-8 w-8 text-[#0BA5EC]" />
                                        </div>
                                    </div>
                                </div>
                                <h2 className="font-bold text-xl mb-1 text-slate-900">
                                    Memproses
                                </h2>
                                <p className="text-slate-500 mb-6">
                                    {processingText}
                                </p>

                                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
                                    <div
                                        className="bg-gradient-to-r from-[#0BA5EC] to-[#1D8CBF] h-2.5 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>

                                {/* Processing steps */}
                                <div className="space-y-3 text-left">
                                    {processingSteps.map((step) => (
                                        <div
                                            key={step.id}
                                            className="flex items-center"
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                                    step.completed
                                                        ? "bg-emerald-100 text-emerald-500"
                                                        : "bg-slate-100 text-slate-400"
                                                }`}
                                            >
                                                {step.completed ? (
                                                    <CheckCircle className="h-4 w-4" />
                                                ) : (
                                                    step.icon
                                                )}
                                            </div>
                                            <span
                                                className={`text-sm ${
                                                    step.completed
                                                        ? "text-slate-900"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                {step.text}
                                            </span>
                                            {step.completed && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    className="ml-auto text-xs text-emerald-500 font-medium"
                                                >
                                                    Selesai
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {status === "verifying" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-[#2DA3FA] to-[#CAD4EC] rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="relative z-10">
                                <div className="relative w-28 h-28 mx-auto mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                                    <div
                                        className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                                        style={{
                                            borderImage:
                                                "linear-gradient(to right, #0BA5EC, #1D8CBF) 1",
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-[#DEECFE] to-[#C9E1FF] flex items-center justify-center shadow-inner">
                                            <MapPin className="h-8 w-8 text-[#0BA5EC]" />
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold mb-1 text-slate-900">
                                    Memverifikasi
                                </h2>
                                <p className="text-slate-500">
                                    {processingText}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="relative z-10">
                                <motion.div
                                    className="w-28 h-28 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-lg"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10,
                                        delay: 0.2,
                                    }}
                                >
                                    <CheckCircle className="h-14 w-14 text-emerald-500" />
                                </motion.div>
                                <h2 className="text-xl font-bold mb-2 text-slate-900">
                                    Clock In Berhasil!
                                </h2>
                                <p className="text-slate-500">
                                    Kehadiran Anda telah berhasil dicatat.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
