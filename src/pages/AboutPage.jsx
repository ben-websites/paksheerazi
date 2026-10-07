import { 
  Droplets, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle, 
  Clock, 
  Truck, 
  Sparkles, 
  Phone, 
  FileText, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  MapPin,
  Briefcase
} from "lucide-react";
import { COMPANY_INFO, CLIENTS_LIST, STAFF_LIST, FLEET_VEHICLES_SCHEDULE } from "../services/dataService";
import TestimonialsSection from "../components/TestimonialsSection";

const AboutPage = () => {
  return (
    <div className="flex-1 flex flex-col bg-white text-slate-800">
      
      {/* ========================================================
          CINEMATIC HERO: OFFICIAL PROFILE HEADER
          ======================================================== */}
      <div className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center py-20 bg-slate-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-40"
          style={{
            backgroundImage: `url('/hero_tanker.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-emerald-950/85 to-slate-950/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        <div className="container-custom relative z-10 text-center max-w-4xl text-white space-y-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-black bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Official Company Profile • Est. 2002 • FBR NTN: 3601245-9
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            About Pak Sheerazi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              & Sons
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Pak Sheerazi & Sons (پاک شیرازی اینڈ سنز) is one of Karachi's premier government and private sector Water Supplier Constructors. Incorporated in 2002 with full engineering capabilities in water logistics, serving public infrastructure, defense establishments, and multinational corporations.
          </p>

          <div className="flex items-center justify-center gap-3.5 pt-3 flex-wrap">
            <a
              href="tel:+923049025994"
              className="btn-gradient-emerald text-sm sm:text-base px-7 py-3.5 rounded-full font-bold shadow-xl shadow-emerald-500/40 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call Dispatch HQ: 0304 9025994</span>
            </a>
            <a
              href="https://wa.me/923049025994?text=Assalam-o-Alaikum%2C%20I%20am%20inquiring%20about%20Pak%20Sheerazi%20%26%20Sons%20water%20supply%20contracts"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white text-sm sm:text-base px-6 py-3.5 rounded-full font-bold flex items-center gap-2"
            >
              <span>Corporate Inquiries</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          BRIEF COMPANY PROFILE & LEGAL IDENTITY TABLE
          ======================================================== */}
      <div className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs rounded-none">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Brief Company Profile
                </span>
                
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Over Two Decades of Registered Water Supply Excellence
                </h2>

                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  Incorporated in 2002 under Sole Proprietor <strong>Muhammad Ikhlaq</strong>, Pak Sheerazi & Sons has grown into one of Karachi's most established bulk water carriers, operating with well-coordinated, highly professional logistics teams located across strategic dispatch stations.
                </p>

                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  We supply 100% genuine water sourced from filling points approved by the <strong>Karachi Water & Sewerage Board (KW&SB)</strong>, ensuring certified purity, correct mineral balance, and total compliance with government health benchmarks.
                </p>

                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Our fleet of 10,000 to 15,000 litre (1,000 to 10,000 gallon) rigid water tankers provides cost-effective, medium and bulk volume deliveries—large enough for mega construction projects, yet maneuverable enough for congested residential streets.
                </p>
              </div>

              {/* Key Credentials Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-200">
                <div className="p-3 bg-emerald-50 rounded-none border border-emerald-200 text-center">
                  <div className="text-xs text-emerald-800 font-black">FBR NTN</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">3601245-9</div>
                </div>
                <div className="p-3 bg-teal-50 rounded-none border border-teal-200 text-center">
                  <div className="text-xs text-teal-800 font-black">ESTABLISHED</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">Year 2002</div>
                </div>
                <div className="p-3 bg-sky-50 rounded-none border border-sky-200 text-center col-span-2 sm:col-span-1">
                  <div className="text-xs text-sky-800 font-black">WATER SOURCE</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">KW&SB Approved</div>
                </div>
              </div>
            </div>

            {/* Right Card: Official Executive Bio & Corporate Pledge */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 via-emerald-950 to-teal-950 p-7 sm:p-8 rounded-none text-white shadow-2xl relative overflow-hidden border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-none bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-5 border border-emerald-400/30">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">Executive Profile</h3>
                <div className="text-xs text-emerald-300 font-bold mb-4 uppercase tracking-wider">
                  Proprietor: Muhammad Ikhlaq
                </div>

                <div className="space-y-2.5 text-xs text-slate-200 leading-relaxed font-normal mb-6">
                  <div className="flex justify-between py-1 border-b border-emerald-800/40">
                    <span className="text-slate-400 font-medium">Full Name:</span>
                    <strong className="text-white">Muhammad Ikhlaq</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-800/40">
                    <span className="text-slate-400 font-medium">Father's Name:</span>
                    <strong className="text-white">Jumma Khan (Subedar)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-800/40">
                    <span className="text-slate-400 font-medium">National Tax (NTN):</span>
                    <strong className="text-emerald-300 font-mono">3601245-9</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-800/40">
                    <span className="text-slate-400 font-medium">Corporate Banker:</span>
                    <strong className="text-white">Askari Bank Ltd</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-800/40">
                    <span className="text-slate-400 font-medium">Branch Location:</span>
                    <strong className="text-white text-right">Gulistan-e-Jauhar, KHI</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400 font-medium">Registered Address:</span>
                    <strong className="text-white text-right">Plot A-12, Dariya Khan Rindh Goth</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800/50 flex items-center gap-3">
                <div className="w-11 h-11 rounded-none bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-base shadow">
                  MI
                </div>
                <div>
                  <div className="font-black text-sm text-white">Muhammad Ikhlaq</div>
                  <div className="text-[11px] text-emerald-300 font-bold">Proprietor & Chief Executive Officer</div>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================
              ORGANIZATIONAL CHART & KEY MANAGEMENT PERSONNEL (PAGE 13-14)
              ======================================================== */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs rounded-none">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Company Staff Detail Chart
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Key Management & Technical Personnel
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Qualified mechanical and electrical engineers overseeing round-the-clock water logistics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STAFF_LIST.map((staff, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-gradient-to-br from-white to-emerald-50/60 rounded-none border border-slate-200 hover:border-emerald-400 transition-all shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{staff.name}</h4>
                      <p className="text-xs font-bold text-emerald-700">{staff.role}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-none border border-slate-100 font-medium">
                    {staff.qualification}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              VERIFIED CORPORATE CLIENT PORTFOLIO (PAGE 16)
              ======================================================== */}
          <div className="mb-16 p-8 sm:p-10 bg-slate-900 rounded-none text-white border border-slate-800 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs rounded-none">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Corporate Relationships
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Major Construction & Institutional Clients
                </h3>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Documented work orders and satisfactory completion certificates on record with leading national contractors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {CLIENTS_LIST.map((client, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-slate-800/80 rounded-none border border-slate-700/80 hover:border-emerald-400/60 transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h5 className="font-bold text-xs text-white truncate" title={client.name}>
                      {client.name}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {client.sector}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              DOCUMENTATION & CERTIFICATION CREDENTIALS (PAGES 6-10, 20-22)
              ======================================================== */}
          <div className="mb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs rounded-none">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                Legal Documents & Compliance
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Certificates & Verification Records
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fully documented with Federal & Provincial regulatory bodies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 bg-emerald-50/70 border border-emerald-300 rounded-none">
                <div className="w-10 h-10 rounded-none bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  FBR
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">Taxpayer Certificate</h4>
                <p className="text-xs text-slate-600 mb-2">
                  NTN: <strong>3601245-9</strong> issued by Federal Board of Revenue, RTO-I Karachi.
                </p>
                <span className="text-[11px] font-bold text-emerald-700">✓ Active Taxpayer</span>
              </div>

              <div className="p-5 bg-teal-50/70 border border-teal-300 rounded-none">
                <div className="w-10 h-10 rounded-none bg-teal-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  POLICE
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">Character Clearance</h4>
                <p className="text-xs text-slate-600 mb-2">
                  Station House Officer (SHO) clean record certificate, PS Sachal, District East Karachi.
                </p>
                <span className="text-[11px] font-bold text-teal-700">✓ 100% Clean Record</span>
              </div>

              <div className="p-5 bg-sky-50/70 border border-sky-300 rounded-none">
                <div className="w-10 h-10 rounded-none bg-sky-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                  BANK
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">Askari Bank Certificate</h4>
                <p className="text-xs text-slate-600 mb-2">
                  Sole Proprietor Current A/C # 0032-0100018441 maintained since Sept 27, 2010.
                </p>
                <span className="text-[11px] font-bold text-sky-700">✓ Askari Bank Jauhar</span>
              </div>

              <div className="p-5 bg-green-50/70 border border-green-300 rounded-none">
                <div className="w-10 h-10 rounded-none bg-green-700 text-white flex items-center justify-center font-bold text-sm mb-3">
                  KW&SB
                </div>
                <h4 className="font-black text-sm text-slate-900 mb-1">Hydrant Contractor</h4>
                <p className="text-xs text-slate-600 mb-2">
                  Official tender contractor for NIPA Hydrant & approved KW&SB filling points.
                </p>
                <span className="text-[11px] font-bold text-green-700">✓ KW&SB Authorized</span>
              </div>

            </div>
          </div>

          {/* ========================================================
              AUTHENTIC STATS BAR
              ======================================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-none border border-emerald-300 text-center shadow-md">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900">2002</div>
              <div className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">Year Established</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900">40+</div>
              <div className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">Owned Heavy Bowsers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900">100%</div>
              <div className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">KW&SB Approved Source</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-900">24/7</div>
              <div className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">Active Dispatch Desk</div>
            </div>
          </div>

        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

    </div>
  );
};

export default AboutPage;
