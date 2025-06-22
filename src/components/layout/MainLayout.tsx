import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/authSlice";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: "0px" }}>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              paddingRight: "20px",
            }}
          >
            <Button onClick={handleToLogout} type="primary">
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
