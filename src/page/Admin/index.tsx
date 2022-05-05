import LeftNav from "./LeftNav";
import PageHeader from "./PageHeader";
import { Layout } from "antd";
import styled from "@emotion/styled";
import RouterContent from "./RouterContent";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const { Sider } = Layout;

const MyFooter = styled.footer`
  text-align: center;
  font-size: 1.5rem;
  color: var(--tsc);
  line-height: 4rem;
  background: #fff;
  border-top: 1px solid var(--tsc);
`;

const MainLayout = styled(Layout)`
  height: 100vh;
  display: grid !important;
  grid-template-rows: 8rem 1fr 4rem;
`;

/** 后台根组件 */
function Admin() {
  useDocumentTitle("CMS管理系统");
  return (
    <Layout>
      <Sider>
        <LeftNav />
      </Sider>

      <MainLayout>
        <PageHeader />
        {/* 路由区域 */}
        <RouterContent />
        <MyFooter>推荐使用Chrome浏览器，可以获得更佳页面操作体验</MyFooter>
      </MainLayout>
    </Layout>
  );
}

export default Admin;
