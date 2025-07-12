"use client";
import Image from "next/image";
import SocialButton from "@/components/buttons/socialsButton";
import { useState, useEffect } from "react";
import CountdownTimer from "@/components/countDownTimer";
import { useMaxSupply } from "@/web3/hooks/useMaxSupply";
import { useTotalSupply } from "@/web3/hooks/useTotalSupply";
import { useMintPrice } from "@/web3/hooks/useMintPrice";
import { fromWei } from "@/lib/utils";
import { useIsWhitelisted } from "@/web3/hooks/useIsWhitelisted";
import { useHasClaimed } from "@/web3/hooks/useHasClaimed";
import { useBuyNFT } from "@/web3/hooks/useBuyNFT";
import { useClaimNFT } from "@/web3/hooks/useClaimNFT";
import { useNFTBalance } from "@/web3/hooks/useNFTBalance";
import { useAccount } from "wagmi";
import { toWei } from "@/lib/utils";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";


export default function MintHero() {
    const { address} = useAccount();
  
  const { maxSupply, mSILoading } = useMaxSupply();
  const { isWhitelisted,eligibleAmount,amTLoading } = useIsWhitelisted();
  const { hasClaimed } = useHasClaimed();
  const { totalSupply, tSILoading } = useTotalSupply();
  const { mintPrice, mPILoading } = useMintPrice();
  const { balance, bILoading } = useNFTBalance();
  const { buy, isPending } = useBuyNFT();
  const { claim, cIPending } = useClaimNFT();
  const [mintPriceDisplayed, setMintPriceDisplayed] = useState("");
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 50;

  function handleMint(totalMintPrice: string) {
    if (!address) {
      toast.error("Please connect your wallet to mint", {
        icon: "🔌",
        duration: 4000,
      });
      return;
    }

    const payingAmount: bigint = BigInt(totalMintPrice);
    buy(payingAmount);
  }

  

  useEffect(() => {
    if (mintPrice) {
      const convertedMintPrice = fromWei(mintPrice, 18);
      setMintPriceDisplayed(String(Number(convertedMintPrice)*(Number(quantity))) );
    }
  },[mintPrice,quantity])

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
          <span className="">Remaining:</span>{" "}
          <span className="flex flex-nowrap justify-center items-center gap-2">
            <SkeletonTheme baseColor="#1A263F" highlightColor="#2F3B5C">
              <span className="text-white font-semibold">
                {tSILoading ? <Skeleton width={60} height={20} /> : totalSupply}
              </span>
            </SkeletonTheme>{" "}
            /
            <SkeletonTheme baseColor="#1A263F" highlightColor="#2F3B5C">
              <span className="text-white font-semibold">
                {mSILoading ? <Skeleton width={60} height={20} /> : maxSupply}
              </span>
            </SkeletonTheme>
          </span>
        </div>


        {/* user MFT balance */}


        <div className="flex w-full border-b border-b-gray-700 py-5 justify-between items-center text-white font-semibold text-lg text-center">
          <span className="">Your holding:</span>{" "}
          <span className="flex flex-nowrap justify-center items-center gap-2">
            <SkeletonTheme baseColor="#1A263F" highlightColor="#2F3B5C">
              <span className="text-white font-semibold">
                {bILoading ? <Skeleton width={60} height={20} /> : balance}
              </span>
            </SkeletonTheme>{" "}
            Ocicat NFT
          </span>
        </div>

        {(!isWhitelisted || hasClaimed) && (
          <>
            {/* price */}
            <div className=" flex flex-nowrap w-full justify-between items-center border-b border-b-gray-700 py-5 text-white font-semibold text-center">
              <span className="">Price:</span>{" "}
              <SkeletonTheme baseColor="#1A263F" highlightColor="#2F3B5C">
                <span className="text-white font-semibold">
                  {mPILoading ? (
                    <Skeleton width={60} height={20} />
                  ) : (
                    `${mintPriceDisplayed} BNB`
                  )}
                </span>
              </SkeletonTheme>
            </div>
            {/* quantity */}
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
          </>
        )}
        {/* eligible amount */}
        {isWhitelisted && !hasClaimed && (
          <div className=" flex flex-nowrap w-full justify-between items-center border-b border-b-gray-700 py-5 text-white font-semibold text-center">
            <span className="">Amount:</span>{" "}
            <SkeletonTheme baseColor="#1A263F" highlightColor="#2F3B5C">
              <span className="text-white font-semibold">
                {amTLoading ? (
                  <Skeleton width={60} height={20} />
                ) : (
                  `${eligibleAmount} `
                )}
              </span>
            </SkeletonTheme>
          </div>
        )}

        {/* Action buttons */}

        {isWhitelisted && !hasClaimed && (
          <div className="w-full mt-5">
            <button
              onClick={claim}
              disabled={isPending}
              className={`group relative w-full bg-[#FF2727] text-white font-semibold font-orbitron py-3 rounded flex justify-center items-center overflow-hidden transition-all ${
                isPending ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              }`}
            >
              {/* Animated Layer */}
              <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-[#b0b6c02d] before:transition-all before:duration-300 group-hover:before:left-0 before:z-[1] rounded" />

              {/* Button Label or Loader */}
              <span className="z-[2] flex items-center justify-center">
                {cIPending ? (
                  <span className="inline-block h-5 w-5 border-2 border-t-white border-white/20 rounded-full animate-spin" />
                ) : (
                  "CLAIM"
                )}
              </span>
            </button>
          </div>
        )}
        {(hasClaimed || !isWhitelisted) && (
          <div
            className="w-full mt-5"
            onClick={() => handleMint(toWei(mintPriceDisplayed))}
          >
            <button
              disabled={isPending}
              className={`group relative w-full bg-[#FF2727] text-white font-semibold font-orbitron py-3 rounded flex justify-center items-center overflow-hidden transition-all ${
                isPending ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              }`}
            >
              {/* Animated Layer */}
              <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-[#b0b6c02d] before:transition-all before:duration-300 group-hover:before:left-0 before:z-[1] rounded" />

              {/* Button Label or Loader */}
              <span className="z-[2] flex items-center justify-center">
                {isPending ? (
                  <span className="inline-block h-5 w-5 border-2 border-t-white border-white/20 rounded-full animate-spin" />
                ) : (
                  "MINT"
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      {/*  Right Section */}
      <div className="md:w-1/2 flex flex-col items-start uppercase text-left gap-3 justify-start font-bold">
        <h2 className="md:text-4xl font-bold text-3xl font-orbitron text-white">
          Public Mint Live
        </h2>
        <p className="text-xl mt-2 font-bold">Public mint end in</p>

        <div className="text-2xl font-orbitron mt-1">
          <CountdownTimer targetDate="2025-10-11T04:00:00Z" />
        </div>

        <div className="mt-10 flex flex-col items-start justify-start gap-3 text-lg font-bold">
          <p>
            Max NFTs per wallet:{" "}
            <span className="text-white">{maxQuantity}</span>
          </p>
          <p className="flex justify-between items-center gap-4">
            Price:{" "}
            <SkeletonTheme baseColor="#1A263F" highlightColor="#2F3B5C">
              <span className="text-white font-semibold">
                {mintPrice ? (
                  `${fromWei(mintPrice, 18)} BNB`
                ) : (
                  <Skeleton width={60} height={20} />
                )}
              </span>
            </SkeletonTheme>
          </p>
          <p>Mint is live until October 11th 04:00h</p>
        </div>

        <div className="mt-6 flex w-full justify-start font-bold items-center gap-4 flex-wrap">
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
