import { words } from "./ddzy/utility/string/words";

// 默认模式
const s1 = 'duan zhao _*$*$  y & ang a p     g';
const p1 = words(s1, /\W+/);
console.log(p1);

// 自定义模式
const s2 = 'duan  zhao    yang';
const p2 = words(s2, /\s+/g);
console.log(p2);

// 自定义模式
const s3 = 'duan ### zhaoyang |%# s d h   dan';
const p3 = words(s3, /#+/g);
console.log(p3);