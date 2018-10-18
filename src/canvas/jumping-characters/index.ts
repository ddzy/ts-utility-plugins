/**
 * @name: canvas-jumping-characters 
 * @description 跳跃的字符
 * @author: yyg
 * @version 1.0.1
 */


/**
 * @param ele 画布元素
 * @param cvsWidth 画布宽
 * @param cvsHeight 画布高
 * @param cvsBgColor 画布背景
 * @param text   string | string[] 文字
 * @param textColor string | string[] 文字颜色
 * @param textSize 文字大小
 * @param safeDistance 安全距离(移动多远消失)
 * @param initialOpacity 初始透明度
 */


namespace JumpingCharacters {

  export const yyg_settings: IProps.IRenderProps = {
    ele: '',
    cvsWidth: 500,
    cvsHeight: 500,
    cvsBgColor: '#fff',
    text: [
      '富强', '民主', '文明', '和谐',
      '自由', '平等', '公正', '法治',
      '爱国', '敬业', '诚信', '友善',
    ],
    textColor: [
      '#1890ff', '#f5222d', '#fa8c16', '#faad14',
      '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
      '#2f5418', '#722ed1', '#eb2f96', '#fa541c',
    ],
    textSize: 16,
    safeDistance: 20,
    initialOpacity: 1,
  }

  
  export function render(
    _props: IProps.IRenderProps,
  ) {
    _aidedInitSettings(_props);

    return JumpingCharacters;
  }


  /**
   * 初始化自定义配置辅助函数
   * @param options 配置项
   */
  function _aidedInitSettings(
    options: any,
  ) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = options[key];
        Reflect.set(yyg_settings, key, element);
      }
    }
  }


  namespace IProps {
    export interface IRenderProps {
      ele: string,
      cvsWidth?: number,
      cvsHeight?: number,
      cvsBgColor?: string,
      text?: string[] | string,
      textColor?: string[] | string,
      textSize?: number,
      safeDistance?: number,
      initialOpacity?: number,
    }
  }

}

JumpingCharacters.render({
  ele: '#',
});