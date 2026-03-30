import {
  DashboardOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Sider>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["/subjects"]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/dashbord",
            icon: <DashboardOutlined />,
            label: "Thống kê",
          },
          {
            key: "/teacher",
            icon: <UserOutlined />,
            label: "Quản lí giảng viên",
          },
          {
            key: "/students",
            icon: <UserOutlined />,
            label: "Quản lí sinh viên",
          },
          {
            key: "/subjects",
            icon: <TeamOutlined />,
            label: "Môn học",
            children: [
              {
                key: "/subjects/listsubjects",
                label: "Quản lí môn học",
              },
              {
                key: "/subjects/chapter",
                label: "Quản lí chương",
              },
            ],
          },
          {
            key: "/question",
            icon: <FileOutlined />,
            label: "Câu hỏi",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
