import { _querySelector } from "../../utility/dom/_querySelector";


describe('_querySelector', () => {
  test('_querySelector should return `null` when no matched', () => {
    document.body.innerHTML = `
      <div id="app">
        <h3 class="title">
          <p class="text"></p>
          <a class="link"></a>
        </h3>
        <section class="post">
          <p class="text"></p>
        </section>
      </div>
    `;

    const received = ['.ddzy', 'ddzy', '#ddzy', ''];

    for (const v of received) {
      expect(_querySelector(v)).toBeNull();
    }
  });

  test('_querySelector should return `a single Element` when matched', () => {
    document.body.innerHTML = `
      <div id="app">
        <h3 class="title">
          <p class="text"></p>
          <a class="link"></a>
        </h3>
        <section class="post">
          <p class="text"></p>
        </section>
      </div>
    `;

    const received = ['#app', '.title', '.text', 'a'];
    const expected = [
      document.querySelector('#app'),
      document.querySelector('.title'),
      document.querySelector('.text'),
      document.querySelector('a'),
    ];

    for (const [i, v] of received.entries()) {
      expect(_querySelector(v)).toBe(expected[i]);
    }
  });
});