const DAYS = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth'
];

const GIFTS = [
  'a Partridge in a Pear Tree',
  'two Turtle Doves',
  'three French Hens',
  'four Calling Birds',
  'five Gold Rings',
  'six Geese-a-Laying',
  'seven Swans-a-Swimming',
  'eight Maids-a-Milking',
  'nine Ladies Dancing',
  'ten Lords-a-Leaping',
  'eleven Pipers Piping',
  'twelve Drummers Drumming'
];

function getPresents(startDay: number, list: string[]): string[] {
  if (startDay === 0) {
    return list;
  }
  list.push(GIFTS[startDay - 1]);
  return getPresents(startDay - 1, list);
}

const DAY_PLACEHOLDER = '{day}';
const PRESENTS_PLACEHOLDER = '{presents}';
const ENTRY_LINE_FORMAT =
  'On the {day} day of Christmas my true love gave to me: {presents}.\n';

export function recite(startDay: number, endDay: number): string {
  const verse: string[] = [];
  for (let i = startDay; i <= endDay; i++) {
    const presents = getPresents(i, []);
    let presentsLine;
    if (presents.length === 1) {
      presentsLine = presents[0];
    } else {
      presentsLine =
        presents.slice(0, -1).join(', ') + ', and ' + presents.slice(-1);
    }
    verse.push(getLine(i, presentsLine));
  }
  return verse.join('');
}

function getLine(day: number, presents: string): string {
  return ENTRY_LINE_FORMAT.replace(DAY_PLACEHOLDER, DAYS[day - 1]).replace(
    PRESENTS_PLACEHOLDER,
    presents
  );
}

console.log(recite(1, 3));
