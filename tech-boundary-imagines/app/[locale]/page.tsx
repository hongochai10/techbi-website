"use client";

/**
 * app/page.tsx — Tech Boundary Imagination Landing Page
 * Client Component so that dynamic() with ssr:false is allowed.
 */

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ImagineCanvas from "@/components/ImagineCanvas";
import CTASection from "@/components/CTASection";
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
        <TrustBar />
        <ServicesSection />
        <CaseStudiesSection />
        <OpenSourceSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ImagineCanvas />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
