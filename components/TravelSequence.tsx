'use client';

import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;

interface TravelSequenceProps {
  onProgress?: (progress: number) => void;
  onLoaded?: () => void;
  onSequenceComplete?: () => void;
}

export const TravelSequence: React.FC<TravelSequenceProps> = ({
  onProgress,
  onLoaded,
  onSequenceComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Exact frame index tracking from 0 to 299
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Preload all 300 images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const formatFrameIndex = (num: number) => {
      return String(num).padStart(3, '0');
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameStr = formatFrameIndex(i);
      img.src = `/sequence/ezgif-frame-${frameStr}.png`;

      img.onload = () => {
        loadedCount++;
        const percent = (loadedCount / TOTAL_FRAMES) * 100;
        if (onProgress) onProgress(percent);

        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
          if (onLoaded) onLoaded();
        }
      };

      img.onerror = () => {
        loadedCount++;
        const percent = (loadedCount / TOTAL_FRAMES) * 100;
        if (onProgress) onProgress(percent);
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
          if (onLoaded) onLoaded();
        }
      };

      loadedImages[i - 1] = img;
    }
  }, [onProgress, onLoaded]);

  // Draw current frame onto canvas
  const renderFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameCount = imagesRef.current.length;
    if (frameCount === 0) return;

    const clampedIdx = Math.max(0, Math.min(frameCount - 1, frameIdx));
    const img = imagesRef.current[clampedIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Viewport dimensions & DPR
    const dpr = window.devicePixelRatio || 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (canvas.width !== windowWidth * dpr || canvas.height !== windowHeight * dpr) {
      canvas.width = windowWidth * dpr;
      canvas.height = windowHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    // Responsive aspect-ratio fitting
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const screenRatio = windowWidth / windowHeight;

    let renderWidth = windowWidth;
    let renderHeight = windowHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (screenRatio > imgRatio) {
      renderWidth = windowWidth;
      renderHeight = windowWidth / imgRatio;
      offsetY = (windowHeight - renderHeight) / 2;
    } else {
      renderHeight = windowHeight;
      renderWidth = windowHeight * imgRatio;
      offsetX = (windowWidth - renderWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();
  };

  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(currentFrameIndex);
    }
  }, [imagesLoaded, currentFrameIndex]);

  // Intercept wheel scroll until all 300 frames are fully shown
  useEffect(() => {
    if (!imagesLoaded) return;

    const handleWheel = (e: WheelEvent) => {
      // While sequence is not finished, lock window scroll & advance frame sequence
      if (!isCompleted) {
        if (e.deltaY > 0) {
          // Mouse wheel scrolling down: step forward through the 300 frames
          setCurrentFrameIndex((prev) => {
            const step = Math.max(1, Math.round(e.deltaY / 25));
            const next = prev + step;
            if (next >= TOTAL_FRAMES - 1) {
              setIsCompleted(true);
              if (onSequenceComplete) onSequenceComplete();
              return TOTAL_FRAMES - 1;
            }
            return next;
          });
          e.preventDefault();
        } else if (e.deltaY < 0 && window.scrollY === 0) {
          // Mouse wheel scrolling up at top: step backward
          setCurrentFrameIndex((prev) => {
            const step = Math.max(1, Math.round(Math.abs(e.deltaY) / 25));
            return Math.max(0, prev - step);
          });
          e.preventDefault();
        }
      } else {
        // If completed and user scrolls all the way back up to top, re-enable frame sequence
        if (window.scrollY === 0 && e.deltaY < 0) {
          setIsCompleted(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [imagesLoaded, isCompleted, onSequenceComplete]);

  // Touch drag support for mobile devices
  useEffect(() => {
    if (!imagesLoaded) return;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isCompleted) {
        const deltaY = startY - e.touches[0].clientY;
        if (deltaY > 0) {
          setCurrentFrameIndex((prev) => {
            const step = Math.max(1, Math.round(deltaY / 15));
            const next = prev + step;
            if (next >= TOTAL_FRAMES - 1) {
              setIsCompleted(true);
              if (onSequenceComplete) onSequenceComplete();
              return TOTAL_FRAMES - 1;
            }
            return next;
          });
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [imagesLoaded, isCompleted, onSequenceComplete]);

  // Calculate story beat opacities based on current frame progress (0.0 to 1.0)
  const progress = currentFrameIndex / (TOTAL_FRAMES - 1);

  const getBeatOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress >= peakStart && progress <= peakEnd) return 1;
    if (progress < peakStart) return (progress - start) / (peakStart - start);
    return (end - progress) / (end - peakEnd);
  };

  const beatAOpacity = getBeatOpacity(0.0, 0.03, 0.16, 0.22);
  const beatBOpacity = getBeatOpacity(0.25, 0.30, 0.42, 0.48);
  const beatCOpacity = getBeatOpacity(0.52, 0.57, 0.68, 0.74);
  const beatDOpacity = getBeatOpacity(0.78, 0.83, 0.90, 0.95);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden select-none"
    >
      {/* Viewport Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Ambient Dark Gradient Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/40" />

      {/* Story Beat A */}
      <div
        style={{ opacity: beatAOpacity, transform: `translateY(${(1 - beatAOpacity) * 20}px)` }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 pointer-events-none transition-all duration-300"
      >
        <span className="text-xs md:text-sm tracking-mega uppercase font-medium text-[#D4AF37] mb-4">
          YOUR JOURNEY STARTS HERE
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white/95 leading-none mb-6">
          GO BEYOND <br />
          <span className="gold-gradient-text font-normal">THE ORDINARY.</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl font-light text-white/70 max-w-2xl leading-relaxed">
          Discover journeys designed to take you further into culture, spirituality, and timeless luxury.
        </p>
      </div>

      {/* Story Beat B */}
      <div
        style={{ opacity: beatBOpacity, transform: `translateY(${(1 - beatBOpacity) * 20}px)` }}
        className="absolute inset-y-0 left-6 sm:left-12 md:left-24 z-20 flex items-center max-w-xl text-left pointer-events-none transition-all duration-300"
      >
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs md:text-sm tracking-widest uppercase font-medium text-[#D4AF37] mb-3 block">
            DISCOVER MORE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white/95 leading-tight mb-4">
            THE WORLD <br />
            <span className="text-white/80 font-normal">IS WAITING.</span>
          </h2>
          <p className="text-sm sm:text-base font-light text-white/65 leading-relaxed">
            From unforgettable escapes to meaningful journeys, experience the world far beyond the expected.
          </p>
        </div>
      </div>

      {/* Story Beat C */}
      <div
        style={{ opacity: beatCOpacity, transform: `translateY(${(1 - beatCOpacity) * 20}px)` }}
        className="absolute inset-y-0 right-6 sm:right-12 md:right-24 z-20 flex items-center max-w-xl text-right pointer-events-none transition-all duration-300"
      >
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs md:text-sm tracking-widest uppercase font-medium text-[#D4AF37] mb-3 block">
            MEANINGFUL JOURNEYS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white/95 leading-tight mb-4">
            TRAVEL <br />
            <span className="gold-gradient-text font-normal">WITH PURPOSE.</span>
          </h2>
          <p className="text-sm sm:text-base font-light text-white/65 leading-relaxed">
            Experience destinations rich in sacred culture, ancient history, spirituality, and unforgettable luxury moments.
          </p>
        </div>
      </div>

      {/* Story Beat D */}
      <div
        style={{ opacity: beatDOpacity, transform: `translateY(${(1 - beatDOpacity) * 20}px)` }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 pointer-events-none transition-all duration-300"
      >
        <span className="text-xs md:text-sm tracking-mega uppercase font-medium text-[#D4AF37] mb-4">
          YOUR NEXT DESTINATION
        </span>
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white/95 leading-tight mb-6">
          FIND YOUR <br />
          <span className="gold-gradient-text font-normal">WAY THERE.</span>
        </h2>
        <p className="text-base sm:text-xl font-light text-white/70 max-w-2xl leading-relaxed">
          From iconic Middle Eastern heritage sanctuaries to hand-crafted international escapes, your journey begins with InspireGO.
        </p>
      </div>

      {/* Bottom Scroll Indicator Pill */}
      {!isCompleted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border-white/10 text-xs text-white/60 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="uppercase tracking-widest text-[10px]">SCROLL TO EXPERIENCE FLIGHT ({Math.round(progress * 100)}%)</span>
        </div>
      )}
    </div>
  );
};
