"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Table, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    getListProduct();
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
    // {
    //   title: "Hành động",
    //   key: "action",
    //   dataIndex: "action",
    //   render: (_, record) => {
    //     return (
    //       <div className="flex items-center">
    //         <Link href={`/employee/edit/${record?._id}`}>
    //           <EditOutlined className="text-lg text-[#718098] cursor-pointer" />
    //         </Link>
    //         <DeleteOutlined
    //           onClick={() => {
    //             setIsModalOpen(true);
    //             setRecordClicked(record);
    //           }}
    //           className="ml-8 text-lg text-[#718098] cursor-pointer w-5 h-5"
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  const data = [
    {
      id: "CIMAX-CM02",
      name: "Keo ốp lát tiêu chuẩn",
      price: "150,000",
      quantity: "300",
      status: "1",
    },
    {
      id: "CIMAX-CM02",
      name: "Keo ốp lát tiêu chuẩn",
      price: "150,000",
      quantity: "300",
      status: "2",
    },
    {
      id: "CIMAX-CM02",
      name: "Keo ốp lát tiêu chuẩn",
      price: "150,000",
      quantity: "300",
      status: "1",
    },
    {
      id: "CIMAX-CM02",
      name: "Keo ốp lát tiêu chuẩn",
      price: "150,000",
      quantity: "300",
      status: "2",
    },
  ];

  return (
    <Spin spinning={loading}>
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
