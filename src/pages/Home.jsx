import { FaHandHoldingUsd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* 👋 INTRO SECTION */}
      <div style={styles.header}>
        <FaHandHoldingUsd size={55} color="#38bdf8" />

        <h1 style={styles.title}>Welcome to Loanify</h1>

        <p style={styles.subtitle}>
          A fast, secure and simple loan management platform designed to give you instant financial access.
        </p>

        {/* CTA BUTTONS */}
        <div style={styles.buttons}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/apply")}
          >
            Apply for Loan
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/dashboard")}
          >
            View Dashboard
          </button>
        </div>
      </div>

      {/* 📌 FEATURES SECTION */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>⚡ Fast Approval</h3>
          <p>Get instant approval for small loans like KES 500 without delays.</p>
        </div>

        <div style={styles.card}>
          <h3>🔐 Secure System</h3>
          <p>Your data and loan history are safely stored and protected.</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Smart Tracking</h3>
          <p>Track all your loans, repayments, and history in one dashboard.</p>
        </div>

        <div style={styles.card}>
          <h3>💰 Flexible Loans</h3>
          <p>Borrow small or large amounts depending on your eligibility score.</p>
        </div>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
      background: `
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.15), transparent 40%),
    radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.12), transparent 40%),
    linear-gradient(135deg, #0b1220, #0f172a, #111827)
  `,
    color: "#fff",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "38px",
    marginTop: "10px",
    color: "#38bdf8",
  },

  subtitle: {
    color: "#94a3b8",
    maxWidth: "600px",
    margin: "10px auto",
    fontSize: "15px",
    lineHeight: "1.5",
  },

  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "10px 18px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  secondaryBtn: {
    padding: "10px 18px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#111827",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid rgba(56, 189, 248, 0.15)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
  },
};