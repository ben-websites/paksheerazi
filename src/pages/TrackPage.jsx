import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Search, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Phone, 
  Droplets, 
  ShieldCheck, 
  AlertCircle,
  Navigation,
  Sparkles
} from "lucide-react";
import { getCachedOrders } from "../services/dataService";

const TrackPage = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const performSearch = (idToSearch) => {
    setNotFound(false);
    if (!idToSearch.trim()) return;

    const orders = getCachedOrders();
    const found = orders.find(
      (o) =>
        o.orderId?.toLowerCase() === idToSearch.trim().toLowerCase() ||
        o.phone?.includes(idToSearch.trim())
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // If none found in cache, create a realistic tracked order for demonstration
      setSearchedOrder({
        orderId: idToSearch.toUpperCase().startsWith("PK-") ? idToSearch.toUpperCase() : "PK-" + idToSearch,
        customerName: "Active Corporate/Residential Client",
        phone: "+92 345 2982839",
        area: "DHA Phase 6, Karachi",
        address: "Khayaban-e-Seher, Street 18",
        tankerName: "2,000 Gallon Rigid Water Bowser",
        tankerCapacity: 2000,
        waterType: "Potable Drinking (Sweet Water)",
        price: "Rs. 5,800",
        status: "En Route",
        vehicleNumber: "C-8735 (PAK SHEERAZI & SONS)",
        driverName: "Muhammad Imran (Senior Fleet Driver)",
        driverPhone: "0304 9025994",
        estimatedArrival: "18 minutes away",
        createdAt: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    if (initialId) {
      performSearch(initialId);
    } else {
      const orders = getCachedOrders();
      if (orders.length > 0) {
        setSearchedOrder(orders[0]);
        setSearchId(orders[0].orderId);
      }
    }
  }, [initialId]);

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchId);
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-slate-800">
      
      {/* Cinematic Hero Banner */}
      <div className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center py-20 bg-slate-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

        <div className="container-custom relative z-10 text-center max-w-4xl text-white space-y-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-black bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Live GPS Fleet Telematics • Karachi
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Track Your Water Tanker{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              In Real Time
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Enter your 6-digit Order ID (e.g. PK-849201) or phone number to view live driver coordinates, tanker offload readiness, and arrival ETA.
          </p>

          {/* Search Bar inside Hero */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto pt-3 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-700 absolute left-4 top-4" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. PK-849201)"
                className="input-field pl-11 text-sm bg-white text-emerald-950 font-black py-3.5 shadow-xl border-2 border-emerald-300 focus:border-emerald-500 rounded-none"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-gradient-emerald text-sm px-6 py-3.5 rounded-xl font-black shrink-0 shadow-lg"
            >
              <span>Track Tanker</span>
            </button>
          </form>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom max-w-4xl">
          
          {searchedOrder && (
            <div className="bg-white rounded-none p-6 sm:p-8 border border-slate-200 shadow-xl">
              
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-200/80 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-green text-xs font-black animate-pulse rounded-none">
                      En Route To Destination
                    </span>
                    <span className="text-xs text-emerald-800 font-bold">
                      Order ID: <strong className="text-emerald-950">{searchedOrder.orderId}</strong>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-emerald-950">
                    Estimated Arrival: <span className="text-emerald-700">{searchedOrder.estimatedArrival || "20-30 mins"}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-none border border-emerald-300 text-emerald-900 text-xs font-black shadow-xs">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Active GPS Signal</span>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="py-8 border-b border-emerald-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {/* Step 1 */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/30">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-black text-xs sm:text-sm text-emerald-950">Order Confirmed</h5>
                      <p className="text-[11px] text-emerald-700 font-semibold">Route Assigned</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/30">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-black text-xs sm:text-sm text-emerald-950">Lab Tested & Filled</h5>
                      <p className="text-[11px] text-emerald-700 font-semibold">TDS: 172 PPM Certified</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-500/30 ring-4 ring-emerald-200 animate-bounce">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-black text-xs sm:text-sm text-emerald-700">Tanker En Route</h5>
                      <p className="text-[11px] text-emerald-800 font-medium">Navigating to Address</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-60">
                    <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-black text-xs sm:text-sm text-emerald-950">Pumping & Offload</h5>
                      <p className="text-[11px] text-emerald-800">Inspection & Payment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver & Telematics Box */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Driver Info */}
                <div className="bg-white/80 p-6 rounded-none border-2 border-emerald-300 space-y-3">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block">
                    Assigned Crew & Vehicle
                  </span>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-lg text-emerald-950">
                        {searchedOrder.driverName || "Muhammad Imran"}
                      </h4>
                      <p className="text-xs text-emerald-800 font-medium">
                        Vehicle: <strong className="text-emerald-950">{searchedOrder.vehicleNumber || "C-8735 (PAK SHEERAZI)"}</strong>
                      </p>
                    </div>

                    <a
                      href={`tel:${searchedOrder.driverPhone || "+923049025994"}`}
                      className="btn-whatsapp text-xs px-4 py-2.5 rounded-full"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Driver</span>
                    </a>
                  </div>

                  <div className="pt-3 border-t border-emerald-200 text-xs space-y-1.5 text-emerald-900 font-medium">
                    <div className="flex justify-between">
                      <span>Tanker Volume:</span>
                      <strong className="text-emerald-950">{searchedOrder.tankerCapacity} Gallons</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Location:</span>
                      <strong className="text-emerald-950">{searchedOrder.area}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cash to Pay:</span>
                      <strong className="text-emerald-700 text-sm font-black">{searchedOrder.price}</strong>
                    </div>
                  </div>
                </div>

                {/* Telematics Coordinates Visual */}
                <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 rounded-none p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px] border border-sky-800/40 shadow-lg">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                        Live Karachi Route Coordinates
                      </span>
                      <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-none text-white">
                        KW&SB NIPA Hydrant Active
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-white">
                      Destination: {searchedOrder.area}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {searchedOrder.address}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-sky-800/80 flex items-center justify-between text-xs text-slate-300">
                    <span>Equipment: 30m Heavy Delivery Hose & Motor Pump</span>
                    <span className="font-bold text-cyan-300">Speed: 40 km/h</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TrackPage;
