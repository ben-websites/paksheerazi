import { 
  Droplets, 
  Building2, 
  Waves, 
  HardHat, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { SERVICES_LIST } from "../services/dataService";

const iconMap = {
  Droplets,
  Building2,
  Waves,
  HardHat,
  Zap,
  ShieldCheck
};

const ServicesSection = ({ onOpenBooking }) => {
  return (
    <section id="services" className="section-padding bg-white text-slate-800 relative overflow-hidden">
      
      <div className="container-custom relative z-10">
        
        {/* Section Header with Gradient Accents */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="badge-green text-xs font-black mb-3 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Comprehensive Bulk Water Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Certified Bulk Water Services For{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              Every Sector in Karachi
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-3 leading-relaxed">
            Whether for your household drinking tank, luxury swimming pool, high-rise construction curing, or industrial manufacturing facility, Pak Sheerazi guarantees pure, compliant water on demand.
          </p>
        </div>

        {/* 6 Aesthetic Gradient Cards Grid on Crisp White Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service) => {
            const IconComponent = iconMap[service.icon] || Droplets;

            return (
              <div
                key={service.id}
                className={`p-7 rounded-none flex flex-col justify-between transition-all duration-400 relative group border ${
                  service.popular 
                    ? "bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white border-emerald-400 ring-2 ring-emerald-400/30 shadow-lg shadow-emerald-500/10" 
                    : "bg-white border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10"
                } hover:-translate-y-2`}
              >
                {service.popular && (
                  <div className="absolute -top-3 right-6">
                    <span className="text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-none bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md">
                      High Demand
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon & Title with Gradient */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-13 h-13 rounded-none bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white flex items-center justify-center p-3 shadow-md shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-xs font-bold text-emerald-600">
                        {service.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Specs */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-700 font-semibold">
                    {service.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking()}
                    className="btn-gradient-emerald btn-slide w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Request Tanker Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Assurance Ribbon with Light Green Gradient */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-emerald-100 via-green-50 to-teal-100 rounded-none border border-emerald-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-none bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">
                100% Water Purity & Volume Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Our tankers feature calibrated level gauges and certified food-grade interior coatings. Every drop tested for safety.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="btn-gradient-emerald text-sm px-8 py-3.5 whitespace-nowrap shrink-0 font-bold shadow-lg"
          >
            <span>Book Immediate Tanker</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
