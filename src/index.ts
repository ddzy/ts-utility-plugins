import StarsLine from './ddzy/canvas/stars-line/index';


// ! BUG: 鼠标进画布, 关闭定时器

StarsLine
  .config({
    ballNum: 50,
    allowMouse: true,
    ballColor: '#09c',
    lineColor: '#09c',
  })
  .render('#cvs');