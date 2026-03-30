import { Layout, Avatar, Space, Dropdown } from "antd";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const items = [
    { key: "setting", label: "Cài đặt" },
    { key: "logout", label: "Đăng xuất" },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "setting") navigate("/profile");
    if (key === "logout") {
      localStorage.clear();
      navigate("/login");
    }
  };

  const getUser = async () => {
    try {
      const res = await api.get("/user/info/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Header
      style={{
        background: "#001529",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {/* LOGO + AVATAR */}
      <Space size="middle">
        <Avatar
          style={{
            backgroundColor: "#1677ff",
            fontWeight: "bold",
          }}
        >
          H
        </Avatar>

        <span style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
          HNUE
        </span>
      </Space>

      {/* USER */}
      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar style={{ backgroundColor: "#f56a00" }} size="large">
              {user?.fullName?.charAt(0) || "U"}
            </Avatar>
            <span style={{ color: "#fff", fontWeight: 500 }}>
              {user?.fullName || "User"}
            </span>
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
