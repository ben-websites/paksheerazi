import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  CheckCircle, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  ExternalLink,
  Sparkles,
  Compass
} from "lucide-react";

const HUBS = [
  {
    id: "head-office",
    name: "Pak Sheerazi & Sons — Corporate Head Office",
    area: "Gulshan-e-Iqbal (Dariya Khan Rindh Goth)",
    address: "Plot # A-12, Dariya Khan Rindh Goth, Gulshan-e-Iqbal, Karachi",
    timing: "Open 24/7 (Central Dispatch Desk)",
    phone: "0345-2982839 / 0321-8970244",
    isHQ: true,
    embedUrl: "https://maps.google.com/maps?q=Gulshan-e-Iqbal+Karachi&t=&z=13&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Plot+A-12+Dariya+Khan+Rindh+Goth+Gulshan-e-Iqbal+Karachi"
  },
  {
    id: "johar-station",
    name: "Johar Dispatch Station & Customer Support",
    area: "Gulistan-e-Johar (Bhitaiabad)",
    address: "House No. E-416, Bhitaiabad Nazd Balock Chock, Gulistan-e-Johar, Karachi",
    timing: "Open 24 Hours Daily",
    phone: "0345-6011026 / 0345-2982839",
    isHQ: false,
    embedUrl: "https://maps.google.com/maps?q=Bhitaiabad+Gulistan-e-Jauhar+Karachi&t=&z=14&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Bhitaiabad+Gulistan-e-Johar+Karachi"
  },
  {
    id: "nipa-hydrant",
    name: "KW&SB NIPA Hydrant Operational Point",
    area: "NIPA Hydrant (District East)",
    address: "Beside Nadeem Medical Centre, NIPA Chowrangi, Gulshan-e-Iqbal, Karachi",
    timing: "Official Hydrant Pumping Hours (24/7 Operations)",
    phone: "0345-2982839 / 0345-6011026",
    isHQ: false,
    embedUrl: "https://maps.google.com/maps?q=NIPA+Chowrangi+Gulshan-e-Iqbal+Karachi&t=&z=14&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=NIPA+Chowrangi+Gulshan-e-Iqbal+Karachi"
  },
  {
    id: "jando-yard",
    name: "Jando Para Fleet Yard & Maintenance Base",
    area: "Jando Para (Heavy Fleet Base)",
    address: "H.No 544, Gali No 15, Jando Para, Karachi, Sindh",
    timing: "24/7 Heavy Fleet Operations & Staging",
    phone: "0321-8970244 / 0345-2982839",
    isHQ: false,
    embedUrl: "https://maps.google.com/maps?q=Karachi+East+Sindh&t=&z=13&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Jando+Para+Karachi"
  }
];

const OfficeLocationSection = ({ onOpenBooking }) => {
  const [selectedHub, setSelectedHub] = useState(HUBS[0]);

  return (
    <section id="office-location" className="section-padding bg-gradient-to-br from-green-200 via-emerald-100 to-teal-200 text-emerald-950 relative overflow-hidden border-y-2 border-emerald-300">
      
      {/* Decorative Mint-Hydro Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-400/25 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header with Gradient Accents */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="badge-green text-xs font-black mb-3 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Walk-In Booking & On-Site Inspection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950">
            Visit Our Office For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900">
              Instant Order & Immediate Dispatch
            </span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-900 font-medium mt-3 leading-relaxed">
            Need water immediately or prefer booking at the counter? Visit our Central Karachi Headquarters in DHA Phase 2 Extension or any of our 4 regional dispatch stations.
          </p>
        </div>

        {/* ========================================================
            INTERACTIVE REAL GOOGLE MAP & DISPATCH LOCATOR
            ======================================================== */}
        <div className="bg-gradient-to-br from-white/95 via-emerald-100/80 to-green-100 rounded-none border-2 border-emerald-400 shadow-2xl overflow-hidden mb-12">
          
          {/* Station Selection Tabs */}
          <div className="bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 p-3 sm:p-4 border-b-2 border-emerald-300 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 font-black text-xs text-emerald-950">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Select Karachi Dispatch Hub:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-1.5 group ${
                    selectedHub.id === hub.id
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 scale-102"
                      : "bg-white text-emerald-950 hover:bg-emerald-600 hover:text-white border border-emerald-300 font-bold"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 transition-colors group-hover:text-white" />
                  <span>{hub.area}</span>
                  {hub.isHQ && (
                    <span className="text-[9px] bg-white/30 text-white px-1.5 py-0.5 rounded-full font-black">
                      HQ
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map & Office Details Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Real Embedded Interactive Google Map (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] bg-slate-100">
              <iframe
                title="Pak Sheerazi Water Supply Map Location"
                src={selectedHub.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Live Pin Overlay Callout */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-none shadow-lg border border-emerald-300 flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active Hub: {selectedHub.area}</span>
              </div>
            </div>

            {/* Right Column: Selected Station Details & Direct Routing (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white/95 via-emerald-100/70 to-green-100/80">
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="badge-green text-[10px] font-black rounded-none">
                      {selectedHub.isHQ ? "Central Dispatch Depot" : "Regional Satellite Hub"}
                    </span>
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedHub.timing}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {selectedHub.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{selectedHub.address}</span>
                  </p>
                </div>

                {/* Walk-in Perks */}
                <div className="bg-emerald-50/80 p-4 rounded-none border border-emerald-200 text-xs space-y-2 text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Walk-In Counter Advantages:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Inspect pure water TDS meter reading at our gate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Immediate tanker driver assignment & departure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Pay Cash, Card, or get a verified GST company invoice</span>
                  </div>
                </div>

                {/* Direct Telephone */}
                <div className="p-3 bg-white rounded-none border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Direct Telephone:</span>
                  </div>
                  <strong className="text-slate-900 text-sm font-mono">{selectedHub.phone}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={selectedHub.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient-emerald text-xs sm:text-sm py-3 px-5 rounded-xl font-black flex items-center justify-center gap-2 flex-1 shadow-emerald-500/30"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onOpenBooking(2000, selectedHub.area)}
                  className="btn-gradient-mint text-xs sm:text-sm py-3 px-5 rounded-xl font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Book This Hub Online</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Dispatch Cards with Light Green Gradient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HUBS.map((hub) => (
            <div
              key={hub.id}
              onClick={() => setSelectedHub(hub)}
              className={`p-5 rounded-none border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                selectedHub.id === hub.id
                  ? "bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 border-emerald-500 shadow-xl shadow-emerald-500/20 scale-102"
                  : "bg-gradient-to-br from-white/95 via-emerald-50 to-green-100/70 border-emerald-300 hover:border-emerald-500 hover:shadow-lg"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800">
                    {hub.area}
                  </span>
                  {hub.isHQ ? (
                    <span className="text-[9px] font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-0.5 rounded-none shadow-xs">
                      Main HQ
                    </span>
                  ) : (
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-none border border-emerald-200">
                      Station
                    </span>
                  )}
                </div>

                <h4 className="font-black text-sm text-emerald-950 mb-1.5 leading-snug">
                  {hub.name}
                </h4>

                <p className="text-xs text-emerald-800 font-medium leading-relaxed mb-3">
                  {hub.address}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-200/70 flex items-center justify-between text-xs font-black text-emerald-700">
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {hub.timing.split("(")[0]}
                </span>
                <span className="text-[11px] underline">View on Map →</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OfficeLocationSection;
