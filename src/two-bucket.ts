type ActionName = 'fill' | 'empty' | 'pour';
type BucketName = 'one' | 'two';

type BucketOperation = () => void;

interface TwoBucketProblem {
  moves: () => number;
  goalBucket: BucketName;
  otherBucket: number;
}

class Bucket {
  constructor(
    public readonly capacity: number,
    public level: number = 0,
    public readonly label: BucketName
  ) {}

  get isFull() {
    return this.capacity === this.level;
  }

  get isEmpty() {
    return this.level === 0;
  }

  fill() {
    this.level = this.capacity;
  }

  empty() {
    this.level = 0;
  }

  fillFrom(bucket: Bucket) {
    const freeVolume = this.capacity - this.level;
    const pourVolume = Math.min(bucket.level, freeVolume);
    this.level += pourVolume;
    bucket.level -= pourVolume;
  }
}

export class TwoBucket implements TwoBucketProblem {
  readonly goal: number;
  private readonly primary: Bucket;
  private readonly secondary: Bucket;
  readonly actions: ActionName[] = [];

  constructor(
    capacityOne: number,
    capacityTwo: number,
    goal: number,
    primary: BucketName
  ) {
    const bucketOne = new Bucket(capacityOne, 0, 'one');
    const bucketTwo = new Bucket(capacityTwo, 0, 'two');
    this.goal = goal;
    this.primary = primary === 'one' ? bucketOne : bucketTwo;
    this.secondary = primary === 'one' ? bucketTwo : bucketOne;
  }

  validateIsSolvable(): void {
    if (
      this.goal > this.primary.capacity &&
      this.goal > this.secondary.capacity
    ) {
      this.flagAsUnreachable();
    }

    const gcd = findCGD(this.primary.capacity, this.secondary.capacity);
    if (this.goal % gcd !== 0) {
      this.flagAsUnreachable();
    }
  }

  flagAsUnreachable(): never {
    throw new Error("The goal volume can't be reached");
  }

  private get goalReached(): boolean {
    return (
      this.primary.level === this.goal || this.secondary.level === this.goal
    );
  }

  private getAlgorithm(): BucketOperation[] {
    const operations: BucketOperation[] = [];
    operations.push(() => {
      if (this.primary.isEmpty) {
        this.primary.fill();
        this.actions.push('fill');
      }
    });
    operations.push(() => {
      if (this.secondary.capacity === this.goal) {
        this.secondary.fill();
        this.actions.push('fill');
      }
    });
    operations.push(() => {
      this.secondary.fillFrom(this.primary);
      this.actions.push('pour');
    });
    operations.push(() => {
      if (this.secondary.isFull) {
        this.secondary.empty();
        this.actions.push('empty');
      }
    });
    return operations;
  }

  private solve() {
    const operations = this.getAlgorithm();
    let i = 0;
    while (!this.goalReached) {
      const index = i++ % operations.length;
      operations[index]();
    }
  }

  moves(): number {
    this.validateIsSolvable();
    this.solve();
    return this.actions.length;
  }

  get goalBucket(): BucketName {
    return this.primary.level === this.goal
      ? this.primary.label
      : this.secondary.label;
  }

  get otherBucket(): number {
    return this.primary.level === this.goal
      ? this.secondary.level
      : this.primary.level;
  }
}

function findCGD(a: number, b: number): number {
  let absA = Math.abs(a);
  let absB = Math.abs(b);

  while (absB != 0) {
    [absA, absB] = [absB, absA % absB];
  }

  return absA;
}
