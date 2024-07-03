const NON_WORD_CHARACTERS = /[^a-zA-Z\d']+/g;
const FALSE_CONTRACTION = / '|' |^'|'$/g;
const SEPARATOR = ' ';

export function count(input: string): Map<string, number> {
  const normalized = input
    .replace(NON_WORD_CHARACTERS, SEPARATOR)
    .replace(FALSE_CONTRACTION, SEPARATOR)
    .trim()
    .toLowerCase();
  const map: Map<string, number> = new Map();
  normalized.split(SEPARATOR).forEach(word => {
    const count = map.get(word) ?? 0;
    map.set(word, count + 1);
  });
  return map;
}
