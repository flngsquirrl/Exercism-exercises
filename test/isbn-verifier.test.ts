import { isValid } from '../src/isbn-verifier';

describe('ISBN Verifier', () => {
  test('is valid: numeric isbn', () => {
    expect(isValid('3598215088')).toBe(true);
  });

  test('is valid: isbn with separating dashes', () => {
    expect(isValid('3-598-21508-8')).toBe(true);
  });

  test('is valid: isbn with X check-digit', () => {
    expect(isValid('3-598-21507-X')).toBe(true);
  });

  test('is not valid: contains more digits', () => {
    expect(isValid('35982150882')).toBe(false);
  });

  test('is not valid: contains invalid characters', () => {
    expect(isValid('3a9b215088')).toBe(false);
  });
});
