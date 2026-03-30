import { Layout } from "antd";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/SIdebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Layout>
        <Sidebar />

        <Layout
          style={{
            background: "#f5f7fa",
            padding: 16,
          }}
        >
          <Content
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
