import { parse } from '../src/acronym';

describe('Acronym', () => {
  test('title cased phrase', () => {
    expect(parse('As Soon As Possible')).toBe('ASAP');
  });

  test('mixed cased phrase', () => {
    expect(parse('Better than Ever')).toBe('BTE');
  });

  test('phrase with puctuation', () => {
    expect(parse('Side note: be careful')).toBe('SNBC');
  });

  test('phrase with hyphen', () => {
    expect(parse('Liquid-crystal display')).toBe('LCD');
  });

  test('phrase with mixed-cased words', () => {
    expect(parse('HyperText Markup Language')).toBe('HTML');
  });
});
