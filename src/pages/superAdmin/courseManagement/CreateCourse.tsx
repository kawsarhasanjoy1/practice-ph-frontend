import { FieldValues } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import {
  useCreateCoursesMutation,
  useGetCourseQuery,
} from "../../../redux/features/admin/courseManagement/courseManagementApi";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const [createCourse] = useCreateCoursesMutation();
  const { data } = useGetCourseQuery(undefined);
  const preRequisiteCoursesOptions = data?.data?.map((item: any) => ({
    label: item?.title,
    value: item?._id,
  }));
  const handleToSubmit = async (e: FieldValues) => {
    e.code = Number(e?.code);
    e.credits = Number(e?.credits);
    const courseData = {
      ...e,
      isDeleted: false,
      preRequisiteCourses: e?.preRequisiteCourses
        ? e?.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = await createCourse(courseData).unwrap();

      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <PHForm onSubmit={handleToSubmit}>
      <Flex justify="center">
        <Col span={24} md={{ span: 8 }}>
          <PHInput
            name="title"
            label="Title"
            placeholder="Enter title"
            type="text"
          />
          <PHInput
            name="prefix"
            label="Prefix"
            placeholder="Enter prefix"
            type="text"
          />
          <PHInput
            name="code"
            label="Code"
            placeholder="Enter code"
            type="text"
          />
          <PHInput
            name="credits"
            label="Credits"
            placeholder="Enter credits"
            type="text"
          />
          <PHSelect
            mode="multiple"
            label="Pre Requisite Courses"
            name="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Flex>
    </PHForm>
  );
};

export default CreateCourse;
