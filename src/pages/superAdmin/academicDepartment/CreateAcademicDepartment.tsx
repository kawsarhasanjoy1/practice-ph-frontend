import { Button, Col, Flex } from "antd";
import React from "react";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentZodSchema } from "./academicDepartmentZodValidation";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import PHSelect from "../../../components/form/PHSelect";
import { useCreateAcademicDepartmentMutation } from "../../../redux/features/admin/academicManagement/academicDepartmentApi";
import { toast } from "react-toastify";

const CreateAcademicDepartment = () => {
  const { data } = useGetAcademicFacultyQuery(undefined);
  const [createDepartment] = useCreateAcademicDepartmentMutation();
  const facultyOptions = data?.data?.map((facultyId: any) => {
    return {
      label: facultyId?.name,
      value: facultyId?._id,
    };
  });
  const handleToDepartment = async (e: FieldValues) => {
    try {
      const res = await createDepartment(e).unwrap();
      if (res?.data) {
        toast.success(res?.data?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Col span={8}>
        <PHForm
          onSubmit={handleToDepartment}
          resolver={zodResolver(academicDepartmentZodSchema)}
        >
          <PHInput
            name="name"
            label="Name"
            placeholder="Enter your faculty name"
            type="text"
          />
          <PHSelect
            label="Faculty Id"
            name="academicFaculty"
            options={facultyOptions}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
