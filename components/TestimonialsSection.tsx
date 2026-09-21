'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "InspireGO transformed our family Umrah experience completely. Having a private concierge in Makkah with clock tower suites right in front of the Haram made our pilgrimage utterly serene and effortless.",
      author: "Dr. Hamdan Al-Maktoum",
      role: "VIP Umrah Pilgrim",
      location: "Dubai, UAE",
      rating: 5,
    },
    {
      quote: "Our expedition to Petra and Wadi Rum with InspireGO felt straight out of a luxury film. The private candlelight Petra access and stargazing domes were unforgettable.",
      author: "Eleanor Vance",
      role: "Heritage Explorer",
      location: "London, UK",
      rating: 5,
    },
    {
      quote: "Visiting Jerusalem and Al-Aqsa with a knowledgeable scholar escort was deeply moving. InspireGO handled all border logistics and private transport with absolute professionalism.",
      author: "Sheikh Omar Farooq",
      role: "Sacred Heritage Traveler",
      location: "Toronto, Canada",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative py-32 px-6 sm:px-12 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-mega text-[#D4AF37] font-semibold block mb-3">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white/95 leading-tight">
            STORIES FROM OUR <br />
            <span className="gold-gradient-text font-normal">VALUED TRAVELERS.</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group hover:border-[#D4AF37]/40 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D4AF37]/40 mb-6 group-hover:text-[#D4AF37] transition-colors" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] stroke-none" />
                  ))}
                </div>
                <p className="text-sm font-light text-white/80 leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white/95">{t.author}</h4>
                  <span className="text-xs text-[#D4AF37] font-light">{t.role} &bull; {t.location}</span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
