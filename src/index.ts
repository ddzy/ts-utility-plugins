import { Sort } from "./ddzy/utility/algorithm/sort";
import binarySearch from "./ddzy/utility/others/binarySearch";

const arr = [10, 867, 4, 34, 9, 98, 45, 67];
const sortedArr = Sort.quickSort(arr);

const p1 = binarySearch(sortedArr, 34);
console.log(p1);
const p2 = binarySearch(sortedArr, 99);
console.log(p2);