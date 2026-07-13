"use client";

import SiteTopBar from "@/components/layout/SiteTopBar";
import SiteNavbar from "@/components/layout/SiteNavbar";
import HeroSection from "@/components/landing/home/HeroSection";
import StatsBar from "@/components/landing/home/StatsBar";
import FeatureGrid from "@/components/landing/home/FeatureGrid";
import TrendingCategories from "@/components/landing/home/TrendingCategories";
import BestsellerCourses from "@/components/landing/home/BestsellerCourses";
import TopRatedCourses from "@/components/landing/home/TopRatedCourses";
import BundlesSection from "@/components/landing/home/BundlesSection";
import TrendingCourses from "@/components/landing/home/TrendingCourses";
import UpcomingCourses from "@/components/landing/home/UpcomingCourses";
import DiscountedCourses from "@/components/landing/home/DiscountedCourses";
import FreeCourses from "@/components/landing/home/FreeCourses";
import StoreProducts from "@/components/landing/home/StoreProducts";
import SubscriptionPlans from "@/components/landing/home/SubscriptionPlans";
import { TeacherRegistration, InstructorSearch } from "@/components/landing/home/TeacherSections";
import { ForumSection, LiveClasses, RewardPoints } from "@/components/landing/home/EngagementSections";
import { ExpertInstructors, OfficialOrganizations } from "@/components/landing/home/ExpertSections";
import { StudentReviews, UpcomingEvents, BlogArticles } from "@/components/landing/home/ContentSections";
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
      <TrendingCategories />
      <BestsellerCourses />
      <TopRatedCourses />
      <BundlesSection />
      <TrendingCourses />
      <UpcomingCourses />
      <DiscountedCourses />
      <FreeCourses />
      <StoreProducts />
      <SubscriptionPlans />
      <TeacherRegistration />
      <InstructorSearch />
      <ForumSection />
      <LiveClasses />
      <RewardPoints /> 
      <ExpertInstructors />
      <OfficialOrganizations />
      <StudentReviews />
      <UpcomingEvents />
      <BlogArticles />
      <SiteFooter />
    </main>
  );
}
