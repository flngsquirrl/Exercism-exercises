import { translate } from '../src/pig-latin';

describe('Pig Latin', () => {
  describe('Rule 1', () => {
    test.each([
      ['apple', 'appleay'],
      ['xray', 'xrayay'],
      ['yttria', 'yttriaay']
    ])('%s -> %s', (input, result) => {
      expect(translate(input)).toBe(result);
    });
  });

  describe('Rule 2', () => {
    test.each([
      ['pig', 'igpay'],
      ['chair', 'airchay'],
      ['thrush', 'ushthray']
    ])('%s -> %s', (input, result) => {
      expect(translate(input)).toBe(result);
    });
  });

  describe('Rule 3', () => {
    test.each([
      ['quick', 'ickquay'],
      ['square', 'aresquay']
    ])('%s -> %s', (input, result) => {
      expect(translate(input)).toBe(result);
    });
  });

  describe('Rule 4', () => {
    test.each([
      ['my', 'ymay'],
      ['rhythm', 'ythmrhay']
    ])('%s -> %s', (input, result) => {
      expect(translate(input)).toBe(result);
    });
  });

  describe('Rule mixes', () => {
    test.each([
      ['apple thrush my square', 'appleay ushthray ymay aresquay'],
      ['chair rhythm xray', 'airchay ythmrhay xrayay']
    ])('%s -> %s', (input, result) => {
      expect(translate(input)).toBe(result);
    });
  });
});
