import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkingout() {
  const [loan, setLoan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loan"));
    setLoan(data);
  }, []);

  // ✅ FIXED: properly closed block
  if (!loan) {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        <h3>No loan data found</h3>
        <button onClick={() => navigate("/apply")}>
          Go Apply
        </button>
      </div>
    );
  }

  const amount = Number(loan.amount);
  const interest = amount * 0.1;
  const total = amount + interest;

  // ✅ FIXED: saveLoan logic added
  const confirmLoan = () => {
    const newLoan = {
      ...loan,
      interest,
      total,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    const existingLoans =
      JSON.parse(localStorage.getItem("loans")) || [];

    existingLoans.push(newLoan);

    localStorage.setItem("loans", JSON.stringify(existingLoans));

    // clear temporary loan
    localStorage.removeItem("loan");

    alert("Loan submitted successfully!");

    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Loan Checkout</h2>

      <div className="card">
        <p><b>Name:</b> {loan.name}</p>
        <p><b>Phone:</b> {loan.phone}</p>
        <p><b>Amount:</b> KES {loan.amount}</p>
        <p><b>Repayment Period:</b> {loan.period} months</p>
        <p><b>Reason:</b> {loan.reason}</p>

        <hr />

        <p><b>Interest (10%):</b> KES {interest}</p>
        <p><b>Total Repayment:</b> KES {total}</p>

        <button onClick={confirmLoan}>
          Confirm Loan
        </button>
      </div>
    </div>
  );
}

export default Checkingout;