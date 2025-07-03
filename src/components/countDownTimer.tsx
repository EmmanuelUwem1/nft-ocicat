"use client";

import { useEffect, useState } from "react";

function getRemainingTime(target: string) {
  const now = new Date().getTime();
  const deadline = new Date(target).getTime();
  const diff = deadline - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: Math.max(days, 0),
    hours: Math.max(hours, 0),
    minutes: Math.max(minutes, 0),
    seconds: Math.max(seconds, 0),
  };
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getRemainingTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getRemainingTime(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <span className="font-orbitron text-xl text-[#00C2FF] tracking-wide">
      {`${time.days}D:${String(time.hours).padStart(2, "0")}h:${String(
        time.minutes
      ).padStart(2, "0")}M:${String(time.seconds).padStart(2, "0")}s`}
    </span>
  );
}
