mport HeroSection from "../components/HeroSection";
import FleetSection from "../components/FleetSection";
import OfficeLocationSection from "../components/OfficeLocationSection";
import WaterQualitySection from "../components/WaterQualitySection";
import ServicesSection from "../components/ServicesSection";
import RatesTableSection from "../components/RatesTableSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import { MessageCircle } from "lucide-react";

const Home = ({ onOpenBooking }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Cinematic Full-Screen Hero Slider & Floating Command Bar */}
      <HeroSection onOpenBooking={onOpenBooking} />

      {/* 2. Tanker Fleet Showcase (Light Green Gradient) */}
      <FleetSection onOpenBooking={onOpenBooking} />

      {/* 3. Visit Our Office for Instant Order & Dispatch (Dedicated Physical Location Section) */}
      <OfficeLocationSection onOpenBooking={onOpenBooking} />

      {/* 4. Water Quality & Lab TDS Purity Guarantee */}
      <WaterQualitySection onOpenBooking={onOpenBooking} />

      {/* 5. Comprehensive Bulk Water Services */}
      <ServicesSection onOpenBooking={onOpenBooking} />

      {/* 6. Why Karachi Chooses Pak Sheerazi */}
      <WhyChooseUs />

      {/* 7. Transparent Karachi Area Rates Matrix */}
      <RatesTableSection onOpenBooking={onOpenBooking} />

      {/* 8. Verified Client Reviews */}
      <TestimonialsSection />

      {/* Floating Emergency WhatsApp Button */}
      <a
        href="https://wa.me/923049025994?text=Assalam-o-Alaikum%2C%20I%20urgently%20need%20a%20water%20tanker%20from%20Pak%20Sheerazi"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group ring-4 ring-emerald-400/30"
        aria-label="Direct WhatsApp Emergency Dispatch"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-black px-0 group-hover:px-1.5">
          WhatsApp 24/7 Dispatch
        </span>
      </a>
    </div>
  );
};

export default Home;
