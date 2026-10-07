import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Truck, 
  Sparkles, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  Compass
} from "lucide-react";

const HUBS = [
  {
    id: "head-office",
    name: "Pak Sheerazi & Sons — Corporate Head Office",
    area: "Gulshan-e-Iqbal (Dariya Khan Rindh Goth)",
    address: "Plot # A-12, Dariya Khan Rindh Goth, Gulshan-e-Iqbal, Karachi",
    timing: "Open 24/7 (Central Dispatch Desk)",
    phone: "0304 9025994 / 0321-8970244",
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
    phone: "0345-6011026 / 0304 9025994",
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
    phone: "0304 9025994 / 0345-6011026",
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
    phone: "0321-8970244 / 0304 9025994",
    isHQ: false,
    embedUrl: "https://maps.google.com/maps?q=Karachi+East+Sindh&t=&z=13&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://maps.google.com/?q=Jando+Para+Karachi"
  }
];

const ContactPage = ({ onOpenBooking }) => {
  const [selectedHub, setSelectedHub] = useState(HUBS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "DHA Phase 6",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", area: "DHA Phase 6", message: "" });
    }, 4500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-slate-800">
      
      {/* ========================================================
          HERO BANNER WITH LIGHT GREEN & EMERALD GRADIENT OVERLAY
          ======================================================== */}
      <div className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center py-20 bg-slate-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('/office_headquarters.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        <div className="container-custom relative z-10 text-center max-w-4xl text-white space-y-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-black bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            24/7 Karachi Dispatch Command & Offices
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Contact Us &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Find Us On The Map
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Need immediate water tanker delivery, on-site counter booking, or commercial recurring supply? Our dispatch teams are available 24 hours a day.
          </p>

          <div className="flex items-center justify-center gap-3.5 pt-2 flex-wrap">
            <a
              href="tel:+923049025994"
              className="btn-gradient-emerald text-sm sm:text-base px-7 py-3.5 rounded-full font-black shadow-xl shadow-emerald-500/40 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Hotline: 0304 9025994</span>
            </a>
            
            <a
              href="https://wa.me/923049025994?text=Assalam-o-Alaikum%2C%20I%20want%20to%20visit%20your%20office%20or%20book%20a%20tanker%20from%20Pak%20Sheerazi%20%26%20Sons"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm sm:text-base px-6 py-3.5 rounded-full font-bold shadow-xl"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          EMBEDDED REAL GOOGLE MAP & STATION LOCATOR SECTION
          ======================================================== */}
      <div className="section-padding">
        <div className="container-custom max-w-6xl">
          
          {/* Map & Office Card with Light Green Gradient */}
          <div className="bg-gradient-to-br from-white/95 via-emerald-100/80 to-green-100 rounded-none border-2 border-emerald-400 shadow-2xl overflow-hidden mb-16">
            
            {/* Station Switcher Header */}
            <div className="bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 p-4 border-b-2 border-emerald-300 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-950">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Karachi Dispatch Hub & Terminal Locator:</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHub(hub)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center gap-1.5 group ${
                        selectedHub.id === hub.id
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 scale-102"
                          : "bg-white text-emerald-950 hover:bg-emerald-600 hover:text-white border border-emerald-300 font-bold"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0 transition-colors group-hover:text-white" />
                      <span>{hub.area}</span>
                    </button>
                ))}
              </div>
            </div>

            {/* Split Map + Station Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Real Embedded Google Map (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[400px] sm:min-h-[460px] bg-slate-100">
                <iframe
                  title="Pak Sheerazi Google Map Location"
                  src={selectedHub.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-none shadow-lg border border-emerald-300 flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Active Station: {selectedHub.area}</span>
                </div>
              </div>

              {/* Station Details & Directions (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white/95 via-emerald-100/70 to-green-100/80">
                <div className="space-y-4">
                  <div>
                    <span className="badge-green text-[10px] font-black mb-1 rounded-none">
                      {selectedHub.isHQ ? "Central Dispatch Depot" : "Satellite Fleet Hub"}
                    </span>
                    <h3 className="text-2xl font-black text-emerald-950 tracking-tight">
                      {selectedHub.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-900 font-medium mt-2 leading-relaxed flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{selectedHub.address}</span>
                    </p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-emerald-900 border-y border-emerald-200/80 py-4">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Hours:</strong> {selectedHub.timing}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Phone:</strong> {selectedHub.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Email:</strong> paksheeraziandsons@gmail.com</span>
                    </div>
                  </div>

                  <div className="bg-emerald-100/80 p-3.5 rounded-none border border-emerald-300 text-xs text-emerald-950 space-y-1">
                    <div className="font-black flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Walk-In Counter Services:</span>
                    </div>
                    <p className="text-emerald-900 font-medium pl-5">
                      On-site water TDS test, immediate driver assignment, and official cash/card receipt.
                    </p>
                  </div>
                </div>

                <div className="pt-5 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={selectedHub.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient-emerald text-xs sm:text-sm py-3 px-5 rounded-xl font-bold flex items-center justify-center gap-2 flex-1 shadow-md shadow-emerald-500/25"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onOpenBooking(2000, selectedHub.area)}
                    className="btn-gradient-mint text-xs sm:text-sm py-3 px-5 rounded-xl font-bold"
                  >
                    <span>Order Tanker Online</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Contact Form */}
          <div className="bg-white p-8 sm:p-12 rounded-none border border-slate-200 shadow-xl max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="badge-green text-[10px] mb-2 font-black shadow-xs rounded-none">Online Dispatch Desk</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Send Us a Quick Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Our operations manager will respond or call you within 10 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 text-emerald-800 rounded-none text-center space-y-2 border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-black text-lg">Message Dispatched!</h4>
                <p className="text-xs text-slate-600">
                  Thank you. Our dispatch desk has received your request and will call you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Asad Qureshi"
                      className="input-field text-sm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="0304 9025994"
                      className="input-field text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">Karachi Delivery Sector / Area *</label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 6, Khayaban-e-Seher or Clifton Block 4"
                    className="input-field text-sm"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">Requirements / Inquiry *</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Need 2,000 Gallons Sweet Water immediately / Inquiry regarding monthly commercial hotel supply"
                    className="input-field text-sm resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gradient-emerald w-full py-4 text-sm sm:text-base font-black rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Dispatch Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ContactPage;
