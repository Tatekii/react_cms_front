import { createElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import * as Icons from "@ant-design/icons";
import logo from "@/assets/img/logo.png";
import menuList from "@/config/menu";
import { MenuItem } from "@/config/types";
import styled from "@emotion/styled";

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

/** 左侧导航组件 */
export default function LeftNav() {
  const { pathname } = useLocation();
  // 根据配置生成导航菜单
  const createMenu = (menuList: MenuItem[]) => {
    return menuList.map((menu) => {
      let iconType = menu.icon;
      // @ts-ignore
      const icon = createElement(Icons[iconType], {}, null);

      if (!menu.children) {
        return (
          <Item key={menu.key} icon={icon}>
            <NavLink to={menu.path}>{menu.title}</NavLink>
          </Item>
        );
      } else {
        return (
          <SubMenu key={menu.key} icon={icon} title={menu.title}>
            {createMenu(menu.children)}
          </SubMenu>
        );
      }
    });
  };

  const MyLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  `;

  return (
    <>
      <MyLink to="/home">
        <img src={logo} alt="logo" />
      </MyLink>
      <Menu
        // @ts-ignore
        selectedKeys={pathname.split("/").reverse()[0]}
        defaultOpenKeys={pathname.split("/").splice(1)}
        mode="inline"
      >
        {createMenu(menuList)}
      </Menu>
    </>
  );
}
