import {createElement} from "react";
import { NavLink,useLocation } from "react-router-dom";
import { Menu } from "antd";
import * as Icon from "@ant-design/icons";
import "./index.less";
import logo from "@/assets/img/logo.png";
import menuList from "@/config/menu";

const { SubMenu, Item } = Menu;

/** 左侧导航组件 */
export default function LeftNav() {
	const {pathname}  = useLocation()
	// 根据配置生成导航菜单
	const createMenu = (menuList) => {
		return menuList.map((menu) => {
			const icon = createElement(Icon[menu.icon], {}, null);

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

	return (
		<div className="left-nav">
			<NavLink to="/home" className="left-nav-header">
				<img src={logo} alt="logo" />
				<h1>后台管理系统</h1>
			</NavLink>
			<Menu
				selectedKeys={pathname.split("/").reverse()[0]}
				defaultOpenKeys={pathname.split("/").splice(1)}
				mode="inline"
				theme="dark"
				style={{ backgroundColor: "#1b1b1b" }}
			>
				{createMenu(menuList)}
			</Menu>
		</div>
	);
}