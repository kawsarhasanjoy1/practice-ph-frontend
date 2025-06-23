import { Layout, Menu } from "antd";
import sidebarGenerator from "../../utils/sidebarGenerator";
import { adminPath } from "../../routes/admin.routes";
import { useAppSelector } from "../../redux/hooks";
const { Sider } = Layout;

const Sidebar = () => {
  const USER_ROLE = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
    SUPER_ADMIN: "superAdmin",
  };
  const roles = useAppSelector((store) => store.auth.user.role);
  console.log(roles);
  const role = "superAdmin";
  let sidebarItems;
  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      sidebarItems = sidebarGenerator(adminPath, USER_ROLE.SUPER_ADMIN);
      break;
    case USER_ROLE.ADMIN:
      sidebarItems = sidebarGenerator(adminPath, USER_ROLE.ADMIN);
      break;
    case USER_ROLE.FACULTY:
      sidebarItems = sidebarGenerator(adminPath, USER_ROLE.FACULTY);
      break;
    case USER_ROLE.STUDENT:
      sidebarItems = sidebarGenerator(adminPath, USER_ROLE.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      style={{ height: "100vh", position: "sticky", left: "0", top: " 0" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <h1
        style={{
          textAlign: "center",
          color: "white",
          height: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        PH UNIVERSITY
      </h1>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
