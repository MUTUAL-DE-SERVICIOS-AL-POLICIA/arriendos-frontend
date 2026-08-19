export const Reason = {
  payment: 'payment',
  warranty: 'warranty',
  extraHour: 'extraHour',
  damage: 'damage',
} as const;

export type Reason = typeof Reason[keyof typeof Reason];
