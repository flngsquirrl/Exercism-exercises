type Options = {
  minFactor?: number;
  maxFactor?: number;
  sum: number;
};

export function triplets(options: Options): Triplet<number>[] {
  const { minFactor = 1, maxFactor, sum } = options;
  const triplets: Triplet<number>[] = [];
  for (let a = minFactor; a < sum / 3; a++) {
    for (let b = a + 1; b < (sum - a) / 2; b++) {
      const c = sum - a - b;
      if (maxFactor && c > maxFactor) {
        continue;
      }
      if (a ** 2 + b ** 2 === c ** 2) {
        triplets.push(new Triplet(a, b, c));
      }
    }
  }
  return triplets;
}

export class Triplet<T> {
  private a: T;
  private b: T;
  private c: T;

  constructor(a: T, b: T, c: T) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  toArray(): [T, T, T] {
    return [this.a, this.b, this.c];
  }
}
