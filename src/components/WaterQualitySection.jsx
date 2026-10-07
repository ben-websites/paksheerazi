import { 
  ShieldCheck, 
  Droplets, 
  CheckCircle, 
  Gauge, 
  Sparkles, 
  Award,
  Zap,
  Phone
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "KW&SB Approved Hydrant Extraction",
    description: "Sourced exclusively through authorized Karachi Water & Sewerage Board filling points (including NIPA & Sakhi Hassan Hydrants)."
  },
  {
    step: "02",
    title: "PCSIR Laboratory Tested",
    description: "Verified under PCSIR Laboratories Complex Karachi quality standards for optimal potability and safe mineral balance."
  },
  {
    step: "03",
    title: "Multi-Media Sand & Carbon Filtration",
    description: "Filters all physical sediment, turbidity, and suspended micro-particles before discharge into delivery bowsers."
  },
  {
    step: "04",
    title: "Sterilized Food-Grade Bowsers",
    description: "10,000 to 15,000 litre rigid water tankers with anti-corrosion food-grade internal coating and steam wash protocols."
  },
  {
    step: "05",
    title: "On-Site TDS Meter Verification",
    description: "Driver provides digital TDS tester at your doorstep. Test purity before connecting 30m delivery pipes."
  }
];

const WaterQualitySection = ({ onOpenBooking }) => {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 text-white relative overflow-hidden border-y border-sky-800/40">
      
      {/* Decorative Ocean Blue & Cyan Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Main Grid: Visual Media + Purity Assurance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Image with Floating Lab Data Pill (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-none overflow-hidden border-2 border-sky-500/40 shadow-2xl shadow-sky-900/40 group bg-slate-900">
              <img
                src="/pure_water.jpg"
                alt="Pak Sheerazi Pure Drinking Water TDS Test"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Floating Live TDS Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-5 rounded-none border-2 border-cyan-400 shadow-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      KW&SB Approved & Digital TDS Verified
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    140 - 180 PPM <span className="text-xs font-bold text-cyan-400">(Certified Sweet Water)</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-none bg-gradient-to-tr from-cyan-500 to-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-cyan-500/30">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lab Standards (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="badge-dark-sky text-xs font-black shadow-xs rounded-none">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline mr-1" />
              KW&SB & PCSIR Certified Quality
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Pure, Odorless & Lab Verified{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                Bulk Water Supply
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Pak Sheerazi & Sons operates directly through official Karachi Water & Sewerage Board (KW&SB) designated filling hydrants and holds laboratory test compliance with PCSIR Laboratories Complex Karachi. We eliminate the contamination risks associated with unauthorized water suppliers.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-none border border-sky-800/40 shadow-sm hover:border-cyan-400 hover:shadow-md transition-all duration-300">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Official KW&SB Hydrant Source</h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Water supplied from authorized KW&SB filling points (NIPA Hydrant & Sakhi Hassan) under government tender oversight.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-none border border-sky-800/40 shadow-sm hover:border-cyan-400 hover:shadow-md transition-all duration-300">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">PCSIR Laboratories Complex Verified</h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Periodic chemical and physical quality testing with PCSIR Labs ensuring zero hazardous heavy metals or chemical odor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-none border border-sky-800/40 shadow-sm hover:border-cyan-400 hover:shadow-md transition-all duration-300">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">On-Site TDS Test Before Pumping</h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Every tanker driver carries a calibrated digital TDS meter. You test the water sample at your gate before offloading.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking(2000)}
                className="btn-gradient-emerald text-sm px-8 py-3.5 rounded-full font-black shadow-lg shadow-emerald-500/30"
              >
                <span>Order Certified Sweet Water (COD)</span>
              </button>
            </div>
          </div>

        </div>

        {/* 5-Step Purification Workflow Cards */}
        <div className="pt-10 border-t border-sky-900/60">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
              The 5-Stage Purity Lifecycle
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              How Your Water is Processed & Delivered
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STEPS.map((stepItem, i) => (
              <div 
                key={i} 
                className="p-5 rounded-none bg-slate-900/80 border border-sky-800/50 hover:border-cyan-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="text-2xl font-black text-cyan-400 mb-2 font-mono">
                  {stepItem.step}
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5">
                  {stepItem.title}
                </h4>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WaterQualitySection;
