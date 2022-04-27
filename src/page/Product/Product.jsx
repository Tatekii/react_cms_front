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
				<Route path="/" element={<ProductHome />} />
				<Route path="/addUpdate" element={<ProductAddUpdate />} />
				<Route path="/detail" element={<ProductDetail />} />
			</Routes>
		</>
	);
}
