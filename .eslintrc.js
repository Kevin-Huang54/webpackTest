module.exports = {
  // 继承 Eslint 规则
  extends: ["plugin:prettier/recommended"],
  plugins: ["import", "prettier"], // 解决动态导入import语法报错问题
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {},
};
