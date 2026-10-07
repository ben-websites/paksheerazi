import RatesTableSection from "../components/RatesTableSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import { Sparkles, MapPin, Truck, Phone } from "lucide-react";

const RatesPage = ({ onOpenBooking }) => {
  return (
    <div className="flex-1 flex flex-col">
      
      {/* Cinematic Rates Page Hero */}
      <div className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center py-20 bg-slate-950 overflow-hidden">
        {/* Background Image: Karachi Skyline & Logistics */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-sky-950/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        <div className="container-custom relative z-10 text-center max-w-4xl text-white space-y-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-extrabold bg-sky-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            100% Fixed Transparent Fares • All Karachi Sectors
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Karachi Area Rates &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-white">
              Delivery Timelines
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            All prices include tanker transit, fuel, driver allowance, and electric/diesel booster pumping directly to your underground or overhead tanks. No hidden fees.
          </p>

          <div className="flex items-center justify-center gap-3.5 pt-3 flex-wrap">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gradient-emerald text-sm sm:text-base px-7 py-3.5 rounded-full font-black shadow-xl shadow-emerald-500/40 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Book Online (Cash on Delivery)</span>
            </button>
            <a
              href="tel:+923049025994"
              className="btn-outline-white text-sm sm:text-base px-6 py-3.5 rounded-full font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Dispatch: 0304 9025994</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rates Table Section with Light Green Gradient */}
      <RatesTableSection onOpenBooking={onOpenBooking} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

    </div>
  );
};

export default RatesPage;
