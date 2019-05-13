import utilidyDOM from '../utility/dom/index';
import utilityDOM from '../utility/dom/index';


describe('utilityDOM tests', () => {

  describe('isDOM', () => {
    test('isDOM should return `false` if  received a non DOM object', () => {
      const origin = [
        0, Number.MAX_SAFE_INTEGER, Number.MIN_VALUE,
        '', 'ddzy',
        {},
        true, false,
        function () { },
        [],
      ];

      for (const v of origin) {
        expect(utilidyDOM.isDOM(v)).toBeFalsy();
      }
    });

    test('isDOM should return `true` if  received a DOM object', () => {
      const origin = [
        document.createElement('div'),
        document.body
      ];

      for (const v of origin) {
        expect(utilidyDOM.isDOM(v)).toBeTruthy();
      }
    });
  });

  describe('getEle', () => {
    test('getEle should return `null` when no matched', () => {
      document.body.innerHTML = `
        <div id="app"></div>
      `;

      const origin = [
        'p', '.text'
      ];

      for (const v of origin) {
        expect(utilidyDOM.getEle(v)).toBe(null);
      }
    });

    test('getEle should return the `DOM object` which has been matched', () => {
      document.body.innerHTML = `
        <div id="#app"></div>
      `;

      const origin = ['#app'];

      for (const v of origin) {
        expect(utilidyDOM.getEle(v)).toBe(
          document.getElementById('app')
        )
      }
    });
  });

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
        expect(utilidyDOM.getEle(v)).toBe(null);
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
        expect(utilidyDOM.getAllEle(v)).toBe(
          document.querySelectorAll('.text')
        );
      }
    });
  });

  describe('setAttr', () => {
    test('setAttr should receive a DOM object and attributes, add attributes to DOM, and return nothing', () => {
      document.body.innerHTML = `
        <input id="text"></div>
      `;

      expect(utilidyDOM.setAttr(
        document.getElementById('text') as HTMLElement,
        {
          class: 'text',
          type: 'text',
        }
      ));
    });
  });

  describe('setCss', () => {
    test('setCss should receive a DOM object and CSS Rule options, add rules to DOM.', () => {
      document.body.innerHTML = `
        <div id="app">app</div>
      `;

      utilityDOM.setCss(
        document.getElementById('app') as HTMLElement,
        {
          color: 'red',
          'font-size': 25,
        },
      );

      expect((document.getElementById('app') as HTMLElement).getAttribute('style')).toBe('color: red; font-size: 25;');

    });
  });

  describe('getAttr', () => {
    test('getAttr should return null when nothing matched ', () => {
      document.body.innerHTML += `
        <input type="text" id="text" class="text" />
      `;

      expect(
        utilidyDOM.getAttr((document.getElementById('text') as HTMLElement), 'disabled')
      ).toBeNull();
    });

    test('getAttr should return the value when matched', () => {
      document.body.innerHTML = `
        <input type="text" id="text" class="text" />
      `;

      expect(utilidyDOM.getAttr(
        (document.getElementById('text') as HTMLElement),
        'type',
      )).toBe('text');
    });
  });

  describe('addClass', () => {
    test('addClass should add the class to a DOM object', () => {
      document.body.innerHTML = `
        <div id="app" class="c1"></div>
      `;

      utilidyDOM.addClass(
        (document.getElementById('app') as HTMLElement),
        'c2',
      );

      expect((document.getElementById('app') as HTMLElement).classList.contains('c2')).toBeTruthy();
    });
  });

  describe('removeClass', () => {
    test('removeClass should remove the class from a DOM object', () => {
      document.body.innerHTML = `
        <div id="app" class="c1 c2"></div>
      `;

      utilidyDOM.removeClass(
        (document.getElementById('app') as HTMLElement),
        'c2',
      );

      expect(
        (document.getElementById('app') as HTMLElement).classList.contains('c2')
      ).toBeFalsy();
    });
  });

  describe('traversalDOMWithBFS', () => {
    test('traversalDOMWithBFS should traversal DOM Tree by BFS', () => {
      document.body.innerHTML = `
        <div id="app">
          <h3 class="title">title</h3>
          <section class="post">
            <p class="text"></p>
          </section>
        </div>
      `;

      const expected = [
        (document.getElementById('app') as HTMLDivElement),
        (document.querySelector('.title') as HTMLTitleElement),
        (document.querySelector('.post') as HTMLDivElement),
        (document.querySelector('.text') as HTMLParagraphElement),
      ];
      const result: HTMLElement[] = [];

      utilidyDOM.traversalDOMWithBFS(
        (document.getElementById('app') as HTMLElement),
        (node) => {
          result.push(node);
        }
      );

      for (const [index, node] of result.entries()) {
        expect(node).toBe(expected[index]);
      }
    });
  });

  describe('traversalDOMWithDFS', () => {
    test('traversalDOMWithDFS should traversal DOM Tree by DFS', () => {
      document.body.innerHTML = `
        <div id="app">
          <h3 class="title">
            <a class="link"></a>
          </h3>
          <section class="post">
            <p class="text"></p>
          </section>
        </div>
      `;

      const expected = [
        (document.getElementById('app') as HTMLDivElement),
        (document.querySelector('.title') as HTMLTitleElement),
        (document.querySelector('.link') as HTMLAnchorElement),
        (document.querySelector('.post') as HTMLDivElement),
        (document.querySelector('.text') as HTMLParagraphElement),
      ];
      const result: HTMLElement[] = [];

      utilidyDOM.traversalDOMWithDFS(
        (document.getElementById('app') as HTMLElement),
        (node) => {
          result.push(node);
        }
      );

      for (const [index, node] of result.entries()) {
        expect(node).toBe(expected[index]);
      }
    })
  })

  describe('convertPairToCSSText', () => {
    test('convertPairToCSSText should extract CSS pair object into truthy cssText.', () => {
      const origin: Partial<CSSStyleDeclaration> = {
        border: '1px dotted red',
        backgroundColor: 'blue',
      };
      const expected = `border: 1px dotted red; background-color: blue; `;

      expect(utilityDOM.convertPairToCSSText(origin)).toBe(expected);
    });
  });

});