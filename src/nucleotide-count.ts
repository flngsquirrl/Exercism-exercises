const VALID_SEQUENCE = /^[ACGT]+$/;

export const NUCLEOTIDES = ['A', 'C', 'G', 'T'] as const;
export type Nucleotide = (typeof NUCLEOTIDES)[number];

export type NucleotideCounter = {
  [nucleotide in Nucleotide]: number;
};

function isNucleotide(value: string): value is Nucleotide {
  return (NUCLEOTIDES as readonly string[]).includes(value);
}

export function nucleotideCounts(input: string): NucleotideCounter {
  if (input) {
    const match = input.match(VALID_SEQUENCE);
    if (!match) {
      throw new Error('Invalid nucleotide in strand.');
    }
  }

  const result: NucleotideCounter = {
    A: 0,
    C: 0,
    G: 0,
    T: 0
  };
  [...input].forEach(nucleotide => {
    if (isNucleotide(nucleotide)) {
      result[nucleotide] = result[nucleotide] += 1;
    }
  });
  return result;
}
