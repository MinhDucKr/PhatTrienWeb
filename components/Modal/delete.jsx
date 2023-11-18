import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

const ModalDeleteEmployee = (props) => {
  const { isModalOpen, onCancel, onOk, record, isProduct } = props;

  const footerModal = (
    <div className="flex items-center justify-center gap-4 pt-4 p-2">
      <Button
        onClick={() => {
          onOk(record?._id);
        }}
        type="primary"
        size="middle"
        className="min-w-[126px]"
      >
        Có
      </Button>
      <Button
        type="default"
        className=" min-w-[126px]"
        size="middle"
        onClick={onCancel}
      >
        Không
      </Button>
    </div>
  );
  return (
    <>
      <Modal open={isModalOpen} onCancel={onCancel} footer={footerModal}>
        <div className="flex flex-col items-center mt-6 gap-4">
          <DeleteOutlined className=" text-[32px] text-red-500 " />
          <p className="text-base font-semibold">
            Bạn có muốn xóa {isProduct ? "sản phầm" : "nhân viên"}{" "}
            {record?.name} không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ModalDeleteEmployee;
