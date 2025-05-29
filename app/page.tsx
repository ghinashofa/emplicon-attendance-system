"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Home,
    MessageSquare,
    Clock,
    CheckSquare,
    User,
    Calendar,
    Wallet,
    Umbrella,
    Megaphone,
    Users,
    MessageSquareHeart,
    BookOpen,
    ChevronRight,
    HelpCircle,
    LogIn,
    LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [serverTime, setServerTime] = useState("");
    const [notifications, setNotifications] = useState(3);
    const [greeting, setGreeting] = useState("Selamat pagi");
    const [clockInStatus, setClockInStatus] = useState("not-clocked-in"); // "not-clocked-in" | "clocked-in"
    const [clockInTime, setClockInTime] = useState("");

    // Check clock-in status on component mount
    useEffect(() => {
        const status = localStorage.getItem("clockInStatus");
        const storedClockInTime = localStorage.getItem("clockInTime");

        if (status === "clocked-in" && storedClockInTime) {
            setClockInStatus("clocked-in");
            const clockInDate = new Date(storedClockInTime);
            setClockInTime(
                clockInDate.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }) + " WIB"
            );
        }
    }, []);

    // Update time every minute
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const hours = now.getHours();

            // Set greeting based on time of day
            if (hours >= 5 && hours < 12) {
                setGreeting("Selamat pagi");
            } else if (hours >= 12 && hours < 15) {
                setGreeting("Selamat siang");
            } else if (hours >= 15 && hours < 19) {
                setGreeting("Selamat sore");
            } else {
                setGreeting("Selamat malam");
            }

            setCurrentTime(
                now.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
            setServerTime(
                now.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }) + " WIB"
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
    
        updateDateTime();

        // Then update every minute
        const timer = setInterval(updateDateTime, 60000);
        return () => clearInterval(timer);
    }, []);

    const handleClockIn = () => {
        router.push("/clock-in");
    };

    const handleClockOut = () => {
        // Reset clock-in status
        localStorage.removeItem("clockInStatus");
        localStorage.removeItem("clockInTime");
        localStorage.removeItem("capturedPhoto");
        localStorage.removeItem("clockInNotes");

        setClockInStatus("not-clocked-in");
        setClockInTime("");
    };

    const getStatusBadge = () => {
        if (clockInStatus === "clocked-in") {
            return (
                <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm ml-4 flex-shrink-0">
                    <span className="text-emerald-700 text-sm font-medium whitespace-nowrap">
                        Sudah Clock In
                    </span>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-start ml-4 flex-shrink-0 gap-1">
                <span className="text-sm text-gray-500 mb-1">Status</span>
                <div className="bg-[#E60073] px-4 py-2 rounded-full shadow-md">
                    <span className="text-white text-sm font-semibold whitespace-nowrap">
                        Belum Clock In
                    </span>
                </div>
            </div>
        );
    };

    // Display Clock In Clock Out
    const getActionButton = () => {
        if (clockInStatus === "clocked-in") {
            return (
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <div className="bg-white rounded-2xl p-4 px-5 relative overflow-hidden"
                        style={{
                    
                            boxShadow:
                                "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-bl-full opacity-60 -mr-8 -mt-8"></div>

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center flex-1 min-w-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0BA5EC] to-[#1D8CBF] rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm text-gray-600 mb-1">
                                        Clock In
                                    </h3>
                                    <p className="text-md font-semibold text-gray-900">
                                        {clockInTime}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center flex-1 min-w-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#FF692E] to-[#D94D15] rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm text-gray-600 mb-1">
                                        Clock Out
                                    </h3>
                                    <p className="text-md font-semibold text-gray-900">
                                        {clockInTime}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
            >
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleClockIn}
                    className="rounded-2xl shadow-lg p-4 border border-gray-100 cursor-pointer relative overflow-hidden bg-white"
                    style={{
                        backgroundImage:
                            "url('/images/bg-wave2.svg'), linear-gradient(135deg, #ffffff, #f8fafc)",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        boxShadow:
                            "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.1)",
                    }}
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-bl-full opacity-60 -mr-8 -mt-8"></div>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center flex-1 min-w-0">
                            <div className="w-10 h-10 bg-[#0BA5EC] rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                                <LogIn className="h-6 w-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg font-semibold text-[#0D4264] mb-1">
                                    Clock In Sekarang
                                </h3>
                            </div>
                        </div>
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                            <ChevronRight className="h-8 w-8 text-[#0D4264]" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    const IconWrapper = ({ src, alt }: { src: string; alt: string }) => (
        <div className="w-12 h-12 border border-[#E9EAEB] rounded-lg flex items-center justify-center shadow-[0px_1.14px_2.29px_rgba(10,13,18,0.05)] bg-white">
            <img src={src} alt={alt} className="w-6 h-6" />
        </div>
    );

    return (
        <div
            className="flex flex-col min-h-screen bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg-main.svg')" }}
        >
            {/* Header */}
            <header className="px-4 sm:px-6 pb-1 pt-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <img
                            src="/images/Logo.svg"
                            alt="Emplicon Logo"
                            className="h-9 w-auto"
                        />
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 flex items-center justify-end"
                    >
                        <HelpCircle size={26} className="text-[#61656C]" />
                    </motion.button>
                </div>

                <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-600 text-sm mb-1">
                            {greeting},
                        </p>
                        <h2 className="text-xl font-bold text-[#0D4264] mb-1 truncate">
                            Erika Wijayanti
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Waktu saat ini: {serverTime}
                        </p>
                    </div>
                    {getStatusBadge()}
                </div>
            </header>

            <main className="flex-1 px-4 py-6 pb-24">
                {/* Clock In/Out Card */}
                {getActionButton()}

                {/* Menu Grid */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex flex-wrap justify-between gap-y-6">
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Kehadiran"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-kehadiran.png"
                                        alt="Kehadiran"
                                    />
                                }
                            />
                        </div>
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Perizinan"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-perizinan.png"
                                        alt="Perizinan"
                                    />
                                }
                            />
                        </div>
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Lembur"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-lembur.png"
                                        alt="Lembur"
                                    />
                                }
                            />
                        </div>
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Slip Gaji"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-slipgaji.png"
                                        alt="Slip Gaji"
                                    />
                                }
                            />
                        </div>

                        <div className="w-[23%]">
                            <MenuIcon
                                label="Karyawan"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-karyawan.png"
                                        alt="Karyawan"
                                    />
                                }
                            />
                        </div>
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Hari Libur"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-harilibur.png"
                                        alt="Hari Libur"
                                    />
                                }
                            />
                        </div>
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Kebijakan"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-kebijakan.png"
                                        alt="Kebijakan"
                                    />
                                }
                            />
                        </div>
                        <div className="w-[23%]">
                            <MenuIcon
                                label="Kotak Saran"
                                icon={
                                    <IconWrapper
                                        src="/images/icon-kotaksaran.png"
                                        alt="Kotak Saran"
                                    />
                                }
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Announcements Section */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Pengumuman
                    </h3>
                    <div
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                        style={{
                            backgroundImage: "url('/images/bg-announce.svg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-bl-full opacity-60 -mr-6 -mt-6"></div>

                            <div className="flex items-start relative z-10">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center mr-3 shadow-md flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2 gap-2">
                                        <span className="text-sm text-[535862] flex-shrink-0">
                                            18 Agustus 2025 | 08.00 WIB
                                        </span>

                                        <span className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 px-2 py-1 rounded-md text-[13px] font-medium border border-orange-200 flex-shrink-0">
                                            Event
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-[#0D4264]  mb-1">
                                        Lomba 17 Agustus di Head Office!
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Mari rayakan Hari Kemerdekaan Indonesia
                                        dengan semangat kebersamaan dan
                                        keceriaan! Akan ada be...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Enhanced Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
                {/* Elevated Clock In/Out Button */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={
                            clockInStatus === "clocked-in"
                                ? handleClockOut
                                : handleClockIn
                        }
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 border-[3px] border-white hover:bg-[#6A41C6]"
                        style={{
                            backgroundColor:
                                clockInStatus === "clocked-in"
                                    ? "#FF692E"
                                    : "#0BA5EC",
                            boxShadow:
                                clockInStatus === "clocked-in"
                                    ? `
          0 0 0 3px #FFFFFF,
          0 0 0 6px rgba(255, 105, 46, 0.6),
          0 8px 25px rgba(255, 105, 46, 0.4),
          0 3px 10px rgba(0, 0, 0, 0.1)
        `
                                    : `
          0 0 0 3px #FFFFFF,
          0 0 0 6px rgba(11, 165, 236, 0.6),
          0 8px 25px rgba(11, 165, 236, 0.4),
          0 3px 10px rgba(0, 0, 0, 0.1)
        `,
                        }}
                    >
                        {clockInStatus === "clocked-in" ? (
                            <LogIn
                                size={24}
                                className="rotate-180 text-white"
                            />
                        ) : (
                            <LogIn size={24} className="text-white" />
                        )}
                    </motion.button>
                </div>

                {/* Navigation Items Container */}
                <div className="px-4 py-3 pt-4">
                    <div className="flex items-end justify-between max-w-md mx-auto">
                        {/* Left Side Navigation */}
                        <div className="flex space-x-8">
                            <NavItem
                                icon={<Home size={20} />}
                                label="Home"
                                active
                            />
                            <NavItem
                                icon={<MessageSquare size={20} />}
                                label="Feed"
                            />
                        </div>

                        {/* Center Spacer for Clock In/Out Button */}
                        <div className="flex flex-col items-center ml-2">
                            <div className="h-6 w-6"></div>
                            <span
                                className={`text-xs font-medium mt-1 ${
                                    clockInStatus === "clocked-in"
                                        ? "text-orange-600"
                                        : "text-blue-600"
                                }`}
                            >
                                {clockInStatus === "clocked-in"
                                    ? "Clock Out"
                                    : "Clock In"}
                            </span>
                        </div>

                        {/* Right Side Navigation */}
                        <div className="flex space-x-8">
                            <NavItem
                                icon={<CheckSquare size={20} />}
                                label="Approval"
                            />
                            <NavItem icon={<User size={20} />} label="Profil" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Menu Icon Component
function MenuIcon({
    label,
    icon,
    onClick = () => {},
}: {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <motion.div
            className="flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <div className="mb-2">{icon}</div>
            <span className="text-[13px] text-[#252B37] text-center font-medium leading-tight">
                {label}
            </span>
        </motion.div>
    );
}

// Enhanced Navigation Item Component
function NavItem({
    icon,
    label,
    active = false,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}) {
    return (
        <motion.div
            className="flex flex-col items-center min-w-0"
            whileTap={{ scale: 0.9 }}
        >
            <div
                className={`p-2 rounded-lg transition-colors ${
                    active
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
            >
                {icon}
            </div>
            <span
                className={`text-xs mt-1 font-medium truncate max-w-full ${
                    active ? "text-blue-600" : "text-gray-400"
                }`}
            >
                {label}
            </span>
        </motion.div>
    );
}
