import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import menuList from "@/config/menu";

export default function useTitle() {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    // 根据路径更新标题
    const getTitle = () => {
      //获取key
      const key = pathname.split("/").reverse()[0];
      //标题
      let title = "";
      menuList.forEach((item) => {
        if (item.children instanceof Array) {
          let child = item.children.find((child) => {
            return child.key === key;
          });
          if (child) {
            title = child.title;
          }
        } else {
          if (item.key === key) {
            title = item.title;
          }
        }
      });
      setTitle(() => title);
      return;
    };
    getTitle();
  }, [pathname]);

  return title;
}
