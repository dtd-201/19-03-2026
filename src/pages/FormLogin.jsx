import { Button, Checkbox, Form, Input, message } from "antd";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await api.post("/user/login", values);
      console.log(response.data);
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      message.success("Đăng nhập thành công");
      navigate("/dashbord");
    } catch (error) {
      message.error("Đăng nhập thất bại!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormLogin;
