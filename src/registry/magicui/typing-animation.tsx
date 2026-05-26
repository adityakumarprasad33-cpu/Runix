"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const gradientConfig = [
  { gradient: "linear-gradient(135deg, #4f46e5, #818cf8)", fallback: "#4f46e5" },
  { gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)", fallback: "#06b6d4" },
  { gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)", fallback: "#3b82f6" },
  { gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)", fallback: "#8b5cf6" },
  { gradient: "linear-gradient(135deg, #4f46e5, #06b6d4)", fallback: "#4f46e5" },
];

interface TypingAnimationProps {
  words: string[];
  loop?: boolean;
  className?: string;
}

export function TypingAnimation({ words, loop = false, className = "" }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);

  const currentWord = words[wordIndex] || "";
  const blinkInterval = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    blinkInterval.current = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blinkInterval.current);
  }, []);

  const tick = useCallback(() => {
    if (!currentWord) return;
    if (!isDeleting) {
      setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      if (displayedText.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2200);
        return;
      }
    } else {
      setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      if (displayedText.length === 0) {
        setIsDeleting(false);
        const next = wordIndex + 1;
        setColorIndex((prev) => (prev + 1) % gradientConfig.length);
        if (next >= words.length) {
          if (loop) { setWordIndex(0); } else { setDisplayedText(words[words.length - 1] || ""); return; }
        } else { setWordIndex(next); }
        return;
      }
    }
  }, [currentWord, displayedText, isDeleting, wordIndex, words, loop]);

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? 35 : 65);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting]);

  return (
    <span className={className} style={{ position: "relative" }}>
      <span
        style={{
          color: gradientConfig[colorIndex].fallback,
          backgroundImage: gradientConfig[colorIndex].gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayedText}
      </span>
      <span
        className="inline-block w-[2px] h-[1em] ml-0.5 align-text-bottom rounded-sm"
        style={{
          backgroundColor: "#4f46e5",
          opacity: showCursor ? 1 : 0,
          transition: "opacity 0.1s ease",
        }}
      />
    </span>
  );
}
