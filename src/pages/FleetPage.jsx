import { useState } from "react";
import FleetSection from "../components/FleetSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import { Truck, Sparkles, ShieldCheck, Phone, ArrowRight, Search, FileText, CheckCircle2 } from "lucide-react";
import { FLEET_VEHICLES_SCHEDULE } from "../services/dataService";

const FleetPage = ({ onOpenBooking }) => {
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("all");

  const filteredVehicles = FLEET_VEHICLES_SCHEDULE.filter((v) => {
    const matchesSearch = v.tankerNo.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
                          v.owner.toLowerCase().includes(scheduleSearch.toLowerCase());
    const matchesCap = selectedCapacity === "all" || v.capacityGallons.toString() === selectedCapacity;
    return matchesSearch && matchesCap;
  });

  return (
    <div className="flex-1 flex flex-col">
      
      {/* Cinematic Fleet Page Hero */}
      <div className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center py-20 bg-slate-950 overflow-hidden">
        {/* Background Image: Commercial Tanker Bowsers */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-sky-950/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        <div className="container-custom relative z-10 text-center max-w-4xl text-white space-y-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-extrabold bg-sky-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            Official 40+ Owned Commercial Fleet • KW&SB Approved Contractor
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            High-Capacity Water Tankers{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-white">
              From 1,000 to 10,000 Gallons
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Pak Sheerazi & Sons maintains a fully registered fleet of 40+ specialized rigid water tankers. Fitted with 30m+ heavy-duty delivery pipes, high-pressure discharge pumps, and sterilized internal coatings.
          </p>

          <div className="flex items-center justify-center gap-3.5 pt-3 flex-wrap">
            <button
              onClick={() => onOpenBooking()}
              className="btn-gradient-emerald text-sm sm:text-base px-7 py-3.5 rounded-full font-black shadow-xl shadow-emerald-500/40 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Book A Tanker Size</span>
            </button>
            <a
              href="tel:+923049025994"
              className="btn-outline-white text-sm sm:text-base px-6 py-3.5 rounded-full font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct Dispatch: 0304 9025994</span>
            </a>
          </div>
        </div>
      </div>

      {/* Fleet Section with Light Green Gradient */}
      <FleetSection onOpenBooking={onOpenBooking} />

      {/* Official 40-Tanker Registered Fleet Schedule (From PDF Page 18) */}
      <section className="section-padding bg-slate-50 border-y border-slate-200">
        <div className="container-custom">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="badge-dark-sky text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs rounded-none">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Documented Regulatory Schedule
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Official Registered Tanker Schedule (40 Units)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 max-w-2xl">
                Certified inventory of rigid water tankers registered under Pak Sheerazi & Sons submitted to Karachi Water & Sewerage Board (KW&SB) and commercial clients.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search Tanker No (e.g. JZ-4891)..."
                  className="input-field pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 font-medium rounded-none w-full sm:w-64"
                  value={scheduleSearch}
                  onChange={(e) => setScheduleSearch(e.target.value)}
                />
              </div>

              <select
                className="select-field text-xs py-2 bg-white border border-slate-300 rounded-none font-bold"
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
              >
                <option value="all">All Capacities (40 Units)</option>
                <option value="1000">1,000 Gallons (12 Units)</option>
                <option value="2000">2,000 Gallons (7 Units)</option>
                <option value="3000">3,000 Gallons (8 Units)</option>
                <option value="5000">5,000 Gallons (9 Units)</option>
                <option value="10000">10,000 Gallons (4 Units)</option>
              </select>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-lg">
            <div className="max-h-[520px] overflow-y-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-800">
                <thead className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white sticky top-0 z-10 text-xs uppercase font-black tracking-wider">
                  <tr>
                    <th className="py-3 px-4 text-center w-16">S.No</th>
                    <th className="py-3 px-6">Tanker Registration No</th>
                    <th className="py-3 px-6">Registered Owner</th>
                    <th className="py-3 px-6 text-center">Gallon Qty</th>
                    <th className="py-3 px-6">Classification</th>
                    <th className="py-3 px-6 text-right">Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredVehicles.map((item) => (
                    <tr key={item.sr} className="hover:bg-emerald-50/60 transition-colors">
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                        {String(item.sr).padStart(2, '0')}
                      </td>
                      <td className="py-3 px-6 font-mono font-black text-slate-900 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item.tankerNo}</span>
                      </td>
                      <td className="py-3 px-6 font-bold text-slate-700">
                        {item.owner}
                      </td>
                      <td className="py-3 px-6 text-center font-black text-emerald-700">
                        {item.capacityGallons.toLocaleString()} Gln
                      </td>
                      <td className="py-3 px-6 text-slate-600 font-semibold">
                        {item.category}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button
                          onClick={() => onOpenBooking(item.capacityGallons)}
                          className="btn-gradient-emerald text-[11px] px-3 py-1 rounded-md font-bold shadow-xs"
                        >
                          <span>Request Size</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredVehicles.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400">
                        No vehicles found matching "{scheduleSearch}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600">
              <span className="font-semibold">
                Showing {filteredVehicles.length} of 40 Registered Fleet Bowsers
              </span>
              <span className="text-[11px] text-slate-500 mt-1 sm:mt-0">
                Source: Pak Sheerazi & Sons Official Profile (Page 18 Schedule)
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

    </div>
  );
};

export default FleetPage;
