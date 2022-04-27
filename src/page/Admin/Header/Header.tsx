import useTitle from "./useTitle"; // path转中文页面标题
import Clock from "./Clock";
import Weather from "./Weather";
import FullScreen from "./Fullscreen";
import Logout from "./Logout";
import "./index.less";
import { useAuth } from "@/auth/auth-context";

export default function Header() {
  const title = useTitle();
  const { user } = useAuth();

  return (
    <div className="header p-2 flex flex-col gap-2 justify-between">
      <div className="header-top flex justify-end gap-4 align-center">
        <div className="flex align-center">
          <span className="text-xl">欢迎，{user?.username}</span>
        </div>
        <Logout />
        <FullScreen />
      </div>
      <div className="header-bottom flex justify-between">
        <div className="header-bottom-left text-xl">{title}</div>
        <div className="header-bottom-right flex align-center justify-end">
          <Clock />
          <Weather />
        </div>
      </div>
    </div>
  );
}
