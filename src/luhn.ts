const VALID_CHARACTERS = /^[0-9\s]+$/;
const WHITESPACES = /\s/g;

export default function valid(digitString: string): boolean {
  if (!VALID_CHARACTERS.test(digitString)) {
    return false;
  }

  const input = digitString.replaceAll(WHITESPACES, '');
  const digits = [...input].map(Number);

  const length = digits.length;
  if (length <= 1) {
    return false;
  }

  for (let i = 2; i <= length; i += 2) {
    const index = digits.length - i;
    const doubled = digits[index] * 2;
    digits[index] = doubled > 9 ? doubled - 9 : doubled;
  }

  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return sum % 10 === 0;
}
