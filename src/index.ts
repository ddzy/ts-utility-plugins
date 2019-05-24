import utilityArray from "./ddzy/utility/array";

const origin = [
  'duan',
  1998,
  [
    'a',
    'b',
    [
      'c',
      'd',
      [
        'e',
        'f',
        123
      ],
    ],
  ],
  {
    name: 'duan',
    age: 20,
  },
];

const result = utilityArray.toFlatArrayOutPlace(origin);

console.log(result);