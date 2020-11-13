import listToTree from "./ddzy/utility/others/listToTree";

const s1 = [
  {
    id: 2,
    value: 2,
    parent: 1,
  },
  {
    id: 3,
    value: 3,
    parent: 0,
  },
  {
    id: 4,
    value: 4,
    parent: 3,
  },
  {
    id: 5,
    value: 5,
    parent: 3,
  },
  {
    id: 1,
    value: 1,
    parent: 0,
  },
  {
    id: 6,
    value: 6,
    parent: 4,
  },
  {
    id: 7,
    value: 7,
    parent: 4,
  },
  {
    id: 8,
    value: 8,
    parent: 7,
  },
];
const p1 = listToTree(s1);
console.log(p1);