'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react';

interface Destination {
  id: string;
  title: string;
  category: 'spiritual' | 'jordan' | 'palestine' | 'middle-east' | 'international';
  subtitle: string;
  location: string;
  duration: string;
  tag: string;
  rating: number;
  image: string;
  description: string;
  highlights: string[];
}

const DESTINATIONS: Destination[] = [
  {
    id: 'umrah-vip',
    title: 'Sanctuary of Makkah & Madinah',
    category: 'spiritual',
    subtitle: 'Umrah Package',
    location: 'Makkah & Madinah, Saudi Arabia',
    duration: '10–14 Days',
    tag: 'Umrah Package',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format&fit=crop',
    description: 'Immerse yourself in divine serenity with our complete Umrah package featuring luxury 5-star Clock Tower suites facing the Haram, scholar-led Ziyarah tours, fast-track visa logistics, and 24/7 VIP concierges.',
    highlights: ['5-Star Luxury Clock Tower Stay', 'Scholar-Guided Ziyarah Tours', '24/7 VIP Personal Concierge', 'Seamless Haram Airport Transfers']
  },
  {
    id: 'palestine-jerusalem',
    title: 'Sacred Heritage of Palestine',
    category: 'palestine',
    subtitle: 'Palestine & Al-Aqsa Package',
    location: 'Jerusalem & Al-Aqsa, Palestine',
    duration: '8 Days',
    tag: 'Sacred Palestine',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?q=80&w=1200&auto=format&fit=crop',
    description: 'A deeply moving heritage package to Palestine including Al-Aqsa Mosque, the Dome of the Rock, historical Old City Jerusalem, and scholar-guided spiritual tours.',
    highlights: ['Al-Aqsa Mosque VIP Access', 'Old City Jerusalem Guided Walk', 'Scholar Heritage Briefings', 'Private Transport Logistics']
  },
  {
    id: 'honeymoon-package',
    title: 'Romantic Honeymoon Escapes',
    category: 'international',
    subtitle: 'Newlywed Honeymoon Package',
    location: 'Maldives & Swiss Alps',
    duration: '7–10 Days',
    tag: 'Honeymoon Package',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
    description: 'An unforgettably romantic luxury honeymoon package for newly married couples. Featuring private overwater villas, candlelight beach dinners, sunset yacht cruises, and bespoke couple wellness.',
    highlights: ['Private Overwater Villa Stay', 'Candlelight Beachfront Dining', 'Sunset Yacht Cruise', 'Couples Spa & Wellness Retreat']
  },
  {
    id: 'jordan-petra',
    title: 'Crown of the Rose City',
    category: 'jordan',
    subtitle: 'Jordan Wonders Package',
    location: 'Petra, Wadi Rum & Dead Sea, Jordan',
    duration: '7 Days',
    tag: 'Ancient Jordan',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1579606030856-4923e0727402?q=80&w=1200&auto=format&fit=crop',
    description: 'Walk through the dramatic Siq to ancient Petra by night, stargaze in luxury Wadi Rum bubble domes, and rejuvenate in Dead Sea mineral waters.',
    highlights: ['Petra Candlelight Night Experience', 'Luxury Stargazing Domes in Wadi Rum', 'Dead Sea Wellness Spa', 'Private 4x4 Desert Safari']
  },
  {
    id: 'dubai-luxury',
    title: 'Emirates Oasis & Skyline',
    category: 'middle-east',
    subtitle: 'Dubai & UAE Luxury Package',
    location: 'UAE',
    duration: '6 Days',
    tag: 'Modern Opulence',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    description: 'Experience futuristic luxury with private yacht charters around Palm Jumeirah, desert dune dining under the stars, and helicopter skyline tours.',
    highlights: ['Private Yacht Sunset Cruise', 'Sheikh Zayed Mosque Private Tour', 'Bedouin Luxury Desert Dinner', 'VIP Helicopter Skyline Tour']
  },
  {
    id: 'istanbul-bosphorus',
    title: 'The Ottoman Splendor',
    category: 'international',
    subtitle: 'Istanbul & Cappadocia Magic',
    location: 'Turkey',
    duration: '9 Days',
    tag: 'Cultural Heritage',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop',
    description: 'Sail the Bosphorus Strait, marvel at Hagia Sophia and Blue Mosque, and soar above Cappadocia in a sunrise hot air balloon flight.',
    highlights: ['Private Bosphorus Yacht Charter', 'Sunrise Hot Air Balloon Flight', 'Hagia Sophia VIP Access', 'Cave Resort Luxury Stay']
  }
];

interface DestinationsShowcaseProps {
  onSelectDestination: (dest: Destination) => void;
}

export const DestinationsShowcase: React.FC<DestinationsShowcaseProps> = ({ onSelectDestination }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredDestinations = activeTab === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All Packages' },
    { id: 'spiritual', label: 'Umrah & Spiritual' },
    { id: 'palestine', label: 'Sacred Palestine' },
    { id: 'international', label: 'Honeymoon & International' },
    { id: 'jordan', label: 'Jordan & Petra' },
    { id: 'middle-east', label: 'Middle East Luxury' },
  ];

  return (
    <section id="destinations" className="relative pt-12 pb-32 px-6 sm:px-12 bg-[#050505] text-white overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-mega text-[#D4AF37] font-semibold">
                CURATED EXPERIENCES
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white/95">
              EXTRA ORDINARY <br />
              <span className="gold-gradient-text font-normal">DESTINATIONS.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-light text-white/60 max-w-md leading-relaxed">
            Every InspireGO journey is crafted with meticulous attention to detail, combining deep spiritual reverence, rich history, and world-class luxury hospitality.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37] text-[#050505] font-semibold shadow-lg shadow-[#D4AF37]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Destinations Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={dest.id}
                className="group relative rounded-3xl overflow-hidden glass-panel border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium bg-[#0A0A0A]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      {dest.tag}
                    </span>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-amber-300 font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                      <span>{dest.rating}</span>
                    </div>
                  </div>

                  {/* Location & Duration overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-light">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{dest.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{dest.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-medium block mb-1">
                      {dest.subtitle}
                    </span>
                    <h3 className="text-xl font-light text-white/95 group-hover:text-amber-200 transition-colors mb-3">
                      {dest.title}
                    </h3>
                    <p className="text-xs font-light text-white/60 line-clamp-3 leading-relaxed mb-6">
                      {dest.description}
                    </p>
                  </div>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {dest.highlights.slice(0, 2).map((h, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/50"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="w-full py-3 rounded-2xl bg-white/5 hover:bg-[#D4AF37] text-white/90 hover:text-[#050505] text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-[#D4AF37]"
                  >
                    <span>Customize This Journey</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
