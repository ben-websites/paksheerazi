import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import FleetPage from "./pages/FleetPage";
import RatesPage from "./pages/RatesPage";
import TrackPage from "./pages/TrackPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminPage from "./pages/AdminPage";

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState(2000);
  const [selectedArea, setSelectedArea] = useState("DHA Phase 4, 5 & 6");

  const handleOpenBooking = (capacity, area) => {
    if (capacity) setSelectedCapacity(capacity);
    if (area) setSelectedArea(area);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      <ScrollToTop />

      {/* Dynamic Light Green Gradient Glass Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home onOpenBooking={handleOpenBooking} />} />
          <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/fleet" element={<FleetPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/rates" element={<RatesPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-orders" element={<MyOrdersPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      {/* Ultra-Corporate Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Global Interactive Tanker Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialTankerCapacity={selectedCapacity}
        initialArea={selectedArea}
      />
    </div>
  );
}

export default App;