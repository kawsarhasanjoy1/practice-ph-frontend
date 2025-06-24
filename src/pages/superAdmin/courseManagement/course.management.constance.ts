const SemesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const SemesterRegistrationStatusOptions = SemesterRegistrationStatus.map(
  (item) => ({
    label: item,
    value: item,
  })
);
const Days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const daysOptions = Days.map((item) => ({
  label: item,
  value: item,
}));
