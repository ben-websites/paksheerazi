import { useState } from "react";
import { 
  MapPin, 
  Search, 
  Clock, 
  Truck, 
  Info, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { SERVICE_AREAS, DEFAULT_TANKERS } from "../services/dataService";

const RatesTableSection = ({ onOpenBooking }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAreas = SERVICE_AREAS.filter((a) =>
    a.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="rates" className="section-padding bg-white relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="badge-green text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Transparent Karachi Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Rates & Delivery Timelines By Area
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-2 max-w-xl">
              All prices include tanker transit, fuel, driver allowance, and electric/diesel booster pumping directly to your overhead or underground storage tanks.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search DHA, Clifton, Bahria..."
              className="input-field pl-10 text-sm bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-800 font-semibold rounded-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Rates Table Container */}
        <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-800">
              <thead className="bg-gradient-to-r from-blue-900 via-sky-800 to-teal-800 border-b border-slate-200 text-xs font-black text-white uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Karachi Service Area</th>
                  <th className="py-4 px-4 text-center">1,000 Gallon</th>
                  <th className="py-4 px-4 text-center">2,000 Gallon</th>
                  <th className="py-4 px-4 text-center">3,000 Gallon</th>
                  <th className="py-4 px-4 text-center">5,000 Gallon Bowser</th>
                  <th className="py-4 px-4 text-center">Avg Dispatch ETA</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((areaItem, index) => {
                    const price1000 = 3800 + areaItem.surcharge;
                    const price2000 = 5600 + areaItem.surcharge;
                    const price3000 = 7800 + areaItem.surcharge;
                    const price5000 = 12500 + areaItem.surcharge;

                    return (
                      <tr 
                        key={index} 
                        className="hover:bg-emerald-50/50 transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{areaItem.area}</span>
                        </td>
                        <td className="py-4 px-4 text-center font-semibold text-slate-700">
                          Rs. {price1000.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-center font-black text-slate-900">
                          Rs. {price2000.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-center font-semibold text-slate-700">
                          Rs. {price3000.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-center font-semibold text-slate-700">
                          Rs. {price5000.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-none border border-emerald-200">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            {areaItem.baseDeliveryMins} mins
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => onOpenBooking(2000, areaItem.area)}
                            className="btn-gradient-emerald text-xs px-3.5 py-1.5 rounded-lg font-bold shadow-xs"
                          >
                            <span>Book Area</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-slate-400">
                      No matching areas found for "{searchTerm}". Call our official dispatch team at 0345-2982839 / 0321-8970244 for custom coverage!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
              <span>KW&SB Approved Contractor rates. Bulk supply contracts available for construction and commercial sites.</span>
            </div>
            <a href="tel:+923452982839" className="font-semibold text-slate-700 hover:text-emerald-600">
              Dispatch: 0345-2982839 / 0321-8970244
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RatesTableSection;
