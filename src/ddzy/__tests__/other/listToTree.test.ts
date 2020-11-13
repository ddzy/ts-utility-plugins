import listToTree from "../../utility/others/listToTree";

describe('listToTree tests()...', () => {
  test('listToTree should transform a list to a tree', () => {
    const received = [
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
    const expected = [
      {
        "id": 3,
        "value": 3,
        "parent": 0,
        "children": [
          {
            "id": 4,
            "value": 4,
            "parent": 3,
            "children": [
              {
                "id": 6,
                "value": 6,
                "parent": 4
              },
              {
                "id": 7,
                "value": 7,
                "parent": 4,
                "children": [
                  {
                    "id": 8,
                    "value": 8,
                    "parent": 7
                  }
                ]
              }
            ]
          },
          {
            "id": 5,
            "value": 5,
            "parent": 3
          }
        ]
      },
      {
        "id": 1,
        "value": 1,
        "parent": 0,
        "children": [
          {
            "id": 2,
            "value": 2,
            "parent": 1
          }
        ]
      }
    ];

    const result = listToTree(received);

    expect(result).toStrictEqual(expected);
  });
});