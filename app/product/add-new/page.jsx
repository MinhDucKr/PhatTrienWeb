"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState("");
  const router = useRouter();

  const onFinish = async (values) => {
    const newProduct = {
      id: values.id,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      description: values.description,
    };
    try {
      setLoading(true);
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        router.push("/");
        form.resetFields(); // Reset form fields after submission
      } else {
        const err = await res.json();
        setExist(err.message);
        throw new Error("Failed to create a employee");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes (whether success or failure)
    }
  };

  return (
    <Spin spinning={loading}>
      <div>
        <h1 className="text-center font-bold text-lg mb-4">
          THÊM MỚI SẢN PHẨM{" "}
        </h1>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="id"
            label="Mã sản phẩm"
            rules={[{ required: true, message: "Please enter ID" }]}
          >
            <Input />
            {!!exist && <p className="text-red-500">{exist}</p>}
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Đơn giá"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả sản phẩm"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default AddProductForm;
