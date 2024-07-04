const WORD_REGEX = /\b(?:\w+'?\w+|\w+)\b/gi;

export function count(input: string): Map<string, number> {
  const map: Map<string, number> = new Map();
  input.match(WORD_REGEX)?.forEach(word => {
    const lowerCased = word.toLowerCase();
    const count = map.get(lowerCased) ?? 0;
    map.set(lowerCased, count + 1);
  });
  return map;
}
