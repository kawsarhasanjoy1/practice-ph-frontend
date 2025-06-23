import { Button, Col, Divider, Input, Row, Form } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { adminDefaultValues } from "./user.management.constance";
import { bloodOptions, ganderOptions } from "./user.management.constance";
import { adminZodSchema } from "./users.zod.validation";
import { useCreateAdminMutation } from "../../../redux/features/admin/userManagement/userManagementApi";

const CreateAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();

  const handleToAdmin = async (e: FieldValues) => {
    console.log(e);
    const adminData = {
      password: "admin12",
      admin: e,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", e.profileImg);

    try {
      const res = await createAdmin(formData).unwrap();
      console.log(res)
      if (res?.success) toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          resolver={zodResolver(adminZodSchema)}
          defaultValues={adminDefaultValues}
          onSubmit={handleToAdmin}
        >
          <Row gutter={12}>
            <Divider>Personal Info</Divider>
            <Col span={24} md={12} lg={8}>
              <PHInput name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="designation" label="Designation" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect label="Gender" name="gender" options={ganderOptions} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <Form.Item label="Image">
                <Controller
                  name="profileImg"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      type="file"
                      size="large"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Divider>Contact Info</Divider>
            <Col span={24} md={12} lg={8}>
              <PHInput name="email" label="Email" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="emergencyContactNo" label="Emergency Contact No" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="presentAddress" label="Present Address" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput name="permanentAddress" label="Permanent Address" />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
