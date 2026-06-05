"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntro } from "@/hooks/useIntro";

export default function IntroVideo() {
  const { isIntroActive, skipIntro, markIntroSeen } = useIntro();
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isIntroActive) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isIntroActive, skipIntro]);

  useEffect(() => {
    if (!isExiting) return;

    const timeout = window.setTimeout(() => {
      markIntroSeen();
      setIsExiting(false);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [isExiting, markIntroSeen]);

  const handleEnded = () => {
    setIsExiting(true);
  };

  const handleSkip = () => {
    videoRef.current?.pause();
    skipIntro();
  };

  const showOverlay = isIntroActive || isExiting;

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.section
          key="intro-video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          aria-label="Portfolio intro video"
          role="dialog"
        >
          <motion.video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={handleEnded}
            onCanPlay={() => {
              videoRef.current?.play().catch(() => null);
            }}
            initial={false}
            animate={
              isExiting
                ? { opacity: 0, scale: 1.03, filter: "blur(10px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="relative z-10 flex w-full items-center justify-center px-6 py-10 text-center">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/10 px-6 py-8 backdrop-blur-2xl">
              <h1 className="text-4xl font-semibold uppercase tracking-[0.32em] text-white sm:text-5xl">
                NAYAN DEEP
              </h1>
              <p className="mt-4 text-base font-medium uppercase tracking-[0.28em] text-white/80 sm:text-lg">
                B.Tech Computer Science Student
              </p>
              <div className="mt-6 space-y-2 text-base leading-7 text-white/90 sm:text-lg">
                <p>Building practical solutions through</p>
                <p className="font-semibold">Software Development,</p>
                <p className="font-semibold">Artificial Intelligence,</p>
                <p className="font-semibold">Cloud Computing,</p>
                <p className="font-semibold">and Data Analytics.</p>
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.28em] text-white/70">
                Open to Internship Opportunities
              </p>
            </div>
          </div>

          <button
            onClick={handleSkip}
            className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50"
            type="button"
          >
            Skip Intro →
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
