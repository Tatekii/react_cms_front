import { useEffect,useState } from "react";
import * as dayjs from "dayjs";

/** 获取时间hooks */
export default function useCurrentTime() {
  const [currentTime, setTime] = useState();
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(() => dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
		}, 1000);
		return () => {
			// unmount卸载定时器
			clearInterval(timer);
		};
	}, []);
  return (
		currentTime
	)
}
