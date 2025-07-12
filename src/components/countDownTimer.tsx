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
    <div className="flex items-center gap-4 font-orbitron text-2xl font-semibold tracking-wider text-white">
      <span>
        {time.days}
        <span className="text-slate-400 ml-1 font-inter">D</span>
      </span>
      <span>
        {String(time.hours).padStart(2, "0")}
        <span className="text-slate-400 ml-1 font-inter">H</span>
      </span>
      <span>
        {String(time.minutes).padStart(2, "0")}
        <span className="text-slate-400 ml-1 font-inter">M</span>
      </span>
      <span>
        {String(time.seconds).padStart(2, "0")}
        <span className="text-slate-400 ml-1 font-inter">S</span>
      </span>
    </div>
  );
}
