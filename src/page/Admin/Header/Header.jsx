import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useWeather from "./useWeather"; // 获取天气的hooks
import useCurrentTime from "./useCurrentTime"; //  时钟hooks
import useFullscreen from "./useFullscreen"; //  全屏hooks
import useTitle from "./useTitle"; // path转中文页面标题
import useLogout from "./useLogout"; // 退出hooks
import "./index.less";

export default function Header() {
	const { pathname } = useLocation();

	const userInfo = useSelector((state) => state.login);
	const username = userInfo.user.username;

	const currentTime = useCurrentTime();
	const fullscreenUI = useFullscreen();
	const title = useTitle(pathname);

	const weatherUI = useWeather();
	const LogoutUI = useLogout();

	return (
		<div className="header">
			<div className="header-top">
				{fullscreenUI}
				<span style={{ marginLeft: "10px", marginRight: "10px" }}>欢迎，{username}</span>
				{LogoutUI}
			</div>
			<div className="header-bottom">
				<div className="header-bottom-left">{title}</div>
				<div className="header-bottom-right">
					<span>{currentTime}</span>
					{weatherUI}
				</div>
			</div>
		</div>
	);
}