"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { motion } from "framer-motion";
import { IntroContext, type IntroContextValue } from "@/hooks/useIntro";

interface IntroProviderProps {
  children: React.ReactNode;
}

type IntroState = {
  isReady: boolean;
  isIntroActive: boolean;
  hasIntroBeenSeen: boolean;
  reduceMotion: boolean;
};

type IntroAction =
  | {
      type: "init";
      payload: { prefersReducedMotion: boolean; seenIntro: boolean };
    }
  | { type: "markSeen" }
  | { type: "replay"; payload: { reduceMotion: boolean } };

const initialState: IntroState = {
  isReady: false,
  isIntroActive: false,
  hasIntroBeenSeen: false,
  reduceMotion: false,
};

function introReducer(state: IntroState, action: IntroAction): IntroState {
  switch (action.type) {
    case "init":
      return {
        isReady: true,
        reduceMotion: action.payload.prefersReducedMotion,
        hasIntroBeenSeen: action.payload.seenIntro,
        isIntroActive:
          !action.payload.prefersReducedMotion && !action.payload.seenIntro,
      };
    case "markSeen":
      return {
        ...state,
        hasIntroBeenSeen: true,
        isIntroActive: false,
      };
    case "replay":
      return {
        ...state,
        hasIntroBeenSeen: false,
        isIntroActive: action.payload.reduceMotion ? false : true,
      };
    default:
      return state;
  }
}

export function IntroProvider({ children }: IntroProviderProps) {
  const [state, dispatch] = useReducer(introReducer, initialState);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;
    const seenIntro =
      window.localStorage.getItem("portfolio_intro_seen") === "true";

    dispatch({ type: "init", payload: { prefersReducedMotion, seenIntro } });

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        dispatch({ type: "replay", payload: { reduceMotion: true } });
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const markIntroSeen = useCallback(() => {
    window.localStorage.setItem("portfolio_intro_seen", "true");
    dispatch({ type: "markSeen" });
  }, []);

  const skipIntro = useCallback(() => {
    markIntroSeen();
  }, [markIntroSeen]);

  const replayIntro = useCallback(() => {
    window.localStorage.removeItem("portfolio_intro_seen");
    dispatch({ type: "replay", payload: { reduceMotion: state.reduceMotion } });
  }, [state.reduceMotion]);

  const value = useMemo<IntroContextValue>(
    () => ({
      isReady: state.isReady,
      isIntroActive: state.isIntroActive,
      hasIntroBeenSeen: state.hasIntroBeenSeen,
      reduceMotion: state.reduceMotion,
      skipIntro,
      replayIntro,
      markIntroSeen,
    }),
    [state, skipIntro, replayIntro, markIntroSeen],
  );

  return (
    <IntroContext.Provider value={value}>
      <motion.div
        initial={false}
        animate={
          state.isIntroActive ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ pointerEvents: state.isIntroActive ? "none" : "auto" }}
        className="relative"
      >
        {children}
      </motion.div>
    </IntroContext.Provider>
  );
}
