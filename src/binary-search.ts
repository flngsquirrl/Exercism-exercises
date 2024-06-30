export function find(haystack: number[], needle: number): number | never {
  let start = 0;
  let end = haystack.length - 1;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midValue = haystack[mid];

    if (midValue === needle) {
      return mid;
    } else if (midValue > needle) {
      end = mid - 1;
    } else if (midValue < needle) {
      start = mid + 1;
    }
  }

  throw new Error('Value not in array');
}
