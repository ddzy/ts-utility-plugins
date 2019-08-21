import { setAttr } from "../../utility/dom/setAttr";

describe('setAttr', () => {
  test('setAttr should receive a DOM object and attributes, add attributes to DOM, and return nothing', () => {
    document.body.innerHTML = `
      <input id="text"></div>
    `;

    expect(setAttr(
      document.getElementById('text') as HTMLElement,
      {
        class: 'text',
        type: 'text',
      }
    ));
  });
});