"use client";
import Image from "next/image";
import Link from "next/link";
import CustomConnectButton from "@/context/CustomConnectButton";
export default function Header() {
  return (
    <header className="flex w-full items-center justify-between sm:px-8 md:px-16 lg:px-20 p-4 bg-transparent fixed gap-4 h-20 text-white z-50">
      <Link href="https://www.ocicat.club/" className="flex items-center gap-1">
        <div className="flex items-center justify-center h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 relative">
          <Image
            alt="logo"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            src="/cat_bg.jpg"
          />
        </div>
        <div className="text-lg font-semibold text-white">Ocicat</div>
      </Link>
<CustomConnectButton />
    </header>
  );
}