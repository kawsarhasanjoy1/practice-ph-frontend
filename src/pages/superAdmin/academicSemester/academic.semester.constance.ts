export const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const getYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4, 5].map((num) => {
  return {
    value: String(getYear + num),
    label: String(getYear + num),
  };
});

export const Months = [
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
] as const;
export const monthOptions = Months.map((name) => {
  return {
    value: name,
    label: name,
  };
});
// Zod schema
