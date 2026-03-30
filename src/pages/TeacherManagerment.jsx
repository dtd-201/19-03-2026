import { useEffect, useState } from "react";
import api from "../services/api";
import { Card, Descriptions, Form, Input, message, Modal, Table } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Button, Popconfirm } from "antd";

function TeacherManagerment() {
  const [data, setData] = useState([]);
  const [IsEditid, setIsEditId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [detailTeacher, setDetailTeacher] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [form] = Form.useForm();

  const getTeacher = async (currentPage = 1) => {
    try {
      const res = await api.get(
        `/teacher/pageable?page=${currentPage}&limit=3`,
      );

      const teacherList = res.data.data;
      const totalItems = res.data.total;

      const dataSource = teacherList.map((teacher) => ({
        ...teacher,
        key: teacher._id,
      }));

      setData(dataSource);
      setTotal(totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacher(page);
  }, [page]);

  const handleTeacher = async (values) => {
    try {
      if (IsEditid) {
        await api.put(`/teacher/${IsEditid}`, values);
        message.success("Cập nhật giảng viên thành công!");
      } else {
        await api.post("/teacher", values);
        message.success("Thêm mới giảng viên thành công!");
      }

      setOpenForm(false);
      form.resetFields();
      getTeacher(page);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const addTeacher = () => {
    setIsEditId(null);
    form.resetFields();
    setOpenForm(true);
  };

  const handleEditTeacher = (record) => {
    setIsEditId(record._id);
    form.setFieldsValue(record);
    setOpenForm(true);
  };

  const handleDeleteTeacher = async (id) => {
    await api.delete(`/teacher/${id}`);
    message.success("Xóa giảng viên thành công!");
    getTeacher(page);
  };

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => (page - 1) * 3 + index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      fixed: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Đơn vị",
      dataIndex: "department",
      key: "1",
      fixed: "start",
    },
    { title: "Mã cán bộ", dataIndex: "identityCode", key: "2" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "3" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: "#1890ff" }} />}
            onClick={() => {
              setDetailTeacher(record);
              setOpenDetail(true);
            }}
          />

          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#52c41a" }} />}
            onClick={() => handleEditTeacher(record)}
          />

          <Popconfirm
            title="Xóa giảng viên"
            description="Bạn có chắc chắn muốn xóa giảng viên này không?"
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => handleDeleteTeacher(record._id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Quản lí giảng viên</h3>

            <Button type="primary" onClick={() => addTeacher()}>
              Thêm mới
            </Button>
          </div>
        </div>

        <Table
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize: 3,
            total: total,
            onChange: (page) => {
              setPage(page);
            },
          }}
        />
      </Card>

      {/* Modal Detail */}
      <Modal
        title="Chi tiết giảng viên"
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        footer={null}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Họ tên">
            {detailTeacher?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {detailTeacher?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Mã cán bộ">
            {detailTeacher?.identityCode}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {detailTeacher?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Đơn vị">
            {detailTeacher?.department}
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      {/* Modal Form */}
      <Modal
        title={IsEditid ? "Cập nhật giảng viên" : "Thêm mới giảng viên"}
        open={openForm}
        onCancel={() => setOpenForm(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleTeacher}>
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mã cán bộ" name="identityCode">
            <Input />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Đơn vị" name="department">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default TeacherManagerment;
