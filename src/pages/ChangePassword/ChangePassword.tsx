import PHForm from "../../components/form/PHForm";
import { Button, Form } from "antd";
import PHInput from "../../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement/userManagementApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePass] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const handleToCngPass = async (e: FieldValues) => {
    try {
      const res = await changePass(e).unwrap();
      toast.success(res?.data?.message);
      dispatch(logOut());
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: 360, width: "100%" }}>
        <PHForm onSubmit={handleToCngPass}>
          <Form.Item>
            <PHInput name="oldPassword" label="Old Password" type="password" />
          </Form.Item>

          <Form.Item>
            <PHInput name="newPassword" label="New Password" type="password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </PHForm>
      </div>
    </div>
  );
};

export default ChangePassword;
