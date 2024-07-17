export function reverse(input: string): string {
  //return [...input].reverse().join('');

  const array = [...input];
  const length = input.length;
  const midIndex = Math.floor(input.length / 2) - 1;
  for (let i = 0; i <= midIndex; i++) {
    [array[i], array[length - i - 1]] = [array[length - i - 1], array[i]];
  }
  return array.join('');
}
