import { translate, Protein } from '../src/protein-translation';

describe('Protein translation', () => {
  describe('Individual protein', () => {
    test('Methionine RNA sequence', () => {
      const expected: Protein[] = ['Methionine'];
      expect(translate('AUG')).toEqual(expected);
    });

    test('Tryptophan RNA sequence', () => {
      const expected: Protein[] = ['Tryptophan'];
      expect(translate('UGG')).toEqual(expected);
    });

    test('Serine RNA sequence 2', () => {
      const expected: Protein[] = ['Serine'];
      expect(translate('UCC')).toEqual(expected);
    });

    test('STOP RNA sequence 2', () => {
      const expected: Protein[] = [];
      expect(translate('UAG')).toEqual(expected);
    });
  });

  describe('Multiple Proteins', () => {
    test('sequence translation', () => {
      const expected: Protein[] = ['Methionine', 'Phenylalanine', 'Leucine'];
      expect(translate('AUGUUUUUA')).toEqual(expected);
    });

    test('sequence translation with stop codon', () => {
      const expected: Protein[] = ['Methionine'];
      expect(translate('AUGUAAUUUUUA')).toEqual(expected);
    });

    test('unknown codon throws', () => {
      expect(() => translate('AUGUUUAAA')).toThrow('Invalid codon.');
    });
  });
});
