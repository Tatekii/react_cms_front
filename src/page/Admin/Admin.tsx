import { Route, Routes } from "react-router-dom";

import Home from "@/page/Home/Home";
import LeftNav from "./LeftNav/LeftNav";
import PageHeader from "./PageHeader/PageHeader";
import Category from "@/page/Category/Category";
import Product from "@/page/Product/Product";
import User from "@/page/User/User";
import Role from "@/page/Role/Role";
import ChartsBar from "@/page/Charts/Bar";
import ChartsLine from "@/page/Charts/Line";
import ChartsPie from "@/page/Charts/Pie";
import NotFound from "@/page/NotFound/NotFound";
import { Layout } from "antd";
import styled from "@emotion/styled";

const { Footer, Sider, Content } = Layout;

const MyFooter = styled.footer`
  text-align: center;
  font-size: 1.5rem;
  color: var(--tsc);
  line-height: 40px;
  height: 40px;
  background: #fff;
`;

const MyContent = styled(Content)`
  height: calc(100vh - 130px);
  overflow: auto;
`;
/** 后台根组件 */
function Admin() {
  return (
    <Layout>
      <Sider className="bg-white">
        <LeftNav />
      </Sider>
      <Layout>
        <PageHeader />
        <MyContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products/category" element={<Category />} />
            <Route path="/products/manage" element={<Product />} />
            <Route path="/user" element={<User />} />
            <Route path="/role" element={<Role />} />
            <Route path="/charts/bar" element={<ChartsBar />} />
            <Route path="/charts/line" element={<ChartsLine />} />
            <Route path="/charts/pie" element={<ChartsPie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MyContent>
        <MyFooter>推荐使用Chrome浏览器，可以获得更佳页面操作体验</MyFooter>
      </Layout>
    </Layout>
  );
}

export default Admin;
