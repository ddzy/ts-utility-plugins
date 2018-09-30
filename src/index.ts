/**
 * create_time: 18-9-30
 * author: yyg
 */



namespace Utils {

  /**
   * 获取元素
   * @param id 元素id
   */
  export function getEle(
    id: string,
  ): HTMLElement | null {
    return document.getElementById(id) || null;
  }

}


