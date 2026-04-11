import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoanApplication from "./pages/LoanApplication";
import Checkout from "./pages/Checkingout";
import Profile from "./pages/Profile";
import Navbar from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<LoanApplication />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes>
      <footer/>
    </BrowserRouter>
  );
}