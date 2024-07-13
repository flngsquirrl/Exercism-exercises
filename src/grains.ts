export const square = (index: number): bigint => {
  if (index < 1 || index > 64) {
    throw new Error('Not a valid chess square.');
  }

  return BigInt(2 ** (index - 1));
};

export const total = (): bigint => {
  let total: bigint = 0n;
  for (let i = 1; i <= 64; i++) {
    total += square(i);
  }
  return total;
};
