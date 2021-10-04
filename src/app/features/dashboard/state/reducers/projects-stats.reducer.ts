import { createReducer, on } from '@ngrx/store';
import { loadProjectsStats, resetProjectsStats, updateProjectsStats } from '../actions/projects-stats.actions';

export interface ProjectsStatsState {
  done: number;
  cancelled: number;
}

export const initialState: ProjectsStatsState = {
  done: 10,
  cancelled: 5,
};

export const projectsStatsFeatureKey = 'projectsStats';

export const projectsStatsReducer = createReducer(
  initialState,
  on(loadProjectsStats, ({ stats }: any): ProjectsStatsState => stats),
  on(updateProjectsStats, (state: ProjectsStatsState, { stats }): ProjectsStatsState => {
    return {
      ...state,
      ...stats,
    };
  }),
  on(resetProjectsStats, (): ProjectsStatsState => {
    return { ...initialState };
  }),
);

