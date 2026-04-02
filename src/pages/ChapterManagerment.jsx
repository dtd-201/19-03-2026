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
  Select,
} from "antd";
import api from "../services/api";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function ChapterManagement() {
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [page, setPage] = useState(1);
  // tạo thêm 1 state limit để quản lí
  const [total, setTotal] = useState(0);

  const getChapter = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/chapter/pageable?page=${currentPage}&limit=3`,
      );

      const list = res.data.data;
      console.log(list);
      const totalItems = res.data.total;

      const dataSource = list.map((item) => ({
        ...item,
        key: item._id,
      }));

      setData(dataSource);
      setTotal(totalItems);
    } catch (error) {
      message.error("Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const getSubjects = async () => {
    try {
      const res = await api.get("/subject/pageable?page=1&limit=100");

      const list = res.data.data;

      const options = list.map((item) => ({
        label: item.name,
        value: item._id,
      }));

      setSubjects(options);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChapter(page);
    getSubjects();
  }, [page]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        number: values.number,
        subjectId: values.subjectId,
      };

      if (editId) {
        await api.put(`/chapter/${editId}`, payload);
        message.success("Cập nhật thành công!");
      } else {
        await api.post("/chapter", payload);
        message.success("Thêm mới thành công!");
      }

      setOpenModal(false);
      form.resetFields();
      getChapter(page);
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleAdd = () => {
    setEditId(null);
    form.resetFields();
    setOpenModal(true);
  };

  const handleEdit = (record) => {
    setEditId(record._id);

    form.setFieldsValue({
      name: record.name,
      number: record.number,
      subjectId: record.subjectId?._id,
    });

    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/chapter/${id}`);
      message.success("Xóa thành công!");
      getChapter(page);
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
      title: "Tên chương",
      dataIndex: "name",
    },
    {
      title: "Số chương",
      dataIndex: "chapterNumber",
    },
    {
      title: "Môn học",
      render: (_, record) => record.subjectId?.name,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      render: (val) => (val ? dayjs(val).format("DD/MM/YYYY HH:mm") : "_"),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#52c41a" }} />}
            onClick={() => handleEdit(record)}
          />

          <Popconfirm
            title="Xóa chương"
            description="Bạn có chắc chắn muốn xóa chapter này không?"
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record._id)}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <h3 style={{ margin: 0, marginBottom: 20 }}>Quản lý chương</h3>

          <Button
            type="primary"
            style={{ marginBottom: 20 }}
            onClick={handleAdd}
          >
            Thêm mới
          </Button>
        </div>

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
            onChange: (p) => setPage(p),
          }}
        />
      </Card>

      <Modal
        title={editId ? "Chỉnh sửa chương" : "Thêm mới chương"}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 10 }}
        >
          <Form.Item
            label="Tên chương"
            name="name"
            rules={[{ required: true, message: "Nhập tên chương" }]}
          >
            <Input placeholder="Nhập nội dung" />
          </Form.Item>

          <Form.Item
            label="Số chương"
            name="number"
            rules={[{ required: true, message: "Nhập số chương" }]}
          >
            <Input placeholder="Nhập số chương" />
          </Form.Item>

          <Form.Item
            label="Môn học"
            name="subjectId"
            rules={[{ required: true, message: "Chọn môn học" }]}
          >
            <Select placeholder="Select môn học" options={subjects} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default ChapterManagement;
