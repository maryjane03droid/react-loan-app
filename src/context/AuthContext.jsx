// LoanApplication.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLoan } from "../utils/LocalStorage";
import { processLoan } from "../utils/loanProcesser";

export default function LoanApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    term: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const processedLoan = await processLoan(formData);
      saveLoan(processedLoan);
      navigate("/dashboard");
    } catch (error) {
      console.error("Loan submission failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields here */}
    </form>
  );
}

// AuthContext.jsx (separate file or above LoanApplication)
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const register = (email, password, name) => {
    if (!email || !password || !name) throw new Error("All fields required");
    const newUser = { id: Date.now(), email, name };
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    const stored = localStorage.getItem("auth_user");
    if (stored && JSON.parse(stored).email === email) {
      setUser(JSON.parse(stored));
      return JSON.parse(stored);
    }
    const newUser = { id: Date.now(), email, name: email.split("@")[0] };
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}