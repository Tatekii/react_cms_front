import { Redirect, Route, Switch } from "react-router-dom";

import Home from "@/page/Home/Home";
import LeftNav from "@/page/Admin/LeftNav/LeftNav";
import Header from "@/page/Admin/Header/Header";

import Category from "@/page/Category/Category";
import Product from "@/page/Product/Product";
import User from "@/page/User/User";
import Role from "@/page/Role/Role";
import ChartsBar from "@/page/Charts/Bar";
import ChartsLine from "@/page/Charts/Line";
import ChartsPie from "@/page/Charts/Pie";
import NotFound from "@/page/NotFound/NotFound"

import { Layout } from "antd";

import { useSelector } from "react-redux";
const { Footer, Sider, Content } = Layout;

/** 后台根组件 */
function Admin() {

	const { isLogin } = useSelector(state=>state.login)
	if (!isLogin) {
		return <Redirect to="/login" />;
	}

	return (
		<Layout style={{ height: "100%", color: "#fff" }}>
			<Sider>
				<LeftNav />
			</Sider>
			<Layout style={{ backgroundColor: "#1b1b1b" }}>
				<Header />
				<Content style={{ margin: "20px", backgroundColor: "#242424" }}>
					<Switch>
						<Redirect from="/admin" exact to="/home" />
						<Route path="/home" component={Home} />
						<Route path="/products/category" component={Category} />
						<Route path="/products/product" component={Product} />
						<Route path="/user" component={User} />
						<Route path="/role" component={Role} />
						<Route path="/charts/bar" component={ChartsBar} />
						<Route path="/charts/line" component={ChartsLine} />
						<Route path="/charts/pie" component={ChartsPie} />
						<Route component={NotFound} />
					</Switch>
				</Content>
				<Footer
					style={{
						textAlign: "center",
						color: "#F90",
						fontWeight: "bold",
						backgroundColor: "#242424",
					}}
				>
					推荐使用Chrome浏览器，可以获得更佳页面操作体验
				</Footer>
			</Layout>
		</Layout>
	);
}

export default Admin
