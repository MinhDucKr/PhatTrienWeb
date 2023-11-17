"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useRouter } from "next/navigation";

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  const onFinish = (values) => {
    const newEmployee = {
      id: values.id,
      name: values.name,
      role: values.role,
      phoneNumber: values.phoneNumber,
      address: values.address,
    };
    console.log(
      "🚀 ~ file: page.jsx:19 ~ onFinish ~ newEmployee:",
      newEmployee
    );
    // setEmployees([...employees, newEmployee]);
    form.resetFields(); // Reset form fields after submission
  };

  return (
    <div>
      <h1 className="text-center font-bold text-lg mb-4">THÊM MỚI NHÂN VIÊN</h1>
      <Form
        className="max-w-[600px]"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="id" label="Mã nhân viên" rules={[{ required: true }]}>
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
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
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
    </div>
  );
};

export default EmployeeForm;
