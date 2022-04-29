import Category from "@/page/Category";
import Product from "@/page/Product/Product";
import User from "@/page/User/User";
import Role from "@/page/Role/Role";
import ChartsBar from "@/page/Charts/Bar";
import ChartsLine from "@/page/Charts/Line";
import ChartsPie from "@/page/Charts/Pie";
import NotFound from "@/page/NotFound/NotFound";
import Home from "@/page/Home/Home";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";

const RouteArea = styled.div`
  overflow: auto;
`;

const RouterContent = () => {
  return (
    <RouteArea>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/category" element={<Category />} />
        <Route path="/products/manage/*" element={<Product />} />
        <Route path="/user" element={<User />} />
        <Route path="/role" element={<Role />} />
        <Route path="/charts/bar" element={<ChartsBar />} />
        <Route path="/charts/line" element={<ChartsLine />} />
        <Route path="/charts/pie" element={<ChartsPie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouteArea>
  );
};
export default RouterContent;
