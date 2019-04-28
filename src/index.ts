import Carousel from './business/carousel/index.new';

new Carousel({
  container: '#app',
  dataSource: [{
    text: 'Slide One',
    img: {
      url: 'https://img.alicdn.com/tps/i4/TB11ULPd3HqK1RjSZFPSuwwapXa.jpg_q90_.webp',
      target: '#',
    },
  }, {
    text: 'Slide Two',
    img: {
      url: 'https://img.alicdn.com/tfs/TB1Kc14ekvoK1RjSZFwXXciCFXa-520-280.png_q90_.webp',
      target: '',
    },
  }, {
    text: 'Slide Three',
    img: {
      url: 'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
      target: '',
    },
  }, {
    text: 'Slide Four',
    img: {
      url: 'https://img.alicdn.com/tfs/TB1twNrdgDqK1RjSZSyXXaxEVXa-520-280.jpg_q90_.webp',
      target: '',
    },
  }],
  showArrows: true,
  showDots: true,
  autoPlay: true,
  easing: 'ease-in-out',
  delayTime: 2000,
  isHoverPause: true,
  duringTime: 1,
  effect: 'fade',
});



