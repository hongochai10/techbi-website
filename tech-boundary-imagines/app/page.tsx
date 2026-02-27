"use client";

/**
 * app/page.tsx — Tech Boundary Imagines Landing Page
 * Client Component so that dynamic() with ssr:false is allowed.
 */

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ImagineCanvas from "@/components/ImagineCanvas";
import Footer from "@/components/Footer";

// CustomCursor is purely decorative — skip SSR
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ImagineCanvas />
      </main>
      <Footer />
    </>
  );
}
