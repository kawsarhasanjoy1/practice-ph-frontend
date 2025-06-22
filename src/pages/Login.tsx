import { Button, Form } from "antd";
import { useLoginUserMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { loginUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import PHInput from "../components/form/PHInput";
import PHForm from "../components/form/PHForm";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const handleToLogin = async (data: { id: string; password: string }) => {
    console.log(data);
    try {
      const res = (await login(data)) as any;
      if (res?.error) {
        toast.error(res?.error?.data?.message || "something went wrong");
      }
      if (res?.data) {
        const token = res?.data?.data?.accessToken;
        const user = verifyToken(token) as any;
        dispatch(loginUser({ user: user, token: token }));
        toast.success("user login successful");
        navigate(`/${user?.role}/dashboard`);
      }
    } catch (error: any) {
      toast.error(error?.error?.data?.message || "something went wrong");
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
        <PHForm defaultValues={{id: '0001',password:'admin12345'}} onSubmit={handleToLogin}>
          <Form.Item>
            <PHInput name="id" type="text" />
          </Form.Item>

          <Form.Item>
            <PHInput name="password" type="password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </PHForm>
      </div>
    </div>
  );
};

export default Login;
