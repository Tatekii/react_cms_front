import { message } from "antd";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "@/config";
import { reqSearchProduct, reqProductList } from "@/api/product";

/**
 * 统一的请求列表方法
 *
 * @export setRes 修改数据
 * @export setSearchProps 修改搜索参数
 * @export setPageProps 修改分页参数
 * @export reqRes 请求的结果
 */
export default function useGetProductList() {
	const [reqRes, setRes] = useState();
	const [searchProps, setSearchProps] = useState({ searchType: "noSearch", searchKeyword: "null" });
	const [pageProps, setPageProps] = useState({ current: 1, pageSize: PAGE_SIZE });

	useEffect(() => {
		/**
		 * 叫你一声受控请求?
		 * 请求分页列表,观测两个参数的改变
		 * @dep pageProps
		 * @dep searchProps
		 */
		const getProductPaginationList = async () => {
			let result;
			if (searchType === "noSearch") {
				console.log("normal list");
				result = await reqProductList(current, pageSize);
			} else {
				console.log("search");
				result = await reqSearchProduct({ pageNum: current, pageSize, searchType, searchKeyword });
			}
			const { status, msg, data } = result;
			if (status === 0) {
				setRes(() => data);
			} else {
				message.error(msg, 2);
			}
		};

		const { current, pageSize } = pageProps;
		const { searchType, searchKeyword } = searchProps;
		console.log(current, pageSize, searchType, searchKeyword);
		getProductPaginationList();
	}, [pageProps, searchProps]);
	return { dataSource: reqRes, setDataSource: setRes, setPageProps, setSearchProps };
}
