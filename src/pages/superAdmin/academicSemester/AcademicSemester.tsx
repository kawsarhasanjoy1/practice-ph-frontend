import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement/academicSemesterApi";
import { useState } from "react";
import { TQueryValue } from "../../../type/global";
interface TDataType {
  _id: string;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

const AcademicSemester = () => {
  const [queryParams, setQueryParams] = useState<TQueryValue[]>([]);
  console.log(queryParams);
  const { data: semesterData, isFetching } =
    useGetAcademicSemesterQuery(queryParams);
  const data = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }: TDataType) => {
      return {
        key: _id,
        name,
        year,
        startMonth,
        endMonth,
      };
    }
  );
  const currentYear = new Date().getFullYear();
  const filterYear = [0, 1, 2, 3, 4, 5].map((num) => {
    return {
      text: currentYear + num,
      value: currentYear + num,
    };
  });
  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: filterYear,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];

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

export default AcademicSemester;
