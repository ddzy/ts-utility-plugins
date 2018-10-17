/**
 * @name: canvas-jumping-characters 
 * @description 跳跃的字符
 * @author: yyg
 * @version 1.0.0
 */


/**
 * @param cvsWidth 画布宽
 * @param cvsHeight 画布高
 * @param cvsBgColor 画布背景
 * @param fonts   string | string[] 字体数组
 * @param fontColor 字体颜色
 * @param fontSize 字体大小
 * @param safeDistance 安全距离(移动多远消失)
 * @param initialOpacity 初始透明度
 */


namespace JumpingCharacters {

  const yyg_settings: IProps.IRenderProps = {
    cvsWidth: 500,
    cvsHeight: 500,
    cvsBgColor: '#fff',
    fonts: [
      '富强', '民主', '文明', '和谐',
      '自由', '平等', '公正', '法治',
      '爱国', '敬业', '诚信', '友善',
    ],
    fontColor: '#d50',
    fontSize: 16,
    safeDistance: 20,
    initialOpacity: 1,
  }

  
  export function render(
    _props: IProps.IRenderProps,
  ) {
    
  }


  namespace IProps {
    export interface IRenderProps {
      cvsWidth?: number,
      cvsHeight?: number,
      cvsBgColor?: string,
      fonts?: string[] | string,
      fontColor?: string,
      fontSize?: number,
      safeDistance?: number,
      initialOpacity?: number,
    }
  }

}