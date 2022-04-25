import { Routes, Route, Navigate } from "react-router-dom";

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
			<Navigate to="/products/product/home" replace />
			<Routes>
				<Route path="/products/product/" element={<ProductHome />} exact />
				<Route path="/products/product/addupdate" element={<ProductAddUpdate />} />
				<Route path="/products/product/detail" element={<ProductDetail />} />
			</Routes>
		</>
	);
}
