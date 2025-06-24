import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";

import {
  useGetCourseQuery,
  useGetSemesterRegistrationQuery,
} from "../../../redux/features/admin/courseManagement/courseManagementApi";
import { toast } from "react-toastify";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartmentApi";
import { useGetAssignFacultiesQuery } from "../../../redux/features/admin/userManagement/userManagementApi";
import PHInput from "../../../components/form/PHInput";
import { daysOptions } from "./course.management.constance";
import PHTimePicker from "../../../components/form/PHTimePicker";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const { data: semesterData } = useGetSemesterRegistrationQuery(undefined);
  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);
  const { data: courseData } = useGetCourseQuery(undefined);
  const { data: academicDepartmentData } =
    useGetAcademicDepartmentQuery(undefined);
  const { data: facultyData } = useGetAssignFacultiesQuery(
    { id: courseId },
    { skip: !courseId }
  );
  console.log(facultyData);
  const semesterRegistrationOptions = semesterData?.data?.map((item: any) => ({
    label: `${item?.academicSemester?.name}-${item?.academicSemester?.year}`,
    value: item?._id,
  }));
  const academicFacultyOptions = academicFacultyData?.data?.map(
    (item: any) => ({
      label: item?.name,
      value: item?._id,
    })
  );
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item: any) => ({
      label: item?.name,
      value: item?._id,
    })
  );
  const courseOptions = courseData?.data?.map((item: any) => ({
    label: item?.title,
    value: item?._id,
  }));
  const facultyOptions = facultyData?.data?.faculties?.map((item: any) => ({
    label: item?.fullName,
    value: item?._id,
  }));
  const handleToSubmit = async (e: FieldValues) => {
    console.log(e);
  };
  return (
    <PHForm onSubmit={handleToSubmit}>
      <Flex justify="center">
        <Col span={24} md={{ span: 8 }}>
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            label="Academic faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            label="Academic department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            setId={setCourseId}
            label="Course"
            name="course"
            options={courseOptions}
          />
          <PHSelect
            disabled={!courseId}
            label="Faculty"
            name="faculty"
            options={facultyOptions}
          />
          <PHInput
            name="section"
            label="Section"
            placeholder="Enter section"
            type="text"
          />
          <PHInput
            name="maxCapacity"
            label="maxCapacity"
            placeholder="Enter maxCapacity"
            type="text"
          />
          <PHSelect
            label="Days"
            name="days"
            mode="multiple"
            options={daysOptions}
          />
          <PHTimePicker label="Start Time" name="starttime" />
          <PHTimePicker label="End Time" name="endtime" />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Flex>
    </PHForm>
  );
};

export default OfferCourse;
