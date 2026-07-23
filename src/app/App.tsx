import { Routes, Route } from "react-router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

