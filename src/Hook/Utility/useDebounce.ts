export default function useDebounce(
  func: (...args: any[]) => void,
  wait: number,
): (...args: any[]) => void {
  let timeout: NodeJS.Timeout | undefined;

  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
