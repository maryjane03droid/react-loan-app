import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoanApplication() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "+254",
    amount: "",
    period: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
     else if (!/^[0-9]{6,15}$/.test(form.phone)) {
  newErrors.phone = "Enter a valid phone number (9-10 digits)";}

    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Enter a valid amount";
    if (!form.period || form.period <= 0)
      newErrors.period = "Enter repayment period";
    if (!form.reason.trim()) newErrors.reason = "Reason is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ STOP IF INVALID
    if (!validate()) return;

    localStorage.setItem("loan", JSON.stringify(form));

    alert("Loan saved successfully!");

    navigate("/checkout");
  };

  return (
    <div>
      <h2 style={{ color: "#facc15" }}>💰 Loan Application</h2>

      <form className="card" onSubmit={handleSubmit}>
        {/* NAME */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.name}</p>
        
          
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.phone}</p>

        {/* AMOUNT */}
        <input
          name="amount"
          type="number"
          placeholder="Loan Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.amount}</p>

        {/* PERIOD */}
        <input
          name="period"
          type="number"
          placeholder="Repayment Period(months)"
          value={form.period}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.period}</p>

        {/* REASON */}
        <input
          name="reason"
          placeholder="Reason for Loan"
          value={form.reason}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.reason}</p>

        <button type="submit">Continue to Checkout</button>
      </form>
    </div>
  );
}
