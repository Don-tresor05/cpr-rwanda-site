import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackToTop } from "./components/ui/BackToTop";
// Loading screen temporarily disabled — kept for future use
// import { LoadingScreen } from "./components/ui/LoadingScreen";
import { ComingSoonProvider } from "./components/ui/ComingSoonModal";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Secretariat } from "./pages/Secretariat";
import { Departments } from "./pages/Departments";
import { DepartmentResources } from "./pages/DepartmentResources";
import { DepartmentResourceFiles } from "./pages/DepartmentResourceFiles";
import { SecretariatResources } from "./pages/SecretariatResources";
import { SecretariatResourceFiles } from "./pages/SecretariatResourceFiles";
import { RadioPage } from "./pages/RadioPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { Newsroom } from "./pages/Newsroom";
import { NewsDetail } from "./pages/NewsDetail";

import { FixedWatermark } from "./components/ui/FixedWatermark";
import { CookieConsent } from "./components/ui/CookieConsent";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  // Loading screen temporarily disabled — kept for future use
  // const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen">
      <FixedWatermark variant="default" />
      <CookieConsent />
      <ScrollProgress />
      <BackToTop />
      <ScrollToTop />
      <ComingSoonProvider>
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/secretariat" element={<Secretariat />} />
            <Route path="/secretariat/:sectionId/resources" element={<SecretariatResources />} />
            <Route path="/secretariat/:sectionId/resources/:resourceSlug" element={<SecretariatResourceFiles />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:deptId/resources" element={<DepartmentResources />} />
            <Route path="/departments/:deptId/resources/:resourceSlug" element={<DepartmentResourceFiles />} />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/newsroom" element={<Newsroom />} />
            <Route path="/newsroom/:slug" element={<NewsDetail />} />
            <Route path="/news" element={<Newsroom />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
          </Routes>
          <Footer />
        </div>
      </ComingSoonProvider>
    </div>
  );
}

