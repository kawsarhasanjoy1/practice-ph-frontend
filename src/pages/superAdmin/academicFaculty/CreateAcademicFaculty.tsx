import React from "react";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultyZodValidationSchema } from "./zodValidationSchema";
import { Button, Col, Flex } from "antd";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import { toast } from "react-toastify";

const CreateAcademicFaculty = () => {
  const [createFaculty] = useCreateAcademicFacultyMutation();
  const handleToFaculty = async (e: FieldValues) => {
    try {
      const res = await createFaculty(e).unwrap();
      if (res?.data) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Col span={8}>
        <PHForm
          onSubmit={handleToFaculty}
          resolver={zodResolver(academicFacultyZodValidationSchema)}
        >
          <PHInput
            name="name"
            label="Name"
            placeholder="Enter your faculty name"
            type="text"
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
