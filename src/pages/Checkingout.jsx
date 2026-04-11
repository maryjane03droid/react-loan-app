import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLoan } from "../utils/LocalStorage";

export default function Checkingout() {
  const [loan, setLoan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("loan") || "null");
      setLoan(data || null);
    } catch (err) {
      console.log("Checkout error:", err);
      setLoan(null);
    }
  }, []);

  if (!loan) {
    return (
      <div style={styles.container}>
        <h3>No loan data found</h3>
        <button onClick={() => navigate("/apply")} style={styles.button}>
          Go Back to Apply
        </button>
      </div>
    );
  }

  const amount = Number(loan.amount || 0);
  const interest = amount * 0.1;
  const total = amount + interest;

  const confirmLoan = () => {
    const newLoan = {
      ...loan,
      interest,
      total,
      status: "Pending",
      date: new Date().toISOString(),
    };

    saveLoan(newLoan);

    localStorage.removeItem("loan");

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>Loan Checkout</h2>

      <div style={styles.card}>
        <p>
          <b>Name:</b> {loan.name}
        </p>
        <p>
          <b>Phone:</b> {loan.phone}
        </p>
        <p>
          <b>Amount:</b> KES {loan.amount}
        </p>
        <p>Status: {loan.status}</p>
        <p>
          <b>Period:</b> {loan.period} months
        </p>
        <p>
          <b>Reason:</b> {loan.reason}
        </p>

        <hr />

        <p>
          <b>Interest (10%):</b> KES {interest}
        </p>
        <p>
          <b>Total Repayment:</b> KES {total}
        </p>

        <button onClick={confirmLoan} style={styles.button}>
          Confirm Loan
        </button>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "#0b1220",
    color: "#fff",
  },

  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "400px",
    margin: "auto",
  },

  button: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
