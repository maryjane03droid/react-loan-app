export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};
export const logoutUser = () => {
  localStorage.removeItem("user");
};
export const saveLoan = (loan) => {
  try {
    const existing = getLoans(); // use safe function
    existing.push(loan);
    localStorage.setItem("loans", JSON.stringify(existing));
  } catch (error) {
    console.log("Error saving loan:", error);
  }
};

export const getLoans = () => {
  try {
    const data = localStorage.getItem("loans");

    if (!data) return [];

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("Error reading loans:", error);
    return [];
  }
};
export const canBorrow = (user) => {
  const lockUntil = localStorage.getItem("lockUntil");

  if (!lockUntil) return true;

  return new Date() > new Date(lockUntil);
};

export const lockUser = () => {
  const lockDate = new Date();
  lockDate.setDate(lockDate.getDate() + 30);

  localStorage.setItem("lockUntil", lockDate.toISOString());
};
