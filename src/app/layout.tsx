import type { Metadata } from "next";
import { headers } from "next/headers";
import ContextProvider from "@/context/AppKitProvider";
import "./globals.css";
import { Orbitron, Inter } from "next/font/google";
import Header from "@/components/header";
import MeshGradient from "@/components/meshGradient";
import { Toaster } from "react-hot-toast";

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


export const metadata: Metadata = {
  metadataBase: new URL("https://ocicat-nft-club.vercel.app/"),
  title: "Ocicat NFT Club",
  description: "Mint exclusive Ocicat NFTs on the blockchain.",
  icons: {
    icon: "/public/favicon.ico",
  },
  openGraph: {
    title: "Ocicat NFT Club",
    description: "Mint exclusive Ocicat NFTs on the blockchain.",
    url: "https://ocicat-nft-club.vercel.app/",
    siteName: "Ocicat NFT Club",
    images: [
      {
        url: "/public/cat_bg.jpg",
        width: 800,
        height: 600,
        alt: "Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your-twitter-handle",
    creator: "@your-twitter-handle",
    title: "Ocicat NFT Club",
    description: "Mint exclusive Ocicat NFTs on the blockchain.",
  },
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
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1A263F",
                color: "#fff",
                fontFamily: "Orbitron, sans-serif",
                zIndex: "1000",
              },
            }}
          />
          <Header />
          <main className="overflow-x-hidden relative h-screen font-inter z-10">
            <MeshGradient />
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
