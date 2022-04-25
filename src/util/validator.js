//用户名格式校验
export const nameValidator = [
  {
    required: true,
    whitespace: true,
    message: "请输入用户名!",
  },
  { min: 4, message: "用户名必须大于4位" },
  { max: 12, message: "用户名不能小于12位" },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "用户名必须包含英文、数字或下划线",
  },
];
//格式校验
export const passValidator = [
  {
    validator: async (_, value) => {
      if (!value) {
        throw new Error("密码不能为空");
      }
      if (value.length < 4) {
        throw new Error("密码必须大于4位");
      }
      if (value.length > 12) {
        throw new Error("用户名必须小于12位");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        throw new Error("密码必须是英文、数组或下划线组成");
      }
    },
  },
];
