import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { Mail, Lock, User, Phone, Globe, MapPin, Home } from "lucide-react";

const fieldIcons: Record<string, JSX.Element> = {
  name: <User className="w-5 h-5 text-indigo-400" />,
  email: <Mail className="w-5 h-5 text-indigo-400" />,
  phone: <Phone className="w-5 h-5 text-indigo-400" />,
  city: <Home className="w-5 h-5 text-indigo-400" />,
  state: <MapPin className="w-5 h-5 text-indigo-400" />,
  country: <Globe className="w-5 h-5 text-indigo-400" />,
  password: <Lock className="w-5 h-5 text-indigo-400" />,
};

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:7000/users", formData);
      toast.success("Account created successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.log(error);
      toast.error(`Signup failed: ${error.response?.data?.detail || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center px-6 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-blob -top-24 -left-24"></div>
        <div className="absolute w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000 top-20 -right-24"></div>
        <div className="absolute w-96 h-96 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-0 left-20"></div>

        <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_#6366f1aa] px-10 py-12 text-white">
          <h1 className="text-4xl font-bold text-center mb-10 tracking-tight">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {["name", "email", "phone", "city", "state", "country"].map((field) => (
                <div key={field} className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2">{fieldIcons[field]}</div>
                  <input
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
              ))}
              <div className="relative col-span-2">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">{fieldIcons.password}</div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              Sign Up
            </button>
            <div className="text-center pt-4">
              <span className="text-gray-400">Already have an account?</span>{" "}
              <Link to="/login" className="text-indigo-400 hover:underline font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
