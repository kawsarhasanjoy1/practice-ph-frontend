import { Button, Popconfirm, Table, TableColumnsType, TableProps } from "antd";
import { FaRegTrashCan, FaU } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartmentApi";
interface DataType {
  _id: React.Key;
  name: string;
  academicFaculty: { name: string };
}

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAcademicDepartmentQuery(undefined);

  console.log(departmentData);

  const data = departmentData?.data?.map(
    ({ _id, name, academicFaculty }: DataType) => {
      return {
        key: _id,
        name,
        facultyName: academicFaculty?.name,
      };
    }
  );
  const handleToDelete = (e: any) => {
    console.log(e);
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Name",
          value: "name",
        },
      ],
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this semester?"
          onConfirm={handleToDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<FaRegTrashCan />} />
        </Popconfirm>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this semester?"
          onConfirm={handleToDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<FaRegEdit />} />
        </Popconfirm>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};
  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={isFetching}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicDepartment;
