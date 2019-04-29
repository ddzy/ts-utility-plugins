import {
  ColorfulBubble,
} from './canvas/colorful-bubble/index.new';

new ColorfulBubble({
  container: '#cvs',
  bubbleNum: 100,
  allowMouse: false,
  cvsBgColor: '#fff',
  cvsWidth: window.innerWidth,
  cvsHeight: window.innerHeight,
});