const TIME_SHIFT_MILLISECONDS = 1_000_000_000_000;

export class Gigasecond {
  constructor(readonly startDate: Date) {}

  public date(): Date {
    return new Date(this.startDate.getTime() + TIME_SHIFT_MILLISECONDS);
  }
}
