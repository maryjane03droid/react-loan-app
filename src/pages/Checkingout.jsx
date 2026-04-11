import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lockUser, canBorrow } from "../utils/loanRules";

function Checkingout() {
  const [loan, setLoan] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loan"));
    setLoan(data);

    // fetch questions if needed
    if (data && Number(data.amount) > 500) {
      fetchQuestions();
    }
  }, []);

  // 🧠 Fake API (you can replace with real later)
  const fetchQuestions = async () => {
    const fakeQuestions = [
      "What is your source of income?",
      "How often do you earn?",
      "Do you have existing loans?",
    ];
    setQuestions(fakeQuestions);
  };

  if (!loan) {
    return (
      <div style={styles.container}>
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

  const handleAnswer = (q, value) => {
    setAnswers({ ...answers, [q]: value });
  };

 const confirmLoan = () => {
  if (!canBorrow()) {
    alert("You are locked. Try again after 30 days.");
    return;
  }

  let status = "Pending";

  // 💰 RULE 1: instant 500
  if (amount === 500) {
    status = "Approved";
  }

  // 🧠 RULE 2: above 500 requires verification
  if (amount > 500) {
    const allAnswered = Object.keys(answers).length === questions.length;

    if (!allAnswered) {
      alert("Please complete verification questions");
      return;
    }

    // fake "AI API match logic"
    const matchScore = Math.random(); // replace with real API later

    if (matchScore > 0.4) {
      status = "Approved";
    } else {
      status = "Rejected";
      lockUser(); // 🚨 lock user for 30 days
    }
  }

  const newLoan = {
    ...loan,
    amount,
    interest,
    total,
    status,
    date: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem("loans")) || [];
  existing.push(newLoan);

  localStorage.setItem("loans", JSON.stringify(existing));
  localStorage.removeItem("loan");

  alert(`Loan ${status}`);

  navigate("/dashboard");
};
   

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Loan Checkout</h2>

      {/* 💳 CARD */}
      <div style={styles.card}>
        <p><b>Amount:</b> KES {amount}</p>
        <p><b>Interest (10%):</b> KES {interest}</p>
        <p><b>Total:</b> KES {total}</p>

        <hr />

        {/* 🧠 CONDITIONAL QUESTIONS */}
        {amount > 500 && (
          <div>
            <h4>Additional Questions</h4>

            {questions.map((q, index) => (
              <div key={index} style={styles.question}>
                <p>{q}</p>
                <input
                  style={styles.input}
                  placeholder="Your answer"
                  onChange={(e) =>
                    handleAnswer(q, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        )}

        <button style={styles.button} onClick={confirmLoan}>
          Confirm Loan
        </button>
      </div>
    </div>
  );
}

export default Checkingout;