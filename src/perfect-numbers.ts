const CATEGORIES = ['perfect', 'abundant', 'deficient'] as const;
export type NumberType = (typeof CATEGORIES)[number];

export function classify(value: number): NumberType {
  if (value <= 0) {
    throw new Error('Classification is only possible for natural numbers.');
  }

  const sum = getFactorsThatCount(value).reduce(
    (acc, factor) => acc + factor,
    0
  );
  if (value === sum) {
    return 'perfect';
  }

  if (value < sum) {
    return 'abundant';
  } else {
    return 'deficient';
  }
}

function getFactorsThatCount(value: number): number[] {
  const factors = [];
  if (value !== 1) {
    factors.push(1);
  }
  const sqrt = Math.floor(Math.sqrt(value));
  for (let i = 2; i <= sqrt; i++) {
    if (value % i === 0) {
      factors.push(i);

      const result = Math.floor(value / i);
      if (result !== i && value % result === 0) {
        factors.push(result);
      }
    }
  }
  return factors;
}
