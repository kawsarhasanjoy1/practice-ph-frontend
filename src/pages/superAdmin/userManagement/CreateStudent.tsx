import { Button, Col, Divider, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  bloodOptions,
  ganderOptions,
  studentDefaultValues,
} from "./user.management.constance";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement/academicSemesterApi";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartmentApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentZodSchema } from "./studentZodValidation";
import { Controller, FieldValues } from "react-hook-form";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement/userManagementApi";
import { toast } from "react-toastify";

const CreateStudent = () => {
  const { data: sData, isFetching: sIsFetching } =
    useGetAcademicSemesterQuery(undefined);

  const { data: fData, isFetching: fIsFetching } =
    useGetAcademicFacultyQuery(undefined);

  const { data: dData, isFetching: DIsFetching } =
    useGetAcademicDepartmentQuery(undefined);

  const semesterOptions = sData?.data?.map(
    (item: { name: any; year: any; _id: any }) => {
      return {
        label: `${item?.name}-${item?.year}`,
        value: item?._id,
      };
    }
  );

  const academicFacultyOptions = fData?.data?.map((item: any) => {
    return {
      label: `${item?.name}`,
      value: item?._id,
    };
  });
  const academicDepartmentOptions = dData?.data?.map((item: any) => {
    return {
      label: `${item?.name}`,
      value: item?._id,
    };
  });
  const [createStudent] = useCreateStudentMutation();
  const handleToStudent = async (e: FieldValues) => {
    const studentData = {
      password: "student12",
      student: e,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", e.profileImg);
    try {
      const res = await createStudent(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm defaultValues={studentDefaultValues} onSubmit={handleToStudent}>
          <Row gutter={12}>
            <Divider>Personal info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.firstName"
                label="First Name"
                placeholder="Enter student name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.middleName"
                label="Middle Name"
                placeholder="Enter student name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.lastName"
                label="Last Name"
                placeholder="Enter student name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Gander" name="gender" options={ganderOptions} />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    {...field}
                    value={value?.fileName}
                    onChange={(e) => onChange(e.target.files?.[0])}
                    type="file"
                    size="large"
                  />
                )}
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Divider>Contact info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="email"
                label="Email"
                placeholder="Enter student email"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="contactNo"
                label="Contact Number"
                placeholder="Enter student contactNo"
                type="text"
              />
            </Col>
            {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="emergencyContactNo"
                label="Emergency ContactNo"
                placeholder="Enter student emergencyContactNo"
                type="text"
              />
            </Col> */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="emergencyContactNo"
                label="Emergency ContactNo"
                placeholder="Enter student emergencyContactNo"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="presentAddress"
                label="Present Address"
                placeholder="Enter student presentAddress"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Enter student permanentAddress"
                type="text"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Divider>Guardian info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherName"
                label="Father Name"
                placeholder="Enter student father name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherOccupation"
                label="Father Occupation"
                placeholder="Enter Father Occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherContactNo"
                label="Father ContactNo"
                placeholder="Enter student name"
                type="text"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherName"
                label="Mother Name"
                placeholder="Enter student mother name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherOccupation"
                label="Mother Occupation"
                placeholder="Enter student mother Occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherContactNo"
                label="Mother ContactNo"
                placeholder="Enter student mother ContactNo"
                type="text"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Divider>Local Guardian info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.name"
                label="Name"
                placeholder="Enter local guardian name"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.occupation"
                label="Occupation"
                placeholder="Enter local guardian Occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.contactNo"
                label="ContactNo"
                placeholder="Enter Local guardian contactNo"
                type="text"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="localGuardian.address"
                label="Address"
                placeholder="Enter student mother name"
                type="text"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Divider>Academic info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Faculty"
                name="academicFaculty"
                options={academicFacultyOptions}
                disabled={fIsFetching}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label=" Academic Department"
                name="academicDepartment"
                disabled={DIsFetching}
                options={academicDepartmentOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                disabled={sIsFetching}
                label="Admission Semester"
                name="admissionSemester"
                options={semesterOptions}
              />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
