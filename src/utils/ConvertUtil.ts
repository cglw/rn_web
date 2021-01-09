export function convertSize(limit: number) {
  let size = '';
  if (limit < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  let sizeStr = size + '';
  let len = sizeStr.indexOf('.');
  let dec = sizeStr.substr(len + 1, 2);
  if (dec === '00') {
    //当小数点后为00时 去掉小数部分
    return sizeStr.substring(0, len) + sizeStr.substr(len + 3, 2);
  }
  return sizeStr;
}

export function minToHour(min: number) {
  let s = (min / 60).toFixed(2);
  let string = String(s);
  if (string.endsWith('.00')) {
    return string.replace('.00', '');
  }
  return string;
}
export function hideCode(str: string, frontLen: number, endLen: number) {
  let len = str.length - frontLen - endLen;
  let star = '';
  for (let i = 0; i < len; i++) {
    star += '*';
  }
  return str.substring(0, frontLen) + star + str.substring(str.length - endLen);
}
