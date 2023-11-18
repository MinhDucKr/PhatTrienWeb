"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { useRouter } from "next/navigation";

const EmployeeForm = ({ params }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState("");
  const [employeeData, setEmployeeData] = useState(null);

  const [message, setMessage] = useState("");
  const { id } = params;

  useEffect(() => {
    const getEmployeeById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/employee/${id}`, {
          cache: "no-store",
        });

        if (response.ok) {
          const { employee } = await response.json();
          setEmployeeData(employee);
          form.setFieldsValue(employee);
          setMessage("");
        } else {
          setEmployeeData(null);
          setMessage("Employee not found.");
        }
      } catch (error) {
        setEmployeeData(null);
        setMessage("Error fetching employee.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch employee details when the ID changes
    getEmployeeById();
  }, [id]);

  const onFinish = async (values) => {
    const updateEmployee = {
      id: values.id,
      name: values.name,
      role: values.role,
      phone_number: values.phone_number,
      address: values.address,
    };
    try {
      setLoading(true);
      const res = await fetch(`/api/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateEmployee),
      });

      if (res.ok) {
        form.resetFields(); // Reset form fields after submission
        router.push("/employee");
      } else {
        const err = await res.json();
        setExist(err.message);
        throw new Error("Failed to update a employee");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes (whether success or failure)
    }
  };

  return (
    <Spin spinning={loading}>
      {employeeData && (
        <div>
          <h1 className="text-center font-bold text-lg mb-4">
            CẬP NHẬT THÔNG TIN NHÂN VIÊN
          </h1>
          <Form
            className="max-w-[600px]"
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="id"
              label="Mã nhân viên"
              rules={[{ required: true }]}
            >
              <Input disabled />
              {!!exist && <p className="text-red-500">{exist}</p>}
            </Form.Item>
            <Form.Item
              name="name"
              label="Tên nhân viên"
              rules={[{ required: true }]}
            >
              <Input value={employeeData.name} />
            </Form.Item>
            <Form.Item name="role" label="Chức vụ" rules={[{ required: true }]}>
              <Select placeholder="Lựa chọn chức vụ">
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="employee">Employee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="phone_number"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <div className="flex items-center justify-center gap-4 pt-4 p-2">
                <Button
                  type="default"
                  className=" min-w-[126px]"
                  size="middle"
                  onClick={() => router.back()}
                >
                  Hủy
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="middle"
                  className="min-w-[126px]"
                >
                  Cập nhật
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </Spin>
  );
};

export default EmployeeForm;
