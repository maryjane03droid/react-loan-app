import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLoan } from "../utils/LocalStorage";
import { processLoan, getLoanQuestions } from "../utils/loanProcesser";
import LoanQuestions from "./LoanQuestions";

export default function LoanApplication() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    amount: "",
    period: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);
  const [tempLoan, setTempLoan] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{6,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number (6-15 digits)";
    }

    if (!form.amount || form.amount <= 0) {
      newErrors.amount = "Enter valid amount";
    }

    if (!form.period || form.period <= 0) {
      newErrors.period = "Enter repayment period";
    }

    if (!form.reason.trim()) {
      newErrors.reason = "Reason is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const loanAmount = Number(form.amount);
    
    const loanData = {
      name: form.name,
      phone: form.phone,
      amount: loanAmount,
      period: form.period,
      reason: form.reason,
    };

    // For loans 500 or less - instant approval, go directly to checkout
    if (loanAmount <= 500) {
      console.log("Loan amount <= 500, processing instantly...");
      const processed = processLoan(loanData, []);
      console.log("Processed loan:", processed);
      
      saveLoan(processed);
      localStorage.setItem("currentLoan", JSON.stringify(processed));
      
      navigate("/checkout");
    } 
    // For loans above 500 - show questions first
    else {
      console.log("Loan amount > 500, showing questions...");
      setTempLoan(loanData);
      setShowQuestions(true);
    }
  };

  const handleQuestionsComplete = (processedLoan) => {
    console.log("Questions completed, navigating to checkout...");
    navigate("/checkout");
  };

  // Show questions component if needed
  if (showQuestions) {
    return <LoanQuestions loanData={tempLoan} onComplete={handleQuestionsComplete} />;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💰 Loan Application</h2>
        
        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            ⚡ <strong>Loans of KES 500 or less = INSTANT APPROVAL!</strong><br />
            📋 <strong>Loans above KES 500</strong> = Answer 5 questions to qualify<br />
            🎯 <strong>Need 4/5 correct</strong> to get approved for larger loans
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <small style={styles.error}>{errors.name}</small>}
          </div>

          <div style={styles.inputGroup}>
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.phone && <small style={styles.error}>{errors.phone}</small>}
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
            {errors.amount && <small style={styles.error}>{errors.amount}</small>}
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
            {errors.period && <small style={styles.error}>{errors.period}</small>}
          </div>

          <div style={styles.inputGroup}>
            <textarea
              name="reason"
              placeholder="Reason for Loan"
              value={form.reason}
              onChange={handleChange}
              style={styles.textarea}
              rows="3"
            />
            {errors.reason && <small style={styles.error}>{errors.reason}</small>}
          </div>

          <button type="submit" style={styles.button}>
            Submit Application
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
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "550px",
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
    fontSize: "28px",
  },
  infoBox: {
    background: "#0f172a",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    borderLeft: "4px solid #22c55e",
  },
  infoText: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: 0,
    lineHeight: "1.6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  error: {
    color: "#ef4444",
    fontSize: "11px",
    marginTop: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
};