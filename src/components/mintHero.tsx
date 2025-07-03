"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "@/components/countDownTimer";
import Image from "next/image";

export default function MintHero() {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

  const NFT_Images = ["/1.png", "/2.png", "/3b.png", "/4b.png", "/5.png"];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % NFT_Images.length);
    }, 1000); // Every second

    return () => clearInterval(interval);
  }, []);

  const handleIncrement = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center gap-10 items-center px-4 py-12 max-w-6xl mx-auto">
      {/*  Left Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center">
        {/* Animated NFT Display */}
        <div className="w-64 h-64 relative overflow-hidden rounded-xl">
          {NFT_Images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`NFT ${i}`}
              width={256}
              height={256}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === activeIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              priority={i === activeIndex}
            />
          ))}
        </div>

        {/* Remaining */}
        <div className="mt-4 font-orbitron text-sm text-gray-300 text-center">
          <span className="text-white font-semibold">Remaining:</span> 670 / 900
        </div>

        {/* Price */}
        <div className="mt-2 font-orbitron text-sm text-gray-300 text-center">
          <span className="text-white font-semibold">Price:</span> 0.05 BNB
        </div>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="bg-[#0098EA] px-3 py-1 rounded text-white hover:bg-[#0070b8] transition"
          >
            –
          </button>
          <span className="font-orbitron text-white text-lg">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-[#0098EA] px-3 py-1 rounded text-white hover:bg-[#0070b8] transition"
          >
            +
          </button>
        </div>
      </div>

      {/*  Right Section */}
      <div className="md:w-1/2 flex flex-col items-center text-center">
        <h2 className="text-3xl font-orbitron text-white">Public Mint Live</h2>
        <p className="text-sm text-gray-300 mt-2">Public mint ends in</p>

        <div className="text-2xl font-orbitron text-[#00C2FF] mt-1">
          <CountdownTimer targetDate="2025-07-31T04:00:00Z" />
        </div>

        <div className="mt-4 text-gray-400 text-sm space-y-1">
          <p>
            Max NFTs per wallet:{" "}
            <span className="text-white font-semibold">{maxQuantity}</span>
          </p>
          <p>
            Price: <span className="text-white font-semibold">0.05 BNB</span>
          </p>
          <p>Mint is live until July 31st 04:00h</p>
        </div>

        <div className="mt-6 flex gap-4">
          <a
            href="https://t.me/ocicatclub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons8-telegram-app-24.svg"
              alt="Telegram"
              width={24}
              height={24}
              className="hover:scale-110 transition"
            />
          </a>
          <a
            href="https://twitter.com/ocicatnft"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/Twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
              className="hover:scale-110 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
