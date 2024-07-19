export class Anagram {
  #charFrequencies: number[];
  #lowerCasedInput: string;

  static #A_CHAR_CODE = 'a'.charCodeAt(0);
  static #NUMBER_OF_CHARS = 'z'.charCodeAt(0) - Anagram.#A_CHAR_CODE;

  constructor(public readonly input: string) {
    this.#lowerCasedInput = input.toLowerCase();
    this.#charFrequencies = Anagram.getFrequencies(this.#lowerCasedInput);
  }

  private static getFrequencies(input: string) {
    const frequencies: number[] = new Array(this.#NUMBER_OF_CHARS);
    frequencies.fill(0);
    [...input].forEach(character => {
      const index = character.charCodeAt(0) - this.#A_CHAR_CODE;
      frequencies[index] += 1;
    });
    return frequencies;
  }

  public matches(...potentials: string[]): string[] {
    const anagrams: string[] = [];
    const length = this.input.length;

    potentials.forEach(potential => {
      if (potential.length === length) {
        const analysed = potential.toLowerCase();
        if (analysed !== this.#lowerCasedInput) {
          let isAnagram = true;
          const frequencies = Anagram.getFrequencies(analysed);
          for (let i = 0; i < Anagram.#NUMBER_OF_CHARS; i++) {
            if (this.#charFrequencies[i] !== frequencies[i]) {
              isAnagram = false;
              break;
            }
          }
          if (isAnagram) {
            anagrams.push(potential);
          }
        }
      }
    });

    return anagrams;
  }
}
