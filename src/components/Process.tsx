import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import { motion } from "framer-motion";

const Process: React.FC = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateInputs()) return;

    const user = localStorage.getItem("meeting_bot_user");
    if (!user) {
      toast.error("User not found. Please login again.");
      return;
    }
    const parsedUser = JSON.parse(user);
    const email = parsedUser.email;

    const payload = {
      meeting_url: url,
      choice,
      meeting_slug: slug,
    };

    try {
      const token = localStorage.getItem("meeting_bot_access_token");
      setLoading(true);
      const response = await axios.post(
        "http://localhost:7000/add-job",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log(response);
      toast.success("Meeting submitted successfully!");
      setUrl("");
      setChoice("");
      setSlug("");
    } catch (error: any) {
      setLoading(false);
      toast.error(`Error submitting video: ${error.response?.data?.detail}`);
      console.error(`Error submitting video: ${error.response?.data?.detail}`);
    }
  };

  return (
    <>
      <Navbar />
      <LoadingOverlay isLoading={loading} />

      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white overflow-hidden px-6 py-28">
        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 rounded-full blur-3xl -top-40 -left-40"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-500 to-purple-400 opacity-20 rounded-full blur-3xl bottom-[-120px] right-[-120px]"
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-2xl">
            Start Your Meeting Recording
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-xl mx-auto">
            Choose a platform and paste the meeting link. We'll handle the rest.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.05)] space-y-8"
        >
          {/* Platform Selection */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="block text-sm text-indigo-200 mb-1 font-medium">Select Platform</label>
            <select
              required
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select one...</option>
              <option value="gmeet">Google Meet</option>
              <option value="zoom">Zoom</option>
              <option value="teams">Microsoft Teams</option>
            </select>
          </motion.div>



          {/* meeting slug input */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative"
          >
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder=" "
              className="peer w-full rounded-xl border border-white/20 bg-transparent px-4 pt-5 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <label
              htmlFor="slug"
              className="absolute left-4 top-2 text-sm text-indigo-200 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-400"
            >
              Meeting Name
            </label>
          </motion.div>

          {/* URL Input */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative"
          >
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder=" "
              className="peer w-full rounded-xl border border-white/20 bg-transparent px-4 pt-5 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <label
              htmlFor="url"
              className="absolute left-4 top-2 text-sm text-indigo-200 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-400"
            >
              Meeting Link
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg transition"
          >
            Start Recording
          </motion.button>
        </motion.form>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-slate-400 text-center space-y-1"
        >
          <p>🔗 Ensure the link is accessible to our bot.</p>
          <p>📼 You’ll receive the MP4 + JSON transcript automatically.</p>
        </motion.div>
      </section>
    </>


  );
};

export default Process;
