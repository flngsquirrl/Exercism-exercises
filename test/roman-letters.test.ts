import { toRoman } from '../src/roman-numbers';

describe('Roman Letters', () => {
  describe('numbers with no repetition and subtraction', () => {
    test('1', () => {
      expect(toRoman(1)).toBe('I');
    });

    test('6', () => {
      expect(toRoman(6)).toBe('VI');
    });

    test('11', () => {
      expect(toRoman(11)).toBe('XI');
    });

    test('16', () => {
      expect(toRoman(16)).toBe('XVI');
    });

    test('51', () => {
      expect(toRoman(51)).toBe('LI');
    });

    test('61', () => {
      expect(toRoman(61)).toBe('LXI');
    });

    test('101', () => {
      expect(toRoman(101)).toBe('CI');
    });

    test('161', () => {
      expect(toRoman(161)).toBe('CLXI');
    });

    test('501', () => {
      expect(toRoman(501)).toBe('DI');
    });

    test('561', () => {
      expect(toRoman(561)).toBe('DLXI');
    });

    test('1561', () => {
      expect(toRoman(1561)).toBe('MDLXI');
    });
  });

  describe('numbers with repetition and no subtraction', () => {
    test('3', () => {
      expect(toRoman(3)).toBe('III');
    });

    test('23', () => {
      expect(toRoman(23)).toBe('XXIII');
    });

    test('302', () => {
      expect(toRoman(302)).toBe('CCCII');
    });

    test('833', () => {
      expect(toRoman(833)).toBe('DCCCXXXIII');
    });
  });

  describe('numbers with subtraction and no repetition', () => {
    test('4', () => {
      expect(toRoman(4)).toBe('IV');
    });

    test('14', () => {
      expect(toRoman(14)).toBe('XIV');
    });

    test('19', () => {
      expect(toRoman(19)).toBe('XIX');
    });

    test('940', () => {
      expect(toRoman(940)).toBe('CMXL');
    });
  });

  describe('numbers with subtraction and repetition', () => {
    test('399', () => {
      expect(toRoman(399)).toBe('CCCXCIX');
    });

    test('1996', () => {
      expect(toRoman(1996)).toBe('MCMXCVI');
    });

    test('3999', () => {
      expect(toRoman(3999)).toBe('MMMCMXCIX');
    });
  });

  describe('edge cases', () => {
    test('negative number: -2', () => {
      expect(() => toRoman(-2)).toThrow();
    });

    test('too big number: 4000', () => {
      expect(() => toRoman(4000)).toThrow();
    });
  });
});
