"use client";

import { createContext, useContext } from "react";

interface IntroContextValue {
  isReady: boolean;
  isIntroActive: boolean;
  hasIntroBeenSeen: boolean;
  reduceMotion: boolean;
  skipIntro: () => void;
  replayIntro: () => void;
  markIntroSeen: () => void;
}

const IntroContext = createContext<IntroContextValue | undefined>(undefined);

export function useIntro() {
  const context = useContext(IntroContext);
  if (!context) {
    throw new Error("useIntro must be used inside an IntroProvider");
  }
  return context;
}

export { IntroContext, type IntroContextValue };
