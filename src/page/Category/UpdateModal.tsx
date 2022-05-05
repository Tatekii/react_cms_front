import { Dispatch, SetStateAction, useEffect } from "react";
import { Modal, Form, message, ModalProps, Input } from "antd";
import { reqAddCategory, reqUpdateCategory } from "@/api";
const { Item } = Form;

interface UpdateModalProps extends ModalProps {
  editType: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  updateModalCurrent: {
    categoryId: string;
    categoryName: string;
  };
  getCategoryList: () => Promise<void>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const UpdateModal = ({
  visible,
  editType,
  setLoading,
  updateModalCurrent,
  setModalVisible,
  getCategoryList,
}: UpdateModalProps) => {
  const [formRef] = Form.useForm();
  useEffect(() => {
    if (!visible) {
      //每次关闭modal，清空
      formRef.resetFields();
    }
  }, [formRef, visible]);
  /**
   * 点击确认
   */
  const handleOkModal = async () => {
    try {
      //表单的统一验证
      const { categoryName } = await formRef.validateFields();
      console.log(categoryName);

      setLoading(false);
      if (editType === 0) {
        //新增分类的逻辑
        handleAddCategory(categoryName);
      } else {
        //修改分类
        //修改分类的逻辑
        handleUpdateCategory(categoryName);
      }
    } catch (e) {
      message.error("表单输入有误，请检查", 2);
    }
  };

  /**
   * 修改分类
   */
  const handleUpdateCategory = async (categoryName: string) => {
    const { categoryId } = updateModalCurrent;
    const { status } = await reqUpdateCategory(categoryId, categoryName);
    if (status === 0) {
      message.success("更新商品分类成功", 1);
      getCategoryList();
      //隐藏模态框
      setModalVisible(false);
    } else {
      message.error("出错了", 1);
    }
  };

  /**
   * 新增分类
   */
  const handleAddCategory = async (categoryName: string) => {
    const { status } = await reqAddCategory(categoryName);
    if (status === 0) {
      message.success("新增商品分类成功", 1);
      getCategoryList();
      //隐藏模态框
      setModalVisible(false);
    } else {
      message.error("出错了", 1);
    }
  };

  return (
    <Modal
      title={`${editType === 0 ? "新增" : "修改"}分类`}
      visible={visible}
      onOk={handleOkModal}
      onCancel={() => {
        setModalVisible(false);
      }}
      okText="确认"
      cancelText="取消"
    >
      <Form
        className="login-form"
        form={formRef}
        initialValues={{ categoryName: updateModalCurrent.categoryName }}
      >
        <Item
          name="categoryName"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入商品分类名称",
            },
          ]}
        >
          <Input placeholder="请输入商品分类名称" autoComplete="off" />
        </Item>
      </Form>
    </Modal>
  );
};
export default UpdateModal;
