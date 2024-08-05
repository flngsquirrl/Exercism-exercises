const PATTERNS_AND_REPLACEMENTS = new Map<RegExp, string>();

const PIG_ENDING = 'ay';

const VOWELS = '[aeiou]';
const CONSONANTS = '[bcdfghjklmnpqrstvwxyz]';

const PATTERN1 = new RegExp(`\\b(?<word>(?:${VOWELS}|xr|yt)\\w*)\\b`);
const PATTERN2 = new RegExp(
  `\\b((?<cons>${CONSONANTS}{1,})(?<rest>\\w*))\\b`,
  'g'
);
const PATTTERN3 = new RegExp(`\\b(?<consqu>${CONSONANTS}*qu)(?<rest>\\w*)\\b`);
const PATTERN4 = new RegExp(`\\b(?<cons>${CONSONANTS}+)(?<rest>y\\w*)\\b`);

PATTERNS_AND_REPLACEMENTS.set(PATTERN1, `$<word>${PIG_ENDING}`);
PATTERNS_AND_REPLACEMENTS.set(PATTERN4, `$<rest>$<cons>${PIG_ENDING}`);
PATTERNS_AND_REPLACEMENTS.set(PATTTERN3, `$<rest>$<consqu>${PIG_ENDING}`);
PATTERNS_AND_REPLACEMENTS.set(PATTERN2, `$<rest>$<cons>${PIG_ENDING}`);

export function translate(input: string): string {
  const words = input.split(/\s+/);
  const results = new Array(words.length);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (const [pattern, replacement] of PATTERNS_AND_REPLACEMENTS.entries()) {
      if (word.match(pattern)) {
        const result = word.replace(pattern, replacement);
        results[i] = result;
        break;
      }
    }
  }

  return results.join(' ');
}
