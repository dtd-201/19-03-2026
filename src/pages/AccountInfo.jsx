import { Card, Avatar, Row, Col, Typography, message, Space } from "antd";
import { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import api from "../services/api";
import {
  CalendarOutlined,
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const AccountInfo = () => {
  const [user, setUser] = useState(null);
  const [isOpenModalEditPw, setIsOpenModalEditPw] = useState(false);
  const [form] = Form.useForm();
  const getUserInfo = async () => {
    try {
      const res = await api.get("/user/info/me");
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      message.error("Có lỗi xảy ra vui lòng thử lại! ");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleChangePassword = async (values) => {
    try {
      const payload = {
        password: values.oldPassword,
        newPassword: values.newPassword,
      };

      console.log("DATA SEND:", payload);

      await api.post("/user/change-password", payload);

      message.success("Đổi mật khẩu thành công");
      setIsOpenModalEditPw(false);
      form.resetFields();
    } catch (error) {
      console.log("ERROR FULL:", error.response);
      console.log("ERROR DATA:", error.response?.data);
      message.error(error.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };
  return (
    <Card
      style={{
        margin: 20,
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Row align="middle" justify="space-between">
        <Col span={16}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <div className="profile-item">
              <PhoneOutlined />
              <span>
                {user?.phoneNumber || (
                  <span className="text-muted">Chưa cập nhật</span>
                )}
              </span>
            </div>

            <div className="profile-item">
              <IdcardOutlined />
              <span>
                {user?.identityCode || (
                  <span className="text-muted">Chưa cập nhật</span>
                )}
              </span>
            </div>

            <div className="profile-item">
              <CalendarOutlined />
              <span>
                {user?.dob || <span className="text-muted">Chưa cập nhật</span>}
              </span>
            </div>

            <div className="profile-item">
              <HomeOutlined />
              <span>
                {user?.address || (
                  <span className="text-muted">Chưa cập nhật</span>
                )}
              </span>
            </div>

            <div className="profile-item">
              <MailOutlined />
              <span>{user?.email}</span>
            </div>
          </Space>
        </Col>

        <Col span={8} style={{ textAlign: "center" }}>
          <Avatar
            size={100}
            style={{
              backgroundColor: "#1677ff",
              fontSize: 36,
            }}
          >
            {user?.fullName?.charAt(0)}
          </Avatar>

          <div style={{ marginTop: 12 }}>
            <a
              className="change-password"
              onClick={() => setIsOpenModalEditPw(true)}
            >
              Đổi mật khẩu
            </a>
          </div>
        </Col>
      </Row>

      <Modal
        title="Đổi mật khẩu"
        open={isOpenModalEditPw}
        onCancel={() => setIsOpenModalEditPw(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: "Nhập mật khẩu cũ" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Nhập mật khẩu mới" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AccountInfo;
