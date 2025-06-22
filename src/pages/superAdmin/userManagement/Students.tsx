import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";

import { useGetStudentsQuery } from "../../../redux/features/admin/userManagement/userManagementApi";
import { TStudent } from "../../../type/student";
import { useState } from "react";
import { Link } from "react-router-dom";

const Students = () => {
  type TStudentTableData = Pick<
    TStudent,
    "_id" | "id" | "fullName" | "email" | "contactNo"
  >;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: studentData, isFetching } = useGetStudentsQuery([
    {
      name: "limit",
      value: limit,
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "sort",
      value: "-id",
    },
  ]);
  console.log(studentData);
  const data = studentData?.data?.map(
    ({ _id, fullName, id, email, contactNo }: TStudentTableData) => {
      return {
        key: _id,
        id,
        fullName,
        email,
        contactNo,
      };
    }
  );

  const columns: TableColumnsType<TStudentTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Student Role",
      dataIndex: "id",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      dataIndex: "email",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space>
          <Button>Update</Button>
          <Link to={`/faculty/student-data/${item?.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Block</Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TStudentTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};
  return (
    <div>
      <Table<TStudentTableData>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={isFetching}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        style={{ marginTop: "20px" }}
        total={studentData?.meta?.total}
        pageSize={studentData?.meta?.limit}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default Students;
