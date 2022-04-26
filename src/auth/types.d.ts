export interface AuthForm {
  username: string;
  password: string;
}

export interface User {
  create_time: number;
  role: object;
  username: string;
  _id: string;
}
