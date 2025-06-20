import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import LoadingOverlay from "./LoadingOverlay";

export default function ProfilePage() {
    const localUser = JSON.parse(localStorage.getItem("meeting_bot_user") || "{}");
    const token = localStorage.getItem("meeting_bot_access_token");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: localUser.name || "",
        email: localUser.email || "",
        phone: localUser.phone || "",
        city: localUser.city || "",
        state: localUser.state || "",
        country: localUser.country || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !localUser._id) {
            toast.error("User not found or unauthorized.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:7000/users/${localUser._id}`,
                {
                    name: formData.name,
                    phone: formData.phone,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLoading(false);
            // Update localStorage with new user info
            localStorage.setItem("meeting_bot_user", JSON.stringify(response.data));
            toast.success("Profile updated successfully!");
        } catch (error) {
            setLoading(false);
            console.error("Error updating user:", error);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <>
  <LoadingOverlay isLoading={loading} />
  <Navbar />

  <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] px-6 py-24 overflow-hidden text-white">
    {/* Blurred background blobs */}
    <div className="absolute w-[600px] h-[600px] bg-indigo-500/30 blur-3xl rounded-full -top-40 -left-40 z-0" />
    <div className="absolute w-[500px] h-[500px] bg-pink-400/20 blur-2xl rounded-full bottom-[-100px] right-[-100px] z-0" />

    {/* Glow border ring */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:22px_22px] opacity-5 z-0" />

    <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-3xl p-10 overflow-hidden">
      {/* Gradient ring outline */}
      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none" />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center mb-10">
        Edit Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1 text-indigo-200 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1 text-indigo-200 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1 text-indigo-200 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
          />
        </div>

        {/* City, State, Country */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["city", "state", "country"].map((field) => (
            <div key={field}>
              <label className="block text-sm mb-1 text-indigo-200 font-medium capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white"
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold text-lg shadow-xl transition-all hover:-translate-y-1 hover:shadow-pink-400/30"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</>

    );
}
