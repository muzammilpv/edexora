'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  totalFrames: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isLoaded, totalFrames }) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050505] p-8 md:p-16 select-none"
        >
          {/* Top Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs uppercase tracking-mega font-medium text-white/50">
              InspireGO &bull; Luxury Travel Experience
            </span>
          </motion.div>

          {/* Center Content */}
          <div className="flex flex-col items-center text-center max-w-xl w-full">
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl md:text-5xl font-light tracking-tight text-white/90 mb-4"
            >
              PREPARING YOUR JOURNEY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xs md:text-sm font-light text-white/40 uppercase tracking-widest mb-10"
            >
              LOADING CINEMATIC VISUAL SEQUENCE ({Math.round((progress / 100) * totalFrames)} / {totalFrames} FRAMES)
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-md bg-white/5 h-[2px] rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            {/* Percentage */}
            <div className="flex items-center justify-between w-full max-w-md text-xs font-mono text-white/40">
              <span>0%</span>
              <span className="text-[#D4AF37] font-semibold">{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Bottom Caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[10px] uppercase tracking-widest text-white/40"
          >
            Scroll-Driven Scrollytelling &bull; Continuous Flight
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
