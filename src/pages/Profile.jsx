import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loans, setLoans] = useState([]);
  const [editing, setEditing] = useState(false);

  // Load data on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedLoans = JSON.parse(localStorage.getItem("loans"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      // default user
      const defaultUser = {
        name: "MJ",
        email: "mj@email.com",
        phone: "+254700000000",
      };
      setUser(defaultUser);
      localStorage.setItem("user", JSON.stringify(defaultUser));
    }

    if (storedLoans) {
      setLoans(storedLoans);
    } else {
      setLoans([]);
    }
  }, []);

  // Calculate total borrowed
  const totalBorrowed = loans.reduce(
    (sum, loan) => sum + Number(loan.amount || 0),
    0
  );

  // Repay loan function
  const handleRepay = (index) => {
    const loanToRepay = loans[index];
    const confirmRepay = window.confirm(
      `Are you sure you want to repay KES ${loanToRepay.amount} for ${loanToRepay.name}?`
    );
    
    if (confirmRepay) {
      const updatedLoans = loans.filter((_, i) => i !== index);
      setLoans(updatedLoans);
      localStorage.setItem("loans", JSON.stringify(updatedLoans));
      alert("✅ Loan repaid successfully! Thank you.");
    }
  };

  // Delete loan (only for non-approved loans)
  const handleDelete = (index) => {
    const loanToDelete = loans[index];
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the ${loanToDelete.status} loan application for KES ${loanToDelete.amount}?`
    );
    
    if (confirmDelete) {
      const updatedLoans = loans.filter((_, i) => i !== index);
      setLoans(updatedLoans);
      localStorage.setItem("loans", JSON.stringify(updatedLoans));
      alert("❌ Loan application deleted.");
    }
  };

  // Save profile edits
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loans");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Profile</h2>

      {/* Avatar */}
      <div style={styles.avatar}>
        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
      </div>

      {/* USER INFO */}
      <div style={styles.card}>
        <h3>Personal Info</h3>

        {editing ? (
          <>
            <input
              style={styles.input}
              value={user.name}
              placeholder="Name"
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />

            <input
              style={styles.input}
              value={user.email}
              placeholder="Email"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <input
              style={styles.input}
              value={user.phone}
              placeholder="Phone"
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />

            <button style={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

            <button
              style={styles.editBtn}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* SUMMARY */}
      <div style={styles.card}>
        <h3>Loan Summary</h3>
        <p><strong>Total Loans:</strong> {loans.length}</p>
        <p><strong>Total Borrowed:</strong> KES {totalBorrowed}</p>
      </div>

      {/* LOAN HISTORY */}
      <div style={styles.card}>
        <h3>Loan History</h3>

        {loans.length === 0 ? (
          <p>No loans yet.</p>
        ) : (
          loans.map((loan, index) => (
            <div key={index} style={styles.loanItem}>
              <p><strong>Amount:</strong> KES {loan.amount}</p>
              <p><strong>Period:</strong> {loan.period} months</p>
              <p><strong>Reason:</strong> {loan.reason}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      loan.status === "Approved"
                        ? "#22c55e"
                        : loan.status === "Rejected"
                        ? "#ef4444"
                        : loan.status === "Locked"
                        ? "#ff4444"
                        : "#facc15",
                  }}
                >
                  {loan.status || "Pending"}
                </span>
              </p>

              {loan.date && (
                <p><strong>Date:</strong> {new Date(loan.date).toLocaleDateString()}</p>
              )}

              {loan.message && (
                <p><strong>Message:</strong> {loan.message}</p>
              )}

              {/* Show REPAY button for approved loans */}
              {loan.status === "Approved" && (
                <button
                  style={styles.repayBtn}
                  onClick={() => handleRepay(index)}
                >
                  💰 Repay Loan
                </button>
              )}

              {/* Show DELETE button only for non-approved loans (Pending, Rejected) */}
              {loan.status !== "Approved" && (
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(index)}
                >
                  🗑️ Delete Application
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <button
          style={styles.applyBtn}
          onClick={() => navigate("/apply")}
        >
          Apply for Loan
        </button>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
    background: "#0f172a",
    minHeight: "100vh",
    color: "#f1f5f9",
  },

  title: {
    textAlign: "center",
    color: "#38bdf8",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#38bdf8",
    color: "#0f172a",
    fontSize: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
    fontWeight: "bold",
  },

  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },

  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
  },

  loanItem: {
    borderTop: "1px solid #334155",
    marginTop: "10px",
    paddingTop: "10px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },

  applyBtn: {
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },

  logoutBtn: {
    padding: "10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },

  editBtn: {
    marginTop: "10px",
    padding: "8px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  saveBtn: {
    background: "#22c55e",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  },

  repayBtn: {
    marginTop: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
  },
};