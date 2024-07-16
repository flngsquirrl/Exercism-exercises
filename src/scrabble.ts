const SCORE_TO_LETTER = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

interface LetterScore {
  [key: string]: number;
}

const LETTER_TO_SCORE: LetterScore = {};
Object.entries(SCORE_TO_LETTER).map(([key, values]) => {
  values.forEach(value => (LETTER_TO_SCORE[value] = Number(key)));
});

const VALID_WORD_REGEX = /^[a-zA-Z]+$/;

export function score(word: string) {
  const match = word.match(VALID_WORD_REGEX);
  if (!match) {
    throw new Error('This is not a word.');
  }
  return [...word.toUpperCase()].reduce((acc, character) => {
    const score = LETTER_TO_SCORE[character];
    return score ? acc + score : acc;
  }, 0);
}
