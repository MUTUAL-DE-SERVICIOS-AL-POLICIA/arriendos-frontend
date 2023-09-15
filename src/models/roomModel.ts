
/* Room MODEL */
export interface RoomModel {
    id: number;
    is_active: boolean;
    name: string;
    capacity: number;
    warranty: number;
}

/* FORM Room MODEL */
export interface FormRoomModel {
    name: string;
    photo: File | null;
}

/*FORM Room MODEL VALIDATIONS */
export interface FormRoomValidations {
    name: [(value: string) => boolean, string];
    photo: [(value: File) => boolean, string];
}