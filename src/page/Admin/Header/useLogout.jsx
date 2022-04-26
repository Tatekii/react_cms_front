import { ExclamationCircleOutlined,LogoutOutlined } from "@ant-design/icons";
import { Modal,Button } from "antd";
import { useAuth } from "auth/auth-context";

export default function useLogout() {
	const {logout} = useAuth()


	const handleLogout = () => {
		Modal.confirm({
			title: "确定退出吗？",
			icon: <ExclamationCircleOutlined />,
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				logout()
			},
		});
	};
	return 	(		<Button
			type="primary"
			size="middle"
			onClick={handleLogout}
			icon={<LogoutOutlined />}
		>
			退出
		</Button>
	);
}
