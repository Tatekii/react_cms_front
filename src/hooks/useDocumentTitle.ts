import { useEffect, useRef } from "react";

/** 动态改变文档title，并在卸载后还原 */
export default function useDocumentTitle(title: string) {
  const originalTitle = useRef(document.title).current;

  // 根据参数改变title
  useEffect(() => {
    document.title = title;
  }, [title]);

  // 卸载后恢复原始title
  useEffect(() => {
    return () => {
      document.title = originalTitle;
    };
  }, [title, originalTitle]);
}
