import { Card, Button, Table, message, Modal, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from "@/api";
import { PAGE_SIZE } from "../../config";
import { saveCategory } from "@/redux/reducers/category";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

export default function Category() {
	const formRef = useRef(null);
	const dispatch = useDispatch();

	const [categoryList, setCategoryList] = useState();
	const [isLoading, setLoading] = useState(true);
	const [editType, setEditType] = useState(0);
	const [isModalVisible, setModalVisible] = useState(false);
	const [updateModalCurrentId, setUpdateModalCurrentId] = useState("");
	const [updateModalCurrentValue, setUpdateModalCurrentValue] = useState("");

	const getCategoryList = async () => {
		const res = await reqCategoryList();
		if (!res) return;
		if (res.status === 0) {
			dispatch(saveCategory(res.data));
			setCategoryList(() => res.data.reverse());
			setLoading(() => false);
		} else {
			message.error(res.msg, 2);
		}
	};

	useEffect(() => {
		getCategoryList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * 显示新增分类的弹窗
	 */
	const handleShowAddModal = () => {
		setEditType(0);
		setModalVisible(true);
	};

	/**
	 * 显示更新分类的弹窗
	 */
	const handleShowUpdateModal = (item) => {
		//回显的数据
		const { _id: categoryId, name: categoryName } = item;
		//显示模态框，并将回显数据放到状态中
		setUpdateModalCurrentId(categoryId);
		setUpdateModalCurrentValue(categoryName);
		setEditType(1);
		setModalVisible(true);
		formRef.current.resetFields();
		//重置表单
	};

	/**
	 * 处理确认模态框
	 */
	const handleOkModal = async () => {
		try {
			//表单的统一验证
			const { categoryName } = await formRef.current.validateFields();
			setLoading(false);
			if (editType === 0) {
				//新增分类的逻辑
				handleAddCategory(categoryName);
			} else {
				//修改分类
				//修改分类的逻辑
				handleUpdateCategory(updateModalCurrentId, categoryName);
			}
		} catch (e) {
			message.error("表单输入有误，请检查", 2);
		}
	};

	/**
	 * 新增分类的业务逻辑
	 */
	const handleAddCategory = async (categoryName) => {
		const { status, msg } = await reqAddCategory(categoryName);
		if (status === 0) {
			message.success("新增商品分类成功", 1);
			getCategoryList();
			//重置表单
			formRef.current.resetFields();
			//隐藏模态框
			setModalVisible(false);
		} else {
			message.error(msg, 1);
		}
	};

	/**
	 * 修改分类的业务逻辑
	 */
	const handleUpdateCategory = async (categoryId, categoryName) => {
		const { status, msg } = await reqUpdateCategory(categoryId, categoryName);
		if (status === 0) {
			message.success("更新商品分类成功", 1);
			getCategoryList();
			//重置表单
			formRef.current.resetFields();
			//隐藏模态框
			setModalVisible(false);
		} else {
			message.error(msg, 1);
		}
	};

	/**
	 * 取消模态框
	 */
	const handleCancelModal = () => {
		//重置表单
		formRef.current.resetFields();
		//隐藏模态框
		setModalVisible(false);
	};

	const columns = [
		{
			title: "分类名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "操作",
			key: "operator",
			render: (item) => (
				<Button
					type="link"
					onClick={() => {
						handleShowUpdateModal(item);
					}}
				>
					修改分类
				</Button>
			),
			width: "25%",
			align: "center",
		},
	];

	const getTitle = () => (editType === 0 ? "新增" : "修改");

	return (
		<div>
			<Card
				extra={
					<Button type="primary" onClick={handleShowAddModal} icon={<PlusCircleOutlined />}>
						添加
					</Button>
				}
			>
				<Table
					bordered={true}
					dataSource={categoryList}
					columns={columns}
					loading={isLoading}
					rowKey="_id"
					pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
				/>
			</Card>
			{/* 新增分类和修改分类 */}
			<Modal
				title={`${getTitle()}分类`}
				visible={isModalVisible}
				onOk={handleOkModal}
				onCancel={handleCancelModal}
				okText="确认"
				cancelText="取消"
			>
				<Form className="login-form" ref={formRef} initialValues={{ categoryName: updateModalCurrentValue }}>
					<Form.Item
						name="categoryName"
						rules={[{ required: true, whitespace: true, message: "请输入商品分类名称" }]}
					>
						<Input placeholder="请输入商品分类名称" autoComplete="off" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
