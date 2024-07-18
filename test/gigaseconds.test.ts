import { Gigasecond } from '../src/gigaseconds';

describe('Gigasecond', () => {
  it('date only specification of time', () => {
    const gs = new Gigasecond(new Date(Date.parse('2011-04-25')));
    const expectedDate = new Date(Date.parse('2043-01-01T01:46:40Z'));
    expect(gs.date()).toEqual(expectedDate);
  });
});
