import { removeClass } from "../../utility/dom/removeClass";

describe('removeClass', () => {
  test('removeClass should remove the class from a DOM object', () => {
    document.body.innerHTML = `
      <div id="app" class="c1 c2"></div>
    `;

    removeClass(
      (document.getElementById('app') as HTMLElement),
      'c2',
    );

    expect(
      (document.getElementById('app') as HTMLElement).classList.contains('c2')
    ).toBeFalsy();
  });
});