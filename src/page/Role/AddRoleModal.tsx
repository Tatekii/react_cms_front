import { reqAddRole } from "@/api";
import { PAGE_SIZE } from "@/config";
import { Form, message, ModalProps, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { SetStateAction, Dispatch } from "react";

interface AddRoleModalProps extends ModalProps {
  setShowAdd: Dispatch<SetStateAction<boolean>>;
  isShowAdd: boolean;
  current: number;
  getRoleList: (T: number, S: number) => Promise<void>;
}
const AddRoleModal = ({
  setShowAdd,
  isShowAdd,
  current,
  getRoleList,
}: AddRoleModalProps) => {
  // 添加角色form
  const [addFormRef] = Form.useForm();

  //新增角色确认模态框
  const handleAddOkModal = async () => {
    try {
      //表单的统一验证
      const { roleName } = await addFormRef.validateFields();
      const { status } = await reqAddRole(roleName);
      if (status === 0) {
        //取消模态框
        setShowAdd(false);
        //重置表单
        addFormRef.resetFields();
        //提示信息
        message.success("新增角色成功", 2);
        getRoleList(current, PAGE_SIZE);
      } else {
        message.error("新增角色失败", 2);
      }
    } catch (e) {
      message.error("表单输入有误，请检查", 2);
    }
  };

  //取消新增角色模态框
  const handleAddCancelModal = () => setShowAdd(false);

  return (
    <Modal
      title={`添加角色`}
      visible={isShowAdd}
      onOk={handleAddOkModal}
      onCancel={handleAddCancelModal}
      okText="确认"
      cancelText="取消"
    >
      <Form form={addFormRef}>
        <Form.Item
          name="roleName"
          rules={[
            { required: true, whitespace: true, message: "请输入角色名称" },
          ]}
        >
          <Input placeholder="请输入角色名称" autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddRoleModal;
