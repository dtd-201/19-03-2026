import { Layout } from "antd";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/SIdebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function MainLayout() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Sidebar />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
