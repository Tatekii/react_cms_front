import { Card, Button, Table, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import useGetProductList from "./useGetProductList";
import useSearch from "./useSearch";
import ProductStatus from "./ProductStatus";
import { PAGE_SIZE } from "@/config";

export default function Product() {
	// 请求的数据,本地修改数据方法,修改请求的参数
	const { dataSource, setDataSource, setPageProps, setSearchProps } = useGetProductList();

	// 由于后端分页,这里再发请求
	const handleTableChange = (pagination) => {
		const { current, pageSize } = pagination;
		console.log({ current, pageSize });
		setPageProps({ current, pageSize });
	};

	const columns = [
		{
			title: "商品名称",
			dataIndex: "name",
			key: "name",
			width: "15%",
		},
		{
			title: "商品描述",
			dataIndex: "desc",
			key: "desc",
		},
		{
			title: "价格",
			dataIndex: "price",
			key: "price",
			render: (price) => "￥" + price,
			width: "10%",
			align: "center",
		},
		{
			title: "状态",
			render: (item) => {
				return <ProductStatus item={item}/>;
			},
			key: "status",
			width: "5%",
			align: "center",
		},
		{
			title: "操作",
			key: "operator",
			render: (item) => {
				const { _id: id } = item;
				return (
					<Space size="small">
						<NavLink to={{ pathname: "/products/product/view", state: { id } }}>
							<Button type="link" onClick={() => {}}>
								详情
							</Button>
						</NavLink>
						<NavLink to={{ pathname: "/products/product/addUpdate", state: { id } }}>
							<Button type="link">修改</Button>
						</NavLink>
					</Space>
				);
			},
			width: "5%",
			align: "center",
		},
	];

	// 把修改搜索关键词的方法传给useSearch
	const searchUI = useSearch(setSearchProps);
	return (
		<>
			<Card
				title={searchUI}
				extra={
					<NavLink to={{ pathname: "/products/manage/addUpdate", state: {} }}>
						<Button type="primary" icon={<PlusCircleOutlined />}>
							添加
						</Button>
					</NavLink>
				}
			>
				<Table
					bordered={true}
					dataSource={dataSource?.list}
					columns={columns}
					rowKey="_id"
					pagination={{
						current: dataSource?.current,
						pageSize: PAGE_SIZE,
						total: dataSource?.total,
						showQuickJumper: true,
					}}
					onChange={handleTableChange}
				/>
			</Card>
		</>
	);
}
