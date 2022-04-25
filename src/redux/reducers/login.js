import { LOGIN_FLAG_USER, LOGIN_FLAG_TOKEN } from "@/util/constant";
import { createSlice } from "@reduxjs/toolkit";
import store from "store";
// 从localStorage取得
let user = store.get(LOGIN_FLAG_USER);
let token = store.get(LOGIN_FLAG_TOKEN);

const initState = {
  user: user || {},
  token: token || "",
  isLogin: user && token ? true : false,
};

export const LOGIN_KEY = "login";
const { reducer: LoginSlice, actions } = createSlice({
  name: LOGIN_KEY,
  initialState: initState,
  reducers: {
    saveUserAndToken: (state, action) => {
      const data = action.payload;
      store.set(LOGIN_FLAG_USER, data.user);
      store.set(LOGIN_FLAG_TOKEN, data.token);

      state = Object.assign(state, {
        user: data.user,
        token: data.token,
        isLogin: true,
      });
    },
    deleteUserAndToken: (state, action) => {
      //从Local Storage中删除
      store.remove(LOGIN_FLAG_USER);
      store.remove(LOGIN_FLAG_TOKEN);

      state = Object.assign(state, {
        user: {},
        token: "",
        isLogin: false,
      });
    },
  },
});

export default LoginSlice;
export const { saveUserAndToken, deleteUserAndToken } = actions;
