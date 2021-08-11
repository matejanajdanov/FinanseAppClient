export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export type expenseType = {
  id: number;
  purpose?: string;
  category?: string;
  moneySpent: string;
  date: Date;
};
