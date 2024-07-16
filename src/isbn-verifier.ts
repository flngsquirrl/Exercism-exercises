const ISBN_FORMAT = /^\d{1}-?\d{3}-?\d{5}-?[\d{1}|X]$/;

export function isValid(isbn: string): boolean {
  const match = isbn.match(ISBN_FORMAT);
  if (match) {
    const digital = isbn.replaceAll('-', '');
    let checkSum = 0;
    for (let i = 0; i < 9; i++) {
      const multiplier = 10 - i;
      checkSum += Number(digital[i]) * multiplier;
    }
    const checkDigit = digital[9] === 'X' ? 10 : Number(digital[9]);
    checkSum += checkDigit;

    return checkSum % 11 === 0;
  }

  return false;
}
