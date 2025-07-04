"use client";
import Image from "next/image";
import SocialButton from "@/components/buttons/socialsButton";
import { useState, useEffect } from "react";
import CountdownTimer from "@/components/countDownTimer";
import MintButton from "./buttons/MintButton";

export default function MintHero() {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

  const NFT_Images = ["/1.png", "/2.png", "/3b.png", "/4b.png", "/5.png"];

  const [activeIndex, setActiveIndex] = useState(0);

    const socials = [
        { href: "https://t.me/ocicatcoin", image: "/icons8-telegram-app-24.svg", text: "Join Telegram" },
        { href: "https://twitter.com/ocicatcoin", image: "/Twitter.svg", text: "Join Twitter" },
  ]

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
    <div className="flex flex-wrap md:flex-nowrap justify-center gap-10 items-center max-sm:w-full max-md:w-[80%] md:w-full py-12 max-w-4xl mx-auto">
      {/*  Left Section */}
      <div className="md:w-1/2 w-full font-inter flex flex-col items-center">
        {/* Animated NFT Display */}
        <div className="min-w-40 w-80 min-h-40 h-80 relative overflow-hidden rounded-xl flex items-center justify-center">
          {NFT_Images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`NFT ${i}`}
              layout="fill"
              quality={100}
              objectFit="contain"
              objectPosition="center"
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
        <div className="flex w-full border-b border-b-gray-700 py-5 justify-between items-center text-white font-semibold text-lg text-center">
          <span className="">Remaining:</span> 670 / 900
        </div>

        {/* Price */}
        <div className=" flex w-full justify-between items-center border-b border-b-gray-700 py-5 text-white font-semibold text-center">
          <span className="">Price:</span> 0.05 BNB
        </div>

        {/* Quantity */}
        <div className=" flex w-full justify-between items-center gap-2 border-b border-b-gray-700 h-16 font-semibold text-lg">
          <span className="">Quantity:</span>
          <div className="flex items-center h-full w-fit justify-center">
            <button
              onClick={handleDecrement}
              className="px-4 py-1 rounded text-white transition-class cursor-pointer"
            >
              –
            </button>
            <span className=" text-white text-lg px-4 flex items-center justify-center w-fit h-full border-x border-x-gray-700">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-4 py-1 rounded text-white transition-class cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Mint button */}
        <MintButton />
      </div>

      {/*  Right Section */}
      <div className="md:w-1/2 flex flex-col items-start uppercase text-left gap-3 justify-start font-bold">
        <h2 className="md:text-4xl font-bold text-3xl font-orbitron text-white">
          Public Mint Live
        </h2>
        <p className="text-xl mt-2 font-bold">Public mint end in</p>

        <div className="text-2xl font-orbitron mt-1">
          <CountdownTimer targetDate="2025-07-31T04:00:00Z" />
        </div>

        <div className="mt-10 flex flex-col items-start justify-start gap-3 text-lg font-bold">
          <p>
            Max NFTs per wallet:{" "}
            <span className="text-white">{maxQuantity}</span>
          </p>
          <p>
            Price: <span className="text-white">0.05 BNB</span>
          </p>
          <p>Mint is live until July 31st 04:00h</p>
        </div>

        <div className="mt-6 flex w-full justify-start font-bold items-center gap-4 flex-wrap sm:flex-nowrap">
          {socials.map((social, index) => (
            <SocialButton
              key={index}
              href={social.href}
              image={social.image}
              text={social.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
