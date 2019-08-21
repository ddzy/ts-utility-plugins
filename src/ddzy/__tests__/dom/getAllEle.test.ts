import { getAllEle } from "../../utility/dom/getAllEle";
import { getEle } from "../../utility/dom/getEle";

describe('getAllEle', () => {
  test('getEle should return `null` when no matched', () => {
    document.body.innerHTML = `
      <div id="app">
        <p class="text"></p>
        <p class="text"></p>
        <p class="text"></p>
      </div>
    `;

    const origin = [
      'span', '.link',
    ];

    for (const v of origin) {
      expect(getEle(v)).toBe(null);
    }
  });

  test('getEle should return all of the `DOM object` which have been matched', () => {
    document.body.innerHTML = `
      <div id="#app">
        <p class="text"></p>
        <p class="text"></p>
        <p class="text"></p>
      </div>
    `;

    const origin = ['.text'];

    for (const v of origin) {
      expect(getAllEle(v)).toBe(
        document.querySelectorAll('.text')
      );
    }
  });
});