const SemesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export const SemesterRegistrationStatusOptions = SemesterRegistrationStatus.map(
  (item) => ({
    label: item,
    value: item,
  })
);
