const ROMAN_LETTERS = ['M', 'D', 'C', 'L', 'X', 'V', 'I'] as const;
type RomanLetter = (typeof ROMAN_LETTERS)[number];

type ArabicToRomanRules = {
  [arabic: number]: RomanLetter;
};

const ARABIC_TO_ROMAN_RULES: ArabicToRomanRules = {
  1000: 'M',
  500: 'D',
  100: 'C',
  50: 'L',
  10: 'X',
  5: 'V',
  1: 'I'
};

const MAX_ARABIC_NUMBER = 3999;

export const toRoman = (input: number): string => {
  validateInput(input);

  return convertToRoman(input, '');
};

function convertToRoman(number: number, resultAcc: string): string {
  if (number === 0) {
    return resultAcc;
  }

  const inputString = number.toString();
  const digit = Number(inputString[0]);
  const positionFactor = 10 ** (inputString.length - 1);
  const value = digit * positionFactor;

  const result = resultAcc + digitToRoman(digit, positionFactor);
  return convertToRoman(number - value, result);
}

function digitToRoman(digit: number, positionFactor: number): string {
  if (digit === 4) {
    return (
      digitToRoman(1, positionFactor) + digitToRoman(digit + 1, positionFactor)
    );
  }

  if (digit === 9) {
    return (
      digitToRoman(1, positionFactor) + digitToRoman(1, positionFactor * 10)
    );
  }

  if (digit <= 3) {
    const letter = ARABIC_TO_ROMAN_RULES[positionFactor];
    return letter.repeat(digit);
  }

  if (digit >= 5) {
    const mainLetter = ARABIC_TO_ROMAN_RULES[5 * positionFactor];
    return mainLetter + digitToRoman(digit - 5, positionFactor);
  }

  return '';
}

function validateInput(input: number): void {
  if (input > MAX_ARABIC_NUMBER) {
    throw new Error('Max input number is 3999');
  }

  if (input < 1) {
    throw new Error('Input number must be greater than 0');
  }
}
