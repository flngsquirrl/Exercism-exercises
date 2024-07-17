interface RainDropSoundRule {
  divisor: number;
  sound: string;
}

const RAIN_DROP_SOUND_RULES: RainDropSoundRule[] = [
  { divisor: 3, sound: 'Pling' },
  { divisor: 5, sound: 'Plang' },
  { divisor: 7, sound: 'Plong' }
];

export function convert(input: number): string {
  let result = '';
  [...RAIN_DROP_SOUND_RULES].forEach(({ divisor, sound }) => {
    if (input % divisor === 0) {
      result += sound;
    }
  });
  return result ? result : String(input);
}
