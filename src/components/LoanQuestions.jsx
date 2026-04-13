import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoanQuestions, processLoan } from "../utils/loanProcesser";
import { saveLoan } from "../utils/LocalStorage";

export default function LoanQuestions({ loanData, onComplete }) {
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const questions = getLoanQuestions();

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, process the loan
      console.log("All questions answered:", newAnswers);
      const processedLoan = processLoan(loanData, newAnswers);
      console.log("Processed loan result:", processedLoan);
      
      saveLoan(processedLoan);
      localStorage.setItem("currentLoan", JSON.stringify(processedLoan));
      
      onComplete(processedLoan);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📋 Loan Qualification</h2>
        
        <div style={styles.progress}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${((currentQuestion + 1) / questions.length) * 100}%`}}></div>
        </div>

        <div style={styles.questionCard}>
          <h3 style={styles.question}>{currentQ.question}</h3>
          
          <div style={styles.buttonGroup}>
            <button 
              onClick={() => handleAnswer(true)}
              style={styles.yesButton}
            >
              ✅ Yes
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              style={styles.noButton}
            >
              ❌ No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0b1220, #111827, #0f172a)",
    padding: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "18px",
    maxWidth: "500px",
    width: "100%",
    color: "#fff",
  },
  title: {
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: "20px",
  },
  progress: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#94a3b8",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "#334155",
    borderRadius: "4px",
    marginBottom: "30px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#22c55e",
    borderRadius: "4px",
    transition: "width 0.3s",
  },
  questionCard: {
    background: "#0f172a",
    padding: "25px",
    borderRadius: "12px",
  },
  question: {
    fontSize: "20px",
    marginBottom: "30px",
    textAlign: "center",
    lineHeight: "1.5",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  yesButton: {
    padding: "12px 30px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  noButton: {
    padding: "12px 30px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};