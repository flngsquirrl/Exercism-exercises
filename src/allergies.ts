export const ALLERGENS = [
  'eggs',
  'peanuts',
  'shellfish',
  'strawberries',
  'tomatoes',
  'chocolate',
  'pollen',
  'cats'
] as const;
export type Allergen = (typeof ALLERGENS)[number];

interface AllergenMasks {
  [mask: number]: Allergen;
}

const ALLERGEN_MASKS: AllergenMasks = {
  1: 'eggs',
  2: 'peanuts',
  4: 'shellfish',
  8: 'strawberries',
  16: 'tomatoes',
  32: 'chocolate',
  64: 'pollen',
  128: 'cats'
};

export class Allergies {
  readonly allergens: Allergen[];

  constructor(public readonly allergenIndex: number) {
    this.allergens = this.testForAllergens();
  }

  private testForAllergens(): Allergen[] {
    const list: Allergen[] = [];
    for (const mask in ALLERGEN_MASKS) {
      if (Number(mask) & this.allergenIndex) {
        list.push(ALLERGEN_MASKS[mask]);
      }
    }
    return list;
  }

  public list(): Allergen[] {
    return new Array(...this.allergens);
  }

  public allergicTo(allergen: Allergen): boolean {
    return this.allergens.includes(allergen);
  }
}
