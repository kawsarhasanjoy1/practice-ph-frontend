import { z } from "zod";

export const academicDepartmentZodSchema = z.object({
  name: z.string().min(1, { message: "Department name is required" }),
  academicFaculty: z.string().min(1, { message: "Faculty is required" }),
});
