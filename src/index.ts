import { after } from "./ddzy/utility/function/after";

// ? 不传递任何参数
function doingWorkAsync(props: { type: string, sign: (...args: any[]) => void }) {
  setTimeout(() => {
    props.sign();
  }, 0);
}

const employees = ['jack', 'rose', 'riven'];
const fragment = after(employees.length, () => {
  console.log('Work completed!');
});

for (const employee of employees) {
  doingWorkAsync({ type: employee, sign: fragment });
}

// ? 传递任意参数
function doingWorkAsyncWithParams(props: { type: string, sign: (...args: any[]) => void }) {
  setTimeout(() => {
    props.sign(props.type);
  }, 0);
}

const employees2 = ['jack', 'rose', 'riven'];
const fragment2 = after(employees.length, (type) => {
  console.log(type);
});

for (const employee of employees2) {
  doingWorkAsyncWithParams({ type: employee, sign: fragment2 });
}