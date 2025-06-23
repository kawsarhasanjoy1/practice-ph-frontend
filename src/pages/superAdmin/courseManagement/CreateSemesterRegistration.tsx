import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement/academicSemesterApi";
import { TAcademicSemester } from "../../../type/academicSemester";
import { SemesterRegistrationStatusOptions } from "./course.management.constance";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement/courseManagementApi";
import { toast } from "react-toastify";

const CreateSemesterRegistration = () => {
  const { data } = useGetAcademicSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const academicSemesterOptions = data?.data?.map(
    (item: TAcademicSemester): { label: string; value: string } => ({
      label: `${item?.name}-${item?.year}`,
      value: item?._id,
    })
  );
  const [createSemester] = useCreateSemesterRegistrationMutation();
  const handleToSubmit = async (e: FieldValues) => {
    e.minCredit = Number(e?.minCredit);
    e.maxCredit = Number(e?.maxCredit);
    try {
      const res = await createSemester(e).unwrap();
      console.log(res)
    if (res?.success) {
      toast.success(res?.message)
    }
    } catch (err: any) {
      console.log(err)
      toast.error(err?.data?.message);
    }
  };
  return (
    <PHForm onSubmit={handleToSubmit}>
      <Flex justify="center">
        <Col span={24} md={{ span: 8 }}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={SemesterRegistrationStatusOptions}
          />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput label="Min Credits" name="minCredit" />
          <PHInput label="Max Credits" name="maxCredit" />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Flex>
    </PHForm>
  );
};

export default CreateSemesterRegistration;
