import { getEle } from "../../utility/dom/getEle";

describe('getEle', () => {
  test('getEle should return `null` when no matched', () => {
    document.body.innerHTML = `
      <div id="app"></div>
    `;

    const origin = [
      'p', '.text'
    ];

    for (const v of origin) {
      expect(getEle(v)).toBe(null);
    }
  });

  test('getEle should return the `DOM object` which has been matched', () => {
    document.body.innerHTML = `
      <div id="#app"></div>
    `;

    const origin = ['#app'];

    for (const v of origin) {
      expect(getEle(v)).toBe(
        document.getElementById('app')
      )
    }
  });
});