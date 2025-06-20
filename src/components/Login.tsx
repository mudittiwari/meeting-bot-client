import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import qs from "qs";
import LoadingOverlay from "./LoadingOverlay";
import { Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (response: any) => {
    const { access_token, token_type, user } = response;
    localStorage.setItem("meeting_bot_access_token", access_token);
    localStorage.setItem("token_type", token_type);
    localStorage.setItem("meeting_bot_user", JSON.stringify(user));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/users/login",
        qs.stringify(formData),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      handleLoginSuccess(response.data);
      toast.success("Login successful");
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      toast.error(`Login failed: ${error.response?.data?.detail || "Unknown error"}`);
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

        {/* Login card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_#6366f1aa] px-10 py-12 text-white">
          <h2 className="text-4xl font-bold text-center mb-8 tracking-tight">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <User className="w-5 h-5 text-indigo-400" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <Lock className="w-5 h-5 text-indigo-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              Login
            </button>

            {/* Link */}
            <div className="text-center pt-4">
              <span className="text-gray-400">Don’t have an account?</span>{" "}
              <Link to="/signup" className="text-indigo-400 hover:underline font-medium">
                Create one
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
