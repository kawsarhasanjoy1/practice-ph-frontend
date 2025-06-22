export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: "student";
  status: "in-progress" | "completed" | "pending"; // add more if needed
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
  _id: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};
export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: "male" | "female" | "other"; // extend if more options
  dateOfBirth: string; // ISO date string
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: string | null;
  isDeleted: boolean;
  academicDepartment: TAcademicDepartment;
  academicFaculty: string | null;
  fullName: string;
};
