mport { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Droplets, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { SERVICE_AREAS } from "../services/dataService";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "DHA Phase 4, 5 & 6",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const fullAddress = `${formData.address}, ${formData.area}`;
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        fullAddress
      );

      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already registered. Please sign in instead.");
      } else {
        setError(err.message || "Failed to create account. Please check your inputs.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 bg-slate-50 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-xl bg-white rounded-none p-8 sm:p-10 border border-slate-200 shadow-xl relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-none bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/30">
            <Droplets className="w-7 h-7" />
          </div>
          <span className="badge-green text-[11px] mb-1 font-black rounded-none">Pak Sheerazi Customer Portal</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1 max-w-sm mx-auto">
            Enjoy 1-click tanker re-orders, real-time live driver tracking, and commercial billing statements.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-none text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Tariq Mehmood"
                  className="input-field pl-9.5 text-sm"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp / Phone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="0304 9025994"
                  className="input-field pl-9.5 text-sm"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                className="input-field pl-9.5 text-sm"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Karachi Area & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Delivery Area
              </label>
              <select
                name="area"
                className="select-field text-sm font-medium"
                value={formData.area}
                onChange={handleChange}
              >
                {SERVICE_AREAS.map((a) => (
                  <option key={a.area} value={a.area}>
                    {a.area}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Street & House / Plot *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. House 42-B, St 14"
                  className="input-field pl-9.5 text-sm"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Min 6 characters"
                  className="input-field pl-9.5 text-sm"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat password"
                  className="input-field pl-9.5 text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Customer Guarantee */}
          <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-none text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Your address & phone details are kept secure for fast tanker routing.</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="btn-sky-primary w-full py-3.5 text-sm rounded-xl font-bold flex items-center justify-center gap-2 shadow-sky-500/25 mt-2"
          >
            {loading ? (
              <span>Setting up your account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-sky-600 hover:text-sky-700">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;