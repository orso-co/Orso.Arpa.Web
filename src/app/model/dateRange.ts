export type DateRange = 0 | 1 | 2 | 'month' | 'week' | 'day';

export const DateRange = {
  month: 0 as DateRange,
  week: 1 as DateRange,
  day: 2 as DateRange,
  0: 'month' as DateRange,
  1: 'week' as DateRange,
  2: 'day' as DateRange,
};
