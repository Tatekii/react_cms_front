import { useRef, useState, Fragment, useEffect, useCallback } from "react";
import { Button, Card, Form, Input, Modal, Table, message, Tree } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { reqAddRole, reqRolePaginationList, reqAllocatePermission } from "@/api";
import { PAGE_SIZE } from "@/config";
import menuList from "@/config/menu";
import { useAuth } from "@/auth/auth-context";
import useMount from "@/hooks/useMount";

/**
 * 角色管理组件
 */
export default function Role() {
	const addFormRef = useRef(null);
	const authFormRef = useRef(null);
	const {user} = useAuth()

	const [isShowAdd, setShowAdd] = useState(false); //是否显示新增权限模态框
	const [isShowAuth, setShowAuth] = useState(false); //是否显示分配权限模态框
	const [roleList, setRoleList] = useState([]); // 角色列表
	const [_id, set_id] = useState("");

	const [total, setTotal] = useState(0); // z总数
	const [current, setCurrent] = useState(1); // 当前页面
	const [checkedKeys, setCheckedKeys] = useState([]); //树形菜单选中的key
	const [treeData, setTreeDate] = useState([]); //  树形菜单数据

	useMount(() => {
		getRoleList(current, PAGE_SIZE);
		let treeData = [
			{
				title: "平台权限",
				key: "top",
				children: [...menuList],
			},
		];
		setTreeDate(treeData);
	});

	//获取分页列表
	const getRoleList = useCallback(
		async (current, pagesize) => {
			const { status, data, msg } = await reqRolePaginationList(current, pagesize);
			if (status === 0) {
				setRoleList(data);
				setCurrent(current);
				setTotal(total);
			} else {
				message.error(msg, 2);
			}
		},
		[total]
	);

	//表单变化 => 获取分页列表
	const handleTableChange = useCallback(
		(pagination) => {
			const { current, pageSize } = pagination;
			getRoleList(current, pageSize);
		},
		[getRoleList]
	);

	//新增角色确认模态框
	const handleAddOkModal = useCallback(async () => {
		try {
			//表单的统一验证
			const { roleName } = await addFormRef.current.validateFields();
			const { status, msg } = await reqAddRole(roleName);
			if (status === 0) {
				//取消模态框
				setShowAdd(false);
				//重置表单
				addFormRef.current.resetFields();
				//刷新角色
				getRoleList();
				//提示信息
				message.success("新增角色成功", 2);
				getRoleList(current, PAGE_SIZE);
			} else {
				message.error(msg, 2);
			}
		} catch (e) {
			message.error("表单输入有误，请检查", 2);
		}
	}, [current, getRoleList]);

	//取消新增角色模态框
	const handleAddCancelModal = useCallback(() => {
		//重置表单
		addFormRef.current.resetFields();
		//取消模态框
		setShowAdd(false);
	}, []);

	//分配权限确认模态框
	const handleAuthOkModal = async () => {
		//获取授权人
		let authName = user.username;
		const { status, msg } = await reqAllocatePermission(_id, checkedKeys, authName);
		if (status === 0) {
			message.success("分配权限成功", 2);
			//取消模态框
			setShowAuth(false);
			setCheckedKeys([]);
			getRoleList(current, PAGE_SIZE);
		} else {
			message.error(msg, 2);
		}
	}

	//分配权限取消模态框
	const handleAuthCancelModal = useCallback(() => {
		//重置表单
		authFormRef.current.resetFields();
		//取消模态框
		setShowAuth(false);
	},[])

	//分配权限按钮的点击事件
	const allocatePermission = useCallback((item) => {
		//回显菜单树
		let menu = roleList.find((menu) => menu._id === item._id);
		if (menu) {
			let menus = menu.menus;
			if (menus && menus instanceof Array) {
				setCheckedKeys([...menus]);
			}
		}
		//更新状态
		setShowAuth(true);
		set_id(item._id);
	},[roleList])

	const columns = [
		{
			title: "角色名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "创建时间",
			dataIndex: "create_time",
			key: "create_time",
			render: (item) => {
				return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
			},
		},
		{
			title: "授权时间",
			dataIndex: "auth_time",
			key: "auth_time",
			render: (item) => {
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
			render: (item) => (
				<Button type="link" onClick={() => allocatePermission(item)}>
					分配权限
				</Button>
			),
			width: "25%",
			align: "center",
		},
	];

	return (
		<Fragment>
			<Card
				title={
					<Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setShowAdd(true)}>
						添加角色
					</Button>
				}
			>
				<Table
					bordered={true}
					rowKey={"_id"}
					dataSource={roleList}
					columns={columns}
					pagination={{
						current,
						pageSize: PAGE_SIZE,
						total,
						showQuickJumper: true,
					}}
					onChange={handleTableChange}
				/>
			</Card>
			{/* 添加角色模态框 */}
			<Modal
				title={`添加角色`}
				visible={isShowAdd}
				onOk={handleAddOkModal}
				onCancel={handleAddCancelModal}
				okText="确认"
				cancelText="取消"
			>
				<Form ref={addFormRef}>
					<Form.Item
						name="roleName"
						rules={[{ required: true, whitespace: true, message: "请输入角色名称" }]}
					>
						<Input placeholder="请输入角色名称" autoComplete="off" />
					</Form.Item>
				</Form>
			</Modal>
			{/* 分配角色模态框 */}
			<Modal
				title={`分配权限`}
				visible={isShowAuth}
				onOk={handleAuthOkModal}
				onCancel={handleAuthCancelModal}
				okText="确认"
				cancelText="取消"
			>
				<Form ref={authFormRef}>
					<Tree
						defaultExpandAll
						checkable
						onCheck={(checkedKeysValue) => {
							setCheckedKeys(checkedKeysValue);
						}}
						checkedKeys={checkedKeys}
						treeData={treeData}
					/>
				</Form>
			</Modal>
		</Fragment>
	);
}
