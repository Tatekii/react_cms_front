/** 登录用户信息 */
export interface User {
  create_time: number;
  role: object;
  username: string;
  _id: string;
}

/** 商品分类 */
export interface CategoryItem {
  parentId: string;
  _id: string;
  name: string;
  __v: number;
}

/** 角色权限 */
export interface RoleItem {
  name: {
    type: string;
    required: boolean;
  };
  auth_name: string;
  auth_time: number;
  create_time: number;
  menus: string[];
  _id: string;
}

// 登录form
export interface AuthForm {
  username: string;
  password: string;
}
