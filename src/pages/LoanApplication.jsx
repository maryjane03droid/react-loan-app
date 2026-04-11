import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLoan } from "../utils/LocalStorage";
import { processLoan } from "../utils/loanProcesser";

export default function LoanApplication() {
  const navigate = useNavigate();

  const [answers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    amount: "",
    period: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{6,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Enter valid amount";

    if (!form.period || form.period <= 0)
      newErrors.period = "Enter repayment period";

    if (!form.reason.trim())
      newErrors.reason = "Reason is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 🔥 IMPORTANT

    if (!validate()) return;

    // 🔥 FIX: use form values properly
    const loan = {
      name: form.name,
      phone: form.phone,
      amount: Number(form.amount),
      period: form.period,
      reason: form.reason,
    };

    const processed = processLoan(loan, answers);

    saveLoan(processed);

    localStorage.setItem("loan", JSON.stringify(processed));

    navigate("/checkout");
  };

  return (
  <div style={styles.page}>
    <div style={styles.card}>
      <h2 style={styles.title}>💰 Loan Application</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.inputGroup}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          <small style={styles.error}>{errors.name}</small>
        </div>

        <div style={styles.inputGroup}>
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />
          <small style={styles.error}>{errors.phone}</small>
        </div>

        <div style={styles.inputGroup}>
          <input
            name="amount"
            type="number"
            placeholder="Loan Amount (KES)"
            value={form.amount}
            onChange={handleChange}
            style={styles.input}
          />
          <small style={styles.error}>{errors.amount}</small>
        </div>

        <div style={styles.inputGroup}>
          <input
            name="period"
            type="number"
            placeholder="Repayment Period (months)"
            value={form.period}
            onChange={handleChange}
            style={styles.input}
          />
          <small style={styles.error}>{errors.period}</small>
        </div>

        <div style={styles.inputGroup}>
          <input
            name="reason"
            placeholder="Reason for Loan"
            value={form.reason}
            onChange={handleChange}
            style={styles.input}
          />
          <small style={styles.error}>{errors.reason}</small>
        </div>

        <button type="submit" style={styles.button}>
          Continue to Checkout
        </button>

      </form>
    </div>
  </div>
);
}
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0b1220, #111827, #0f172a)",
    padding: "10px",
    overflow:"hidden",
  },

  card: {
    width: "100%",
    maxWidth: "650px",
    background: "rgba(17, 24, 39, 0.95)",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    color: "#fff",
    border: "1px solid rgba(56, 189, 248, 0.2)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#38bdf8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "#fff",
    outline: "none",
      transition: "0.3s",
  },

  error: {
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "4px",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};