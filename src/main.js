import add from "./count.js";
import sum from "./sum";
// import './icons/iconfont.css'
import "./styles/test.css";
import _ from "lodash";

let foo = add(1, 2);
console.log(foo);
console.log(sum(1, 2, 3, 4));
let array = [1];
let bar = _.concat(array, 2, [3], [[4]]);
console.log(bar);
