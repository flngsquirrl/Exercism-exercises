class SongSubject {
  constructor(
    readonly name: string,
    readonly description?: string,
    readonly action?: string,
    readonly object?: SongSubject
  ) {}

  verse(): string[] {
    const lines: string[] = [];
    lines.push(this.subject);
    const actions = this.actionSequence;
    if (actions) {
      lines.push(...actions);
    }
    lines[lines.length - 1] += '.';
    return lines;
  }

  get subject(): string {
    return `This is the ${this.name}${this.description ? ' ' + this.description : ''}`;
  }

  get actionSequence(): string[] {
    const actions: string[] = [];
    if (this.object) {
      const actionLine = `that ${this.action} the ${this.object.name}${this.object.description ? ' ' + this.object.description : ''}`;
      actions.push(actionLine);
      actions.push(...this.object.actionSequence);
    }
    return actions;
  }
}

const house = new SongSubject('house', 'that Jack built');
const malt = new SongSubject('malt', undefined, 'lay in', house);
const rat = new SongSubject('rat', undefined, 'ate', malt);
const cat = new SongSubject('cat', undefined, 'killed', rat);
const dog = new SongSubject('dog', undefined, 'worried', cat);
const cow = new SongSubject('cow', 'with the crumpled horn', 'tossed', dog);
const maiden = new SongSubject('maiden', 'all forlorn', 'milked', cow);
const man = new SongSubject('man', 'all tattered and torn', 'kissed', maiden);
const priest = new SongSubject(
  'priest',
  'all shaven and shorn',
  'married',
  man
);
const rooster = new SongSubject(
  'rooster',
  'that crowed in the morn',
  'woke',
  priest
);
const farmer = new SongSubject('farmer', 'sowing his corn', 'kept', rooster);
const horse = new SongSubject(
  'horse',
  'and the hound and the horn',
  'belonged to',
  farmer
);

const SONG_SUBJECTS = [
  house,
  malt,
  rat,
  cat,
  dog,
  cow,
  maiden,
  man,
  priest,
  rooster,
  farmer,
  horse
];

export function verse(number: number): string[] {
  return SONG_SUBJECTS[number - 1].verse();
}

export function verses(startNumber: number, endNumber: number): string[] {
  const lines: string[] = [];
  for (let i = startNumber; i <= endNumber; i++) {
    lines.push(...verse(i));
    if (i < endNumber) {
      lines.push('');
    }
  }
  return lines;
}
