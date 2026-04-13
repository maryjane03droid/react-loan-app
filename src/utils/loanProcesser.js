import { lockUser, canBorrow } from "./LocalStorage";

const loanQuestions = [
  {
    id: 1,
    question: "Do you have a regular source of income?",
    correctAnswer: true
  },
  {
    id: 2,
    question: "Have you repaid previous loans on time?",
    correctAnswer: true
  },
  {
    id: 3,
    question: "Is your employment status permanent?",
    correctAnswer: true
  },
  {
    id: 4,
    question: "Do you have any existing debts?",
    correctAnswer: false
  },
  {
    id: 5,
    question: "Will you use this loan for business purposes?",
    correctAnswer: true
  }
];

export const getLoanQuestions = () => {
  return loanQuestions;
};

export const processLoan = (loan, answers = []) => {
  console.log("Processing loan:", loan);
  console.log("Loan amount:", loan.amount);
  console.log("Answers:", answers);

  // Check if user is locked
  if (!canBorrow()) {
    console.log("User is locked");
    return { 
      ...loan, 
      status: "Locked", 
      disbursed: false, 
      message: "❌ You are locked from borrowing for 30 days due to previous rejection." 
    };
  }

  let status = "Pending";
  let disbursed = false;
  let message = "";
  let requiresQuestions = false;

  const amount = Number(loan.amount);
  console.log("Amount as number:", amount);

  // RULE: 500 KES or LESS = INSTANT APPROVE
  if (amount <= 500) {
    status = "Approved";
    disbursed = true;
    message = "✅ INSTANT APPROVAL! Your loan has been approved immediately!";
    console.log("Loan approved instantly!");
  }
  // RULE: Above 500 KES requires questions
  else if (amount > 500) {
    console.log("Amount > 500, checking answers...");
    
    if (!answers || answers.length === 0) {
      status = "Pending";
      disbursed = false;
      requiresQuestions = true;
      message = "📋 Please answer all 5 questions to complete your loan application.";
      console.log("No answers provided, requiring questions");
      return {
        ...loan,
        status,
        disbursed,
        message,
        requiresQuestions,
        questions: loanQuestions
      };
    }

    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === loanQuestions[index]?.correctAnswer) {
        correctCount++;
      }
    });

    console.log("Correct answers:", correctCount);

    if (correctCount >= 4) {
      status = "Approved";
      disbursed = true;
      message = `✅ APPROVED! Your loan of KES ${amount} has been approved!`;
    } else {
      status = "Rejected";
      disbursed = false;
      message = `❌ REJECTED! Your loan of KES ${amount} has been rejected. You are locked for 30 days.`;
      lockUser();
    }
  }

  const result = {
    ...loan,
    status,
    disbursed,
    message,
    date: new Date().toISOString(),
  };
  
  console.log("Process result:", result);
  return result;
};