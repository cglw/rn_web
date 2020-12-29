let lastClickTime = 0;
export function isFastDoubleClick(duration = 500) {
  let time = new Date().getTime();
  let timeD = time - lastClickTime;
  lastClickTime = time;
  return 0 < timeD && timeD < duration;
}
