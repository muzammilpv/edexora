'use client';

import React, { useState, useCallback } from 'react';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { TravelSequence } from '@/components/TravelSequence';
import { DestinationsShowcase } from '@/components/DestinationsShowcase';
import { PhilosophySection } from '@/components/PhilosophySection';
import { StatsSection } from '@/components/StatsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';
import { InteractivePlannerModal } from '@/components/InteractivePlannerModal';

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);

  const handleSequenceProgress = useCallback((progress: number) => {
    setLoadProgress(progress);
  }, []);

  const handleSequenceLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleSequenceComplete = useCallback(() => {
    // Optionally smooth scroll down to destinations section when complete
    const destSection = document.getElementById('destinations');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenPlanner = (dest?: any) => {
    if (dest) setSelectedDestination(dest);
    else setSelectedDestination(null);
    setPlannerOpen(true);
  };

  return (
    <main className="relative bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Preloader state */}
      <Preloader progress={loadProgress} isLoaded={isLoaded} totalFrames={300} />

      {/* Floating Header */}
      <Navbar onOpenPlanner={() => handleOpenPlanner()} />

      {/* Hero Flight Sequence */}
      <TravelSequence
        onProgress={handleSequenceProgress}
        onLoaded={handleSequenceLoaded}
        onSequenceComplete={handleSequenceComplete}
      />

      {/* Brand Sections below Hero — revealed & scrollable when 300-frame sequence finishes */}
      <div className="relative z-30 bg-[#050505]">
        <DestinationsShowcase onSelectDestination={handleOpenPlanner} />
        <PhilosophySection />
        <StatsSection />
        <TestimonialsSection />
        <Footer />
      </div>

      {/* Interactive Trip Concierge Planner Modal */}
      <InteractivePlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        selectedDestination={selectedDestination}
      />
    </main>
  );
}
