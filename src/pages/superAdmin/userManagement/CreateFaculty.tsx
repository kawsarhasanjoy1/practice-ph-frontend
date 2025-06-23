import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartmentApi";

import {
  bloodOptions,
  facultyDefaultValues,
  ganderOptions,
} from "./user.management.constance";
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagement/userManagementApi";
import { facultyZodSchema } from "./users.zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateFaculty = () => {
  const { data: fData, isFetching: fIsFetching } =
    useGetAcademicFacultyQuery(undefined);
  const { data: dData, isFetching: dIsFetching } =
    useGetAcademicDepartmentQuery(undefined);

  const academicFacultyOptions = fData?.data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));

  const academicDepartmentOptions = dData?.data?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));

  const [createFaculty] = useCreateFacultyMutation();

  const handleToFaculty = async (e: FieldValues) => {
    const facultyData = {
      password: "faculty12",
      faculty: e,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", e.profileImg);

    try {
      const res = await createFaculty(formData).unwrap();
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          defaultValues={facultyDefaultValues}
          onSubmit={handleToFaculty}
          resolver={zodResolver(facultyZodSchema)}
        >
          <Row gutter={12}>
            <Divider>Personal info</Divider>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="name.firstName"
                label="First Name"
                placeholder="Enter first name"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="name.middleName"
                label="Middle Name"
                placeholder="Enter middle name"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="name.lastName"
                label="Last Name"
                placeholder="Enter last name"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="designation"
                label="Designation"
                placeholder="Enter designation"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect label="Gender" name="gender" options={ganderOptions} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <Form.Item label="Image">
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
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Divider>Contact info</Divider>
            <Col span={24} md={12} lg={8}>
              <PHInput name="email" label="Email" placeholder="Enter email" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="contactNo"
                label="Contact Number"
                placeholder="Enter contact number"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="emergencyContactNo"
                label="Emergency Contact"
                placeholder="Enter emergency contact"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="presentAddress"
                label="Present Address"
                placeholder="Enter present address"
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput
                name="permanentAddress"
                label="Permanent Address"
                placeholder="Enter permanent address"
              />
            </Col>
          </Row>

          <Row gutter={12}>
            <Divider>Academic info</Divider>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                label="Academic Faculty"
                name="academicFaculty"
                options={academicFacultyOptions}
                disabled={fIsFetching}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
                disabled={dIsFetching}
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

export default CreateFaculty;
