const PROTEINS = [
  'Methionine',
  'Phenylalanine',
  'Leucine',
  'Serine',
  'Tyrosine',
  'Cysteine',
  'Tryptophan'
] as const;
export type Protein = (typeof PROTEINS)[number];

const STOP_CODONS = ['UAA', 'UAG', 'UGA'];

const TRANSLATION_CODONS = [
  'AUG',
  'UUU',
  'UUC',
  'UUA',
  'UUG',
  'UAA',
  'UAG',
  'UAG',
  'UCU',
  'UCC',
  'UCA',
  'UCG',
  'UAU',
  'UAC',
  'UGU',
  'UGC',
  'UGG'
] as const;
type TranslationCodon = (typeof TRANSLATION_CODONS)[number];

type ProteinTranslationCodon = {
  [protein in Protein]: TranslationCodon[];
};

const PROTEIN_CODONS: ProteinTranslationCodon = {
  Methionine: ['AUG'],
  Phenylalanine: ['UUU', 'UUC'],
  Leucine: ['UUA', 'UUG'],
  Serine: ['UCU', 'UCC', 'UCA', 'UCG'],
  Tyrosine: ['UAU', 'UAC'],
  Cysteine: ['UGU', 'UGC'],
  Tryptophan: ['UGG']
};

type TranslationCodonProtein = {
  [codon in TranslationCodon]: Protein;
};

const CODON_PROTEINS: Partial<TranslationCodonProtein> = {};
Object.entries(PROTEIN_CODONS).forEach(([protein, codons]) => {
  codons.forEach(codon => (CODON_PROTEINS[codon] = protein as Protein));
});

function isTranslationCodon(value: string): value is TranslationCodon {
  return (TRANSLATION_CODONS as readonly string[]).includes(value);
}

export function translate(sequence: string) {
  const resultProteins = [];
  for (let i = 0; i < sequence.length; i += 3) {
    const codon = sequence.substring(i, i + 3);
    if (STOP_CODONS.includes(codon)) {
      break;
    }
    if (isTranslationCodon(codon)) {
      const protein = CODON_PROTEINS[codon];
      resultProteins.push(protein);
    } else {
      throw new Error('Invalid codon.');
    }
  }

  return resultProteins;
}
