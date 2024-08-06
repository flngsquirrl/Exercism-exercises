class FoodChainElement {
  constructor(
    public name: string,
    public eats?: FoodChainElement,
    public details?: string,
    public exclamation?: string,
    public showReason: boolean = true
  ) {}

  verse(): string {
    const lines: string[] = [];
    lines.push(this.whoIsSwallowed);
    if (this.additionalInfo) {
      lines.push(this.additionalInfo);
    }
    lines.push(...this.reasons);
    return lines.join('\n') + '\n';
  }

  private get whoIsSwallowed(): string {
    return `I know an old lady who swallowed a ${this.name}.`;
  }

  private get additionalInfo(): string | null {
    if (this.exclamation) {
      return this.exclamation;
    } else if (this.details) {
      return `It ${this.details}.`;
    }
    return null;
  }

  private get reasons(): string[] {
    const reasons: string[] = [];
    if (this.showReason) {
      if (this.eats) {
        reasons.push(
          `She swallowed the ${this.name} to catch the ${this.eats.name}${
            this.eats.details ? ` that ${this.eats.details}` : ''
          }.`
        );
        reasons.push(...this.eats.reasons);
      } else {
        reasons.push(
          `I don't know why she swallowed the ${this.name}. Perhaps she'll die.`
        );
      }
    }
    return reasons;
  }
}

const fly = new FoodChainElement('fly');
const spider = new FoodChainElement(
  'spider',
  fly,
  'wriggled and jiggled and tickled inside her'
);
const bird = new FoodChainElement(
  'bird',
  spider,
  undefined,
  'How absurd to swallow a bird!'
);
const cat = new FoodChainElement(
  'cat',
  bird,
  undefined,
  'Imagine that, to swallow a cat!'
);
const dog = new FoodChainElement(
  'dog',
  cat,
  undefined,
  'What a hog, to swallow a dog!'
);
const goat = new FoodChainElement(
  'goat',
  dog,
  undefined,
  'Just opened her throat and swallowed a goat!'
);
const cow = new FoodChainElement(
  'cow',
  goat,
  undefined,
  "I don't know how she swallowed a cow!"
);
const horse = new FoodChainElement(
  'horse',
  cow,
  undefined,
  "She's dead, of course!",
  false
);

const FOOD_CHAIN: FoodChainElement[] = [
  fly,
  spider,
  bird,
  cat,
  dog,
  goat,
  cow,
  horse
];

export function verse(number: number): string {
  return FOOD_CHAIN[number - 1].verse();
}

export function verses(start: number, end: number): string {
  const lines: string[] = [];
  for (let i = start; i <= end; i++) {
    lines.push(verse(i));
  }
  return lines.join('\n');
}
