import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Corner from "@/components/GithubCorner/index";
import { useAuth } from "@/auth/auth-context";
import styled from "@emotion/styled";
import useDocumentTitle from "@/hooks/useDocumentTitle";
const { Item } = Form;

/** 登录页 */
const Login = () => {
  useDocumentTitle("欢迎，请登录以继续");
  const { login } = useAuth();
  /** 提交登陆 */
  const handleFinish = async (values: {
    username: string;
    password: string;
  }) => {
    login(values);
  };
  /** 登录失败 */
  const handleFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const LoginWrapper = styled.div`
    height: 100vh;
    background: linear-gradient(var(--tsc), rgba(79, 0, 182, 0.306));
    color: azure;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

  const LoginForm = styled.div`
    padding: 30px;
    margin: 0 auto;
    width: 400px;
    background: #242424;
    border-radius: 10px;
  `;

  const LoginTitle = styled.div`
    text-align: center;
    font-size: 25px;
    margin-bottom: 30px;
  `;

  return (
    <LoginWrapper>
      <Corner />
      <LoginForm>
        <LoginTitle>用户登录</LoginTitle>
        <Form
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          className="login-form"
        >
          <Item
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入用户名!",
              },
              { min: 4, message: "用户名必须大于4位" },
              { max: 12, message: "用户名不能小于12位" },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "用户名必须包含英文、数字或下划线",
              },
            ]}
            initialValue={"admin"}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
              autoComplete="off"
            />
          </Item>
          <Item
            name="password"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) {
                    throw new Error("密码不能为空");
                  }
                  if (value.length < 4) {
                    throw new Error("密码必须大于4位");
                  }
                  if (value.length > 12) {
                    throw new Error("用户名必须小于12位");
                  }
                  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    throw new Error("密码必须是英文、数组或下划线组成");
                  }
                },
              },
            ]}
          >
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
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
