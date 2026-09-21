'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Global Destinations', detail: 'Middle East, Asia & Europe' },
    { value: '15,000+', label: 'Happy Pilgrims & Travelers', detail: 'Curated journeys completed' },
    { value: '99.8%', label: 'Satisfaction Rating', detail: 'Verified 5-star traveler reviews' },
    { value: '12+', label: 'Years of Excellence', detail: 'Unmatched luxury travel agency' },
  ];

  return (
    <section className="relative py-24 px-6 sm:px-12 bg-[#050505] text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-3xl glass-panel border-white/5 hover:border-[#D4AF37]/30 transition-colors"
            >
              <span className="text-4xl sm:text-6xl font-light tracking-tight gold-gradient-text mb-2 font-mono">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/90 font-medium mb-1">
                {stat.label}
              </span>
              <span className="text-[10px] text-white/40 font-light">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
