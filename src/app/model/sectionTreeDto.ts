import { SectionDto } from './sectionDto';

export interface SectionTreeDto {
    data: SectionDto;
    children: Array<SectionTreeDto>;
    isRoot?: boolean;
    isLeaf?: boolean;
    level?: number;
}
