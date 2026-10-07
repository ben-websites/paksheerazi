mport { useState, useEffect } from "react";
import { 
  X, 
  Truck, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  Home, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DEFAULT_TANKERS, SERVICE_AREAS, calculateRate, createWaterRequest } from "../services/dataService";

const BookingModal = ({ isOpen, onClose, initialTankerCapacity, initialArea }) => {
  const { user, userProfile } = useAuth();

  const [selectedCapacity, setSelectedCapacity] = useState(initialTankerCapacity || 2000);
  const [selectedArea, setSelectedArea] = useState(initialArea || "DHA Phase 4, 5 & 6");
  const [waterType, setWaterType] = useState("Potable Drinking (Sweet Water)");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [deliveryTiming, setDeliveryTiming] = useState("Immediate Dispatch (Next 35-45 mins)");

  const [rateDetails, setRateDetails] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Populate user data if logged in
  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setName(userProfile.name);
      if (userProfile.phone) setPhone(userProfile.phone);
      if (userProfile.address) setAddress(userProfile.address);
    } else if (user) {
      if (user.displayName) setName(user.displayName);
      if (user.email) setPhone("03");
    }
  }, [user, userProfile]);

  // Recalculate rates whenever area or capacity changes
  useEffect(() => {
    const rate = calculateRate(selectedArea, selectedCapacity);
    setRateDetails(rate);
  }, [selectedArea, selectedCapacity]);

  // Sync if initial properties change
  useEffect(() => {
    if (initialTankerCapacity) setSelectedCapacity(initialTankerCapacity);
    if (initialArea) setSelectedArea(initialArea);
  }, [initialTankerCapacity, initialArea]);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please provide your full contact name.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg("Please enter a valid Pakistani contact phone number (e.g., 0304 9025994).");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("Please provide your detailed house/plot address for our tanker driver.");
      return;
    }

    setSubmitting(true);

    try {
      const orderPayload = {
        userId: user ? user.uid : "guest",
        email: user ? user.email : "paksheeraziandsons@gmail.com",
        customerName: name,
        phone,
        area: selectedArea,
        address,
        notes,
        tankerName: rateDetails.tanker.name,
        tankerCapacity: Number(selectedCapacity),
        waterType,
        price: rateDetails.formattedPrice,
        numericPrice: rateDetails.totalPrice,
        deliveryTiming,
      };

      const result = await createWaterRequest(orderPayload);
      setOrderSuccess(result);
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("An error occurred while booking. Please try calling our hotline.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setOrderSuccess(null);
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {orderSuccess ? (
          /* Order Confirmation View */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="badge-green text-xs mb-2">Order Confirmed</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              Water Tanker Dispatched!
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              Thank you, <strong className="text-slate-800">{orderSuccess.customerName}</strong>. Our driver has received your route assignment and is en route.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-sky-50/60 border border-sky-200 rounded-none p-4 text-left mb-6 text-sm">
              <div className="flex justify-between items-center pb-2.5 border-b border-sky-200/60 mb-2.5">
                <span className="text-slate-500 font-medium">Tracking Order ID</span>
                <span className="font-extrabold text-sky-700 text-base">{orderSuccess.orderId}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Tanker Capacity</span>
                <span className="font-semibold text-slate-800">{orderSuccess.tankerCapacity} Gallons</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Destination</span>
                <span className="font-semibold text-slate-800">{orderSuccess.area}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Water Grade</span>
                <span className="font-semibold text-slate-800">{orderSuccess.waterType}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Assigned Driver</span>
                <span className="font-semibold text-slate-800">{orderSuccess.driverName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Assigned Tanker</span>
                <span className="font-semibold text-slate-800">{orderSuccess.vehicleNumber}</span>
              </div>
              <div className="flex justify-between items-center pt-2.5 border-t border-sky-200/60 mt-2">
                <span className="text-slate-700 font-bold">Total Cash On Delivery</span>
                <span className="font-extrabold text-lg text-sky-600">{orderSuccess.price}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={`https://wa.me/923049025994?text=Assalam-o-Alaikum%2C%20I%20placed%20Order%20${orderSuccess.orderId}%20for%20a%20water%20tanker%20at%20${encodeURIComponent(orderSuccess.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-sm py-3"
              >
                <span>Send Direct WhatsApp to Dispatcher</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="btn-outline w-full text-sm py-2.5"
              >
                <span>Done / Close Window</span>
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form View */
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-sky text-[11px] rounded-none">Instant Dispatch</span>
              <span className="text-xs text-slate-400">• Standard 35-45 Min Arrival</span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              Book Your Water Tanker
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Select your requirements below. Pay Cash on Delivery after tank inspection.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-none text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4">
              
              {/* Step 1: Tanker Capacity & Area Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanker Size (Capacity)
                  </label>
                  <select
                    className="select-field text-sm"
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(Number(e.target.value))}
                  >
                    {DEFAULT_TANKERS.map((t) => (
                      <option key={t.id} value={t.capacityGallons}>
                        {t.capacityGallons.toLocaleString()} Gallon ({t.idealFor.split(",")[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Karachi Area / Sector
                  </label>
                  <select
                    className="select-field text-sm"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {SERVICE_AREAS.map((a) => (
                      <option key={a.area} value={a.area}>
                        {a.area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Water Type & Timing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Water Type
                  </label>
                  <select
                    className="select-field text-sm"
                    value={waterType}
                    onChange={(e) => setWaterType(e.target.value)}
                  >
                    <option value="Potable Drinking (Sweet Water)">Potable Drinking (Sweet Water)</option>
                    <option value="Commercial / Swimming Pool Grade">Commercial / Swimming Pool Grade</option>
                    <option value="Construction & Concrete Curing">Construction & Concrete Curing</option>
                    <option value="RO Purified (Demineralized)">RO Purified (Demineralized)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Timing
                  </label>
                  <select
                    className="select-field text-sm"
                    value={deliveryTiming}
                    onChange={(e) => setDeliveryTiming(e.target.value)}
                  >
                    <option value="Immediate Dispatch (Next 35-45 mins)">Immediate Dispatch (Next 35-45 mins)</option>
                    <option value="Morning Delivery (8:00 AM - 11:00 AM)">Morning Delivery (8:00 AM - 11:00 AM)</option>
                    <option value="Afternoon Delivery (1:00 PM - 4:00 PM)">Afternoon Delivery (1:00 PM - 4:00 PM)</option>
                    <option value="Night Delivery (9:00 PM - 12:00 AM)">Night Delivery (9:00 PM - 12:00 AM)</option>
                  </select>
                </div>
              </div>

              {/* Live Price & Availability Summary Banner */}
              {rateDetails && (
                <div className="p-3.5 bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-none flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">
                      Total Payable (COD)
                    </span>
                    <div className="text-xl font-extrabold text-sky-700">
                      {rateDetails.formattedPrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="badge-green text-[10px] rounded-none">
                      {rateDetails.tanker.availability}
                    </span>
                    <div className="text-xs text-slate-600 mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-sky-600" />
                      <span>Est. ETA: {rateDetails.deliveryETA}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                  Delivery Details
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Tariq Mehmood"
                        className="input-field pl-9 text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="e.g. 0304 9025994"
                        className="input-field pl-9 text-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Exact Address / Street / House No. *
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. House 42-B, Street 12, Phase 6 (Near Ittehad Park)"
                      className="input-field pl-9 text-sm"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ground tank only, high pressure booster needed, call on gate"
                    className="input-field text-sm"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-sky-primary w-full py-3.5 text-base rounded-xl font-bold flex items-center justify-center gap-2 shadow-sky-500/30"
                >
                  {submitting ? (
                    <span>Dispatching Tanker...</span>
                  ) : (
                    <>
                      <Truck className="w-5 h-5" />
                      <span>Confirm & Dispatch Tanker</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  No advance payment needed. Pay in Cash or Online transfer after tanker offloading.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
