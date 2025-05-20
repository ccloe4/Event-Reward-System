import { EventCondition } from '@libs/interfaces';

export function isSignInDays(
  cond: EventCondition,
): cond is { type: 'signInDays'; requiredDays: number } {
  return cond.type === 'signInDays';
}

export function isOldestUser(cond: EventCondition): cond is { type: 'oldestUser' } {
  return cond.type === 'oldestUser';
}

export function isQuestClear(
  cond: EventCondition,
): cond is { type: 'questClear'; questName: string } {
  return cond.type === 'questClear';
}
