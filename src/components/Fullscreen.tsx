import { useState } from "react";
import screenfull from "screenfull";
import { Button } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { memo } from "react";

export default memo(function Fullscreen() {
  const [isFullscreen, setFullscreen] = useState(false);

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
});
