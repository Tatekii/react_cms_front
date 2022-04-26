import { Route, Routes } from "react-router-dom";

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
import NotFound from "@/page/NotFound/NotFound";
import { Layout } from "antd";

const { Footer, Sider, Content } = Layout;

/** 后台根组件 */
function Admin() {
	return (
		<Layout>
			<Sider className="bg-white">
				<LeftNav />
			</Sider>
			<Layout>
				<Header />
				<Content >
					<Routes>
						<Route path="/" element={<Home />}>
							<Route path="home" element={<Home />} />
							<Route path="products/category" element={<Category />} />
							<Route path="products/manage/*" element={<Product />} />
							<Route path="user" element={<User />} />
							<Route path="role" element={<Role />} />
							<Route path="charts/bar" element={<ChartsBar />} />
							<Route path="charts/line" element={<ChartsLine />} />
							<Route path="charts/pie" element={<ChartsPie />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</Content>
				<Footer>
					推荐使用Chrome浏览器，可以获得更佳页面操作体验
				</Footer>
			</Layout>
		</Layout>
	);
}

export default Admin;
