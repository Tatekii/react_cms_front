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
