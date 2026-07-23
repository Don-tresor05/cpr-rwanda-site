import { HeroSection } from "../components/sections/HeroSection";
import { StatsSection } from "../components/sections/StatsSection";
import { AboutPreview } from "../components/sections/AboutPreview";
import { DepartmentsSection } from "../components/sections/DepartmentsSection";
import { MemberChurchesSection } from "../components/sections/MemberChurchesSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { NewsSection } from "../components/sections/NewsSection";
import { RadioSection } from "../components/sections/RadioSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { GalleryPreview } from "../components/sections/GalleryPreview";

export function Home() {
  return (
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
      <GalleryPreview />
    </main>
  );
}
