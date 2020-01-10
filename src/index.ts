import dateFormat from "./ddzy/utility/date/dateFormat";
import { now } from "./ddzy/utility/date/now";

// ? 年月日
const p1 = dateFormat('yyyy-MM-dd', now(), {});
console.log(p1);

// ? 年月
const p2 = dateFormat('yyyy-MM', now(), {});
console.log(p2);

// ? 月日
const p3 = dateFormat('MM-dd', now(), {})
console.log(p3);

// ? 自定义日期分隔符
const p4 = dateFormat('yyyy-MM-dd', now(), {
  dateConnector: '/',
});
console.log(p4);

// ? 日期 + 时间
const p5 = dateFormat('yyyy-MM-dd HH:mm:ss', now(), {});
console.log(p5);

// ? 时间
const p6 = dateFormat('HH:mm:ss', now(), {});
console.log(p6);

// ? 自定义时间分隔符
const p7 = dateFormat('HH:mm:ss', now(), {
  timeConnector: '_',
});
console.log(p7);

// ? 自定义日期 + 时间分隔符
const p8 = dateFormat('yyyy-MM-dd HH:mm:ss', now(), {
  gap: '~~~',
});
console.log(p8);

// ? 错误字符
const p9 = dateFormat('test stra', now(), {});
console.log(p9);