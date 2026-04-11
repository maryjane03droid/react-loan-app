import { lockUser, canBorrow } from "./LocalStorage";

export const processLoan = (loan, answers = []) => {
  if (!canBorrow()) {
    return { ...loan, status: "Locked", disbursed: false };
  }

  let status = "Pending";
  let disbursed = false;

  const amount = Number(loan.amount);

  // 💰 RULE 1: 500 = instant approve
  if (amount === 500) {
    status = "Approved";
    disbursed = true;
  }

  // 💰 RULE 2: above 500 requires validation
  if (amount > 500) {
    const passed =
      answers.length > 0 &&
      answers.every((a) => a.correct === true);

    if (passed) {
      status = "Approved";
      disbursed = true;
    } else {
      status = "Rejected";
      lockUser();
    }
  }

  return {
    ...loan,
    status,
    disbursed,
    date: new Date().toISOString(),
  };
};