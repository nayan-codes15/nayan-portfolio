"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Play, Pause, Square, RotateCcw, X } from "lucide-react";

const SCRIPT_SENTENCES = [
  "Welcome to Nayan Deep's engineering portfolio.",
  "Nayan is a second year B.Tech Computer Science student at Desh Bhagat University, with a strong foundation from his Diploma in Computer Science at NIMS University Jaipur.",
  "He is passionate about Software Development, Artificial Intelligence, Cloud Computing, and Data Analytics — and is actively seeking internship opportunities in these fields.",
  "Feel free to explore his projects, technical skills, certifications, GitHub activity, and his learning journey.",
  "You can also chat with the AI assistant for specific questions about his profile.",
  "Thank you for visiting.",
];

export default function AudioTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize voices (some browsers load them asynchronously)
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakSentence = (index: number) => {
    if (index >= SCRIPT_SENTENCES.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentIndex(0);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(SCRIPT_SENTENCES[index]);

    // Pick a natural sounding English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter((v) => v.lang.startsWith("en"));
    const preferredVoice =
      englishVoices.find(
        (v) => v.name.includes("Google") || v.name.includes("Natural"),
      ) ||
      englishVoices[0] ||
      voices[0];

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95; // Slightly slower for better pacing
    utterance.pitch = 1;

    utterance.onend = () => {
      // Small pause between sentences
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (isPlaying) {
            // Only continue if we haven't hit stop
            speakSentence(next);
          }
          return next;
        });
      }, 300);
    };

    utterance.onerror = (e) => {
      if (e.error === "canceled" || e.error === "interrupted") {
        // Expected when user pauses, stops, or replays
        return;
      }
      console.error("Speech synthesis error:", e.error || e);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);
      speakSentence(currentIndex);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(0);
  };

  const handleReplay = () => {
    window.speechSynthesis.cancel();
    setCurrentIndex(0);
    setIsPlaying(true);
    setIsPaused(false);
    setTimeout(() => speakSentence(0), 100);
  };

  const handleClose = () => {
    handleStop();
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button (Will be absolutely positioned within Hero relative container if placed there) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md border rounded-full text-sm font-semibold hover:opacity-80 transition-colors shadow-lg"
        style={{
          backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        <Headphones className="w-4 h-4 text-[var(--accent-1)]" />
        Audio Tour
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border"
              style={{
                backgroundColor: "rgba(var(--bg-primary-rgb), 0.9)",
                borderColor: "var(--border)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between p-4 border-b"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[var(--accent-1)]" />
                  <h3
                    className="font-bold tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Audio Tour
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-secondary)",
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Visualization */}
              <div
                className="h-32 flex items-center justify-center gap-1.5 px-8 relative overflow-hidden"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? {
                            height: ["10%", `${40 + (i % 7) * 8}%`, "10%"],
                          }
                        : { height: "10%" }
                    }
                    transition={{
                      duration: 0.5 + (i % 5) * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                    className="w-1.5 bg-[var(--accent-1)] rounded-full"
                    style={{
                      minHeight: "4px",
                      opacity: isPlaying ? 0.8 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Caption Box */}
              <div className="p-6 min-h-[120px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm md:text-base leading-relaxed font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {currentIndex < SCRIPT_SENTENCES.length
                      ? SCRIPT_SENTENCES[currentIndex]
                      : "Tour completed."}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div
                className="p-4 flex items-center justify-center gap-4 border-t"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(var(--bg-primary-rgb), 0.05)",
                }}
              >
                <button
                  onClick={handleStop}
                  disabled={!isPlaying && !isPaused && currentIndex === 0}
                  className="p-3 rounded-full disabled:opacity-30 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  title="Stop"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-14 h-14 rounded-full bg-[var(--accent-1)] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                  style={{ boxShadow: "0 0 20px var(--accent-1)" }}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                <button
                  onClick={handleReplay}
                  disabled={currentIndex === 0 && !isPlaying && !isPaused}
                  className="p-3 rounded-full disabled:opacity-30 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  title="Replay"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
