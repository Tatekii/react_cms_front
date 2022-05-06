import React from "react";
import Home from "@/page/Home/Home";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";

const Category = React.lazy(() => import("@/page/Category"));
const Product = React.lazy(() => import("@/page/Product/Product"));
const User = React.lazy(() => import("@/page/User/User"));
const Role = React.lazy(() => import("@/page/Role"));
const ChartsBar = React.lazy(() => import("@/page/Charts/Bar"));
const ChartsLine = React.lazy(() => import("@/page/Charts/Line"));
const ChartsPie = React.lazy(() => import("@/page/Charts/Pie"));
const NotFound = React.lazy(() => import("@/page/NotFound/NotFound"));

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
