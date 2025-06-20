import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type RecordingData = {
  id: string;
  meeting_url: string;
  meeting_slug: string;
  created_at: string;
  zip_file_link: string;
  user_id: string;
  status: string;
};

export default function DashboardPage() {
  const [recordings, setRecordings] = useState<RecordingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordings = async () => {
      const token = localStorage.getItem("meeting_bot_access_token");
      if (!token) {
        toast.error("Please login to view your recordings.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:7000/meetings/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        setRecordings(response.data);
      } catch (error) {
        toast.error("Failed to fetch recordings.");
        console.error("Error fetching recordings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);

  const handleStopMeeting = async (meetingId: string) => {
    try {
      const token = localStorage.getItem("meeting_bot_access_token");
      await axios.post(
        "http://localhost:7000/meetings/stop",
        { meeting_id: meetingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Stop signal sent successfully!");
    } catch (err) {
      console.error("Failed to stop meeting:", err);
      toast.error("Failed to stop meeting.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen flex flex-col items-center bg-[#0f172a] text-white overflow-hidden px-6 py-28">
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

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text"
        >
          Your Meeting Recordings
        </motion.h1>

        <div className="w-[80%] mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-white/20">
          {loading ? (
            <div className="text-center text-gray-300 py-10">Loading recordings...</div>
          ) : recordings.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-sm">No recordings available yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm text-left text-white shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-100 uppercase text-xs tracking-widest">
                    <th className="px-6 py-4 font-semibold">#</th>
                    <th className="px-6 py-4 font-semibold">Meeting Link</th>
                    <th className="px-6 py-4 font-semibold">Meeting Name</th>
                    <th className="px-6 py-4 font-semibold">Created At</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Download</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {[...recordings].reverse().map((rec, index) => (
                    <motion.tr
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="transition-all duration-300 hover:bg-white/10"
                    >
                      <td className="px-6 py-4 text-indigo-300 font-semibold">{index + 1}</td>
                      <td className="px-6 py-4">
                        <a
                          href={rec.meeting_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline hover:text-blue-300 transition"
                        >
                          View
                        </a>
                      </td>
                      <td className="px-6 py-4 text-indigo-100">{rec.meeting_slug}</td>
                      <td className="px-6 py-4 text-slate-300">
                        {new Date(rec.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${rec.status === "successfully_done"
                            ? "bg-green-400/20 text-green-200"
                            : rec.status === "failed"
                              ? "bg-red-400/20 text-red-200"
                              : "bg-yellow-400/20 text-yellow-200"
                            }`}
                        >
                          {rec.status.replaceAll("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {rec.zip_file_link ? (
                          <a
                            href={rec.zip_file_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-white rounded-lg shadow-md text-sm hover:scale-105 transition-transform duration-300"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400 italic">Processing...</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {rec.status === "in_queue" ? (
                          <button
                            onClick={() => handleStopMeeting(rec.id)}
                            className="text-sm px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition shadow"
                          >
                            Stop
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">N/A</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      </section>
    </>
  );
}
