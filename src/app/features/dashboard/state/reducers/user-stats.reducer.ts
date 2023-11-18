import { createReducer, on } from '@ngrx/store';
import { loadUserStats, resetUserStats, updateUserStats } from '../actions/user-stats.actions';

export interface UserStatsState {
  registered: number;
  active: number;
  awaitingEmailConfirmation: number;
  awaitingRoleAssignment: number;
}

export const initialState: UserStatsState = {
  active: 0,
  awaitingEmailConfirmation: 0,
  awaitingRoleAssignment: 0,
  registered: 0,
};

export const userStatsFeatureKey = 'userStats';

export const userStatsReducer = createReducer(
  initialState,
  on(loadUserStats, ({ stats }: any): UserStatsState => ({ ...stats })),
  on(updateUserStats, (state: UserStatsState, { stats }): UserStatsState => {
    return {
      ...state,
      ...stats,
    };
  }),
  on(resetUserStats, (): UserStatsState => initialState)
);
