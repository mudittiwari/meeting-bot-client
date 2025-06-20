import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("meeting_bot_access_token");
        localStorage.removeItem("token_type");
        localStorage.removeItem("meeting_bot_user");
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
            {/* Left: Logo or Title */}
            <Link to="/" className="text-2xl font-bold text-indigo-600">VCE</Link>

            {/* Center: Links */}
            <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
                <Link to="/" className="hover:text-indigo-500 transition">Home</Link>
                <Link to="/process" className="hover:text-indigo-500 transition">Start Bot</Link>
                <Link to="/dashboard" className="hover:text-indigo-500 transition">Dashboard</Link>
            </div>

            {/* Right: Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-200 transition"
                >
                    <span>Account</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20"
                        >
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                            >
                                <User className="w-4 h-4" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile: Burger Menu - optional if you want */}
        </nav>
    );
}

