import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Glowing Pulse Ring */}
          <motion.div
            className="relative w-28 h-28 border-8 border-purple-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            style={{
              boxShadow: "0 0 20px #9333ea, 0 0 40px #7e22ce",
            }}
          >
            {/* Pulsating Glow in Center */}
            <motion.div
              className="absolute inset-2 rounded-full bg-purple-600 opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
