import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Droplets, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Truck,
  CheckCircle,
  MessageCircle,
  Award,
  Send,
  Navigation
} from "lucide-react";

const Footer = ({ onOpenBooking }) => {
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSent, setCallbackSent] = useState(false);

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
      setCallbackPhone("");
    }, 4000);
  };

  return (
    <footer className="bg-[#070b14] text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* ========================================================
            TOP CALLBACK & EMERGENCY DISPATCH BAR
            ======================================================== */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-none p-6 sm:p-8 mb-14 border border-sky-800/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="text-center lg:text-left space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
                24/7 Rapid Callback Service
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Need Water Right Now? Enter Your Phone For a 5-Min Callback
            </h3>
            <p className="text-xs text-slate-400">
              Our Karachi dispatch manager will ring you immediately to confirm tanker capacity and arrival time.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {callbackSent ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-5 py-3 rounded-none border border-emerald-500/40 text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Callback request received! Calling you in under 5 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="flex gap-2 max-w-md w-full">
                <input
                  type="tel"
                  placeholder="0345-2982839"
                  className="input-field text-xs sm:text-sm py-3 bg-slate-950 text-white border-slate-700 focus:border-cyan-400 rounded-none"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-sky-primary text-xs sm:text-sm py-3 px-6 rounded-full font-extrabold shrink-0 shadow-lg shadow-sky-500/30 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Call Me</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* ========================================================
            4-COLUMN CORPORATE STRUCTURE
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80 text-xs sm:text-sm">
          
          {/* Col 1: Brand & Corporate Governance (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-none bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PAK <span className="text-cyan-400">SHEERAZI</span> & SONS
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pak Sheerazi & Sons (پاک شیرازی اینڈ سنز) is a government and private sector water supplier contractor incorporated in 2002 under Proprietor <strong>Muhammad Ikhlaq</strong>. Sourced directly from official KW&SB hydrants with 40+ owned heavy bowsers.
            </p>

            <div className="pt-2 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>FBR Registered Taxpayer — NTN: 3601245-9</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>KW&SB Approved Hydrant Filling Points</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Police Verified Clean Character Record (PS Sachal)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Water Supply Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Water Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition">Water Storage Tanks</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition">Emergency Bulk Delivery</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition">Swimming Pool Fills</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition">Construction Curing</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition">Continuous Fleet Relay</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition text-cyan-400 font-bold">24/7 Emergency Relief</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Karachi Physical Office & Hubs (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Registered Locations
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Head Office:</strong>
                  <span>Plot # A-12, Dariya Khan Rindh Goth, Gulshan-e-Iqbal, Karachi</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Johar Station:</strong>
                  <span>H.No E-416, Bhitaiabad Nazd Balock Chock, Gulistan-e-Johar</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Fleet Maintenance Yard:</strong>
                  <span>H.No 544, Gali No 15, Jando Para, Karachi</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Contact Lines (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Hotlines & Portals
            </h4>

            <div className="space-y-2 text-xs">
              <a href="tel:+923452982839" className="flex items-center gap-2 text-white font-bold hover:text-cyan-300 transition">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Primary: 0345-2982839</span>
              </a>
              <a href="tel:+923218970244" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Operations: 0321-8970244</span>
              </a>
              <a href="tel:+923456011026" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Hotline: 0345-6011026</span>
              </a>
              <a href="mailto:paksheeraziandsons@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>paksheeraziandsons@gmail.com</span>
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <Link to="/track" className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white text-xs font-bold transition">
                <Truck className="w-3.5 h-3.5" />
                <span>Track Live Tanker GPS</span>
              </Link>
              <br />
              <Link to="/admin" className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Operations Console</span>
              </Link>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block mb-1">
                Corporate Banker:
              </span>
              <div className="flex gap-1.5 flex-wrap text-[10px] text-slate-300">
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-none font-bold text-emerald-400">Askari Bank Ltd</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-none">A/C 0032-0100018441</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-none">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================
            EXECUTIVE BOTTOM LEGAL & TRUST BAR
            ======================================================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Pak Sheerazi & Sons — Water Supplier Contractor (Est. 2002 • NTN: 3601245-9). All rights reserved.</p>
          
          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <span>Proprietor: Muhammad Ikhlaq</span>
            <span>•</span>
            <span>KW&SB Approved Hydrant Points</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">24/7/365 Operations</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
