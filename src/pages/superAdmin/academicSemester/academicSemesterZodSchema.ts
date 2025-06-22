import { z } from "zod";
import { Months } from "./academic.semester.constance";

export const academicSemesterZodSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  year: z.string().min(4, "Year is required"),
  startMonth: z.enum(Months, { required_error: "Start month is required" }),
  endMonth: z.enum(Months, { required_error: "End month is required" }),
});
