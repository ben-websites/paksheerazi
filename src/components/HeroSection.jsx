mport { useState, useEffect } from "react";
import { 
  Droplets, 
  Truck, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Activity,
  MessageCircle,
  Zap,
  Gauge
} from "lucide-react";
import { DEFAULT_TANKERS, SERVICE_AREAS, calculateRate } from "../services/dataService";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/hero_tanker.jpg",
    badge: "Pak Sheerazi & Sons • Est. 2002 • NTN 3601245-9",
    headline: "KW&SB Approved Sweet Potable Water. Rapid Delivery Across Karachi.",
    subheadline: "Proprietor Muhammad Ikhlaq. Government & private contractor operating 40+ owned rigid bowsers sourced directly from official KW&SB filling points with PCSIR certified purity.",
    tag: "TDS Tested Sweet Water • Approved KW&SB Hydrants",
    accent: "from-cyan-400 to-sky-300"
  },
  {
    id: 2,
    image: "/fleet_depot.jpg",
    badge: "40+ Company-Owned Rigid Tankers",
    headline: "Continuous Fleet Rotation for Major Projects & Industry.",
    subheadline: "Trusted water supplier for Descon Engineering, Mari Petroleum, Apex Construction, AA Quality Builders, and Malir Cantt. 1,000 to 10,000 Gallon bowsers with high-pressure booster pumps.",
    tag: "Equipped with 30-Meter Heavy Hoses & High-GPM Pumps",
    accent: "from-sky-300 to-white"
  },
  {
    id: 3,
    image: "/pure_water.jpg",
    badge: "Police Verified & FBR Registered Contractor",
    headline: "100% Purity & Volume Assurance. Inspect Before Offload.",
    subheadline: "Clean character record certified by PS Sachal, District East Karachi. Askari Bank corporate banker with direct COD and NTN-compliant billing for homes and corporations.",
    tag: "PCSIR Laboratory Tested • Verified Legal Credentials",
    accent: "from-emerald-300 to-cyan-300"
  }
];

const HeroSection = ({ onOpenBooking }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedArea, setSelectedArea] = useState("DHA Phase 4, 5 & 6");
  const [selectedCapacity, setSelectedCapacity] = useState(2000);
  const [selectedWaterType, setSelectedWaterType] = useState("Potable Drinking (Sweet Water)");
  const [rateCalc, setRateCalc] = useState(null);

  // Auto-play hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Update calculator
  useEffect(() => {
    const rate = calculateRate(selectedArea, selectedCapacity);
    setRateCalc(rate);
  }, [selectedArea, selectedCapacity]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">
      
      {/* ========================================================
          FULL-SCREEN CINEMATIC HERO SLIDER
          ======================================================== */}
      <div className="relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[86vh] flex items-center justify-center">
        
        {/* Background Images with Cross-Fade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-layered cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
          </div>
        ))}

        {/* Ambient Hydro Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Slider Content */}
        <div className="container-custom relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6">
            
            {/* Live Operational Status Pill */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-black tracking-wide bg-sky-500/25 text-cyan-300 border border-cyan-400/40 backdrop-blur-md shadow-lg shadow-sky-500/20">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                {HERO_SLIDES[activeSlide].badge}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-bold bg-white/10 text-slate-200 backdrop-blur-md border border-white/15">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Karachi Central Fleet: Active 24/7
              </span>
            </div>

            {/* Huge Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-md">
              {HERO_SLIDES[activeSlide].headline.split(".")[0]}{" "}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${HERO_SLIDES[activeSlide].accent}`}>
                {HERO_SLIDES[activeSlide].headline.split(".")[1] || ""}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200/90 max-w-2xl font-normal leading-relaxed drop-shadow">
              {HERO_SLIDES[activeSlide].subheadline}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm font-semibold text-sky-100">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-2 rounded-none backdrop-blur-md border border-cyan-400/25">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                KW&SB Approved Hydrant Filling Source
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-2 rounded-none backdrop-blur-md border border-cyan-400/25">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                40+ Registered Company-Owned Bowsers
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-2 rounded-none backdrop-blur-md border border-cyan-400/25">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                FBR NTN: 3601245-9 Registered
              </span>
            </div>

            {/* Call to Actions */}
            <div className="flex items-center gap-3.5 pt-2 flex-wrap">
              <button
                onClick={() => onOpenBooking(selectedCapacity, selectedArea)}
                className="btn-sky-primary text-sm sm:text-base px-7 sm:px-8 py-4 rounded-full font-black shadow-xl shadow-sky-500/40 flex items-center gap-2 group"
              >
                <Truck className="w-5 h-5" />
                <span>Book Tanker Immediately</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/923049025994?text=Assalam-o-Alaikum%2C%20I%20urgently%20need%20a%20water%20tanker%20from%20Pak%20Sheerazi%20%26%20Sons"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm sm:text-base px-6 py-4 rounded-full font-bold shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp 0304 9025994</span>
              </a>

              <a
                href="tel:+923049025994"
                className="px-5 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base transition backdrop-blur-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>0304 9025994</span>
              </a>
            </div>

          </div>
        </div>

        {/* Slider Controls (Bottom Right) */}
        <div className="absolute bottom-10 right-6 sm:right-12 z-20 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-none border border-sky-400/30">
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === i ? "w-8 bg-cyan-400 shadow-md shadow-cyan-400/50" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-white/20" />

          {/* Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================
          FLOATING DISPATCH COMMAND BAR (INTERACTIVE RATE CALCULATOR)
          ======================================================== */}
      <div className="relative z-20 -mt-12 sm:-mt-16 container-custom px-4 sm:px-8">
        <div className="bg-white rounded-none p-5 sm:p-7 shadow-2xl border border-slate-200 text-slate-800 backdrop-blur-md ring-1 ring-black/5">
          
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-none bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/30">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Instant Tanker Dispatch & Fare Calculator
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Select your area and tanker capacity below for instant guaranteed pricing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-none border border-emerald-200 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Available for Immediate Dispatch (35 Mins)</span>
            </div>
          </div>

          {/* Horizontal Command Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Area */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Karachi Area</span>
              </label>
              <select
                className="select-field text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 focus:border-emerald-500"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                {SERVICE_AREAS.map((a) => (
                  <option key={a.area} value={a.area}>
                    {a.area}
                  </option>
                ))}
              </select>
            </div>

            {/* Tanker Size */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Tanker Volume</span>
              </label>
              <select
                className="select-field text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 focus:border-emerald-500"
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(Number(e.target.value))}
              >
                {DEFAULT_TANKERS.map((t) => (
                  <option key={t.id} value={t.capacityGallons}>
                    {t.capacityGallons.toLocaleString()} Gal ({t.idealFor.split(",")[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Water Type */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>3. Water Quality</span>
              </label>
              <select
                className="select-field text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 focus:border-emerald-500"
                value={selectedWaterType}
                onChange={(e) => setSelectedWaterType(e.target.value)}
              >
                <option value="Potable Drinking (Sweet Water)">Sweet Potable (TDS &lt; 180)</option>
                <option value="Commercial / Swimming Pool Grade">Swimming Pool (Sediment-Free)</option>
                <option value="Construction & Concrete Curing">Construction & Concrete Curing</option>
                <option value="RO Purified (Demineralized)">RO Purified (Demineralized)</option>
              </select>
            </div>

            {/* Calculated Price & ETA */}
            {rateCalc && (
              <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 border-2 border-emerald-600 rounded-none p-2.5 px-3.5 flex flex-col justify-center text-white shadow-md">
                <span className="text-[10px] uppercase font-black text-emerald-200 tracking-wider">
                  Total Payable (COD)
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white tracking-tight">
                    {rateCalc.formattedPrice}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-200 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {rateCalc.deliveryETA}
                  </span>
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <div>
              <button
                onClick={() => onOpenBooking(selectedCapacity, selectedArea)}
                className="btn-gradient-emerald w-full py-3.5 text-sm font-black rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Confirm & Dispatch</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          CORPORATE TRUST METRICS (UNDER COMMAND BAR)
          ======================================================== */}
      <div className="container-custom pt-12 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-none bg-slate-900/90 border border-sky-800/40 text-white flex items-center gap-4 hover-card-elevate">
            <div className="w-12 h-12 rounded-none bg-sky-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">40+</div>
              <div className="text-xs text-slate-400 font-semibold">Registered Owned Tankers</div>
            </div>
          </div>

          <div className="p-5 rounded-none bg-slate-900/90 border border-sky-800/40 text-white flex items-center gap-4 hover-card-elevate">
            <div className="w-12 h-12 rounded-none bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">Est. 2002</div>
              <div className="text-xs text-slate-400 font-semibold">22+ Years Registered Service</div>
            </div>
          </div>

          <div className="p-5 rounded-none bg-slate-900/90 border border-sky-800/40 text-white flex items-center gap-4 hover-card-elevate">
            <div className="w-12 h-12 rounded-none bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">KW&SB</div>
              <div className="text-xs text-slate-400 font-semibold">Approved Hydrant Water</div>
            </div>
          </div>

          <div className="p-5 rounded-none bg-slate-900/90 border border-sky-800/40 text-white flex items-center gap-4 hover-card-elevate">
            <div className="w-12 h-12 rounded-none bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight">3601245-9</div>
              <div className="text-xs text-slate-400 font-semibold">Official FBR NTN Taxpayer</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HeroSection;
