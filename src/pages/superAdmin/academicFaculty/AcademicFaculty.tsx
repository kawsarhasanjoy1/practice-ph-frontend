import React, { useState } from "react";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFacultyApi";
import { Button, Popconfirm, Table, TableColumnsType, TableProps } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
interface DataType {
  _id: React.Key;
  name: string;
}

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } =
    useGetAcademicFacultyQuery(undefined);

  const data = facultyData?.data?.map(({ _id, name }: DataType) => {
    return {
      key: _id,
      name,
    };
  });
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
  ) => {
   
  };
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

export default AcademicFaculty;
