import { useEffect, useState } from "react";
import api from "../services/api";
import { Table } from "antd";

function StudenMangerment() {
    const [data, setData] = useState([]);
  const getUser = async () => {
    const res = await api.get("/user/info/me");
    setData([{
        ... res.data,
        key: res.data.id
    }])
    console.log(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Họ tên",
      width: 100,
      dataIndex: "fullName",
      fixed: "start",
    },
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
    },
    {
      title: "Lớp hành chính",
      dataIndex: "department",
      key: "1",
      fixed: "start",
    },
    { title: "Mã sinh viên", dataIndex: "identityCode", key: "2" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "3" },
    { title: "Thao tác", key: "4" },
  ];
  return (
    <>
      <h2>Quản lí sinh viên</h2>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={false}
      />
    </>
  );
}

export default StudenMangerment;
