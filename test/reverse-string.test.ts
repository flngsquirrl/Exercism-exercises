import { reverse } from '../src/reverse-string';

describe('Reverse string', () => {
  test('reverse stressed', () => {
    expect(reverse('stressed')).toBe('desserts');
  });

  test('reverse strops', () => {
    expect(reverse('strops')).toBe('sports');
  });

  test('reverse racecar', () => {
    expect(reverse('racecar')).toBe('racecar');
  });

  test('reverse empty string', () => {
    expect(reverse('')).toBe('');
  });
});
