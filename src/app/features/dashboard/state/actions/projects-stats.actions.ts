import { createAction, props } from '@ngrx/store';
import { ProjectsStatsState } from '../reducers/projects-stats.reducer';

export const loadProjectsStats = createAction(
  '[ProjectsStats] Load ProjectsStats',
);

export const updateProjectsStats = createAction(
  '[ProjectsStats] Update ProjectsStats',
  props<{ stats: ProjectsStatsState }>(),
);

export const resetProjectsStats = createAction(
  '[ProjectsStats] Reset ProjectsStats',
);




