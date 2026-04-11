import React from 'react'

 function Checkingout() {
      const [loan, setLoan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loan"));
    setLoan(data);
  }, []);

  if (!loan) {
  return (
    <div style={{ padding: "20px" }}>
        <h3>No loan data found</h3>
      </div>
  )

  const amount = Number(loan.amount);
  const interest = amount * 0.1;
  const total = amount + interest;

  const confirmLoan = () => {
    const newLoan = {
      ...loan,
      interest,
      total,
      status: "Pending",
      date: new Date().toISOString()
    };

    saveLoan(newLoan);

    localStorage.removeItem("loan");

    alert("Loan submitted successfully!");

    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <h2>Loan Checkout</h2>

      {/* 🧾 LOAN SUMMARY CARD */}
      <div className="card">

        <p><b>Name:</b> {loan.name}</p>
        <p><b>Phone:</b> {loan.phone}</p>
        <p><b>Amount:</b> KES {loan.amount}</p>
        <p><b>Repayment Period:</b> {loan.period} months</p>
        <p><b>Reason:</b> {loan.reason}</p>

        <hr style={{ borderColor: "#1f3b5c" }} />

        <p><b>Interest (10%):</b> KES {interest}</p>
        <p><b>Total Repayment:</b> KES {total}</p>

        {/* 💰 CONFIRM BUTTON */}
        <button onClick={confirmLoan}>
          Confirm Loan
        </button>

      </div>
    </div>
  );
}

}

export default Checkingout
