"use client";
import { Button, Form, Input, Select, Spin, Upload, notification } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const { Option } = Select;

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Xảy ra lỗi",
      description:
        "Tạo mới sản phầm không thành công. Mã sản phẩm tạo đã được sử dụng, vui lòng chọn mã sản phầm khác",
    });
  };

  const onFinish = async (values) => {
    const newProduct = {
      id: values.id,
      name: values.name,
      price: values.price,
      quantity: values.quantity,
      description: values.description,
      image_path: imageUrl ? imageUrl : "",
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
        form.resetFields(); // Reset form fields after submission
        setPreviewImage("");
        setImageUrl(null);
        openNotificationWithIcon("error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes (whether success or failure)
    }
  };
  const onUploadChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      handleUpload(info.file);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    return false; // Prevent default upload behavior
  };

  const onRemove = () => {
    setPreviewImage(null);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "asia_star"); // Replace with your upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/db8mh2s66/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log(
        "🚀 ~ file: page.jsx:93 ~ handleUpload ~ data.secure_url:",
        data.secure_url
      );
      setImageUrl(data.secure_url);

      console.log("Upload successful");
    } catch (error) {
      console.log("Upload failed");
    }
  };

  return (
    <Spin spinning={loading}>
      {contextHolder}
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
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please upload an image" }]}
            name="image"
            label="Image"
          >
            <div>
              <Upload
                name="file"
                action="/upload" // Your API endpoint for uploading images
                onChange={onUploadChange}
                beforeUpload={beforeUpload}
                maxCount={1}
                onRemove={onRemove}
              >
                <Button>Upload Image</Button>
              </Upload>
              {previewImage && (
                <img
                  width={200}
                  src={previewImage}
                  alt="Preview"
                  style={{ marginTop: "1rem" }}
                />
              )}
            </div>
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
