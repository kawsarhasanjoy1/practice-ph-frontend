import { z } from "zod";

export const studentZodSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z.preprocess(
    (val) => (val === null || val === "" ? undefined : val),
    z.coerce.date({
      required_error: "Date of Birth is required",
    })
  ),
  email: z.string().email("Invalid email"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),

  guardian: z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
  }),

  localGuardian: z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
  }),

  academicFaculty: z.string().min(1, "Academic faculty is required"),
  academicDepartment: z.string().min(1, "Academic department is required"),
  admissionSemester: z.string().min(1, "Admission semester is required"),
});

export const facultyZodSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  designation: z.string().min(1, "Designation is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z.preprocess(
    (val) => (val === null || val === "" ? undefined : val),
    z.coerce.date({
      required_error: "Date of Birth is required",
    })
  ),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional(),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  profileImg: z.any().optional(),
  academicFaculty: z.string().min(1, "Academic faculty is required"),
  academicDepartment: z.string().min(1, "Academic department is required"),
});

export const adminZodSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  designation: z.string().min(1, "Designation is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z.preprocess(
    (val) => (val === null || val === "" ? undefined : val),
    z.coerce.date({
      required_error: "Date of Birth is required",
    })
  ),

  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional(),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  profileImg: z
    .custom<File>((file) => file instanceof File, "Invalid file")
    .optional(),
});
