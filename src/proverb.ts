type ObjectPair = {
  first: string;
  second: string;
};

class Proverb {
  private static FIRST_PLACEHOLDER = '{first}';
  private static SECOND_PLACEHOLDER = '{second}';
  private static TEMPLATE = `For want of a {first} the {second} was lost.`;

  private static TARGET_PLACEHOLDER = '{target}';
  private static FINISHING_LINE = 'And all for the want of a {target}.';

  public readonly objects: string[];
  private lines: string[] = [];

  constructor(...objects: string[]);
  constructor(objects: string[]);
  constructor(arg: string | string[]) {
    if (typeof arg === 'string') {
      this.objects = [arg];
    } else {
      this.objects = arg;
    }
    this.prepareLines();
  }

  prepareLines(): void {
    for (const pair of this.objectPairs()) {
      this.lines.push(this.generateLine(pair));
    }
    if (this.objects.length > 0) {
      this.lines.push(this.generateFinishingLine());
    }
  }

  private generateLine(pair: ObjectPair): string {
    return Proverb.TEMPLATE.replace(
      Proverb.FIRST_PLACEHOLDER,
      pair.first
    ).replace(Proverb.SECOND_PLACEHOLDER, pair.second);
  }

  private generateFinishingLine(): string {
    return Proverb.FINISHING_LINE.replace(
      Proverb.TARGET_PLACEHOLDER,
      this.objects[0]
    );
  }

  private *objectPairs(): Generator<ObjectPair> {
    for (let i = 0; i < this.objects.length - 1; i++) {
      yield { first: this.objects[i], second: this.objects[i + 1] };
    }
  }

  get oneLine(): string {
    return this.lines.join('\n');
  }
}

export function proverb(...objects: string[]): string {
  return new Proverb(objects).oneLine;
}

// here is a nice tail recursive solution
// const generateLines = (
//   head: string,
//   tail: string[],
//   lines: string[] = []
// ): string[] => {
//   if (tail.length === 0) {
//     return lines;
//   } else {
//     const [next, ...rest] = tail;
//     lines.push(`For want of a ${head} the ${next} was lost.`);
//     return generateLines(next, rest, lines);
//   }
// };
// export const proverb = (...items: string[]): string => {
//   const [head, ...tail] = items;
//   const lines = [
//     ...generateLines(head, tail),
//     `And all for the want of a ${head}.`,
//   ];
//   return lines.join("\n");
// };
