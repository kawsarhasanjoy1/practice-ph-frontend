import { z } from "zod";

export const academicFacultyZodValidationSchema = z.object({
  name: z.string({ required_error: "Faculty name is required" }),
});
