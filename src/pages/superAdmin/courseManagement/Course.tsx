import { Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryValue } from "../../../type/global";
import { useGetCourseQuery } from "../../../redux/features/admin/courseManagement/courseManagementApi";
import { toast } from "react-toastify";
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
      title: "Prefix",
      dataIndex: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
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
