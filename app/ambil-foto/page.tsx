"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Camera,
    Eye,
    Sun,
    Clock,
    MapPin,
    CheckCircle,
    Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AmbilFotoPage() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentTime, setCurrentTime] = useState("");
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [faceDetected, setFaceDetected] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(true);
    const [faceDetectionProgress, setFaceDetectionProgress] = useState(0);

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
        if (isCameraReady) {
            const interval = setInterval(() => {
                setFaceDetectionProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setFaceDetected(true);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);

            return () => clearInterval(interval);
        }
    }, [isCameraReady]);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraReady(true);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setCameraPermission(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (
                videoRef.current.srcObject as MediaStream
            ).getTracks();
            tracks.forEach((track) => track.stop());
            setIsCameraReady(false);
        }
    };

    const capturePhoto = () => {
        if (!isCameraReady || !videoRef.current || !canvasRef.current) return;

        setIsCapturing(true);

        try {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/png");
                setCapturedImage(imageData);

                localStorage.setItem("capturedPhoto", imageData);

                setTimeout(() => {
                    router.push("/confirmation");
                }, 500);
            }
        } catch (err) {
            console.error("Error capturing photo:", err);
            setIsCapturing(false);
        }
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg-main.svg')" }}
        >
            {/* Top Bar */}
            <div className="relative px-4 py-4 mt-4">
                <button
                    onClick={() => router.push("/clock-in")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-xl font-semibold text-slate-900"
                >
                    Clock In
                </motion.h1>
            </div>

            <main className="flex-1 px-6 py-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <h1 className="text-xl font-semibold text-[#0D4264] mb-1">
                        Ambil Foto
                    </h1>
                    <p className="text-slate-500 text-[14px]">
                        Silakan ambil foto wajah Anda untuk melanjutkan
                    </p>
                </motion.div>

                {/* Waktu Clock In */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="bg-white rounded-2xl shadow-lg py-3 px-4 border border-slate-100 flex justify-center w-max">
                        <div className="flex items-center justify-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#0BA5EC] to-[#97BDC9] rounded-xl flex items-center justify-center mr-3 shadow-md">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-sm text-[#535862]">
                                Waktu Clock In:
                            </p>

                            <p className="text-xl font-bold text-[#0D4264] ml-2">
                                {currentTime}
                            </p>
                            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 ml-2 rounded-full">
                                WIB
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Camera */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mb-6"
                >
                    <div className="aspect-[3/4] w-full bg-black rounded-3xl overflow-hidden shadow-xl border-8 border-slate-800 relative">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 z-10 flex items-center justify-center">
                            <div className="w-20 h-1 bg-slate-700 rounded-full"></div>
                        </div>

                        {!capturedImage ? (
                            <>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className={`w-full h-full object-cover ${
                                        isCameraReady
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                />

                                {/* Loading state */}
                                {!isCameraReady && cameraPermission && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-20">
                                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                                            <Camera className="absolute h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                )}

                                {/* Face detection */}
                                {isCameraReady && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="w-48 h-48 rounded-full relative"
                                        >
                                            <svg
                                                className="absolute inset-0 w-full h-full rotate-90"
                                                viewBox="0 0 100 100"
                                            >
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="48"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.2)"
                                                    strokeWidth="2"
                                                />
                                                <motion.circle
                                                    cx="50"
                                                    cy="50"
                                                    r="48"
                                                    fill="none"
                                                    stroke={
                                                        faceDetected
                                                            ? "#10b981"
                                                            : "#ffffff"
                                                    }
                                                    strokeWidth="2"
                                                    strokeDasharray="301.59"
                                                    strokeDashoffset={
                                                        301.59 -
                                                        (301.59 *
                                                            faceDetectionProgress) /
                                                            100
                                                    }
                                                    strokeLinecap="round"
                                                />
                                            </svg>

                                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
                                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
                                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
                                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg"></div>

                                            {faceDetected && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute inset-0 border-2 border-emerald-400 rounded-full"
                                                    style={{
                                                        boxShadow:
                                                            "0 0 0 2px rgba(16, 185, 129, 0.2), 0 0 0 4px rgba(16, 185, 129, 0.1)",
                                                    }}
                                                ></motion.div>
                                            )}
                                        </motion.div>

                                        <div className="absolute top-16 left-0 right-0 flex justify-center">
                                            {faceDetected ? (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Wajah Terdeteksi
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Mendeteksi Wajah...
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <img
                                src={capturedImage || "/placeholder.svg"}
                                alt="Captured"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    <canvas ref={canvasRef} className="hidden" />

                    {isCameraReady && !capturedImage && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 -mt-24">
                            <motion.button
                                onClick={capturePhoto}
                                disabled={isCapturing || !faceDetected}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center focus:outline-none transition-all ${
                                    !faceDetected
                                        ? "opacity-70"
                                        : "hover:shadow-2xl"
                                }`}
                            >
                                <div
                                    className={`w-14 h-14 rounded-full ${
                                        faceDetected
                                            ? "bg-[#0BA5EC]"
                                            : "bg-slate-300"
                                    } flex items-center hover:bg-[#6A41C6] justify-center transition-all`}
                                >
                                    {isCapturing ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Camera className="h-8 w-8 text-white" />
                                    )}
                                </div>
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-4 mb-6"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-100">
                        <h3 className="text-lg font-bold text-[#0D4264] mb-4 flex items-center">
                            <Shield className="h-5 w-5 text-violet-500 mr-2" />
                            Petunjuk
                        </h3>
                        <div className="grid grid-row-2 gap-4">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#0BA5EC] to-[#97BDC9] rounded-xl flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                                    <Eye className="h-5 w-5 text-white" />
                                </div>
                                <p className="text-sm text-slate-700">
                                    Pastikan wajah Anda terlihat jelas dan tidak
                                    tertutup
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                                    <Sun className="h-5 w-5 text-white" />
                                </div>
                                <p className="text-sm text-slate-700">
                                    Pastikan pencahayaan cukup (tidak gelap /
                                    silau)
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
