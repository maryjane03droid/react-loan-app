export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
export const saveLoan = (loan) => {
  const existing = JSON.parse(localStorage.getItem("loans")) || [];
  existing.push(loan);
  localStorage.setItem("loans", JSON.stringify(existing));
};

export const getLoans = () => {
  return JSON.parse(localStorage.getItem("loans")) || [];
};