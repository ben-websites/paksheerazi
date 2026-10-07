import { 
  ShieldCheck, 
  Droplet, 
  Gauge, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle,
  Truck
} from "lucide-react";

const PILLARS = [
  {
    icon: Award,
    title: "Established 2002 • 20+ Years Excellence",
    description: "Founded by Muhammad Ikhlaq with roots in Karachi bulk water supply spanning over two decades of dependable service across public and private sectors."
  },
  {
    icon: Droplet,
    title: "KW&SB Approved Filling Hydrants",
    description: "Water drawn exclusively from authorized Karachi Water & Sewerage Board filling points (including NIPA Hydrant) with complete regulatory compliance."
  },
  {
    icon: Truck,
    title: "40+ Owned Tanker Fleet",
    description: "Extensive fleet of 1,000 to 10,000 Gallon rigid bowsers (10K - 15K Litre) equipped with heavy-duty 30m+ hoses and rapid booster pumps."
  },
  {
    icon: ShieldCheck,
    title: "FBR Registered Taxpayer (NTN: 3601245-9)",
    description: "Fully documented corporate contractor registered under Income Tax with RTO-I Karachi and compliant with federal and provincial revenue authorities."
  },
  {
    icon: CheckCircle,
    title: "Askari Bank Corporate Standing",
    description: "Corporate banking relationships with Askari Bank Limited (Gulistan-e-Jauhar Branch, A/C # 0032-0100018441 maintained since 2010)."
  },
  {
    icon: MapPin,
    title: "Police Verified Crew & Staff",
    description: "All drivers, mechanics, and dispatch staff hold verified CNIC credentials and police character verification from PS Sachal, District East Karachi."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 relative border-y-2 border-emerald-300">
      <div className="container-custom">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            The Pak Sheerazi Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 tracking-tight">
            Why Karachi Chooses Pak Sheerazi
          </h2>
          <p className="text-sm sm:text-base text-emerald-900 font-medium mt-2">
            In an industry plagued by uncertified water and delayed deliveries, we set the benchmark for purity, transparency, and punctuality.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-none border border-emerald-200 bg-white/95 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/15 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-none bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/25">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
