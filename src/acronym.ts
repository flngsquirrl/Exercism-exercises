const INVALID_CHARACTERS = /[^\w -]/;
const SEPARATORS = /[ -]|(?<=[a-z])(?=[A-Z])/;

export function parse(phrase: string): string {
  const validInput = phrase.replace(INVALID_CHARACTERS, '');
  return validInput
    .split(SEPARATORS)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}
