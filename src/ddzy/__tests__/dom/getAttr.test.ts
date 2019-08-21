import { getAttr } from "../../utility/dom/getAttr";

describe('getAttr', () => {
  test('getAttr should return null when nothing matched ', () => {
    document.body.innerHTML += `
      <input type="text" id="text" class="text" />
    `;

    expect(
      getAttr((document.getElementById('text') as HTMLElement), 'disabled')
    ).toBeNull();
  });

  test('getAttr should return the value when matched', () => {
    document.body.innerHTML = `
      <input type="text" id="text" class="text" />
    `;

    expect(getAttr(
      (document.getElementById('text') as HTMLElement),
      'type',
    )).toBe('text');
  });
});