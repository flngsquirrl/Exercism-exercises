export function steps(count: number): number {
  if (count % 1 !== 0 || count <= 0) {
    throw new Error('Only positive integers are allowed');
  }

  let result = 0;

  let value = count;
  while (value !== 1) {
    value = value % 2 === 0 ? value / 2 : value * 3 + 1;
    result++;
  }

  return result;
}
