const menuList = [
  {
    title: "首页", //* 菜单标题名称
    key: "home", //展开的key
    path: "/home", //* 对应的path
    icon: "HomeOutlined", //* 图标组件名称
  },
  {
    title: "商品",
    key: "products",
    path: "/products",
    icon: "AppstoreOutlined",
    children: [
      //* 子菜单列表
      {
        title: "商品分类管理",
        key: "category",
        path: "/products/category",
        icon: "BarsOutlined",
      },
      {
        title: "商品管理",
        key: "product",
        path: "/products/manage",
        icon: "ToolOutlined",
      },
    ],
  },
  {
    title: "用户管理",
    key: "user",
    path: "/user",
    icon: "UserOutlined",
  },
  {
    title: "角色管理",
    key: "role",
    path: "/role",
    icon: "SafetyOutlined",
  },
  {
    title: "图形图表",
    key: "charts",
    path: "/charts",
    icon: "AreaChartOutlined",
    children: [
      {
        title: "柱形图",
        key: "bar",
        path: "/charts/bar",
        icon: "BarChartOutlined",
      },
      {
        title: "折线图",
        key: "line",
        path: "/charts/line",
        icon: "LineChartOutlined",
      },
      {
        title: "饼图",
        key: "pie",
        path: "/charts/pie",
        icon: "PieChartOutlined",
      },
    ],
  },
];

export default menuList;
