import { userStatsFeatureKey, userStatsReducer, UserStatsState } from './reducers/user-stats.reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { projectsStatsFeatureKey, projectsStatsReducer, ProjectsStatsState } from './reducers/projects-stats.reducer';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  [userStatsFeatureKey]: UserStatsState;
  [projectsStatsFeatureKey]: ProjectsStatsState;
}

export const selectDashboardFeature = createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectUserStats = createSelector(
  selectDashboardFeature,
  (state: DashboardState) => state.userStats,
);

export const selectProjectsStats = createSelector(
  selectDashboardFeature,
  (state: DashboardState) => state.projectsStats,
);

export function reducers(state: DashboardState | undefined, action: Action) {
  return combineReducers({
    [userStatsFeatureKey]: userStatsReducer,
    [projectsStatsFeatureKey]: projectsStatsReducer,
  })(state, action);
}
