export const STICKY_NOTE_COLORS = [
  '#FFF9C4', // yellow
  '#FFCCBC', // orange
  '#C8E6C9', // green
  '#BBDEFB', // blue
  '#E1BEE7', // purple
  '#F8BBD0', // pink
];

export function getRandomNoteColor(): string {
  return STICKY_NOTE_COLORS[Math.floor(Math.random() * STICKY_NOTE_COLORS.length)];
}

export function getRandomRotation(): number {
  return Math.random() * 6 - 3; // -3 to 3 degrees
}
