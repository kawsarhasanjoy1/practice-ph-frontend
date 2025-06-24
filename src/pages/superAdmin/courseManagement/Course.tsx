import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryValue } from "../../../type/global";
import { useGetCourseQuery } from "../../../redux/features/admin/courseManagement/courseManagementApi";
import { toast } from "react-toastify";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAssignFacultyMutation,
  useGetFacultiesQuery,
} from "../../../redux/features/admin/userManagement/userManagementApi";
import { FieldValues } from "react-hook-form";
type TPreRequisiteCourses = {
  course: string;
  isDeleted: boolean;
};
type TDataType = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};

const Course = () => {
  const [queryParams, setQueryParams] = useState<TQueryValue[]>([]);
  const { data: courseData, isFetching } = useGetCourseQuery(undefined);
  const data = courseData?.data?.map(
    ({ _id, title, code, credits, prefix }: TDataType) => {
      return {
        key: _id,
        title,
        code,
        credits,
        prefix,
      };
    }
  );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Title",
      dataIndex: "title",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Faculty",
      render: (item) => {
        return <FacultyModal data={item} />;
      },
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra?.action === "filter") {
      if (filters.name) {
        const newQueryParams =
          filters?.name?.map((item) => {
            return {
              name: "name",
              value: String(item),
            };
          }) ?? [];
        setQueryParams(newQueryParams);
      }
    }
    if (extra?.action === "filter") {
      if (filters.year) {
        const newQueryParams =
          filters?.year?.map((item) => {
            return {
              name: "year",
              value: String(item),
            };
          }) ?? [];
        setQueryParams(newQueryParams);
      }
    }
  };

  return (
    <div>
      <Table<TDataType>
        columns={columns}
        dataSource={data}
        loading={isFetching}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default Course;

const FacultyModal = ({ data }: any) => {
  const [assignFaculty] = useAssignFacultyMutation();
  const { data: facultyData } = useGetFacultiesQuery([
    { name: "sort", value: "createdAt" },
  ]);
  const facultyOptions = facultyData?.data?.map((item: any) => ({
    label: item?.fullName,
    value: item?._id,
  }));
  const [isModalOpen, setIsOpenModal] = useState(false);
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  const handleToSubmit = async (e: FieldValues) => {
    const eData = {
      id: data?.key,
      data: {
        faculties: e?.faculties,
      },
    };
    try {
      const res = await assignFaculty(eData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <>
      <Button type="primary" onClick={() => setIsOpenModal(true)}>
        Assign Faculty
      </Button>
      <Modal
        footer={null}
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <PHForm onSubmit={handleToSubmit}>
          <PHSelect
            mode="multiple"
            label="Faculties"
            name="faculties"
            options={facultyOptions}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  );
};
