import { useState, useCallback } from "react";
import { Button, Card, Table, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { reqRolePaginationList } from "@/api";
import { PAGE_SIZE } from "@/config";
import AddRoleModal from "./AddRoleModal";
import AuthRoleModal from "./AuthRoleModal";
import { RoleItem } from "@/types";
import { PaginationConfig } from "antd/lib/pagination";

/**
 * 角色管理组件
 */
export default function Role() {
  const [isShowAdd, setShowAdd] = useState(false); //新增权限modal
  const [isShowAuth, setShowAuth] = useState(false); //分配权限模modal

  const [roleList, setRoleList] = useState<RoleItem[]>([]); // 所有角色列表
  const [_id, set_id] = useState("");

  const [total, setTotal] = useState(0); // 角色总数
  const [current, setCurrent] = useState(1); // 当前页面
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]); //树形菜单选中的key

  //获取分页列表
  const getRoleList = useCallback(
    async (current: number | undefined, pagesize: number | undefined) => {
      const { status, data } = await reqRolePaginationList(
        current || 0,
        pagesize || 0
      );
      if (status === 0) {
        setRoleList(data);
        current && setCurrent(current);
        setTotal(data.length);
      } else {
        message.error("出错了", 2);
      }
    },
    []
  );

  //表单变化 => 获取分页列表
  const handleTableChange = (pagination: PaginationConfig) => {
    const { current, pageSize } = pagination;
    getRoleList(current, pageSize);
  };

  //分配权限按钮的点击事件
  const allocatePermission = (items: any) => {
    //回显菜单树
    let menu = roleList.find((menu) => menu._id === items._id);
    if (menu) {
      let menus = menu.menus;
      if (menus && menus instanceof Array) {
        setCheckedKeys([...menus]);
      }
    }
    //更新状态
    setShowAuth(true);
    set_id(items._id);
  };

  return (
    <>
      <Card
        title={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setShowAdd(true)}
          >
            添加角色
          </Button>
        }
      >
        <Table
          bordered={true}
          rowKey={"_id"}
          dataSource={roleList}
          columns={[
            {
              title: "角色名称",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "创建时间",
              dataIndex: "create_time",
              key: "create_time",
              render: (item: any) => {
                return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
              },
            },
            {
              title: "授权时间",
              dataIndex: "auth_time",
              key: "auth_time",
              render: (item: any) => {
                if (item) {
                  return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
                }
                return item;
              },
            },
            {
              title: "授权人",
              dataIndex: "auth_name",
              key: "auth_name",
            },
            {
              title: "操作",
              key: "operator",
              render: (item: any) => (
                <Button type="link" onClick={() => allocatePermission(item)}>
                  分配权限
                </Button>
              ),
              width: "25%",
              align: "center",
            },
          ]}
          pagination={{
            current,
            pageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
          }}
          onChange={() => handleTableChange}
        />
      </Card>
      {/* 添加角色模态框 */}
      <AddRoleModal
        setShowAdd={setShowAdd}
        isShowAdd={isShowAdd}
        current={current}
        getRoleList={getRoleList}
      />
      {/* 分配角色模态框 */}
      <AuthRoleModal
        setShowAuth={setShowAuth}
        setCheckedKeys={setCheckedKeys}
        getRoleList={getRoleList}
        current={current}
        isShowAuth={isShowAuth}
        _id={_id}
        checkedKeys={checkedKeys}
      />
    </>
  );
}
