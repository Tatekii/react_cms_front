import { useEffect, useRef, useState, useCallback } from "react";
import { Button, Card, Form, Input, message, Modal, Select, Table } from "antd";
import { ExclamationCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { reqUserList, reqAddUser, reqDeleteUser } from "@/api";

const { Option } = Select;

/**
 * 用户管理路由组件
 */
export default function User() {
	const addFormRef = useRef(null);
	const [userList, setUserList] = useState([]); //  用户列表
	const [isShowAdd, setShowAdd] = useState(false);
	const [roleList, setRoleList] = useState([]); //  角色列表

	useEffect(() => {
		getUserList();
	}, []);


	const getUserList = useCallback(async () => {
		const { status, data, msg } = await reqUserList();
		if (status === 0) {
			const { users, roles } = data;
			setUserList(users);
			setRoleList(roles);
		} else {
			message.error(msg, 2);
		}
	}, []);

	//新增用户确认的模态框
	const handleAddOkModal = async () => {
		try {
			const { username, password, email, phone, role_id } = await addFormRef.current.validateFields();
			const { status, msg } = await reqAddUser(username, password, email, phone, role_id);
			if (status === 0) {
				message.success("新增用户成功", 2);
				setShowAdd(false);
				addFormRef.current.resetFields()
				getUserList();
			} else {
				message.error(msg, 2);
			}
		} catch (e) {
			message.error("表单输入有误，请检查", 2);
		}
	};

	/**
	 * 删除用户
	 * @param item
	 */
	const deleteUser = (item) => {
		return () => {
			const { _id: id } = item;
			Modal.confirm({
				title: "确认删除吗",
				icon: <ExclamationCircleOutlined />,
				okText: "确认",
				cancelText: "取消",
				onOk: async () => {
					const { status, msg } = await reqDeleteUser(id);
					if (status === 0) {
						message.info("删除成功", 2);
						getUserList();
					} else {
						message.error(msg, 2);
					}
				},
			});
		};
	};

	const columns = [
		{
			title: "用户名",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "邮箱",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "电话",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "注册时间",
			dataIndex: "create_time",
			key: "create_time",
			render: (item) => {
				if (item) {
					return dayjs(item).format("YYYY-MM-DD HH:mm:ss");
				}
				return item;
			},
		},
		{
			title: "所属角色",
			dataIndex: "role_id",
			key: "role_id",
			render: (item) => {
				if (item) {
					if (roleList.length) {
						let role = roleList.find((role) => {
							return role._id === item;
						});
						if (role) {
							return role.name;
						}
					}
				}
				return item;
			},
		},
		{
			title: "操作",
			key: "operator",
			render: (item) => {
				return (
					<>
						<Button type="link">修改</Button>
						<Button type="link" onClick={deleteUser(item)}>
							删除
						</Button>
					</>
				);
			},
			width: "25%",
			align: "center",
		},
	];

	return (
		<>
			<Card
				title={
					<Button
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={() => {
							setShowAdd(true);
						}}
					>
						添加用户
					</Button>
				}
			>
				<Table
					bordered={true}
					rowKey={"_id"}
					dataSource={userList}
					columns={columns}
				/>
			</Card>
			{/* 添加用户的模态框 */}
			<Modal
				title={`添加用户`}
				visible={isShowAdd}
				okText="确认"
				cancelText="取消"
				onOk={handleAddOkModal}
				onCancel={() => {
					addFormRef.current.resetFields()
					setShowAdd(false);
				}}
			>
				<Form ref={addFormRef} labelCol={{ md: 4 }} wrapperCol={{ md: 16 }}>
					<Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, whitespace: true, message: "请输入用户名" }]}
					>
						<Input autoComplete="off" placeholder="请输入商品名称" />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, whitespace: true, message: "请输入密码" }]}
					>
						<Input type={"password"} autoComplete="off" placeholder="请输入商品描述" />
					</Form.Item>
					<Form.Item label="邮箱" name="email">
						<Input autoComplete="off" placeholder="请输入邮箱" />
					</Form.Item>
					<Form.Item label="电话" name="phone">
						<Input autoComplete="off" placeholder="请输入电话" />
					</Form.Item>
					<Form.Item label="角色" name="role_id" rules={[{ required: true, message: "请选择一个角色" }]}>
						<Select allowClear placeholder={"请选择一个角色"}>
							{roleList.map((role) => (
								<Option key={role._id} value={role._id}>
									{role.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Modal>
			{/* 修改用户的模态框 */}
			<Modal title={`修改用户`} visible={false} okText="确认" cancelText="取消">
				<Form>修改用户</Form>
			</Modal>
		</>
	);
}
