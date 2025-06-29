import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAcademicSemester from "../pages/superAdmin/academicSemester/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/superAdmin/academicFaculty/CreateAcademicFaculty";
import AcademicFaculty from "../pages/superAdmin/academicFaculty/AcademicFaculty";
import CreateAcademicDepartment from "../pages/superAdmin/academicDepartment/CreateAcademicDepartment";
import AcademicDepartment from "../pages/superAdmin/academicDepartment/AcademicDepartment";
import AcademicSemester from "../pages/superAdmin/academicSemester/AcademicSemester";
import CreateStudent from "../pages/superAdmin/userManagement/CreateStudent";
import Students from "../pages/superAdmin/userManagement/Students";
import StudentDetails from "../pages/superAdmin/userManagement/StudentDetails";
import CreateFaculty from "../pages/superAdmin/userManagement/CreateFaculty";
import CreateAdmin from "../pages/superAdmin/userManagement/CreateAdmin";
import CreateSemesterRegistration from "../pages/superAdmin/courseManagement/CreateSemesterRegistration";
import SemesterRegistration from "../pages/superAdmin/courseManagement/SemesterRegistration";
import CreateCourse from "../pages/superAdmin/courseManagement/CreateCourse";
import Course from "../pages/superAdmin/courseManagement/Course";
import OfferCourse from "../pages/superAdmin/courseManagement/OfferCourse";

export const adminPath = [
  {
    name: "Admin Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create-student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students",
        element: <Students />,
      },
      {
        name: "",
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create-Semester-Registration",
        path: "create-semester-registration",
        element: <CreateSemesterRegistration />,
      },
      {
        name: "Semester-Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Create-Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Course />,
      },
      {
        name: "Offered course",
        path: "offered-course",
        element: <OfferCourse />,
      },
    ],
  },
];

type TSidebar = {
  key: string;
  label: ReactNode;
  children?: TSidebar[] | any;
};
// export const adminRoute = adminPath?.reduce((acc: TRoute[], item) => {
//   if (item?.path && item?.element) {
//     acc.push({ path: item?.path, element: item?.element });
//   }
//   if (item?.children) {
//     item?.children?.forEach((child) =>
//       acc.push({ path: child?.path, element: child?.element })
//     );
//   }
//   return acc;
// }, []);

// export const adminSidebar = adminPath?.reduce((acc: TSidebar[], item) => {
//   if (item?.name && item?.path) {
//     acc.push({
//       key: item?.name,
//       label: <NavLink to={`/admin/${item?.path}`}>{item?.name}</NavLink>,
//     });
//   }
//   if (item?.children) {
//     acc.push({
//       key: item?.name,
//       label: item?.name,
//       children: item.children.map((child) => ({
//         key: child?.name,
//         label: <NavLink to={`/admin/${child?.path}`}>{child?.name}</NavLink>
//       })),
//     });
//   }
//   return acc;
// }, []);
