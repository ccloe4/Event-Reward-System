export type EventCondition =
  | { type: 'signInDays'; requiredDays: number }
  | { type: 'oldestUser' }
  | { type: 'questClear'; questName: string };
