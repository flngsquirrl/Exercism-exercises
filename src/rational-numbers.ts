interface MathRational {
  get numerator(): number;
  get denominator(): number;
}

function getGCD(a: number, b: number): number {
  let absA = Math.abs(a);
  let absB = Math.abs(b);

  while (absB != 0) {
    [absA, absB] = [absB, absA % absB];
  }

  return absA;
}

export class Rational implements MathRational {
  #numerator: number;
  #denominator: number;

  constructor(numerator: number, denominator: number) {
    this.#numerator = numerator;
    this.#denominator = denominator;
    this.reduce();
  }

  get numerator(): number {
    return this.#numerator;
  }

  get denominator(): number {
    return this.#denominator;
  }

  add(number: Rational): Rational {
    const numerator =
      this.#numerator * number.#denominator +
      number.numerator * this.#denominator;
    const denominator = this.denominator * number.#denominator;
    return new Rational(numerator, denominator);
  }

  sub(number: Rational): Rational {
    const numerator =
      this.#numerator * number.#denominator -
      number.numerator * this.#denominator;
    const denominator = this.denominator * number.#denominator;
    return new Rational(numerator, denominator);
  }

  mul(number: Rational): Rational {
    const numerator = this.#numerator * number.#numerator;
    const denominator = this.#denominator * number.#denominator;
    return new Rational(numerator, denominator);
  }

  div(number: Rational) {
    const numerator = this.#numerator * number.#denominator;
    const denominator = this.#denominator * number.#numerator;
    return new Rational(numerator, denominator);
  }

  abs(): Rational {
    const numerator = Math.abs(this.#numerator);
    const denominator = Math.abs(this.#denominator);
    return new Rational(numerator, denominator);
  }

  exprational(realNumber: number): Rational {
    const numerator =
      realNumber > 0
        ? this.#numerator ** realNumber
        : this.#denominator ** (realNumber * -1);
    const denominator =
      realNumber > 0
        ? this.#denominator ** realNumber
        : this.#numerator ** (realNumber * -1);
    return new Rational(numerator, denominator);
  }

  expreal(realNumber: number) {
    return Math.pow(realNumber ** this.#numerator, 1 / this.#denominator);
  }

  reduce(): Rational {
    const CGD = getGCD(this.#numerator, this.#denominator);
    this.#numerator = this.#numerator / CGD;
    this.#denominator = this.#denominator / CGD;

    if (this.#denominator < 0) {
      this.#numerator *= -1;
      this.#denominator *= -1;
    }

    return this;
  }
}
