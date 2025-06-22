import dayjs from "dayjs";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartmentApi";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement/academicSemesterApi";

const gander = ["male", "female", "others"];
export const ganderOptions = gander.map((name) => {
  return {
    value: name,
    label: name,
  };
});
const blood = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const bloodOptions = blood.map((blood) => {
  return {
    label: blood,
    value: blood,
  };
});




export const studentDefaultValues = {
  name: {
    firstName: "",
    middleName: "",
    lastName: "",
  },
  gender: "",
  dateOfBirth: "",
  email: "",
  contactNo: "",
  emergencyContactNo: "",
  bloodGroup: "",
  presentAddress: "",
  permanentAddress: "",
  guardian: {
    fatherName: "",
    fatherOccupation: "",
    fatherContactNo: "",
    motherName: "",
    motherOccupation: "",
    motherContactNo: "",
  },
  localGuardian: {
    name: "",
    occupation: "",
    contactNo: "",
    address: "",
  },
  academicFaculty: "",
  academicDepartment: "",
  admissionSemester: "",
};

