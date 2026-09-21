'use client';

import React from 'react';
import { ShieldCheck, Compass, Award, HeartHandshake, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      number: '01',
      title: 'Bespoke Curation',
      description: 'Every itinerary is individually designed around your spiritual goals, family needs, and desired pace of journey.',
    },
    {
      icon: HeartHandshake,
      number: '02',
      title: '24/7 VIP Concierge',
      description: 'Dedicated ground concierges, scholar escorts, and private chauffeurs ensure absolute ease from takeoff to return.',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Cultural Reverence',
      description: 'We connect you directly to authentic history, sacred heritage, and scholar-guided Ziyarah tours with utmost respect.',
    },
    {
      icon: Award,
      number: '04',
      title: 'Uncompromised Excellence',
      description: 'Partnering exclusively with 5-star sanctuary hotels, private charters, and high-touch luxury hospitality teams.',
    },
  ];

  return (
    <section id="philosophy" className="relative py-32 px-6 sm:px-12 bg-[#0A0A0A] text-white overflow-hidden border-t border-b border-white/5">
      {/* Background Accent Subtle Radial */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs uppercase tracking-widest font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE INSPIREGO DIFFERENCE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white/95 leading-tight mb-6">
            REDEFINING THE ART OF <br />
            <span className="gold-gradient-text font-normal">SACRED & LUXURY TRAVEL.</span>
          </h2>

          <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed">
            We believe travel is not merely moving from one location to another. It is an elevating pilgrimage of the soul, a discovery of timeless heritage, and a celebration of human connection.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050505] transition-colors duration-500">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-2xl font-mono font-light text-white/20 group-hover:text-[#D4AF37]/50 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-white/90 mb-3 group-hover:text-amber-200 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-light text-white/55 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium">
                  <span>Guaranteed Excellence</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
