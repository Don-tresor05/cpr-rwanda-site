import { Header } from "./components/layout/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { StatsSection } from "./components/sections/StatsSection";
import { AboutPreview } from "./components/sections/AboutPreview";
import { DepartmentsSection } from "./components/sections/DepartmentsSection";
import { MemberChurchesSection } from "./components/sections/MemberChurchesSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { NewsSection } from "./components/sections/NewsSection";
import { RadioSection } from "./components/sections/RadioSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { PartnersSection } from "./components/sections/PartnersSection";
import { GalleryPreview } from "./components/sections/GalleryPreview";
import { CTABanner } from "./components/sections/CTABanner";
import { Footer } from "./components/layout/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <DepartmentsSection />
        <MemberChurchesSection />
        <ProjectsSection />
        <NewsSection />
        <RadioSection />
        <TestimonialsSection />
        {/* <PartnersSection /> */}
        <GalleryPreview />
        {/* <CTABanner /> */}
      </main>
      <Footer />
    </div>
  );
}
