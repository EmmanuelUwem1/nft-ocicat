import type { Metadata } from "next";
import { headers } from "next/headers";
import ContextProvider from "@/context/AppKitProvider";
import "./globals.css";
import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Ocicat NFT Club",
  description: "Mint exclusive Ocicat NFTs on the blockchain.",
};




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable}`}>
        <ContextProvider cookies={cookies}>
          <main className="overflow-x-hidden min-h-screen font-inter">
          {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
