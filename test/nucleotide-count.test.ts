import {
  nucleotideCounts,
  Nucleotide,
  NucleotideCounter,
  NUCLEOTIDES
} from '../src/nucleotide-count';

type NucleotideCount = [Nucleotide, number];

function prepareExpected(...counts: NucleotideCount[]): NucleotideCounter {
  const result: NucleotideCounter = { A: 0, C: 0, G: 0, T: 0 };
  counts.forEach(count => {
    const [nucleotide, counter] = count;
    result[nucleotide] = counter;
  });
  return result;
}

describe('Nucleotide count', () => {
  describe('Single nucleotide', () => {
    test.each([
      'A' as Nucleotide,
      'C' as Nucleotide,
      'G' as Nucleotide,
      'T' as Nucleotide
    ])('count a single %s nucleotide', nucleotide => {
      const expected = prepareExpected([nucleotide, 1]);
      expect(nucleotideCounts(nucleotide)).toEqual(expected);
    });
  });

  describe('Repeated nucleotide', () => {
    test.each([
      ['A' as Nucleotide, 2],
      ['C' as Nucleotide, 3],
      ['G' as Nucleotide, 4],
      ['T' as Nucleotide, 5]
    ])('count %s nucleotide repeated %i times', (nucleotide, count) => {
      const expected = prepareExpected([nucleotide, count]);
      const input = nucleotide.repeat(count);
      expect(nucleotideCounts(input)).toEqual(expected);
    });
  });

  describe('Mixed nucleotides', () => {
    test.each([
      { input: 'ACGT', A: 1, C: 1, G: 1, T: 1 },
      { input: 'ACGGCACT', A: 2, C: 3, G: 2, T: 1 }
    ])('count nucleotides in $input', params => {
      const expectedCounts: NucleotideCount[] = [];
      NUCLEOTIDES.forEach(nucleotide => {
        expectedCounts.push([nucleotide, params[nucleotide]]);
      });
      const expected = prepareExpected(...expectedCounts);
      expect(nucleotideCounts(params.input)).toEqual(expected);
    });
  });

  describe('Edge cases', () => {
    test('empty input', () => {
      const expected = prepareExpected();
      expect(nucleotideCounts('')).toEqual(expected);
    });

    test('invalid characters in input', () => {
      expect(() => nucleotideCounts('ADSSCTG')).toThrow(
        'Invalid nucleotide in strand.'
      );
    });
  });
});
