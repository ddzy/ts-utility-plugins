/**
 * name: business-carousel 业务轮播
 * author: zhaoy_duan
 * create_time: 18-10-2
 * last_modified_time: 18-10-2 
 */


/**
 * width: 宽
 * height: 高
 * dataSource: 数据
 * afterChange: 切换后的回调
 * beforeChange: 切换前的回调
 * autoPlay: 是否自动切换
 * showDots: 是否显示导航点
 * showArrows: 是否显示箭头
 * easing: 动画效果
 * effect: 切换效果 fade | scroll
 * vertical: 垂直显示
 * duringTime: 间隔时间
 */

namespace Carousel {


  const settings = {
    width: 0,
    height: 0,
    dataSource: [],
    autoPlay: false,
    showDots: false,
    showArrows: false,
    easing: 'linear',
    effect: 'scroll',
    vertical: false,
    duringTime: 3,
  } as object


  export namespace IProps {
    export interface IConfigProps {
      dataSource: [{ text: string, url: string }];
      width?: number;
      height?: number;
      autoPlay?: boolean;
      showDots?: boolean;
      showArrows?: boolean;
      easing?: string;
      effect?: string;
      vertical?: boolean;
      duringTime?: number;
      beforeChange?: () => void;
      afterChange?: () => void;
    }
    export interface IRenderProps {} 
  }


  export function config(
    options: IProps.IConfigProps,
  ): any {
    Init.initSettings(options);

    return Carousel;
  }


  export function render() {
    return Carousel;
  }


  namespace Init {
    export function initSettings(
      options: any
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];
          
          Reflect.set(settings, key, element);
        }
      }
    }
  }

}


Carousel
  .config({
    dataSource: [{
      text: 'Slide One',
      url: '',
    }],
    width: 600,
    height: 200,
  })
  .render(); 