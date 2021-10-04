import { createAction, props } from '@ngrx/store';
import { UserStatsState } from '../reducers/user-stats.reducer';

export const loadUserStats = createAction(
  '[UserStats] Load UserStats',
);

export const updateUserStats = createAction(
  '[UserStats] Update UserStats',
  props<{ stats: UserStatsState }>(),
);

export const resetUserStats = createAction(
  '[UserStats] Reset UserStats',
);




