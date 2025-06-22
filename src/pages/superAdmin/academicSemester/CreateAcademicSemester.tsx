import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {
  monthOptions,
  nameOptions,
  yearOptions,
} from "./academic.semester.constance";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterZodSchema } from "./academicSemesterZodSchema";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement/academicSemesterApi";
import { toast } from "react-toastify";

const CreateAcademicSemester = () => {
  const [createAcademicSemester] = useCreateAcademicSemesterMutation();
  const handleToSubmit = async (data: FieldValues) => {
    const name = nameOptions[Number(data?.name) - 1].label;
    const code = nameOptions[Number(data?.name) - 1].value;
    const year = data.year;
    const semesterData = {
      name,
      code,
      year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };
    try {
      const res = await createAcademicSemester(semesterData).unwrap();
      console.log(res)
      if (res?.success) {
        toast.success(res?.message);
      }
      // console.log(res);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <Flex style={{ height: "100vh" }} justify="center" align="center">
      <Col span={8}>
        <PHForm
          resolver={zodResolver(academicSemesterZodSchema)}
          onSubmit={handleToSubmit}
        >
          <PHSelect options={nameOptions} label="Name" name="name" />
          <PHSelect options={yearOptions} label="Year" name="year" />
          <PHSelect
            options={monthOptions}
            label="Start Month"
            name="startMonth"
          />
          <PHSelect options={monthOptions} label="End Month" name="endMonth" />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
