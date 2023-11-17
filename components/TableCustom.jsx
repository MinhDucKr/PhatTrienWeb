"use client";
import React, { useState } from "react";
import { Button, Table } from "antd";
import Link from "next/link";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ModalDeleteEmployee from "./Modal/delete";

const data = [
  {
    id: "NV001",
    name: "Dương Minh Đức",
    role: "Manager",
    phone_number: "0877653450",
    address: "Định Công, Hoàng Mai, Hà Nội",
    action: "",
  },
  {
    id: "NV002",
    name: "Dương Minh Đức",
    role: "Manager",
    phone_number: "0877653450",
    address: "Định Công, Hoàng Mai, Hà Nội",
    action: "",
  },
  {
    id: "NV003",
    name: "Dương Minh Đức",
    role: "Manager",
    phone_number: "0877653450",
    address: "Định Công, Hoàng Mai, Hà Nội",
    action: "",
  },
];

const TableCustom = () => {
  const router = useRouter();

  // state modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // define column
  const columns = [
    {
      title: "Mã nhân viên ",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên nhân viên ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chức vụ",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      dataIndex: "phone_number",
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <Link href={"/employee/edit/1223"}>
              <EditOutlined className="text-lg text-[#718098] cursor-pointer" />
            </Link>
            <DeleteOutlined
              onClick={() => setIsModalOpen(true)}
              className="ml-8 text-lg text-[#718098] cursor-pointer w-5 h-5"
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ModalDeleteEmployee
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <h1 className="text-center font-bold text-lg">DANH MỤC NHÂN VIÊN</h1>
      <div className="my-4">
        <Button
          onClick={() => router.push("/employee/add-new")}
          className="ml-auto"
          style={{ display: "block" }}
          type="primary"
          icon={<PlusOutlined />}
        >
          Thêm nhân viên
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
};
export default TableCustom;
