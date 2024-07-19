type Slice = number[];

export class Series {
  #digits: number[];

  constructor(public readonly series: string) {
    if (!series) {
      throw new Error('series cannot be empty');
    }
    this.#digits = Series.getDigits(series);
  }

  private static getDigits(input: string): number[] {
    return [...input].map(Number);
  }

  slices(sliceLength: number): Slice[] {
    this.validateSliceLength(sliceLength);
    const lastStartIndex = this.#digits.length - sliceLength;
    const result: Slice[] = [];
    for (let i = 0; i <= lastStartIndex; i++) {
      const slice: number[] = [];
      for (let j = 0; j < sliceLength; j++) {
        slice.push(this.#digits[i + j]);
      }
      result.push(slice);
    }
    return result;
  }

  private validateSliceLength(sliceLength: number) {
    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero');
    }
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative');
    }
    if (sliceLength > this.#digits.length) {
      throw new Error('slice length cannot be greater than series length');
    }
  }
}
