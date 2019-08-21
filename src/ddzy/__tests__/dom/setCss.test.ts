import { setCss } from "../../utility/dom/setCss";

describe('setCss', () => {
  test('setCss should receive a DOM object and CSS Rule options, add rules to DOM.', () => {
    document.body.innerHTML = `
      <div id="app">app</div>
    `;

    setCss(
      document.getElementById('app') as HTMLElement,
      {
        color: 'red',
        'font-size': 25,
      },
    );

    expect((document.getElementById('app') as HTMLElement).getAttribute('style')).toBe('color: red; font-size: 25;');

  });
});