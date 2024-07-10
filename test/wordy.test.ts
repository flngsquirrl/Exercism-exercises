import { answer } from '../src/wordy';

describe('Wordy', () => {
  describe('Simple correct questions', () => {
    it('Addition with positive', () => {
      expect(answer('what is 4 plus 5?')).toEqual(9);
    });
    it('Addition with negative', () => {
      expect(answer('what is -4 plus -5?')).toEqual(-9);
    });
    it('Subtraction', () => {
      expect(answer('what is 5 minus 4?')).toEqual(1);
    });
    it('Multiplication', () => {
      expect(answer('what is 5 multiplied by 4?')).toEqual(20);
    });
    it('Division', () => {
      expect(answer('what is 20 divided by 4?')).toEqual(5);
    });
  });

  describe('Complex correct questions', () => {
    it('Add, subtract then multiply', () => {
      expect(answer('what is 4 plus 5 multiplied by 2?')).toEqual(18);
    });

    it('Add, multiply, subtract, divide', () => {
      expect(
        answer('what is 2 plus 3 multiplied by 3 minus 3 divided by 6?')
      ).toEqual(2);
    });
  });

  describe('Incorrect questions', () => {
    it('Cubed', () => {
      expect(() => answer('what is 52 cubed?')).toThrow(
        new Error('Syntax error')
      );
    });
    it('Syntax error', () => {
      expect(() => answer('what is 5 plus minus 4?')).toThrow(
        new Error('Unsupported operation')
      );
    });
    it('Non math question: without any operands', () => {
      expect(() => answer('what is the best musucian ever?')).toThrow(
        new Error('Non math question')
      );
    });
  });
});
