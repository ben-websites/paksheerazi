import { useState } from "react";
import { 
  Truck, 
  Droplets, 
  CheckCircle, 
  Gauge, 
  ArrowRight, 
  Zap, 
  Clock, 
  ShieldCheck,
  Fuel
} from "lucide-react";
import { DEFAULT_TANKERS } from "../services/dataService";

const FleetSection = ({ onOpenBooking }) => {
  const [filter, setFilter] = useState("all");

  const filteredTankers = DEFAULT_TANKERS.filter((tanker) => {
    if (filter === "residential") return tanker.capacityGallons <= 2000;
    if (filter === "commercial") return tanker.capacityGallons >= 3000;
    return true;
  });

  return (
    <section id="fleet" className="section-padding bg-white relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              GPS-Tracked Tanker Fleet
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              A Tanker For Every Requirement
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
              From compact residential alleys in DHA and Clifton to high-capacity industrial bowsers across Karachi. Every vehicle is certified sanitized with high-pressure discharge pumps.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-none shadow-inner">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <span>All Tankers ({DEFAULT_TANKERS.length})</span>
            </button>
            <button
              onClick={() => setFilter("residential")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === "residential"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <span>Residential (1K - 2K)</span>
            </button>
            <button
              onClick={() => setFilter("commercial")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === "commercial"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <span>Commercial & Mega (3K - 10K)</span>
            </button>
          </div>
        </div>

        {/* Tanker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTankers.map((tanker) => (
            <div
              key={tanker.id}
              className="bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white rounded-none overflow-hidden flex flex-col justify-between border border-emerald-200/90 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/15 transition-all duration-400 group hover:-translate-y-2"
            >
              {/* Card Header & Visual Media */}
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={tanker.image}
                    alt={tanker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge-green text-[11px] font-black bg-white/95 text-emerald-900 backdrop-blur-md rounded-none">
                      {tanker.statusBadge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="badge-green text-[10px] font-black backdrop-blur-md rounded-none">
                      {tanker.availability}
                    </span>
                  </div>

                  {/* Capacity callout */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-2xl font-black tracking-tight text-white drop-shadow">
                        {tanker.capacityGallons.toLocaleString()}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-emerald-300 font-black ml-1">
                        Gallons
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-100 bg-emerald-950/70 px-2.5 py-1 rounded-none border border-emerald-400/40 backdrop-blur-sm">
                      {tanker.vehicleType.split("/")[0]}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-emerald-950 group-hover:text-emerald-700 transition-colors mb-1.5">
                    {tanker.name}
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium mb-4 line-clamp-2">
                    {tanker.idealFor}
                  </p>

                  {/* Specs List */}
                  <div className="space-y-2 pb-4 mb-4 border-b border-emerald-200/80 text-xs">
                    <div className="flex items-center justify-between text-emerald-900">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                        Water Type:
                      </span>
                      <span className="font-bold text-emerald-950">{tanker.waterType.split("(")[0]}</span>
                    </div>

                    <div className="flex items-center justify-between text-emerald-900">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                        Discharge Pump:
                      </span>
                      <span className="font-bold text-emerald-950">{tanker.pumpPressure}</span>
                    </div>

                    <div className="flex items-center justify-between text-emerald-900">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Zap className="w-3.5 h-3.5 text-emerald-600" />
                        Hose Reach:
                      </span>
                      <span className="font-bold text-emerald-950">{tanker.hoseLength}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tanker.features.map((feat, i) => (
                      <span key={i} className="text-[11px] bg-emerald-200/70 text-emerald-900 px-2.5 py-1 rounded-none font-bold border border-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer & CTA */}
              <div className="px-6 pb-6 pt-3 bg-emerald-200/40 border-t border-emerald-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-700 block font-bold">Starting from</span>
                  <span className="text-xl font-black text-emerald-900">
                    Rs. {tanker.basePrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(tanker.capacityGallons)}
                  className="btn-gradient-emerald text-xs px-4 py-2.5 rounded-full font-black shadow-md group-hover:shadow-emerald-500/40 flex items-center gap-1.5"
                >
                  <span>Book Tanker</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FleetSection;
