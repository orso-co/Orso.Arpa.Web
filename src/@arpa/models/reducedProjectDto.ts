export interface ReducedProjectDto {
  id?: string;
  title?: string;
  shortTitle?: string;
  description?: string;
  code?: string;
  parentProjectId?: string;
  parentProject?: { title: string; id: string };
  children?: { title: string; id: string };
}
