import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import demoVideo from "../assets/demo.mp4"; // Optional demo video

const features = [
    {
        icon: "🎥",
        title: "Multi-Platform Recording",
        desc: "Supports Zoom, Google Meet, and MS Teams links for seamless meeting capture.",
    },
    {
        icon: "🗣️",
        title: "Speaker-Aware Transcription",
        desc: "Each speaker is auto-identified and labeled using voice and tile recognition.",
    },
    {
        icon: "📄",
        title: "Accurate Transcripts",
        desc: "Delivered in JSON format with timestamps, speaker labels, and smart segmentation.",
    },
    {
        icon: "📦",
        title: "Bundled Delivery",
        desc: "Meeting video and transcript zipped and emailed automatically post-processing.",
    },
    {
        icon: "🔐",
        title: "Secure & Private",
        desc: "All recordings and data are encrypted and auto-deleted after delivery.",
    },
    {
        icon: "🌐",
        title: "Zero Installation",
        desc: "Just paste a meeting link — no software download required.",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 12,
        },
    },
};


const steps = [
    {
        label: "Paste Meeting Link",
        desc: "Enter a Zoom, Google Meet, or Microsoft Teams meeting link to begin.",
    },
    {
        label: "Host Accepts Bot",
        desc: "The meeting host permits our bot to join the session securely.",
    },
    {
        label: "Bot Records the Meeting",
        desc: "Our system begins recording audio and video in high quality.",
    },
    {
        label: "End Session Anytime",
        desc: "User or admin can disconnect the bot or it will auto-leave post-meeting.",
    },
    {
        label: "AI-Powered Transcription",
        desc: "Speaker-separated transcripts are generated with username mapping.",
    },
    {
        label: "Delivery via Email",
        desc: "You receive a zip with MP4 + JSON transcript right in your inbox.",
    },
];

function RecordingStepper() {
    const [visibleSteps, setVisibleSteps] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleSteps((prev) => {
                if (prev < steps.length) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-gradient-to-tr from-white via-slate-50 to-purple-50 py-28 px-6 overflow-hidden text-gray-800">
            <div className="absolute w-[700px] h-[700px] bg-indigo-300 blur-[160px] opacity-20 rounded-full -top-40 -left-40 -z-10" />
            <div className="absolute w-[600px] h-[600px] bg-pink-200 blur-[140px] opacity-20 rounded-full bottom-[-120px] right-[-180px] -z-10" />

            <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-transparent bg-clip-text drop-shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80 }}
            >
                From Link to Inbox — Seamlessly
            </motion.h2>

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
                {steps.slice(0, visibleSteps).map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: i * 0.2,
                            type: "spring",
                            stiffness: 60,
                            damping: 12,
                        }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        className="relative group p-8 pt-16 rounded-3xl border border-white/40 bg-white/90 backdrop-blur-2xl shadow-2xl hover:shadow-indigo-300/40 transition-all duration-300 overflow-visible"
                    >
                        {/* Animated background glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-300 via-indigo-300 to-purple-300 opacity-0 group-hover:opacity-10 transition duration-500 blur-2xl pointer-events-none" />

                        {/* Number badge */}
                        <div className="absolute top-0 left-6 w-12 h-12 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white text-lg font-bold flex items-center justify-center shadow-md z-10">
                            {i + 1}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 tracking-tight">
                            {step.label}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700 text-sm leading-relaxed">{step.desc}</p>

                        {/* Bottom hover line */}
                        <div className="absolute bottom-0 left-4 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-500 group-hover:w-[94%]" />
                    </motion.div>

                ))}
            </div>
        </section>
    );
}




export default function HomePage() {
    return (
        <>
            <Navbar />

            <section className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-6 text-white font-sans">
                {/* BACKGROUND: GRID + ANIMATED BLOBS */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:22px_22px] opacity-10 z-0" />

                {/* Blobs */}
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 rounded-full blur-3xl -top-40 -left-40"
                    animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, 25, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-400 to-purple-400 opacity-20 rounded-full blur-3xl top-36 -right-28"
                    animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, -30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[300px] h-[300px] bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20 rounded-full blur-3xl bottom-4 left-10"
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* AMBIENT SPARKLES */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-20"
                            initial={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0.1 + Math.random() * 0.2,
                            }}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                {/* HERO CONTENT */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.4,
                            },
                        },
                    }}
                    className="relative z-10 max-w-5xl text-center"
                >
                    {/* Animated Split Headline */}
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } }}
                        transition={{ type: "spring", stiffness: 100, damping: 12 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text drop-shadow-[0_5px_30px_rgba(99,102,241,0.4)]"
                    >
                        AI-Powered Meeting Recording <br />
                        <span className="text-xl md:text-2xl font-normal tracking-wide block text-slate-300 mt-4">
                            Zoom. Google Meet. Microsoft Teams.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-6 text-lg md:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed"
                    >
                        Drop in a meeting link and let the bot record, transcribe, <strong>tag speakers</strong>,
                        and email you the <strong>MP4 + JSON</strong> — all automatically. No downloads, no stress.
                    </motion.p>

                    {/* Feature badges */}
                    <motion.div
                        className="mt-8 flex flex-wrap gap-3 justify-center"
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.8,
                                },
                            },
                        }}
                    >
                        {[
                            "Speaker Attribution",
                            "Auto ZIP + Email",
                            "Secure Cloud Delivery",
                            "Works with Links Only",
                            "JSON Transcript Format",
                        ].map((badge, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-slate-200 shadow-sm backdrop-blur-lg hover:scale-105 transition"
                            >
                                {badge}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
                        href="/signup"
                        whileHover={{ scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        className="mt-10 inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-white rounded-xl text-lg font-semibold shadow-lg transition hover:shadow-pink-500/30"
                    >
                        Try it Free
                    </motion.a>
                </motion.div>
            </section>


            <section className="relative bg-gradient-to-br from-white via-slate-100 to-indigo-50 py-28 px-6 text-gray-900 overflow-hidden">
                {/* BACKGROUND DECORATION */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 opacity-30 blur-[160px] rounded-full top-[-200px] left-[-300px]" />
                    <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-300 to-indigo-300 opacity-10 blur-[120px] rounded-full bottom-[-100px] right-[-200px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-[size:22px_22px] opacity-10" />
                </div>

                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text drop-shadow-md"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 80 }}
                >
                    Powerful Features Built for Simplicity
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.03 }}
                            className="relative group p-8 rounded-3xl border border-white/40 bg-white/90 backdrop-blur-2xl shadow-2xl hover:shadow-indigo-300/40 transition-all duration-300 overflow-hidden"
                        >
                            {/* Animated glow ring */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-300 via-indigo-300 to-purple-300 opacity-0 group-hover:opacity-10 transition duration-500 blur-2xl pointer-events-none" />

                            {/* Icon container */}
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-3xl shadow-lg mb-6 relative">
                                {feature.icon}
                                <span className="absolute w-16 h-16 bg-pink-400 blur-xl opacity-20 rounded-full -z-10" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-indigo-800 mb-2 tracking-tight">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 text-sm leading-relaxed">{feature.desc}</p>

                            {/* Bottom hover line */}
                            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-500 group-hover:w-full" />
                        </motion.div>

                    ))}
                </motion.div>
            </section>

            <RecordingStepper />


            <section
                id="demo"
                className="relative py-28 px-6 text-gray-900 bg-gradient-to-br from-white via-slate-50 to-purple-50 overflow-hidden"
            >
                {/* Glow Blobs */}
                <div className="absolute w-[600px] h-[600px] bg-indigo-300 blur-[160px] opacity-20 rounded-full -top-40 -left-40 -z-10" />
                <div className="absolute w-[500px] h-[500px] bg-pink-200 blur-[140px] opacity-20 rounded-full bottom-[-120px] right-[-180px] -z-10" />

                {/* Title */}
                <motion.h2
                    className="text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent drop-shadow-xl mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80 }}
                >
                    Instant Demo, Real Results
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-14"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    See our bot enter a live meeting, capture high-quality video, and deliver everything in a zip — all in under 60 seconds.
                </motion.p>

                {/* Animated Video Frame */}
                <motion.div
                    whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
                    transition={{ type: "spring", stiffness: 60 }}
                    className="relative max-w-5xl mx-auto p-2 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden"
                >
                    {/* Glow Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-400 via-pink-400 to-purple-400 opacity-30 blur-2xl rounded-[2rem] animate-pulse" />

                    {/* Glassy Frame */}
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg">
                        <video
                            src={demoVideo}
                            controls
                            className="w-full h-auto rounded-2xl"
                            poster="/video-thumb.jpg"
                        />
                    </div>
                </motion.div>
            </section>


            <section className="relative bg-[#0f172a] overflow-hidden text-white py-24 px-6 text-center font-sans">
                {/* BACKGROUND GRID */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:22px_22px] opacity-10 z-0" />

                {/* ANIMATED BLOBS */}
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 rounded-full blur-3xl -top-40 -left-40"
                    animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, 25, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-400 to-purple-400 opacity-20 rounded-full blur-3xl top-36 -right-28"
                    animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, -30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* SECTION CONTENT */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Replace with CTA or Demo content */}
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-transparent bg-clip-text mb-6 drop-shadow-lg">
                        Ready to Simplify Your Meetings?
                    </h2>
                    <p className="text-slate-300 text-lg mb-8">
                        Our AI bot records, transcribes, and zips your meetings — then emails you everything. Seamless and secure.
                    </p>
                    <a
                        href="/signup"
                        className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-white rounded-xl text-lg font-semibold shadow-md hover:shadow-pink-400/40 transition"
                    >
                        Sign Up Free
                    </a>
                </div>
            </section>


        </>
    );
}
