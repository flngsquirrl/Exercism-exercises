import valid from '../src/luhn';

describe('Luhn', () => {
  describe('invalid input', () => {
    test('empty string', () => {
      expect(valid('')).toBe(false);
    });

    test('single character', () => {
      expect(valid('1')).toBe(false);
    });

    test('non-digit', () => {
      expect(valid('a')).toBe(false);
    });

    test('digits with with non-digits', () => {
      expect(valid('123a')).toBe(false);
    });
  });

  describe('valid input', () => {
    test('valid credit card number', () => {
      expect(valid('4539 1488 0343 6467')).toBe(true);
    });

    test('invalid credit card number', () => {
      expect(valid('8273 1232 7352 0569')).toBe(false);
    });
  });
});
