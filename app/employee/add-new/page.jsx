"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, Spin, notification } from "antd";
import { useRouter } from "next/navigation";

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState("");
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Xảy ra lỗi",
      description:
        "Tạo mới nhân viên không thành công. Mã sản phẩm tạo đã được sử dụng, vui lòng chọn mã nhân viên khác",
    });
  };

  const onFinish = async (values) => {
    const newEmployee = {
      id: values.id,
      name: values.name,
      role: values.role,
      phone_number: values.phone_number,
      address: values.address,
    };
    try {
      setLoading(true);
      const res = await fetch("/api/employee", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (res.ok) {
        router.push("/employee");
        form.resetFields(); // Reset form fields after submission
      } else {
        const err = await res.json();
        form.resetFields(); // Reset form fields after submission
        openNotificationWithIcon("error");
        throw new Error("Failed to create a employee");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes (whether success or failure)
    }
  };

  return (
    <div>
      {contextHolder}
      <h1 className="text-center font-bold text-lg mb-4">THÊM MỚI NHÂN VIÊN</h1>
      <Spin spinning={loading}>
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
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên nhân viên"
            rules={[{ required: true }]}
          >
            <Input />
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
                onClick={() => {}}
                type="primary"
                size="middle"
                className="min-w-[126px]"
              >
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default EmployeeForm;
