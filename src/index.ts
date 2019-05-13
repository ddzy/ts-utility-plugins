import {
  Draggable,
} from './ddzy/business/draggable/index';


new Draggable.Sort({
  container: '#app',
  animate: true,
  dataSource: [
    {
      titleText: `
        <img src="https://avatars1.githubusercontent.com/u/33921398?s=40&v=4" />
      `,
      contentText: `
        <h3>oneOne One</h3>
      `,
    },
    {
      titleText: '②',
      contentText: 'twotwotwo'
    },
    {
      titleText: '③',
      contentText: 'threethreethree'
    },
  ],
})