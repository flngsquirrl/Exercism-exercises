// find the largest series product in a string of numbers

interface SpanState {
  zeroCount: number;
  product: number;
}

type Slice = [start: number, end: number];

export const largestProduct = (input: string, span: number) => {
  validateInput(input, span);

  const digits = Array.from(input, Number);

  let largestProduct = 0;

  const state = getInitialSpanState(digits, [0, span]);
  if (state.zeroCount === 0) {
    largestProduct = state.product;
  }

  for (let i = 1; i < digits.length - span + 1; i++) {
    updateSpanState(digits[i - 1], digits[i + span - 1], state);

    if (state.zeroCount === 0 && state.product > largestProduct) {
      largestProduct = state.product;
    }
  }

  return largestProduct;
};

function updateSpanState(
  digitToRemove: number,
  digitToAdd: number,
  state: SpanState
) {
  if (digitToAdd !== 0) {
    state.product *= digitToAdd;
  } else {
    state.zeroCount++;
  }

  if (digitToRemove !== 0) {
    state.product /= digitToRemove;
  } else {
    state.zeroCount--;
  }
}

function getInitialSpanState(digits: number[], slice: Slice): SpanState {
  const state: SpanState = { zeroCount: 0, product: 1 };

  for (let i = slice[0]; i < slice[1]; i++) {
    const digit = digits[i];
    if (digit !== 0) {
      state.product *= digit;
    } else {
      state.zeroCount++;
    }
  }
  return state;
}

const MAX_INPUT_LENGTH = 100;
const MIN_INPUT_LENGTH = 1;

const validateInput = (input: string, span: number) => {
  if (input.length < MIN_INPUT_LENGTH) {
    throw new Error(
      `Input string must be at least ${MIN_INPUT_LENGTH} character(s) long`
    );
  }
  if (input.length > MAX_INPUT_LENGTH) {
    throw new Error(
      `Input string must not be longer than ${MAX_INPUT_LENGTH} characters`
    );
  }
  if (/\D/.test(input)) {
    throw new Error('Input string must only contain digits');
  }
  if (span < 0) {
    throw new Error('Span must not be negative');
  }
  if (span > input.length) {
    throw new Error(
      'Span must be smaller than or equal to the input string length'
    );
  }
};
