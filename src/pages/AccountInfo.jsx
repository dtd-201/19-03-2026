import { Card, Avatar, Row, Col, Typography } from "antd";
import { useEffect, useState } from "react";
import api from "../services/api";

const { Title, Text } = Typography;

const AccountInfo = () => {
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const res = await api.get("/user/info/me");
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Card style={{ margin: 20, borderRadius: 10 }}>
      <Row align="middle">
        {/* LEFT */}
        <Col span={16}>
          <p>📞 {user?.phone || "Chưa cập nhật"}</p>
          <p>🆔 {user?.identityCode}</p>
          <p>📅 {user?.dob || "Chưa cập nhật"}</p>
          <p>📍 {user?.address || "Chưa cập nhật"}</p>
          <p>📧 {user?.email}</p>
        </Col>

        {/* RIGHT */}
        <Col span={8} style={{ textAlign: "center" }}>
          <Avatar size={100}>{user?.fullName?.charAt(0)}</Avatar>

          <div style={{ marginTop: 10 }}>
            <a>Đổi mật khẩu</a>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default AccountInfo;
