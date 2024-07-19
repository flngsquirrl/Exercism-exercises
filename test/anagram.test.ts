import { Anagram } from '../src/anagram';

describe('Anagrams', () => {
  test('potentials are all anagrams', () => {
    const potentials = ['tones', 'notes', 'Seton'];
    const expected = potentials;
    expect(new Anagram('stone').matches(...potentials)).toEqual(expected);
  });

  test('initial word is excluded', () => {
    const expected = ['tones'];
    const potentials = ['stone', 'tones'];
    expect(new Anagram('stone').matches(...potentials)).toEqual(expected);
  });

  test('with mixed-case potentials', () => {
    const potentials = ['tOnes', 'NoTes', 'SEton'];
    const expected = potentials;
    expect(new Anagram('stone').matches(...potentials)).toEqual(expected);
  });

  test('subset is not an anagram', () => {
    const potentials = ['one'];
    expect(new Anagram('stone').matches(...potentials)).toEqual([]);
  });

  test('each letter is used exactly once', () => {
    const potentials = ['ttnes'];
    expect(new Anagram('stone').matches(...potentials)).toEqual([]);
  });
});
