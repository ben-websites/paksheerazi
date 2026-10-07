import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Droplets,
  Calendar,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getCustomerRequests } from "../services/dataService";

const MyOrdersPage = ({ onOpenBooking }) => {
  const { user, userProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const email = user ? user.email : "paksheeraziandsons@gmail.com";
      const uid = user ? user.uid : "guest";
      const data = await getCustomerRequests(email, uid);
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  const getStatusBadge = (status) => {
    if (status?.includes("En Route") || status?.includes("Transit")) {
      return (
        <span className="badge-sky text-xs font-bold animate-pulse">
          Tanker En Route 🚚
        </span>
      );
    }
    if (status?.includes("Delivered") || status?.includes("Completed")) {
      return (
        <span className="badge-green text-xs font-bold">
          Delivered & Inspected
        </span>
      );
    }
    return (
      <span className="badge-amber text-xs font-bold">
        {status || "Processing"}
      </span>
    );
  };

  return (
    <div className="section-padding bg-slate-50/70 min-h-[85vh]">
      <div className="container-custom">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <span className="badge-sky text-xs font-bold mb-1">Customer Portal</span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Water Deliveries
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Welcome back, <strong>{userProfile?.name || user?.displayName || user?.email || "Valued Customer"}</strong>. View live tanker status and order history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadOrders}
              className="btn-outline text-xs px-3.5 py-2.5 flex items-center gap-2"
              title="Refresh order status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="btn-sky-primary text-xs px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sky-400/40"
            >
              <Truck className="w-4 h-4" />
              <span>Book New Tanker</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-none border border-slate-200">
            <RefreshCw className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">Loading your deliveries...</p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-none border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-none bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">No Orders Placed Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
              You haven't requested any water tankers under this account yet. Need potable water or a commercial tanker?
            </p>
            <button
              onClick={() => onOpenBooking()}
              className="btn-sky-primary text-sm px-6 py-3 rounded-full"
            >
              <span>Order Your First Tanker</span>
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId || order.id}
                className="bg-white rounded-none p-6 sm:p-7 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
              >
                {/* Top Info Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                      <Truck className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          Order #{order.orderId}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <span className="text-xs text-slate-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-extrabold text-sky-700 block">
                      {order.price}
                    </span>
                    <span className="text-[11px] text-slate-400">Payable via COD</span>
                  </div>
                </div>

                {/* Main Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
                  {/* Col 1: Water & Tanker */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tanker Specs
                    </span>
                    <p className="font-bold text-slate-800 text-sm">
                      {order.tankerName || `${order.tankerCapacity} Gallon Tanker`}
                    </p>
                    <p className="text-slate-600 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-sky-500" />
                      <span>{order.waterType}</span>
                    </p>
                    <p className="text-slate-500">
                      Timing: <strong>{order.deliveryTiming || "Immediate"}</strong>
                    </p>
                  </div>

                  {/* Col 2: Destination */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Delivery Address
                    </span>
                    <p className="font-semibold text-slate-800 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{order.area}</span>
                    </p>
                    <p className="text-slate-600 pl-5 text-xs">
                      {order.address}
                    </p>
                    {order.notes && (
                      <p className="text-[11px] text-slate-400 pl-5 italic">
                        Note: "{order.notes}"
                      </p>
                    )}
                  </div>

                  {/* Col 3: Driver & Vehicle Assignment */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-none border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Assigned Driver & Tanker
                    </span>
                    <p className="font-bold text-slate-900">
                      {order.driverName || "Driver Assigned"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Vehicle:</span>
                      <span className="font-semibold text-slate-800">{order.vehicleNumber || "KHI-TK-8821"}</span>
                    </div>
                    {order.driverPhone && (
                      <a
                        href={`tel:${order.driverPhone}`}
                        className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-xs mt-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Driver: {order.driverPhone}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <Link
                    to={`/track?id=${order.orderId}`}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <span>View Live Map / GPS Status</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenBooking(order.tankerCapacity, order.area)}
                    className="btn-sky-secondary text-xs px-4 py-2 rounded-full"
                  >
                    <span>Repeat This Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrdersPage;
