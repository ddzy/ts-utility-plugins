import utilityFunction from "./ddzy/utility/function";


function Person() {

}
Person.prototype = {
  say() {
    console.log('saying...');
  },
};
const p1 = utilityFunction._new(Person);
console.log(p1);

function Person2(name: string) {
  this.name = name;
}
Person2.prototype = {
  say() {
    return this.name;
  },
};
const p2 = utilityFunction._new(Person2, 'duan');
console.log(p2);

const p3 = new Person();
console.log(p3);