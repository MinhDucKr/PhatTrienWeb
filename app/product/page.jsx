"use client";
import { Button, Spin, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalDeleteEmployee from "../../components/Modal/delete";
import Link from "next/link";

const formatToVND = (amount) => {
  // Create an Intl.NumberFormat object with Vietnamese locale and currency style
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Format the number to Vietnamese dong currency format
  return formatter.format(amount);
};

const ProductPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [recordClicked, setRecordClicked] = useState();

  const getListProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/product", {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data.product);
      } else {
        throw new Error("Failed to get list product");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading back to false after API call completes (whether success or failure)
    }
  };

  // run init
  useEffect(() => {
    getListProduct();
  }, []);

  // state modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/product?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIsModalOpen(false);
        getListProduct();
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
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh sản phẩm",
      dataIndex: "image_path",
      key: "image_path",
      render: (path) => (
        <img
          loading="lazy"
          src={path}
          alt="img"
          className="h-12 w-12 text-center"
        />
      ),
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      render: (price) => <p>{formatToVND(price)}</p>,
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { quantity }) => (
        <Tag color={quantity > 0 ? "green" : "red"}>
          {quantity > 0 ? "Đang bán" : "Hết hàng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <Link href={`/product/edit/${record?._id}`}>
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
        onOk={handleDeleteProduct}
        onCancel={handleCancel}
        record={recordClicked}
        isProduct
      />
      <div>
        <h1 className="text-center font-bold text-lg">DANH MỤC SẢN PHẨM </h1>
        <div className="my-4">
          <Button
            onClick={() => router.push("/product/add-new")}
            className="ml-auto"
            style={{ display: "block" }}
            type="primary"
            icon={<PlusOutlined />}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Table columns={columns} dataSource={products} rowKey={"_id"} />
      </div>
    </Spin>
  );
};
export default ProductPage;
