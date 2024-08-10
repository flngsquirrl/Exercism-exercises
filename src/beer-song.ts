type CountDescriptor<T> = {
  one: T;
  many: string;
};

type Named<T> = {
  name: T;
};

class NamedCountDescriptor<T> implements CountDescriptor<T>, Named<T> {
  get name(): T {
    return this.one;
  }

  constructor(
    public one: T,
    public many: string
  ) {}
}

type ContainerName = 'bottle' | 'cup';
class Container extends NamedCountDescriptor<ContainerName> {}
class Bottle extends Container {
  constructor() {
    super('bottle', 'bottles');
  }
}

type SubstanceName = 'beer' | 'milk';
class Substance implements Named<SubstanceName> {
  constructor(public name: SubstanceName) {}
}

class Beer extends Substance {
  constructor() {
    super('beer');
  }
}

class Milk extends Substance {
  constructor() {
    super('milk');
  }
}

const TARGET: CountDescriptor<string> = {
  one: 'it',
  many: 'one'
};

type PlaceName = 'wall' | 'table';

class Song {
  constructor(
    private substance: Substance,
    private container: Container,
    private place: PlaceName
  ) {}

  static GO_TO_STORE = 'Go to the store and buy some more';
  static NO_MORE = 'no more';

  verse(numberOfObjects: number): string {
    const countNext = numberOfObjects === 0 ? 99 : numberOfObjects - 1;
    const items = this.getContainersOfSubstance(numberOfObjects);
    const itemsNext = this.getContainersOfSubstance(countNext);
    return `${capitalize(this.getItemstInPlace(items))}, ${items}.\n${this.whatToDo(numberOfObjects)}, ${this.getItemstInPlace(itemsNext)}.\n`;
  }

  sing(start: number, end: number = 0): string {
    return Array.from(Array(start - end + 1).keys(), (_, i) =>
      this.verse(start - i)
    ).join('\n');
  }

  private countContainers(number: number): string {
    switch (number) {
      case 0:
        return `${Song.NO_MORE} ${this.container.many}`;
      case 1:
        return `1 ${this.container.one}`;
      default:
        return `${number} ${this.container.many}`;
    }
  }

  private whatToDo(number: number): string {
    const target = number === 1 ? TARGET.one : TARGET.many;

    switch (number) {
      case 0:
        return Song.GO_TO_STORE;
      default:
        return `Take ${target} down and pass it around`;
    }
  }

  private getItemstInPlace(items: string): string {
    return `${items} on the ${this.place}`;
  }

  private getContainersOfSubstance(number: number): string {
    return `${this.countContainers(number)} of ${this.substance.name}`;
  }
}

const BEER_SONG = new Song(new Beer(), new Bottle(), 'wall');
const MILK_SONG = new Song(new Milk(), new Bottle(), 'table');

const MAX_BOTTLES_NUMBER = 99;

function verse(index: number): string {
  return BEER_SONG.verse(index);
}

function sing(
  initialBottlesCount: number = MAX_BOTTLES_NUMBER,
  takeDownCount?: number
): string {
  return MILK_SONG.sing(initialBottlesCount, takeDownCount);
}

function capitalize(string: string): string {
  if (string.length === 0) return string;
  return string[0].toUpperCase() + string.slice(1);
}

export { Song, verse, sing };

console.log(sing(3));
