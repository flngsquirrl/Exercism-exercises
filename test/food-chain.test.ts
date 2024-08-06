import { verse, verses } from '../src/food-chain';

describe('Food Chain', () => {
  it('fly', () => {
    const expected = `I know an old lady who swallowed a fly.
I don't know why she swallowed the fly. Perhaps she'll die.
`;
    expect(verse(1)).toEqual(expected);
  });
});
