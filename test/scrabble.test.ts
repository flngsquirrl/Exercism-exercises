import { score } from '../src/scrabble';

describe('Scrabble', () => {
  describe('Simple words', () => {
    test('lower case word score', () => {
      expect(score('word')).toBe(8);
    });
    test('upper case word score', () => {
      expect(score('WORD')).toBe(8);
    });
    test('mixed case word score', () => {
      expect(score('WorD')).toBe(8);
    });
  });

  describe('Edge cases', () => {
    test('empty word to throw', () => {
      expect(() => score('')).toThrow('This is not a word.');
    });
    test('word with non alphabethical characters to throw', () => {
      expect(() => score('word_')).toThrow('This is not a word.');
    });
  });
});
