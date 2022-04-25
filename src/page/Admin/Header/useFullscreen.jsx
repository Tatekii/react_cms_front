import { useState } from "react";
import screenfull from "screenfull";
import { Button } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

export default function useFullscreen() {
	const [isFullscreen, setFullscreen] = useState(false);

	const toggleFullscreen = () => {
		screenfull.toggle();
		setFullscreen((pre) => !pre);
	};

	return (
		<>
			{isFullscreen ? (
				<Button size="small" onClick={toggleFullscreen} icon={<FullscreenExitOutlined />}></Button>
			) : (
				<Button size="small" onClick={toggleFullscreen} icon={<FullscreenOutlined />}></Button>
			)}
		</>
	);
}
