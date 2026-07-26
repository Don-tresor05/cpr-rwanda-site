import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
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
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/newsroom/:slug" element={<NewsDetail />} />
        <Route path="/news" element={<Newsroom />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

