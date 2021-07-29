
export interface RoomDto {
    id?: string;
    createdBy: string;
    createdAt: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
    building?: string;
    floor?: string;
    name: string;
    venueId: string;
}
