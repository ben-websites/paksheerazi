import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Truck, 
  Droplets, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Phone, 
  MapPin, 
  Search,
  Filter,
  Sliders
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { 
  getAllRequestsForAdmin, 
  DEFAULT_TANKERS, 
  SERVICE_AREAS, 
  saveCachedOrders, 
  getCachedOrders 
} from "../services/dataService";

const AdminPage = () => {
  const { user, isAdmin, demoLogin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tankers, setTankers] = useState(DEFAULT_TANKERS);
  const [activeTab, setActiveTab] = useState("orders"); // orders | fleet | rates
  const [notice, setNotice] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAllRequestsForAdmin();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    saveCachedOrders(updated);
    setNotice(`Order ${orderId} updated to "${newStatus}"`);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleToggleTankerAvailability = (tankerId) => {
    const updated = tankers.map((t) => {
      if (t.id === tankerId) {
        const nextStatus = t.availability === "Available Now" ? "High Demand" : "Available Now";
        return { ...t, availability: nextStatus };
      }
      return t;
    });
    setTankers(updated);
    setNotice("Tanker availability state synchronized.");
    setTimeout(() => setNotice(""), 3500);
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "all") return true;
    return o.status?.toLowerCase().includes(statusFilter.toLowerCase());
  });

  // Calculate live stats
  const totalOrdersCount = orders.length;
  const activeEnRouteCount = orders.filter(o => o.status?.includes("En Route") || o.status?.includes("Transit")).length;
  const completedCount = orders.filter(o => o.status?.includes("Delivered") || o.status?.includes("Completed")).length;
  const estimatedRevenue = orders.reduce((sum, o) => {
    const num = o.numericPrice || (parseInt(o.price?.replace(/[^0-9]/g, "")) || 4500);
    return sum + num;
  }, 0);

  return (
    <div className="section-padding bg-slate-50/80 min-h-[90vh]">
      <div className="container-custom">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-sky text-[11px] font-bold bg-emerald-100 text-emerald-800 border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                Admin Operations Console
              </span>
              <span className="text-xs text-slate-400">Pak Sheerazi Dispatch HQ</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Fleet & Dispatch Command
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real-time monitoring of customer water bookings, driver assignments, and Karachi area rates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isAdmin && (
              <button
                onClick={() => demoLogin("admin")}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
              >
                <span>Switch to Admin Mode</span>
              </button>
            )}

            <button
              onClick={loadData}
              className="btn-outline text-xs px-3.5 py-2 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {notice && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-none text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Total Requests</span>
              <div className="text-2xl font-extrabold text-slate-900">{totalOrdersCount}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6 text-cyan-600 animate-pulse" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Active En Route</span>
              <div className="text-2xl font-extrabold text-cyan-700">{activeEnRouteCount}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Completed Deliveries</span>
              <div className="text-2xl font-extrabold text-emerald-700">{completedCount}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">COD Bookings Total</span>
              <div className="text-2xl font-extrabold text-slate-900">
                Rs. {estimatedRevenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "orders"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:text-sky-600 hover:bg-white"
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("fleet")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "fleet"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:text-sky-600 hover:bg-white"
            }`}
          >
            Fleet Availability Control
          </button>
          <button
            onClick={() => setActiveTab("rates")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "rates"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:text-sky-600 hover:bg-white"
            }`}
          >
            Service Areas ({SERVICE_AREAS.length})
          </button>
        </div>

        {/* TAB 1: Customer Requests Board */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden">
            {/* Table Control Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Live Orders Queue ({filteredOrders.length})
              </span>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 mr-1">Filter:</span>
                {["all", "preparing", "en route", "delivered"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                      statusFilter === st
                        ? "bg-emerald-700 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    <span>{st}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer & Phone</th>
                    <th className="py-3.5 px-4">Destination & Area</th>
                    <th className="py-3.5 px-4">Tanker Volume</th>
                    <th className="py-3.5 px-4">Fare (COD)</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Update Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-50/60 transition">
                        <td className="py-4 px-4 font-bold text-sky-700 whitespace-nowrap">
                          {order.orderId}
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900">{order.customerName}</div>
                          <a href={`tel:${order.phone}`} className="text-xs text-emerald-600 font-semibold hover:underline">
                            {order.phone}
                          </a>
                        </td>

                        <td className="py-4 px-4 max-w-xs">
                          <span className="font-bold text-slate-800 block">{order.area}</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{order.address}</span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-semibold text-slate-800">{order.tankerCapacity} Gallons</span>
                          <span className="text-[11px] text-slate-400 block">{order.waterType?.split("(")[0]}</span>
                        </td>

                        <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                          {order.price}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            order.status?.includes("En Route")
                              ? "bg-sky-100 text-sky-800 border border-sky-300"
                              : order.status?.includes("Delivered")
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}>
                            {order.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <select
                            className="select-field text-xs py-1.5 px-2 bg-white border-slate-300 w-auto"
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value)}
                          >
                            <option value="Confirmed - Preparing Dispatch">Preparing</option>
                            <option value="En Route">En Route 🚚</option>
                            <option value="Delivered">Delivered ✅</option>
                            <option value="Cancelled">Cancelled ❌</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-10 text-slate-400">
                        No orders matching the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Fleet Availability Control */}
        {activeTab === "fleet" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tankers.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-none border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge-sky text-[10px] rounded-none">{t.vehicleType.split("/")[0]}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-none ${
                      t.availability === "Available Now"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {t.availability}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-1">{t.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{t.idealFor}</p>

                  <div className="text-xs space-y-1.5 text-slate-600 mb-4">
                    <div className="flex justify-between">
                      <span>Base Rate:</span>
                      <strong>Rs. {t.basePrice.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Pump System:</span>
                      <strong>{t.pumpPressure}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleTankerAvailability(t.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition border ${
                    t.availability === "Available Now"
                      ? "border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-600 hover:text-white"
                      : "border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white"
                  }`}
                >
                  <span>Toggle Availability Status</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Service Areas */}
        {activeTab === "rates" && (
          <div className="bg-white rounded-none border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Configured Karachi Coverage Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {SERVICE_AREAS.map((a, i) => (
                <div key={i} className="p-4 rounded-none bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-sm">{a.area}</span>
                    <span className="badge-green text-[10px] rounded-none">{a.status}</span>
                  </div>
                  <p className="text-slate-500">Dispatch ETA: <strong>{a.baseDeliveryMins} mins</strong></p>
                  <p className="text-slate-500">Area Transit Fee: <strong>+Rs. {a.surcharge}</strong></p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
