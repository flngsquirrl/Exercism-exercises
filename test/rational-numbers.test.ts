import { Rational } from '../src/rational-numbers';

function assertRational(
  actual: Rational,
  expectedNumerator: number,
  expectedDenominator: number
): void {
  expect(actual.numerator).toEqual(expectedNumerator);
  expect(actual.denominator).toEqual(expectedDenominator);
}

describe('Rational Numbers', () => {
  it('reduce a positive rational', () => {
    const rational = new Rational(2, 4);
    rational.reduce();
    assertRational(rational, 1, 2);
  });

  it('reduce a negative rational', () => {
    const rational = new Rational(-2, 4);
    rational.reduce();
    assertRational(rational, -1, 2);
  });

  it('reduce a rational with a negative denominator', () => {
    const rational = new Rational(2, -4);
    rational.reduce();
    assertRational(rational, -1, 2);
  });

  it('add two rationals', () => {
    const actual = new Rational(3, 4).add(new Rational(1, 4));
    assertRational(actual, 1, 1);
  });

  it('subtract two rationals', () => {
    const actual = new Rational(3, 4).sub(new Rational(1, 4));
    assertRational(actual, 1, 2);
  });

  it('multiply two rationals', () => {
    const actual = new Rational(3, 4).mul(new Rational(1, 4));
    assertRational(actual, 3, 16);
  });

  it('make a rational absolute', () => {
    const actual = new Rational(-3, 4).abs();
    assertRational(actual, 3, 4);
  });

  it('raise a real number to a positive rational number', () => {
    const actual = new Rational(4, 3).expreal(8);
    expect(actual).toBeCloseTo(16.0, 10);
  });
});
