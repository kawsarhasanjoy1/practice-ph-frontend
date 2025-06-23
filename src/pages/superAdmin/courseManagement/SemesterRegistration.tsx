import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import { TQueryValue } from "../../../type/global";
import {
  useGetSemesterRegistrationQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "../../../redux/features/admin/courseManagement/courseManagementApi";
import { TAcademicSemester } from "../../../type/academicSemester";
import moment from "moment";
import { toast } from "react-toastify";
interface TDataType {
  _id: string;
  academicSemester: TAcademicSemester;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
}

const items: { label: string; key: string }[] = [
  {
    label: "UPCOMING",
    key: "UPCOMING",
  },
  {
    label: "ONGOING",
    key: "ONGOING",
  },
  {
    label: "ENDED",
    key: "ENDED",
  },
];
const SemesterRegistration = () => {
  const [semesterId, setSemesterId] = useState("");
  const [queryParams, setQueryParams] = useState<TQueryValue[]>([]);
  const [updateStatus] = useUpdateSemesterRegistrationStatusMutation();
  const handleToDropDown: any = async (data: any) => {
    try {
      const Status = {
        id: semesterId,
        data: {
          status: data?.key,
        },
      };
      const res = await updateStatus(Status).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const menuDropDown = {
    items,
    onClick: handleToDropDown,
  };
  const { data: semesterData, isFetching } =
    useGetSemesterRegistrationQuery(undefined);
  const data = semesterData?.data?.map(
    ({
      _id,
      academicSemester,
      status,
      startDate,
      endDate,
      minCredit,
      maxCredit,
    }: TDataType) => {
      return {
        key: _id,
        name: `${academicSemester?.name}-${academicSemester?.year}`,
        status,
        startDate: moment(new Date(startDate)).format("MMMM"),
        endDate: moment(new Date(endDate)).format("MMMM"),
        minCredit,
        maxCredit,
      };
    }
  );

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
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        return (
          <Tag
            style={{
              color: `${
                item == "UPCOMING"
                  ? "blue"
                  : item == "ONGOING"
                  ? "green"
                  : "red"
              }`,
            }}
          >
            {item}
          </Tag>
        );
      },
    },
    {
      title: "Start Month",
      dataIndex: "startDate",
    },
    {
      title: "End Month",
      dataIndex: "endDate",
    },
    {
      title: "Min Credits",
      dataIndex: "minCredit",
    },
    {
      title: "Max Credits",
      dataIndex: "maxCredit",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Dropdown trigger={["click"]} menu={menuDropDown}>
            <Button onClick={() => setSemesterId(item?.key)}>UPDATE</Button>
          </Dropdown>
        );
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

export default SemesterRegistration;
