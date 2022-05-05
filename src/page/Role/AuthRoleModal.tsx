import useMount from "@/hooks/useMount";
import { Form, message, ModalProps, Tree } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import menuList from "@/config/menu";
import { useAuth } from "@/auth/auth-context";
import { reqAllocatePermission } from "@/api";
import { PAGE_SIZE } from "@/config";

interface AuthRoleModalProps extends ModalProps {
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  setCheckedKeys: Dispatch<SetStateAction<string[]>>;
  getRoleList: (S: number, T: number) => Promise<void>;
  current: number;
  isShowAuth: boolean;
  _id: string;
  checkedKeys: string[];
}

interface RoleTreeItem {
  title: string;
  key: string;
  path?: string;
  icon?: string;
  children?: RoleTreeItem[];
}

const AuthRoleModal = ({
  setShowAuth,
  setCheckedKeys,
  getRoleList,
  current,
  isShowAuth,
  _id,
  checkedKeys,
}: AuthRoleModalProps) => {
  const { user } = useAuth();

  // 角色权限form
  const [authFormRef] = Form.useForm();
  const [treeData, setTreeDate] = useState<RoleTreeItem[]>([
    { title: "平台权限", key: "top" },
  ]); //  树形菜单数据

  //分配权限确认模态框
  const handleAuthOkModal = async () => {
    //获取授权人
    let authName = user!.username;
    const { status } = await reqAllocatePermission(_id, checkedKeys, authName);
    if (status === 0) {
      message.success("分配权限成功", 2);
      //取消模态框
      setShowAuth(false);
      setCheckedKeys([]);
      getRoleList(current, PAGE_SIZE);
    } else {
      message.error("分配权限失败", 2);
    }
  };

  //分配权限取消模态框
  const handleAuthCancelModal = () => {
    //重置表单
    authFormRef.resetFields();
    //取消模态框
    setShowAuth(false);
  };

  useMount(() => {
    getRoleList(current, PAGE_SIZE);
    const treeData = [
      {
        title: "平台权限",
        key: "top",
        children: [...menuList],
      },
    ];
    setTreeDate(treeData);
  });
  return (
    <Modal
      title={`分配权限`}
      visible={isShowAuth}
      onOk={handleAuthOkModal}
      onCancel={handleAuthCancelModal}
      okText="确认"
      cancelText="取消"
    >
      <Form form={authFormRef}>
        <Tree
          defaultExpandAll
          checkable
          onCheck={(checkedKeysValue: any) => {
            setCheckedKeys(checkedKeysValue);
          }}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
      </Form>
    </Modal>
  );
};
export default AuthRoleModal;
