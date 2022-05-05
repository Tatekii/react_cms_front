/** 封装异步请求中的loading,error,res */
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  // const [state,setState] = useState<State<D>>({
  //   ...defaultInitialState,
  //   initialState
  // })
};
