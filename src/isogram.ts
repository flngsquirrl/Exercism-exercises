class IsogramAnalizer {
  static #CHARS_TO_SKIP = [' ', '-'];

  constructor(public readonly phrase: string) {}

  isIsogram(): boolean {
    const charSet: Set<string> = new Set();
    const characters = [...this.phrase.toLowerCase()];
    for (let i = 0; i < this.phrase.length; i++) {
      const character = characters[i];
      if (!IsogramAnalizer.#CHARS_TO_SKIP.includes(character)) {
        if (charSet.has(character)) {
          return false;
        } else {
          charSet.add(character);
        }
      }
    }
    return true;
  }
}

export function isIsogram(phrase: string): boolean {
  return new IsogramAnalizer(phrase).isIsogram();
}
