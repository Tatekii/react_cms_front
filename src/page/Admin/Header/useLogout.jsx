import { ExclamationCircleOutlined,LogoutOutlined } from "@ant-design/icons";
import { deleteUserAndToken } from "@/redux/reducers/login";
import { useDispatch } from "react-redux";

import { Modal,Button } from "antd";

export default function useLogout() {
	const dispatch = useDispatch()


	const handleLogout = () => {
		Modal.confirm({
			title: "确定退出吗？",
			icon: <ExclamationCircleOutlined />,
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				dispatch(deleteUserAndToken())
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
