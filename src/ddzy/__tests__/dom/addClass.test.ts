import { addClass } from "../../utility/dom/addClass";

describe('addClass', () => {
  test('addClass should add the class to a DOM object', () => {
    document.body.innerHTML = `
      <div id="app" class="c1"></div>
    `;

    addClass(
      (document.getElementById('app') as HTMLElement),
      'c2',
    );

    expect((document.getElementById('app') as HTMLElement).classList.contains('c2')).toBeTruthy();
  });
});