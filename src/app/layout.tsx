import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Orbitron, Rajdhani } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CarVibes — Find the car that fits your vibe.",
  description:
    "CarVibes is a premium, futuristic automotive universe: discover 130+ cars, explore brands, compare vehicles, find your perfect car, and read automotive news and rankings.",
  keywords: [
    "cars",
    "CarVibes",
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "compare cars",
    "automotive news",
  ],
  verification: {
    google: "Q9IY-30MOLsIMVPW3h8IKngR6DfnOZYC8vP09WKBwcY",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="cv-noise bg-cv-black text-cv-white antialiased">
        <AppStateProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppStateProvider>

        <Analytics />
      </body>
    </html>
  );
}
