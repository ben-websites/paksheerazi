import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Droplets,
  Phone,
  Clock,
  MapPin,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Truck,
  ClipboardList,
  ChevronDown,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// =========================================================================
// STATIC CONFIGURATION
// =========================================================================
const NAVIGATION_LINKS = [
  { label: "Home", path: "/", icon: Droplets },
  { label: "Services", path: "/services", icon: Sparkles },
  { label: "Fleet", path: "/fleet", icon: Truck },
  { label: "Rates & Areas", path: "/rates", icon: MapPin },
  { label: "Track Tanker", path: "/track", icon: Clock },
  { label: "About", path: "/about", icon: ShieldCheck },
  { label: "Contact", path: "/contact", icon: Phone },
];

const CONTACT_INFO = {
  phone: "0304 9025994",
  phoneRaw: "+923049025994",
  whatsappUrl:
    "https://wa.me/923049025994?text=Assalam-o-Alaikum%2C%20I%20need%20a%20water%20tanker%20from%20Pak%20Sheerazi%20%26%20Sons",
};

// =========================================================================
// MAIN COMPONENT EXPORT
// =========================================================================
export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { user, userProfile, isAdmin, logout, demoLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // -----------------------------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // ❌ REMOVED body scroll lock — background site remains scrollable

  // -----------------------------------------------------------------------
  // HANDLERS
  // -----------------------------------------------------------------------
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      setProfileDropdownOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout process failed:", err);
    }
  }, [logout, navigate]);

  const checkActiveState = useCallback(
    (path) => {
      if (path === "/") return location.pathname === "/";
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      <TopBar />

      <nav
        className={`w-full transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md py-2.5 shadow-md border-b border-emerald-300/85"
          : "bg-white/90 backdrop-blur-md py-3.5 shadow-sm border-b border-slate-200/80"
          }`}
      >
        {/* ✅ Added relative positioning + max-width constraint */}
        <div className="container-custom flex items-center justify-between gap-4 max-w-full">
          <BrandLogo />

          <DesktopMenu checkActiveState={checkActiveState} />

          {/* DESKTOP CONTROLS */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-full flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>Book Tanker</span>
            </button>

            {user ? (
              <ProfileMenu
                user={user}
                userProfile={userProfile}
                isAdmin={isAdmin}
                isOpen={profileDropdownOpen}
                setIsOpen={setProfileDropdownOpen}
                onLogout={handleLogout}
              />
            ) : (
              <AuthActions />
            )}
          </div>

          {/* ✅ MOBILE CONTROLS — kept compact & inside navbar bounds */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[11px] rounded-full flex items-center gap-1 shadow-md shadow-emerald-600/20 active:scale-95 transition-all shrink-0"
            >
              <Truck className="w-3 h-3" />
              <span>Book</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-emerald-300 bg-emerald-50 text-emerald-800 transition active:scale-90 shrink-0"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        checkActiveState={checkActiveState}
        user={user}
        userProfile={userProfile}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        demoLogin={demoLogin}
      />
    </header>
  );
}

// =========================================================================
// SUB-COMPONENTS
// =========================================================================

function TopBar() {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-sky-950 text-white text-xs py-2 px-4 border-b border-emerald-500/20">
      <div className="container-custom flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-bold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="hidden sm:inline">Pak Sheerazi & Sons •</span> 24/7 Dispatch
          </span>
          <span className="hidden md:inline text-emerald-800">|</span>
          <span className="hidden md:flex items-center gap-2 text-emerald-100 font-medium">
            <span className="bg-emerald-500/20 px-2 py-0.5 border border-emerald-400/30 text-emerald-300 font-bold text-[10px]">
              NTN: 3601245-9
            </span>
            <span>KW&SB Approved Contractor</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 font-extrabold text-white hover:text-emerald-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{CONTACT_INFO.phone}</span>
          </a>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 group shrink-0 min-w-0">
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shrink-0">
        <Droplets className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-black text-base sm:text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors whitespace-nowrap">
            PAK{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              SHEERAZI
            </span>
          </span>
          <span className="hidden sm:inline-block text-[9px] uppercase font-black tracking-wider px-1.5 py-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            Water
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 tracking-wide hidden sm:block whitespace-nowrap">
          Bulk & Potable Tanker Services • کراچی
        </span>
      </div>
    </Link>
  );
}

function DesktopMenu({ checkActiveState }) {
  return (
    <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
      {NAVIGATION_LINKS.map((link) => {
        const active = checkActiveState(link.path);
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-1.5 text-xs xl:text-sm font-extrabold whitespace-nowrap transition-all duration-300 relative ${active
              ? "text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 shadow-md shadow-emerald-600/25"
              : "text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
              }`}
          >
            {link.label}
            {active && (
              <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-white" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

function ProfileMenu({ user, userProfile, isAdmin, isOpen, setIsOpen, onLogout }) {
  const initials = useMemo(() => {
    const fallback = userProfile?.name || user?.displayName || user?.email || "U";
    return fallback.charAt(0).toUpperCase();
  }, [userProfile, user]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all text-slate-800 text-xs xl:text-sm font-extrabold shadow-sm"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs">
          {initials}
        </div>
        <span className="max-w-[90px] xl:max-w-[120px] truncate">
          {userProfile?.name || user?.displayName || "Account"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-56 bg-white shadow-xl border border-emerald-200 py-2 z-50">
          <div className="px-4 py-2.5 border-b border-emerald-100 bg-slate-50/50">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Logged in as
            </p>
            <p className="text-sm font-black text-slate-800 truncate">
              {userProfile?.name || user?.displayName || "Customer"}
            </p>
            <p className="text-xs text-emerald-600 truncate font-semibold">
              {user?.email}
            </p>
            <span className="mt-1.5 inline-block text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold uppercase">
              {userProfile?.role || "Customer"}
            </span>
          </div>

          <Link
            to="/my-orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
          >
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            <span>My Water Orders</span>
          </Link>

          <Link
            to="/track"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Live Tanker Tracker</span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-black text-emerald-800 hover:bg-emerald-50 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Dispatch Console</span>
            </Link>
          )}

          <div className="border-t border-slate-100 my-1" />

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

function AuthActions() {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        to="/login"
        className="px-3 py-2 text-xs xl:text-sm font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition rounded-lg"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 text-xs xl:text-sm font-bold bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 hover:from-emerald-600 hover:to-teal-600 hover:text-white border border-emerald-200 rounded-full transition-all shadow-sm"
      >
        Register
      </Link>
    </div>
  );
}

// =========================================================================
// ✅ MOBILE DRAWER — FIXED: full dynamic viewport height + no body scroll lock
// =========================================================================
function MobileDrawer({
  isOpen,
  onClose,
  checkActiveState,
  user,
  userProfile,
  isAdmin,
  onLogout,
  demoLogin,
}) {
  return (
    <>
      {/* ✅ BACKDROP — click to close, but page remains scrollable underneath */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[998] lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      />

      {/* ✅ DRAWER PANEL — uses 100dvh for true full-viewport height */}
      <aside
        className={`fixed left-0 top-0 w-[75vw] max-w-[320px] bg-white shadow-2xl border-r-2 border-emerald-500 flex flex-col z-[999] lg:hidden transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ height: "100dvh" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* HEADER */}
        <div className="h-[64px] px-4 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white flex items-center justify-between shrink-0">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-black text-xs tracking-tight text-slate-900 truncate">
                PAK <span className="text-emerald-600">SHEERAZI</span>
              </p>
              <p className="text-[9px] font-black text-emerald-600 tracking-wider">
                24/7 DISPATCH
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition shrink-0"
            aria-label="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ✅ SCROLLABLE AREA — flex-1 fills remaining space */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-5">
          <div className="p-3 bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="font-black text-emerald-950 flex items-center gap-2 text-[10px] uppercase tracking-wider">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Approved Vendor
            </span>
            <span className="text-emerald-700 font-extrabold text-[10px] bg-emerald-100 px-2 py-0.5 uppercase">
              KW&SB
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {NAVIGATION_LINKS.map((link) => {
              const Icon = link.icon;
              const active = checkActiveState(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all ${active
                    ? "text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 shadow-md"
                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-800"
                    }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${active
                      ? "bg-white/20 text-white"
                      : "bg-emerald-100 text-emerald-700"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Quick Contact
            </span>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 border border-emerald-200 bg-emerald-50 text-emerald-900 font-bold text-xs rounded-xl"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Dispatch</span>
            </a>
          </div>
        </div>

        {/* ✅ FOOTER — sticky at bottom via flex layout */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
          {user ? (
            <div className="space-y-3">
              <div className="p-3 bg-white border border-emerald-100 rounded-xl flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">
                    Account
                  </span>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {userProfile?.name || user?.displayName || user?.email}
                  </p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 uppercase shrink-0 ml-2">
                  {userProfile?.role || "Client"}
                </span>
              </div>

              <div className="flex gap-2">
                <Link
                  to="/my-orders"
                  onClick={onClose}
                  className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Orders
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className="flex-1 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
                  >
                    Console
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="px-3 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="py-2.5 text-center border border-slate-300 bg-white text-xs font-bold text-slate-700 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="py-2.5 text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl"
                >
                  Register
                </Link>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60">
                <span className="font-bold text-slate-500">Quick Test:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      demoLogin("customer");
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded"
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => {
                      demoLogin("admin");
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-teal-100 text-teal-800 font-bold rounded"
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}