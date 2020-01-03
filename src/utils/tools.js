export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  const len = arr.length;
  while (++i < len) {
    const item = arr[i];
    fn(item, i, arr);
  }
};
