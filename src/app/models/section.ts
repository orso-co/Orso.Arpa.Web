import { TreeNode } from 'primeng/api';

export interface ISectionDto {
  id: string;
  name: string;
  instrumentPartCount: number;
}

export interface ISectionTreeDto {
  data: ISectionDto | null;
  children: ISectionTreeDto[];
  isRoot: boolean;
  isLeaf: boolean;
  level: number;
}
