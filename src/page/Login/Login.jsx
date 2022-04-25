import { React } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { nameValidator, passValidator } from "@/util/validator";
import Corner from "@/component/githubCorner/githubCorner";
import { connect } from "react-redux";
import { saveUserAndToken } from "@/redux/reducers/login";
import { reqLogin } from "@/api";
import { Navigate,Routes } from "react-router-dom";

import "./css/login.less";
const { Item } = Form;

/** 登录页 */
function Login(props) {
	/** 提交表单 */
	const handleFinish = async (value) => {
		const { username, password } = value;
		const res = await reqLogin(username, password);
		const { status, msg, data } = res;

		if (status === 0) {
			const { user, token } = data;
			props.saveUserAndToken({ user, token });
			message.info("登录成功", 2);
			props.history.replace("/admin");
		} else {
			message.warn(msg, 2);
		}
	};

	const handleFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	// 自动登录
	const { isLogin } = props;
	if (isLogin) {
		return (
				<Navigate to="/admin" replace/>
		);
	}

	return (
		<div className="login">
			<header className="header">
				<Corner />
				<div className="title">CMS @Siyn</div>
			</header>
			<main className="main">
				<section className="loginForm">
					<div className="title">用户登录</div>
					<Form onFinish={handleFinish} onFinishFailed={handleFinishFailed} className="login-form">
						<Item name="username" rules={nameValidator} initialValue={"admin"}>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="用户名"
								autoComplete="off"
							/>
						</Item>
						<Item name="password" rules={passValidator}>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
								autoComplete="off"
							/>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Item>
					</Form>
				</section>
			</main>
		</div>
	);
}

export default connect(
	(state) => ({
		isLogin: state.login.isLogin,
	}),
	{
		saveUserAndToken,
	}
)(Login);
