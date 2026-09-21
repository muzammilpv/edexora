'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft, Compass, Calendar, Users, Send } from 'lucide-react';

interface Destination {
  id: string;
  title: string;
  subtitle: string;
}

interface InteractivePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination?: Destination | null;
}

export const InteractivePlannerModal: React.FC<InteractivePlannerModalProps> = ({
  isOpen,
  onClose,
  selectedDestination,
}) => {
  const [step, setStep] = useState(1);
  const [journeyType, setJourneyType] = useState(selectedDestination ? selectedDestination.title : 'VIP Umrah Pilgrimage');
  const [travelStyle, setTravelStyle] = useState('5-Star Ultra Luxury');
  const [duration, setDuration] = useState('10 Days');
  const [guests, setGuests] = useState('2 Guests');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 overflow-hidden text-white"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-panel text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  BESPOKE CONCIERGE PLANNER
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white/95 mb-6">
                DESIGN YOUR <span className="gold-gradient-text font-normal">JOURNEY.</span>
              </h3>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-colors ${
                        step === s
                          ? 'bg-[#D4AF37] text-[#050505]'
                          : step > s
                          ? 'bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/30'
                          : 'bg-white/5 text-white/30'
                      }`}
                    >
                      {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 hidden sm:inline">
                      {s === 1 ? 'Preferences' : s === 2 ? 'Details' : 'Contact'}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Preferences */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/60 block mb-3">
                        Destination or Journey Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          'VIP Umrah Pilgrimage',
                          'Jordan & Petra Discovery',
                          'Sacred Palestine Heritage',
                          'Middle East Luxury Escape',
                          'Swiss Alps & Europe',
                          'Bespoke Family Journey',
                        ].map((item) => (
                          <button
                            type="button"
                            key={item}
                            onClick={() => setJourneyType(item)}
                            className={`p-3.5 rounded-2xl text-left text-xs font-medium transition-all ${
                              journeyType === item
                                ? 'bg-[#D4AF37] text-[#050505] font-semibold shadow-lg shadow-[#D4AF37]/20'
                                : 'glass-panel text-white/70 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/60 block mb-3">
                        Desired Travel Style
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          '5-Star Ultra Luxury',
                          'Private VIP Charter',
                          'Family Cultural Escort',
                          'Scholar-Guided Expedition',
                        ].map((style) => (
                          <button
                            type="button"
                            key={style}
                            onClick={() => setTravelStyle(style)}
                            className={`p-3 rounded-xl text-left text-xs transition-all ${
                              travelStyle === style
                                ? 'border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-semibold'
                                : 'glass-panel text-white/60 hover:text-white'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Duration & Guests */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/60 block mb-3">
                        Trip Duration
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['7 Days', '10 Days', '14 Days', '21 Days', 'Flexible'].map((d) => (
                          <button
                            type="button"
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`p-3 rounded-xl text-center text-xs font-medium transition-all ${
                              duration === d
                                ? 'bg-[#D4AF37] text-[#050505] font-semibold'
                                : 'glass-panel text-white/70'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/60 block mb-3">
                        Group Size / Guests
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {['Solo', '2 Guests', '3–5 Guests', 'Family 6+'].map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setGuests(g)}
                            className={`p-3 rounded-xl text-center text-xs font-medium transition-all ${
                              guests === g
                                ? 'bg-[#D4AF37] text-[#050505] font-semibold'
                                : 'glass-panel text-white/70'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact & Submit */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/60 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tariq Al-Mansoor"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tariq@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-white/60 block mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 123 4567"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/60 block mb-1">
                        Special Requests or Preferences
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Share any preferred travel dates, suite preferences, or Ziyarah requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 rounded-full text-xs uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#050505] text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-[#050505] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/30"
                    >
                      Submit Itinerary Request <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation Screen */
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="text-3xl font-light text-white/95 mb-3">
                REQUEST RECEIVED
              </h3>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-4">
                VIP CONCIERGE ASSIGNED
              </p>
              <p className="text-sm text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <span className="text-white font-medium">{name || 'Valued Traveler'}</span>. A senior InspireGO travel concierge is reviewing your bespoke trip parameters for <span className="text-[#D4AF37]">{journeyType}</span> and will contact you via WhatsApp/Email within 2 hours.
              </p>

              <button
                onClick={resetForm}
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Close Window
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
