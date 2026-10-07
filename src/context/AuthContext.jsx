import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or refresh user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        // Fallback default profile if document not yet created
        setUserProfile({
          uid,
          name: auth.currentUser?.displayName || "Customer",
          email: auth.currentUser?.email || "",
          role: "customer",
        });
      }
    } catch (err) {
      console.warn("Could not fetch user profile from Firestore:", err.message);
      setUserProfile({
        uid,
        name: auth.currentUser?.displayName || "Customer",
        email: auth.currentUser?.email || "",
        role: "customer",
      });
    }
  };

  const register = async (name, email, password, phone, address = "") => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    await updateProfile(firebaseUser, {
      displayName: name,
    });

    const profileData = {
      uid: firebaseUser.uid,
      name,
      email,
      phone,
      address,
      role: email.toLowerCase().includes("admin") ? "admin" : "customer",
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "users", firebaseUser.uid), profileData);
    } catch (dbErr) {
      console.warn("Firestore user creation note:", dbErr.message);
    }

    setUserProfile(profileData);
    return firebaseUser;
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserProfile(result.user.uid);
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  // Quick Demo Login for instant testing/review
  const demoLogin = (role = "customer") => {
    const mockUser = {
      uid: role === "admin" ? "admin-demo-99" : "cust-demo-11",
      displayName: role === "admin" ? "Muhammad Ikhlaq (CEO / Proprietor)" : "Muhammad Shafique (Director)",
      email: role === "admin" ? "paksheeraziandsons@gmail.com" : "paksheeraziandsons@gmail.com",
    };
    setUser(mockUser);
    setUserProfile({
      uid: mockUser.uid,
      name: mockUser.displayName,
      email: mockUser.email,
      phone: "0304 9025994",
      address: "Plot # A-12, Dariya Khan Rindh Goth, Gulshan-e-Iqbal, Karachi",
      role: role,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = userProfile?.role === "admin" || user?.email?.toLowerCase().includes("admin");

  const value = {
    user,
    userProfile,
    isAdmin,
    loading,
    register,
    login,
    logout,
    resetPassword,
    demoLogin,
    fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};