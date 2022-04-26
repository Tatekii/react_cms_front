import { Routes, Route } from "react-router-dom";

import ProductHome from "./ProductHome";
import ProductAddUpdate from "./ProductAddUpdate";
import ProductDetail from "./ProductDetail";

import "./index.less";

/*
商品路由
 */
export default function Product() {
	return (
		<>
			<Routes>
				<Route path="/products/manage" element={<ProductHome />} />
				<Route path="/products/manage/addupdate" element={<ProductAddUpdate />} />
				<Route path="/products/manage/detail" element={<ProductDetail />} />
			</Routes>
		</>
	);
}
