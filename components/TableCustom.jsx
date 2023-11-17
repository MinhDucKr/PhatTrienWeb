"use client";
import React, { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";
import Link from "next/link";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ModalDeleteEmployee from "./Modal/delete";

const TableCustom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [recordClicked, setRecordClicked] = useState();

  const getListEmployee = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/employee", {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees);
      } else {
        throw new Error("Failed to get list employee");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes (whether success or failure)
    }
  };

  // run init
  useEffect(() => {
    getListEmployee();
  }, []);

  // state modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteEmployee = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/employee?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIsModalOpen(false);
        getListEmployee();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsModalOpen(false);
      setLoading(false);
    }
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
            <Link href={`/employee/edit/${record?._id}`}>
              <EditOutlined className="text-lg text-[#718098] cursor-pointer" />
            </Link>
            <DeleteOutlined
              onClick={() => {
                setIsModalOpen(true);
                setRecordClicked(record);
              }}
              className="ml-8 text-lg text-[#718098] cursor-pointer w-5 h-5"
            />
          </div>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <ModalDeleteEmployee
        isModalOpen={isModalOpen}
        onOk={handleDeleteEmployee}
        onCancel={handleCancel}
        record={recordClicked}
      />
      <div>
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
        <Table columns={columns} dataSource={employees} rowKey={"_id"} />
      </div>
    </Spin>
  );
};
export default TableCustom;
