import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Droplets, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Truck,
  Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, resetPassword, demoLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email address or password. Please try again.");
      } else {
        setError(err.message || "Failed to sign in. Please verify your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    try {
      await resetPassword(forgotEmail);
      setResetSent(true);
      setTimeout(() => {
        setShowForgotModal(false);
        setResetSent(false);
      }, 3000);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDemoSignIn = (role) => {
    demoLogin(role);
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/my-orders");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative ambient hydro circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-md bg-white rounded-none p-8 sm:p-10 border border-slate-200 shadow-xl relative">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-none bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/30">
            <Droplets className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Sign in to manage your water orders and scheduled deliveries
          </p>
        </div>

        {/* Demo Fast-Login Pill */}
        <div className="mb-6 p-3 bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-none text-xs">
          <div className="flex items-center gap-1.5 text-sky-800 font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Instant Demo Logins (1-Click Review):</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn("customer")}
              className="py-1.5 px-2 bg-white hover:bg-sky-600 hover:text-white text-sky-700 font-semibold rounded-lg border border-sky-300 transition text-center shadow-xs"
            >
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn("admin")}
              className="py-1.5 px-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 font-semibold rounded-lg border border-emerald-300 transition text-center shadow-xs"
            >
              <span>Admin Console Demo</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-none text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                placeholder="name@example.com"
                className="input-field pl-9.5 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input-field pl-9.5 pr-10 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-sky-primary w-full py-3.5 text-sm rounded-xl font-bold flex items-center justify-center gap-2 shadow-sky-500/25 mt-2"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account yet?{" "}
          <Link to="/register" className="font-bold text-sky-600 hover:text-sky-700">
            Create Free Account
          </Link>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Reset Password
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered email address and we'll send you a password reset link.
            </p>

            {resetSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-none text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Password reset email dispatched! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field text-sm"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="btn-outline w-1/2 py-2 text-xs"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="btn-sky-primary w-1/2 py-2 text-xs"
                  >
                    <span>Send Link</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
