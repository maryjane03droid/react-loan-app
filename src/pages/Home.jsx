import { FaHandHoldingUsd } from "react-icons/fa";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      
      {/* 👋 WELCOME SECTION */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <FaHandHoldingUsd size={50} color="#4da3ff" />
        <h1>Welcome to Loanify</h1>
        <p>Your fast, simple and secure loan platform</p>
      </div>

      {/* 🧩 CARDS SECTION */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        {/* IMAGE CARD */}
        <div className="card" style={{ flex: 1, minWidth: "250px" }}>
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
            alt="loan"
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3>Fast Loan Processing</h3>
          <p>
            Apply and get approved quickly with our smart automated system.
          </p>
        </div>

        {/* INFO CARD */}
        <div className="card" style={{ flex: 1, minWidth: "250px" }}>
          <h3>About This App</h3>
          <p>
            Loanify helps users apply for loans, track repayments, and manage
            financial records in one place.
          </p>

          <hr style={{ borderColor: "#1f3b5c" }} />

          {/* ⚠️ REMINDER */}
          <p style={{ color: "#4da3ff", fontWeight: "bold" }}>
            ⚠ Reminder: The more you repay on time, the higher your loan limit grows.
          </p>
        </div>

      </div>
    </div>
  );
}