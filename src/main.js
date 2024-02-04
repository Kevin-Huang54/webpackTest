import add from "./count.js";
// import './icons/iconfont.css'
import "./styles/test.css";
import _ from "lodash";

let foo = add(1, 2);
console.log(foo);
let array = [1];
let bar = _.concat(array, 2, [3], [[4]]);
console.log(bar);

document.getElementById("importBtn").onclick = function () {
  // 定义打包后chunk的名字
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "sum" */
    './sum').then((res)=> {
    console.log(res.default(1,2,3));
  }).catch(error => {
    console.log(error)
  })
};
