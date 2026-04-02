import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import api from "../services/api";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function SubjectManagerment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditId, setIsEditId] = useState(null);

  // 👉 phân trang giống student/teacher
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getSubject = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/subject/pageable?page=${currentPage}&limit=3`,
      );

      const listSubjects = res.data.data;
      const totalItems = res.data.total;

      const dataSource = listSubjects.map((subject) => ({
        ...subject,
        key: subject._id,
      }));

      setData(dataSource);
      setTotal(totalItems);
    } catch (error) {
      message.error("Có lỗi xảy ra vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubject(page);
  }, [page]);

  const handleSubject = async (values) => {
    try {
      setLoading(true);
      if (isEditId) {
        await api.put(`/subject/${isEditId}`, values);
        message.success("Chỉnh sửa môn học thành công!");
      } else {
        await api.post("/subject", values);
        message.success("Thêm mới thành công!");
      }
      setIsOpenModal(false);
      form.resetFields();
      getSubject(page);
    } catch (error) {
      message.error("Có lỗi xảy ra vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const addSubject = () => {
    setIsEditId(null);
    form.resetFields();
    setIsOpenModal(true);
  };

  const editSubject = (record) => {
    setIsEditId(record._id);
    setIsOpenModal(true);
    form.setFieldsValue(record);
  };

  const deleteSubject = async (id) => {
    try {
      await api.delete(`/subject/${id}`);
      message.success("Xóa môn học thành công");
      getSubject(page);
    } catch (error) {
      message.error("Xóa thất bại!");
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => (page - 1) * 3 + index + 1,
    },
    {
      title: "Tên môn học",
      dataIndex: "name",
      fixed: "start",
    },
    {
      title: "Mã môn học",
      dataIndex: "subjectCode",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      render: (values) =>
        values ? dayjs(values).format("DD/MM/YYYY HH:mm") : "_",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} />

          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#52c41a" }} />}
            onClick={() => editSubject(record)}
          />

          <Popconfirm
            title="Xóa môn học"
            description="Bạn có chắc chắn muốn xóa môn học này không?"
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => deleteSubject(record._id)}
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
            <h3 style={{ marginBottom: 8 }}>Quản lý môn học</h3>

            <Button type="primary" onClick={addSubject}>
              Thêm mới
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <Table
          bordered
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
          loading={loading}
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

      {/* MODAL */}
      <Modal
        title={isEditId ? "Chỉnh sửa môn học" : "Thêm mới môn học"}
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubject}>
          <Form.Item
            label="Tên môn học"
            name="name"
            rules={[{ required: true, message: "Nhập môn học" }]}
          >
            <Input placeholder="Nhập tên môn học" />
          </Form.Item>

          <Form.Item
            label="Mã môn học"
            name="subjectCode"
            rules={[{ required: true, message: "Nhập mã môn học" }]}
          >
            <Input placeholder="Nhập mã môn học" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SubjectManagerment;
