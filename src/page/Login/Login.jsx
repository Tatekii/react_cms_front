import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { nameValidator, passValidator } from "@/util/validator";
import Corner from "@/components/githubCorner/githubCorner";
import { useAuth } from "auth/auth-context";
import "./login.less";
const { Item } = Form;

/** 登录页 */
function Login() {
	const { login } = useAuth();
	/** 提交登陆 */
	const handleFinish = async (value) => {
		login(value);
	};

	const handleFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<div className="login">
			<Corner />
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

export default Login;
