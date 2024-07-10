const OPERATIONS = ['plus', 'minus', 'multiplied by', 'divided by'] as const;
type Operation = (typeof OPERATIONS)[number];

type MathQuestionParams = {
  operand1: number;
  operation: Operation;
  operand2: number;
};

class MathQuestion {
  static #NUMBER_REGEX = /-?\d+/;
  static #OPERATION_OPERAND_REGEX =
    /(?<operation>[a-zA-Z]{4,}\s*[a-zA-Z]*) (?<operand2>-?\d+)/g;
  static #QUESTION_START = 'what is';
  static #QUESTION_END = '?';

  static answer(question: string): number {
    if (
      !question.toLowerCase().startsWith(this.#QUESTION_START) ||
      !question.endsWith(this.#QUESTION_END)
    ) {
      throw new Error('Syntax error');
    }

    const operandMatch = this.#NUMBER_REGEX.exec(question);

    if (operandMatch) {
      const operand1 = operandMatch[0];
      const questionEnd = question.substring(
        operandMatch.index + operand1.length
      );
      let match;
      let result = +operand1;
      let lastMatchPosition = 0;
      do {
        match = this.#OPERATION_OPERAND_REGEX.exec(questionEnd);
        if (match && match.groups) {
          const operation = match.groups.operation;
          const operand2 = +match.groups.operand2;
          result = MathQuestion.performOperation({
            operand1: result,
            operation: operation as Operation,
            operand2: +operand2
          });
          lastMatchPosition = match.index + match[0].length;
        }
      } while (match);

      if (lastMatchPosition != questionEnd.length - 1) {
        throw new Error('Syntax error');
      }

      return result;
    }

    throw new Error('Non math question');
  }

  private static performOperation(params: MathQuestionParams): number {
    switch (params.operation) {
      case 'plus':
        return params.operand1! + params.operand2!;
      case 'minus':
        return params.operand1! - params.operand2!;
      case 'multiplied by':
        return params.operand1! * params.operand2!;
      case 'divided by':
        return params.operand1! / params.operand2!;
      default:
        throw new Error('Unsupported operation');
    }
  }
}

export const answer = (question: string): number => {
  return MathQuestion.answer(question);
};
