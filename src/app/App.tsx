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
import { RadioPage } from "./pages/RadioPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { Newsroom } from "./pages/Newsroom";
import { NewsDetail } from "./pages/NewsDetail";

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
    <div className="min-h-screen">
      <ScrollProgress />
      <BackToTop />
      <ScrollToTop />
      {/* Loading screen temporarily disabled — kept for future use
      {!booted && <LoadingScreen onDone={() => setBooted(true)} />}
      */}
      <ComingSoonProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/secretariat" element={<Secretariat />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/radio" element={<RadioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/newsroom/:slug" element={<NewsDetail />} />
        <Route path="/news" element={<Newsroom />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
      </Routes>
      <Footer />
      </ComingSoonProvider>
    </div>
  );
}

