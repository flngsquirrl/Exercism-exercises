// tests based on those provided on exercism.org

import { square, total } from '../src/grains';

describe('returns the number of grains on the square', () => {
  it('1', () => {
    const expected = 1n;
    expect(square(1)).toBe(expected);
  });
  it('2', () => {
    const expected = 2n;
    expect(square(2)).toBe(expected);
  });
  it('3', () => {
    const expected = 4n;
    expect(square(3)).toBe(expected);
  });
  it('4', () => {
    const expected = 8n;
    expect(square(4)).toBe(expected);
  });
  it('16', () => {
    const expected = 32768n;
    expect(square(16)).toBe(expected);
  });
  it('32', () => {
    const expected = 2147483648n;
    expect(square(32)).toBe(expected);
  });
  it('64', () => {
    const expected = 9223372036854775808n;
    expect(square(64)).toBe(expected);
  });
  it('square 0 raises an exception', () => {
    expect(() => square(0)).toThrow();
  });
  it('negative square raises an exception', () => {
    expect(() => square(-1)).toThrow();
  });
  it('square greater than 64 raises an exception', () => {
    expect(() => square(65)).toThrow();
  });
});
describe('returns the total number of grains on the board', () => {
  it('total', () => {
    const expected = 18446744073709551615n;
    expect(total()).toBe(expected);
  });
});
