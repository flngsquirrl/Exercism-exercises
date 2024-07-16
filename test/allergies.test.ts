import { Allergies, ALLERGENS } from '../src/allergies';

describe('Allergies', () => {
  test('has no allergies', () => {
    const allergies = new Allergies(0);
    expect(allergies.list()).toEqual([]);
  });

  test('allergic to eggs', () => {
    const allergies = new Allergies(1);
    expect(allergies.allergicTo('eggs')).toBe(true);
    expect(allergies.list()).toEqual(['eggs']);
  });

  test('allergic to eggs and cats', () => {
    const allergies = new Allergies(129);
    expect(allergies.allergicTo('eggs')).toBe(true);
    expect(allergies.allergicTo('cats')).toBe(true);
    expect(allergies.list()).toEqual(['eggs', 'cats']);
  });

  test('allergic to strawberries, chocolate and pollen', () => {
    const allergies = new Allergies(104);
    expect(allergies.allergicTo('strawberries')).toBe(true);
    expect(allergies.allergicTo('chocolate')).toBe(true);
    expect(allergies.allergicTo('pollen')).toBe(true);
    expect(allergies.list()).toEqual(['strawberries', 'chocolate', 'pollen']);
  });

  test('allergic to everything', () => {
    const allergies = new Allergies(255);
    const expected = ALLERGENS;
    expect(allergies.list()).toEqual(expected);
  });

  test('skip unknows allergens in scope', () => {
    const allergies = new Allergies(513);
    expect(allergies.allergicTo('eggs')).toBe(true);
    expect(allergies.list()).toEqual(['eggs']);
  });
});
