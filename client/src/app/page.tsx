import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/hero';
import { FeaturedCourses } from '@/components/featured-courses';
import { StatsSection } from '@/components/stats-section';
import { Bestsellers } from '@/components/bestsellers';
import { Categories } from '@/components/categories';
import { Features } from '@/components/features';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <StatsSection />
      <Bestsellers />
      <Categories />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
