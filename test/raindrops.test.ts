import { convert } from '../src/raindrops';

describe('Raindrops', () => {
  test('3 sounds Pling', () => {
    expect(convert(3)).toBe('Pling');
  });

  test('5 sounds Plang', () => {
    expect(convert(5)).toBe('Plang');
  });

  test('7 sounds Plong', () => {
    expect(convert(7)).toBe('Plong');
  });

  test('21 sounds PlingPl0ang', () => {
    expect(convert(21)).toBe('PlingPlong');
  });

  test('11 sounds 11', () => {
    expect(convert(11)).toBe('11');
  });
});
