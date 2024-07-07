const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];
const NUMBERS = [...'0123456789'];
const ENCODING_BLOCK_LENGTH = 5;
const ENCODING_BLOCK_SEPARATOR = ' ';

export function encode(plainText: string): string {
  const inverted = invert(plainText);
  return insertSpace(inverted, ENCODING_BLOCK_LENGTH);
}

function invert(input: string): string {
  const inverted = [...input.toLowerCase()].reduce((result, character) => {
    const encoded = invertCharacter(character);
    if (encoded) {
      result += encoded;
    }
    return result;
  }, '');

  return inverted;
}

function insertSpace(input: string, blockLength: number) {
  const regexp = new RegExp(`(.{${blockLength}})`, 'g');
  return input.replace(regexp, '$1' + ENCODING_BLOCK_SEPARATOR).trim();
}

function invertCharacter(character: string): string | undefined {
  if (NUMBERS.includes(character)) {
    return character;
  }

  const index = ALPHABET.indexOf(character);
  if (index >= 0) {
    return ALPHABET[ALPHABET.length - 1 - index];
  }

  return undefined;
}

export function decode(cipherText: string): string {
  const nonSpaced = cipherText.replace(ENCODING_BLOCK_SEPARATOR, '');
  return invert(nonSpaced);
}
