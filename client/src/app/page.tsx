"use client";

import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteNavbar from "@/components/layout/SiteNavbar";
import HeroSection from "@/components/landing/home/HeroSection";
import StatsBar from "@/components/landing/home/StatsBar";
import FeatureGrid from "@/components/landing/home/FeatureGrid";
import BestsellerCourses from "@/components/landing/home/BestsellerCourses";
import { StudentReviews } from "@/components/landing/home/ContentSections";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header Ecosystem */}
      <SiteTopBar />
      <SiteNavbar />

      {/* Main Content Sections */}
      <HeroSection />
      <StatsBar />
      <FeatureGrid />
      <BestsellerCourses />
      <StudentReviews />
      <SiteFooter />
    </main>
  );
}
