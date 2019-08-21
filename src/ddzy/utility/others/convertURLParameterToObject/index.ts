/**
 * 提取URL中的GET请求参数
 * @param url 需要解析的url
 */
export function convertURLParameterToObject(url: string): Record<string, any> {
  const matchURLReg: RegExp = /(?:(?<=[^\/])(\?.+))/;
  const matchParameterReg: RegExp = /[\?\&]{1}(?:(\w+)=(\w+))/g;
  const final: Record<string, any> = {};

  const matchedCompleteURL = url.match(matchURLReg);

  if (matchedCompleteURL) {
    const matchedPairs = matchedCompleteURL[1].match(matchParameterReg);
    if (matchedPairs) {
      matchedPairs.forEach((v) => {
        const [key, value] = v.split('=');

        final[key.substr(1)] = value;
      });
    }
  }

  return final;
}