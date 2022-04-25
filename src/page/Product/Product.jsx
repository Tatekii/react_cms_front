import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./ProductHome";
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'

import "./index.less";

/*
商品路由
 */
export default function Product() {
	return (
		<Switch>
			<Route path="/products/product/" component={ProductHome} exact />
			<Route path="/products/product/addupdate" component={ProductAddUpdate} />
			<Route path="/products/product/detail" component={ProductDetail} />
			<Redirect to="/products/product/home" />
		</Switch>
	);
}
