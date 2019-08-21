import { convertPairToCSSText } from "../../utility/dom/convertPairToCSSText";

describe('convertPairToCSSText', () => {
  test('convertPairToCSSText should extract CSS pair object into truthy cssText.', () => {
    const origin: Partial<CSSStyleDeclaration> = {
      border: '1px dotted red',
      backgroundColor: 'blue',
    };
    const expected = `border: 1px dotted red; background-color: blue; `;

    expect(convertPairToCSSText(origin)).toBe(expected);
  });
});