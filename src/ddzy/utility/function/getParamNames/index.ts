/**
 * 获取函数的形参名称数组
 * @param origin 目标函数
 * @returns {string[]} 函数参数名称数组
 */
export function getParamNames(origin: Function): string[] {
  if (!utilityFunction.isFunction(origin)) {
    return [];
  }

  let final: string[] = [];
  const originToStr: string = origin.toString();
  const matchParamsReg: RegExp = /(?:(?<=\()(.+)(?=\)))/;
  const matchedResult = originToStr.match(matchParamsReg);

  if (matchedResult) {
    let matchedParams = matchedResult[1];
    final = matchedParams.split(/[,\s]+/g);
  }

  return final;
}