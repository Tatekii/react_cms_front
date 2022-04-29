import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import menuList from "@/config/menu";
import styled from "@emotion/styled";

export default function useTitle() {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();

  const Title = styled.div`
    font-size: 2rem;

    &::after {
      content: "";
      position: absolute;
      border: 20px solid transparent;
      border-top: 20px solid var(--tsc);
      animation: 1s linear bounce infinite;
      z-index: 6;
    }

    @keyframes bounce {
      0% {
        transform: 0;
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: 0;
      }
    }
  `;

  // 根据路径更新标题
  useEffect(() => {
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

  return <Title>{title}</Title>;
}
