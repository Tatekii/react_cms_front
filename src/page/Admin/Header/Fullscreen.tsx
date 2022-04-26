import { useState } from "react";
import screenfull from "screenfull";
import { Button } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

export default function useFullscreen() {
  const [isFullscreen, setFullscreen] = useState(false);
  console.log(screenfull);

  const toggleFullscreen = () => {
    setFullscreen(!isFullscreen);
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <div>
      {" "}
      <Button
        onClick={toggleFullscreen}
        icon={
          isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
        }
      ></Button>
    </div>
  );
}
